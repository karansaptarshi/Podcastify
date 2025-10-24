const UploadButton = ({ fileName }) => {
   return (
      <>
         {fileName && (<button className="text-gray-700 rounded-lg cursor-pointer bg-gray-400">
            Upload
         </button>)}
      </>
   )
}

export default UploadButton
