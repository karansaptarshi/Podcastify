import EnhancedAudioPlayer from "@/components/EnhancedAudioPlayer";

const OutputPage = async () => {
  // In production, you would fetch this data based on the job ID from query params
  // For now, using a mock MP3 URL
  const audioUrl = "/mock-audio.mp3"; // Replace with actual audio URL
  const podcastTitle = "Your Generated Podcast";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <EnhancedAudioPlayer audioUrl={audioUrl} title={podcastTitle} />
      
      <div className="mt-6">
        <a
          href="/"
          className="text-indigo-600 hover:text-indigo-700 font-medium underline"
        >
          ← Create Another Podcast
        </a>
      </div>
    </div>
  );
};

export default OutputPage;