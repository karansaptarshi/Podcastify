"use client";


const LoadingMessage = ({ loading }) => {
   return (
      <>
         {loading && (<div className="text-gray-600 flex flex-col items-center">
            Generating podcast...
         </div>)}
      </>
   )
}

export default LoadingMessage
