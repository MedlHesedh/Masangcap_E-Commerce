import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { FINISHES } from '../data';
import { ArrowRight, Star, Layers } from 'lucide-react';

interface FinishItemProps {
  item: any;
  index: number;
  onAction: (item: any) => void;
  openModal: (item: any) => void;
}

const FinishItem: React.FC<FinishItemProps> = ({ item, index, onAction, openModal }) => {
  const ref = useRef(null);
  const { scrollXProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollXProgress, [0, 1], [100, -100]);

  return (
    <div 
      ref={ref}
      className="inline-block w-[85vw] md:w-[60vw] lg:w-[45vw] h-[60vh] md:h-[70vh] mr-12 md:mr-24 last:mr-0 relative group"
    >
      <div className="relative w-full h-full overflow-hidden rounded-[3rem] bg-white shadow-2xl shadow-secondary/10 border border-secondary/5">
        <motion.img 
          style={{ x }}
          src={item.img} 
          alt={item.title} 
          className="absolute inset-0 w-[120%] h-full object-cover scale-110 group-hover:scale-115 transition-transform duration-1000" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
        
        <div className="absolute inset-0 p-12 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-black text-white uppercase tracking-[0.3em]">
              {item.category}
            </span>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-3 h-3 ${i < parseInt(item.durability) ? 'text-primary fill-primary' : 'text-white/20'}`} 
                />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">
              {item.title}
            </h3>
            <p className="text-white/70 font-medium max-w-md text-sm md:text-lg line-clamp-2 group-hover:text-white transition-colors">
              {item.description}
            </p>
            
            <div className="flex items-center gap-4 pt-4">
              <button 
                onClick={() => onAction(item)}
                className="btn-primary px-8 py-4 text-sm flex items-center gap-3"
              >
                Select Style <ArrowRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => openModal(item)}
                className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-secondary transition-all"
              >
                Details
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Index */}
      <div className="absolute -bottom-12 left-6 flex items-center gap-4">
        <span className="text-4xl font-black text-secondary/10">0{index + 1}</span>
        <div className="h-[1px] w-12 bg-secondary/10" />
      </div>
    </div>
  );
};

export const FinishesPage = ({ openModal, onAction }: { openModal: (item: any) => void, onAction: (item: any) => void }) => {
  const scrollRef = useRef(null);

  return (
    <div className="pt-48 pb-32 bg-white overflow-hidden min-h-screen">
      <div className="max-w-7xl mx-auto px-6 mb-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full border border-primary/20 mb-6"
            >
              <Layers className="w-4 h-4" />
              <span className="text-xs font-black uppercase tracking-widest">Finish Selector</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-black text-secondary mb-8 tracking-tighter leading-[0.9]"
            >
              Curated <br /><span className="text-primary">Aesthetics.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-secondary/40 font-medium"
            >
              The final layer of your masterpiece. Select from our hand-picked collection of premium materials and finishes.
            </motion.p>
          </div>

          <div className="hidden md:flex flex-col items-end gap-2">
            <span className="text-[10px] font-black text-secondary/20 uppercase tracking-[0.5em] rotate-90 origin-right translate-y-12">Scroll to Explore</span>
            <div className="w-[1px] h-32 bg-gradient-to-b from-primary to-transparent" />
          </div>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="overflow-x-auto overflow-y-hidden whitespace-nowrap px-6 md:px-[10vw] pb-24 no-scrollbar cursor-grab active:cursor-grabbing"
      >
        <div className="inline-flex">
          {FINISHES.map((finish, index) => (
            <FinishItem 
              key={finish.id} 
              item={finish} 
              index={index} 
              onAction={onAction}
              openModal={openModal}
            />
          ))}
        </div>
      </div>

      {/* Background Decorative Text */}
      <div className="fixed bottom-0 left-0 w-full pointer-events-none z-0 overflow-hidden opacity-[0.02] select-none">
        <h2 className="text-[30vw] font-black text-secondary leading-none whitespace-nowrap -mb-[10vw]">
          TEXTURES MATERIALS FINISHES
        </h2>
      </div>
    </div>
  );
};
