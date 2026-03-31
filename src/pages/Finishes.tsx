import React from 'react';
import { motion } from 'motion/react';
import { FINISHES } from '../data';
import { PremiumSlider } from './Services';

export const FinishesPage = ({ openModal, onAction }: { openModal: (item: any) => void, onAction: (item: any) => void }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }} 
    animate={{ opacity: 1, y: 0 }} 
    exit={{ opacity: 0 }}
    className="pt-48 pb-32 overflow-hidden"
  >
    <div className="max-w-7xl mx-auto px-6">
      <div className="mb-20">
        <div className="badge bg-primary/10 text-primary border border-primary/20 mb-6">Finish Selector</div>
        <h1 className="text-5xl md:text-7xl font-black text-secondary mb-8 tracking-tighter">Curated Styles</h1>
        <p className="text-xl text-secondary/60 max-w-2xl font-medium">Select the perfect finishes to bring your vision to life.</p>
      </div>

      <PremiumSlider 
        items={FINISHES} 
        actionLabel="Select Style"
        onImageClick={openModal}
        onAction={onAction}
      />
    </div>
  </motion.div>
);
