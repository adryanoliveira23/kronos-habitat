import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

const nfts = [
  { id: "#0069", name: "duckshard", img: "https://picsum.photos/seed/ninja1/400/400" },
  { id: "#0066", name: "duckshard", img: "https://picsum.photos/seed/ninja2/400/400" },
  { id: "#0067", name: "duckshard", img: "https://picsum.photos/seed/ninja3/400/400" },
];

export default function NftGrid() {
  return (
    <section className="bg-bg-dark py-32 px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-20">
          <div className="text-[10px] font-black text-neon-green uppercase tracking-[0.3em] mb-4">About NFTNINJA</div>
          <h2 className="text-4xl md:text-5xl font-black font-sans tracking-tighter leading-none max-w-2xl mx-auto uppercase">
            NFTNINJA IS A LIMITED COLLECTION OF 5,000 WARRIORS.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {nfts.map((nft, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              {/* Tag */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 bg-neon-yellow text-black px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest neon-shadow-yellow">
                {nft.name} {nft.id}
              </div>

              {/* Card */}
              <div className="relative glass-card rounded-[40px] p-6 pt-12 overflow-hidden group-hover:border-neon-green/40 transition-colors">
                <div className="aspect-square rounded-[32px] bg-zinc-900 mb-8 overflow-hidden">
                   <img src={nft.img} alt={nft.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                </div>

                <div className="flex justify-between items-center">
                   <div>
                      <div className="text-[10px] text-white/40 uppercase font-bold">Rarity Score:</div>
                      <div className="text-xl font-black font-sans">8.7/10</div>
                   </div>
                   <div className="w-12 h-12 rounded-full bg-neon-yellow flex items-center justify-center text-black neon-shadow-yellow group-hover:scale-110 transition-transform">
                      <ArrowRight className="w-6 h-6" />
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
