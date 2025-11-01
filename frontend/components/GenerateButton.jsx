"use client";
import { useRouter } from "next/navigation";

const GenerateButton = ({ file, loading, setLoading }) => {
   const router = useRouter();

   const onClick = async () => {
      if (!file) return;
      setLoading(true);
      const fd = new FormData();
      fd.append("file", file, file.name);
      const result = await fetch("/api/upload", { method: "POST", body: fd });
      if (!result.ok) {
         setErr("Upload failed");
         return;
      }
      const { job } = await result.json();
      router.push(`/output?job=${job}`);
      setLoading(false);
   }
   return (<>
      {
         file && !loading &&
         <button className="text-gray-700 rounded-lg cursor-pointer bg-gray-400" onClick={onClick} disabled={loading}>
            Generate podcast
         </button>
      }
   </>

   )
}

export default GenerateButton
