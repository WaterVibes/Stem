"use client";

const categories = [
  'All',
  'Singing & Dancing',
  'Comedy',
  'Sports',
  'Anime & Comics',
  'Relationship',
  'Shows',
  'Lipsync',
  'Daily Life',
  'Food',
  'Gaming',
  'Animals',
  'Technology',
  'Education',
  'Fashion',
  'Beauty'
];

export default function ExplorePage() {
  return (
    <div className="min-h-screen">
      <h1 className="fixed top-[4.5rem] left-60 right-0 px-4 py-3 font-semibold text-xl bg-black border-b border-[#00ff9d]/20 z-[40]">
        Trending today
      </h1>

      {/* Categories */}
      <div className="fixed top-[8rem] left-60 right-0 bg-black z-[40] border-b border-[#00ff9d]/20">
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

      {/* Video Grid */}
      <div className="pt-44 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="aspect-[9/16] bg-[#00ff9d]/5 border border-[#00ff9d]/20">
            <div className="w-full h-full flex items-center justify-center text-[#00ff9d]/40">
              Video {i + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 