import AudioPlayer from "@/components/AudioPlayer"

// import { useEffect, useState } from "react"
// import { useSearchParams } from "next/navigation"


const OutputPage = async () => {
   const data = {
      "conversation": [
         {
            "speaker": "A",
            "line": "Hey, how's everything going today?"
         },
         {
            "speaker": "B",
            "line": "Pretty good! I've been thinking about some cool new ideas lately."
         },
         {
            "speaker": "A",
            "line": "Nice! Tell me more about them."
         }
      ]
   };

   return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
         <AudioPlayer conversation={data.conversation} />
      </div>
   )
}

export default OutputPage
