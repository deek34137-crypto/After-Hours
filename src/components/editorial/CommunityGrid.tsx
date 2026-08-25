import React from "react";
import Image from "next/image";
import { Instagram, ArrowUpRight } from "lucide-react";

const COMMUNITY_POSTS = [
  {
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=600&auto=format&fit=crop",
    handle: "@rohit.afterhours",
    location: "BANDRA, MUMBAI • 02:40 AM",
    piece: "No Sleep Club Heavy Tee",
  },
  {
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=600&auto=format&fit=crop",
    handle: "@ananya_dark",
    location: "HAUZ KHAS, DELHI • 03:15 AM",
    piece: "Midnight Utility Hoodie",
  },
  {
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=600&auto=format&fit=crop",
    handle: "@kabir.xyz",
    location: "INDIRANAGAR, BLR • 01:50 AM",
    piece: "02:17 Timestamp Tee",
  },
  {
    image: "https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=600&auto=format&fit=crop",
    handle: "@nocturnal_vibes",
    location: "SECTOR 29, GGN • 04:10 AM",
    piece: "Tactical Utility Cargo",
  },
];

export const CommunityGrid: React.FC = () => {
  return (
    <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 mb-8 border-b border-white/10">
        <div>
          <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest block mb-1">
            @AFTERHOURS.IN
          </span>
          <h2 className="font-sans font-black text-2xl sm:text-4xl uppercase tracking-tight text-white">
            COMMUNITY IN MOTION
          </h2>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
          <span>TAG #AFTERHOURS TO BE ARCHIVED</span>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {COMMUNITY_POSTS.map((post, idx) => (
          <div
            key={idx}
            className="group relative aspect-square bg-zinc-900 overflow-hidden border border-white/10 hover:border-white/30 transition-all select-none"
          >
            <Image
              src={post.image}
              alt={post.handle}
              fill
              sizes="(max-width: 640px) 50vw, 25vw"
              className="object-cover object-center grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
              <span className="font-mono text-[10px] text-zinc-400 block">{post.location}</span>
              <span className="font-sans font-bold text-xs text-white uppercase">{post.handle}</span>
              <span className="font-mono text-[10px] text-zinc-300 mt-1">{post.piece}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
