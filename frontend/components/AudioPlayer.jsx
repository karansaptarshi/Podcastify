"use client";

import { useState, useRef } from "react";

const AudioPlayer = () => {
   const audioReference = useRef(null);
   const [isPlaying, setPlaying] = useState(false);

   return (
      <div className="text-black">
         <h1>Podcast</h1>
         <audio ref={audioReference} src="/mock-audio.mp3" />
         <button onClick={() => {
            if (isPlaying) {
               audioReference.current.pause();
               setPlaying(false);
            } else {
               audioReference.current.play();
               setPlaying(true);
            }
         }} >{isPlaying ? "Pause" : "Play"}</button>
      </div>
   )
}

export default AudioPlayer
