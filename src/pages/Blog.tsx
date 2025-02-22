
const Blog = () => {
  return (
    <div className="min-h-screen w-full bg-[#222222] pt-24">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden px-6 lg:px-8 pb-8">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
                Delivering the state of the art in <span className="text-[#9b87f5]">AI agents</span> to SMBs.
              </h1>
              <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-bold line-clamp-2">
                Learn how the most cutting-edge tech can be applied to your business.
              </p>
            </div>
          </div>
          
          {/* Gradient orbs for visual interest */}
          <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-20" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/30 blur-3xl opacity-20" />
        </div>
        <p className="text-gray-400 text-center mt-8">Coming soon...</p>
      </div>
    </div>
  );
};

export default Blog;
