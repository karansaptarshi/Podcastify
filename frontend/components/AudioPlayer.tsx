"use client";

import { useState, useRef } from "react";
type Line = { speaker: string; line: string };
const AudioPlayer = ({ conversation }: { conversation: Line[] }) => {
   const audioReference = useRef(null);
   const [isPlaying, setPlaying] = useState(false);

   const speakConvo = (conversation) => {
      const voices = speechSynthesis.getVoices();
      conversation.forEach((entry, i) => {
         const utterance = new SpeechSynthesisUtterance(`${entry.speaker} says: ${entry.line}`)
         utterance.voice = voices[i % voices.length];
         utterance.rate = 1;
         utterance.pitch = 1;
         speechSynthesis.speak(utterance);
      });
   };

   return (
      <div className="text-black">
         <h1>Podcast</h1>
         {/* <audio ref={audioReference} src="/mock-audio.mp3" /> */}
         {/* <button onClick={() => { */}
         {/*    if (isPlaying) { */}
         {/*       audioReference.current.pause(); */}
         {/*       setPlaying(false); */}
         {/*    } else { */}
         {/*       audioReference.current.play(); */}
         {/*       setPlaying(true); */}
         {/*    } */}
         {/* }} className="bg-gray-300 cursor-pointer rounded-lg">{isPlaying ? "Pause" : "Play"}</button> */}
         <button onClick={() => speakConvo(conversation)} className="bg-gray-300 cursor-pointer rounded-lg">{isPlaying ? "Pause" : "Play"}</button>
      </div >
   )
}

export default AudioPlayer
