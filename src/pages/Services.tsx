import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const PremiumSlider = ({ 
  items, 
  onAction, 
  onImageClick,
  actionLabel = "Add to Estimate" 
}: { 
  items: any[], 
  onAction?: (item: any) => void,
  onImageClick?: (item: any) => void,
  actionLabel?: string
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % items.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <div className="relative min-h-[500px] md:min-h-[600px] flex flex-col md:flex-row items-stretch md:items-center gap-6 md:gap-12 lg:gap-20 py-8 md:py-12">
      {/* Image Slider - Top on mobile, Right on tablet/desktop */}
      <div className="w-full md:w-1/2 lg:w-3/5 relative h-[280px] sm:h-[380px] md:h-[600px] lg:h-[700px] flex items-center justify-center order-1 md:order-2">
        <motion.div 
          className="relative w-full h-full flex items-center cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) {
              next();
            } else if (swipe > swipeConfidenceThreshold) {
              prev();
            }
          }}
        >
          <AnimatePresence mode="popLayout">
            {items.map((item, index) => {
              // Calculate relative position
              let position = index - currentIndex;
              if (position < -1) position += items.length;
              if (position > items.length - 2) position -= items.length;

              // Only show a few items for performance and clarity
              if (Math.abs(position) > 2) return null;

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: 200, scale: 0.8 }}
                  animate={{ 
                    opacity: position === 0 ? 1 : 0.4, 
                    x: position * (window.innerWidth < 768 ? 60 : 120), 
                    scale: position === 0 ? 1 : 0.85,
                    zIndex: 10 - Math.abs(position),
                    filter: position === 0 ? 'blur(0px)' : 'blur(4px)',
                  }}
                  exit={{ opacity: 0, x: -200, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  className={`absolute h-[95%] rounded-[1.5rem] sm:rounded-[2.5rem] md:rounded-[3rem] lg:rounded-[4rem] overflow-hidden shadow-2xl shadow-secondary/20 border-4 border-white cursor-pointer group select-none`}
                  style={{ 
                    width: window.innerWidth < 640 ? '90%' : '80%',
                    left: window.innerWidth < 640 ? '5%' : '10%',
                  }}
                  onClick={() => {
                    if (position === 0) {
                      onImageClick?.(item);
                    } else {
                      setCurrentIndex(index);
                    }
                  }}
                >
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 pointer-events-none" 
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="w-full md:w-1/2 lg:w-2/5 z-20 order-2 md:order-1 px-4 sm:px-8 md:px-0">
        <div className="flex items-start gap-4 lg:gap-12">
          {/* Vertical Indicators - Tablet/Desktop only */}
          <div className="hidden md:flex flex-col items-center gap-4 py-2">
            {items.map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <button 
                  className={`w-3 h-3 lg:w-4 lg:h-4 rounded-full transition-all duration-500 border-2 ${i === currentIndex ? 'bg-primary border-primary scale-125 shadow-lg shadow-primary/40' : 'bg-transparent border-secondary/10 hover:border-primary/40'}`}
                  onClick={() => setCurrentIndex(i)}
                />
                {i < items.length - 1 && <div className="w-[2px] h-8 lg:h-10 bg-secondary/5" />}
              </div>
            ))}
          </div>

          <div className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4, ease: "circOut" }}
              >
                <div className="flex items-center gap-3 mb-3 lg:mb-6">
                  <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">
                    {items[currentIndex].category}
                  </span>
                  <div className="h-[1px] w-8 lg:w-12 bg-primary/30" />
                </div>
                
                <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-8xl font-black text-secondary mb-3 lg:mb-8 tracking-tighter leading-[0.9] italic">
                  {items[currentIndex].title.split(' ').map((word: string, i: number) => (
                    <span key={i} className="inline lg:block mr-2 lg:mr-0">{word}</span>
                  ))}
                </h2>
                
                <p className="text-xs sm:text-base lg:text-xl text-secondary/60 mb-4 lg:mb-10 font-medium leading-relaxed max-w-md">
                  {items[currentIndex].description}
                </p>
                
                <div className="flex flex-wrap items-center gap-4 lg:gap-6">
                  <button 
                    className="btn-primary px-5 lg:px-10 py-2.5 lg:py-5 text-xs sm:text-base lg:text-lg"
                    onClick={() => onAction?.(items[currentIndex])}
                  >
                    {actionLabel}
                  </button>
                  {items[currentIndex].price && (
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-secondary/30 uppercase tracking-widest">Starting at</span>
                      <span className="text-lg lg:text-3xl font-black text-secondary tracking-tight">{items[currentIndex].price}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="flex gap-3 mt-6 lg:mt-12 md:pl-8 lg:pl-16">
              <button onClick={prev} className="w-10 h-10 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl border border-secondary/10 flex items-center justify-center hover:bg-secondary hover:text-white transition-all group">
                <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6 group-hover:-translate-x-1 transition-transform" />
              </button>
              <button onClick={next} className="w-10 h-10 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl border border-secondary/10 flex items-center justify-center hover:bg-secondary hover:text-white transition-all group">
                <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import { SERVICES } from '../data';

export const ServicesPage = ({ openModal, onAction }: { openModal: (item: any) => void, onAction: (item: any) => void }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }} 
    animate={{ opacity: 1, y: 0 }} 
    exit={{ opacity: 0 }}
    className="pt-48 pb-32 overflow-hidden"
  >
    <div className="max-w-7xl mx-auto px-6">
      <div className="mb-20">
        <div className="badge bg-primary/10 text-primary border border-primary/20 mb-6">Service Catalog</div>
        <h1 className="text-5xl md:text-7xl font-black text-secondary mb-8 tracking-tighter">Construction Solutions</h1>
        <p className="text-xl text-secondary/60 max-w-2xl font-medium">Comprehensive packages tailored to your specific building needs.</p>
      </div>

      <PremiumSlider 
        items={SERVICES} 
        actionLabel="Add to Estimate"
        onImageClick={openModal}
        onAction={onAction}
      />
    </div>
  </motion.div>
);
