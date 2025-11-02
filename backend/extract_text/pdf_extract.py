from __future__ import annotations
import pathlib
from typing import List, Optional

#extracts text from a regular pdf where text is already contained
def _extract_text_pdfplumber(pdf_path: pathlib.Path) -> List[str]:
    import pdfplumber
    pages: List[str] = []
    with pdfplumber.open(str(pdf_path)) as pdf:
        for p in pdf.pages:
            txt = p.extract_text() or ""
            pages.append(txt.rstrip())
    return pages

#extracts text from an image of a pdf, scanned pdf
def _extract_text_ocr(pdf_path: pathlib.Path, dpi: int = 300) -> List[str]:
    from pdf2image import convert_from_path
    import pytesseract
    imgs = convert_from_path(str(pdf_path), dpi=dpi)
    return [pytesseract.image_to_string(img).rstrip() for img in imgs]

#uses helpers to reads pdf file uploaded to backend, extracts its text and returns a .txt file
def extract_from_uploads(
    filename: str,
    uploads_dir: str = "app/uploads",
    out_dir: Optional[str] = None,
    force_ocr: bool = False,
    ocr_dpi: int = 300,
) -> pathlib.Path:
    """
    Read app/uploads/<filename>, write text to <out_dir or uploads_dir>/<filename>.txt.
    Returns path to the .txt file.
    """
    in_path = pathlib.Path(uploads_dir) / filename
    if not in_path.exists():
        raise FileNotFoundError(f"Missing: {in_path}")

    # Pass 1: pdfplumber
    pages = _extract_text_pdfplumber(in_path)
    have_text = sum(len(p) for p in pages) > 0

    # OCR fallback
    if force_ocr or not have_text:
        pages = _extract_text_ocr(in_path, dpi=ocr_dpi)

    if sum(len(p) for p in pages) == 0:
        raise RuntimeError("No extractable text. PDF may be encrypted or images without OCR available.")

    out_base = pathlib.Path(out_dir) if out_dir else pathlib.Path(uploads_dir)
    out_base.mkdir(parents=True, exist_ok=True)
    out_path = out_base / (pathlib.Path(filename).stem + ".txt")
    out_path.write_text("\n\n".join(pages), encoding="utf-8")
    return out_path