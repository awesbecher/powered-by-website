
export const AudioDemo = () => {
  return (
    <section id="demo-section" className="py-20 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">
          Hear a Real Voice Agent
        </h2>
        <div className="bg-[#1a1a2e] rounded-2xl p-8 border border-white/10">
          <audio
            controls
            className="w-full"
            src="/audio/sample.wav"
          >
            Your browser does not support the audio element.
          </audio>
          <p className="text-gray-300 mt-4">
            Listen to our AI agent handle a real customer inquiry
          </p>
        </div>
      </div>
    </section>
  );
};
