
export const SocialProofSection = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-8">
        Trusted By Forward-Thinking Companies
      </h2>
      <p className="text-gray-400 text-center mb-12 max-w-3xl mx-auto">
        Join hundreds of businesses already using our AI voice technology to transform customer interactions
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="flex justify-center">
            <div className="h-12 w-40 bg-gray-800/50 rounded-md flex items-center justify-center">
              <span className="text-gray-500 font-semibold">LOGO {i}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
