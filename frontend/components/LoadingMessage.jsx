"use client";


const LoadingMessage = ({ loading }) => {
   return (
      <>
         {loading && (<div className="text-gray-600">
            Generating podcast...
         </div>)}
      </>
   )
}

export default LoadingMessage
