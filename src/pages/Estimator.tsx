import React from 'react';
import { motion } from 'motion/react';
import { useProject } from '../context/ProjectContext';

export const EstimatorPage = ({ onComplete }: { onComplete: () => void }) => {
  const { state, dispatch } = useProject();

  const calculateEstimate = () => {
    const baseRates: Record<string, number> = {
      'Standard': 25000,
      'Premium': 35000,
      'Luxury': 55000,
      'Industrial': 30000
    };
    const finishMultipliers: Record<string, number> = {
      'Bare': 0.7,
      'Semi-Finished': 0.85,
      'Fully Finished': 1.0
    };
    
    const total = state.area * baseRates[state.constructionType] * finishMultipliers[state.finishLevel];
    return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(total);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0 }}
      className="pt-48 pb-32"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7">
            <div className="badge bg-primary/10 text-primary border border-primary/20 mb-6">Project Estimator</div>
            <h1 className="text-5xl font-black text-secondary mb-8 tracking-tighter">Calculate Your Build</h1>
            
            <div className="space-y-12 mt-16">
              {/* Area Input */}
              <div>
                <label className="block text-sm font-black text-secondary/40 uppercase tracking-widest mb-6">Project Area (sqm)</label>
                <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-8">
                  <input 
                    type="range" 
                    min="20" 
                    max="1000" 
                    value={state.area} 
                    onChange={(e) => dispatch({ type: 'SET_AREA', payload: parseInt(e.target.value) || 0 })}
                    className="w-full accent-primary h-2 bg-secondary/5 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="relative">
                      <input 
                        type="number"
                        value={state.area}
                        onChange={(e) => dispatch({ type: 'SET_AREA', payload: Math.max(0, parseInt(e.target.value) || 0) })}
                        className="w-28 md:w-36 text-3xl md:text-4xl font-black text-secondary tabular-nums bg-white border border-secondary/10 rounded-xl px-4 py-2 focus:outline-none focus:border-primary transition-all text-center shadow-sm"
                      />
                    </div>
                    <span className="text-[10px] md:text-xs font-black text-secondary/40 uppercase tracking-widest">sqm</span>
                  </div>
                </div>
              </div>

              {/* Construction Type */}
              <div>
                <label className="block text-sm font-black text-secondary/40 uppercase tracking-widest mb-6">Construction Type</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {['Standard', 'Premium', 'Luxury', 'Industrial'].map(t => (
                    <button 
                      key={t}
                      onClick={() => dispatch({ type: 'SET_CONSTRUCTION_TYPE', payload: t })}
                      className={`py-4 rounded-xl font-bold text-sm transition-all border ${state.constructionType === t ? 'bg-secondary text-white border-secondary shadow-xl' : 'bg-white text-secondary/60 border-secondary/5 hover:border-primary'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Finish Level */}
              <div>
                <label className="block text-sm font-black text-secondary/40 uppercase tracking-widest mb-6">Finish Level</label>
                <div className="grid grid-cols-3 gap-4">
                  {['Bare', 'Semi-Finished', 'Fully Finished'].map(f => (
                    <button 
                      key={f}
                      onClick={() => dispatch({ type: 'SET_FINISH_LEVEL', payload: f })}
                      className={`py-4 rounded-xl font-bold text-sm transition-all border ${state.finishLevel === f ? 'bg-secondary text-white border-secondary shadow-xl' : 'bg-white text-secondary/60 border-secondary/5 hover:border-primary'}`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl md:rounded-[2rem] border border-secondary/5 shadow-xl shadow-secondary/5 p-8 md:p-12 sticky top-32 md:top-48">
              <h3 className="text-xl md:text-2xl font-black mb-6 md:mb-8">Estimate Summary</h3>
              <div className="space-y-4 md:space-y-6 mb-8 md:mb-12">
                <div className="flex justify-between items-center py-3 md:py-4 border-b border-secondary/5">
                  <span className="font-bold text-secondary/60 text-sm md:text-base">Base Construction</span>
                  <span className="font-black text-secondary text-sm md:text-base">{state.constructionType}</span>
                </div>
                <div className="flex justify-between items-center py-3 md:py-4 border-b border-secondary/5">
                  <span className="font-bold text-secondary/60 text-sm md:text-base">Total Floor Area</span>
                  <span className="font-black text-secondary text-sm md:text-base">{state.area} sqm</span>
                </div>
                <div className="flex justify-between items-center py-3 md:py-4 border-b border-secondary/5">
                  <span className="font-bold text-secondary/60 text-sm md:text-base">Finish Quality</span>
                  <span className="font-black text-secondary text-sm md:text-base">{state.finishLevel}</span>
                </div>
              </div>
              
              <div className="mb-8 md:mb-12">
                <p className="text-[10px] font-black text-secondary/40 uppercase tracking-widest mb-2">Estimated Total Cost</p>
                <p className="text-3xl md:text-5xl font-black text-primary tracking-tighter">{calculateEstimate()}</p>
                <p className="text-[10px] text-secondary/40 mt-4 font-medium italic">*This is a preliminary estimate and may vary based on site conditions and material fluctuations.</p>
              </div>

              <button 
                onClick={onComplete}
                className="w-full btn-primary py-4 md:py-5"
              >
                Proceed to Project Summary
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
