"use client";

const categories = [
  'All',
  'Following',
  'Gaming',
  'Music',
  'Sports',
  'Entertainment',
  'Creative',
  'Just Chatting',
  'IRL',
  'Esports',
  'Education'
];

export default function LivePage() {
  return (
    <div className="min-h-screen">
      <h1 className="fixed top-[4.5rem] left-60 right-0 px-4 py-3 font-semibold text-xl bg-black border-b border-[#00ff9d]/20 z-[80]">
        LIVE
      </h1>

      {/* Categories */}
      <div className="fixed top-[8rem] left-60 right-0 bg-black z-[80] border-b border-[#00ff9d]/20">
        <div className="overflow-x-auto no-scrollbar">
          <div className="flex whitespace-nowrap px-4 py-2">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-1.5 mr-2 text-sm hover:text-[#00ff9d] transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Live Streams Grid */}
      <div className="pt-44 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-[#00ff9d]/5 border border-[#00ff9d]/20 p-2 space-y-2">
            {/* Stream Preview */}
            <div className="aspect-video bg-black/50 relative">
              <div className="absolute top-2 left-2 px-2 py-1 bg-red-500 text-xs">
                LIVE
              </div>
              <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/70 text-xs">
                {Math.floor(Math.random() * 10000)} viewers
              </div>
            </div>
            
            {/* Stream Info */}
            <div className="space-y-1">
              <h3 className="font-medium truncate">Live Stream {i + 1}</h3>
              <p className="text-sm text-[#00ff9d]/60 truncate">Streamer Name</p>
              <p className="text-sm text-[#00ff9d]/60 truncate">Category Name</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 