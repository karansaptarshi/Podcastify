"use client";

import { useState } from "react";

const LoadingMessage = () => {
   const [loading, setLoading] = useState(false);
   return (
      <>
         {loading && (<div className="text-gray-600">
            Generating podcast...
         </div>)}
      </>
   )
}

export default LoadingMessage
