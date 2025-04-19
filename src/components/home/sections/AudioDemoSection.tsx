
export const AudioDemoSection = () => {
  const handleOpenVoiceDialog = () => {
    document.dispatchEvent(new CustomEvent('open-voice-dialog'));
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-[#1a0b2e] to-[#2f1c4a] rounded-2xl p-8 border border-[#8B5CF6]/20">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Hear a Real Voice Agent</h2>
          
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-[#8B5CF6]/20 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#8B5CF6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 01-.707-7.779m-2.121-2.12a9 9 0 010 12.728" />
              </svg>
            </div>
          </div>
          
          <div className="bg-[#1a0b2e] rounded-xl p-4">
            <audio className="w-full" controls>
              <source src="https://example.com/sample-voice-agent.mp3" type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            <p className="text-gray-300 text-center mt-4">
              This is a real conversation between a customer and our AI voice agent.
            </p>
          </div>
          
          <div className="mt-8 flex justify-center">
            <button onClick={handleOpenVoiceDialog} className="bg-[#8B5CF6] hover:bg-[#7c4deb] text-white px-6 py-3 rounded-lg">
              Try Voice Agent Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
