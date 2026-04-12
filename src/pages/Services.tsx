import React from 'react';
import { motion } from 'motion/react';
import { Plus, ArrowUpRight, Sparkles, Shield, Zap, Activity } from 'lucide-react';
import { SERVICES } from '../data';

interface ServiceCardProps {
  item: any;
  index: number;
  onAction: (item: any) => void;
  openModal: (item: any) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ item, index, onAction, openModal }) => {
  // Determine grid span based on index for a bento effect
  const isLarge = index === 0 || index === 3;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`group relative overflow-hidden rounded-[2rem] bg-white border border-secondary/5 shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 ${isLarge ? 'md:col-span-2 md:row-span-2' : 'col-span-1'}`}
    >
      <div className="absolute inset-0 z-0">
        <img 
          src={item.img} 
          alt={item.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-primary/20 backdrop-blur-md border border-primary/30 rounded-full text-[10px] font-black text-white uppercase tracking-widest">
            {item.category}
          </span>
          {isLarge && (
            <span className="flex items-center gap-1 text-[10px] font-black text-primary uppercase tracking-widest bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
              <Sparkles className="w-3 h-3" /> Featured
            </span>
          )}
        </div>

        <h3 className={`font-black text-white tracking-tighter mb-3 leading-none ${isLarge ? 'text-3xl md:text-5xl' : 'text-2xl'}`}>
          {item.title}
        </h3>
        
        <p className={`text-white/70 font-medium mb-6 line-clamp-2 transition-all duration-500 group-hover:text-white ${isLarge ? 'text-lg max-w-md' : 'text-sm'}`}>
          {item.description}
        </p>

        <div className="flex items-center justify-between gap-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Starting at</span>
            <span className="text-xl font-black text-white">{item.price}</span>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => openModal(item)}
              className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-secondary transition-all"
            >
              <ArrowUpRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => onAction(item)}
              className="px-6 h-12 rounded-xl bg-primary text-white font-black text-sm flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const ServicesPage = ({ openModal, onAction }: { openModal: (item: any) => void, onAction: (item: any) => void }) => {
  return (
    <div className="pt-48 pb-32 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full border border-primary/20 mb-6"
            >
              <Shield className="w-4 h-4" />
              <span className="text-xs font-black uppercase tracking-widest">Service Catalog</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-black text-secondary mb-8 tracking-tighter leading-[0.9]"
            >
              Building the <br /><span className="text-primary">Future.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-secondary/60 font-medium"
            >
              From foundation to finishing touches, we provide comprehensive construction solutions tailored to your vision.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex gap-4"
          >
            <div className="flex flex-col items-center gap-1">
              <div className="w-14 h-14 rounded-2xl bg-white shadow-xl flex items-center justify-center text-primary border border-secondary/5">
                <Zap className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black text-secondary/30 uppercase tracking-widest">Fast</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-14 h-14 rounded-2xl bg-white shadow-xl flex items-center justify-center text-primary border border-secondary/5">
                <Shield className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black text-secondary/30 uppercase tracking-widest">Secure</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-14 h-14 rounded-2xl bg-white shadow-xl flex items-center justify-center text-primary border border-secondary/5">
                <Activity className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black text-secondary/30 uppercase tracking-widest">Reliable</span>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {SERVICES.map((service, index) => (
            <ServiceCard 
              key={service.id} 
              item={service} 
              index={index} 
              onAction={onAction}
              openModal={openModal}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
