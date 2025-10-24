const GenerateButton = ({ fileName, loading, setLoading }) => {
   return (
      <>
         {fileName && (<button className="text-gray-700 rounded-lg cursor-pointer bg-gray-400" disabled={loading} onClick={async () => {
            setLoading(true);
            // const result = await fetch("/api/generate", { method: "POST" })

            // Timer to test loading message
            await new Promise((r) => setTimeout(r, 2000));

            setLoading(false);
         }}>
            Generate
         </button>)}
      </>
   )
}

export default GenerateButton
