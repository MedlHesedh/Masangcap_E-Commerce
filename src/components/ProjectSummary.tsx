import React from 'react';
import { 
  X, Trash2, Plus, Minus, 
  ArrowRight, Calculator, 
  Building2, HardHat, Ruler,
  CheckCircle2, AlertCircle
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';
import { Card, Badge, cn } from './SharedUI';
import { motion, AnimatePresence } from 'motion/react';

export const ProjectSummary = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const { state, dispatch } = useProject();

  const calculateTotal = () => {
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
    
    let total = state.area * baseRates[state.constructionType] * finishMultipliers[state.finishLevel];
    
    state.selectedServices.forEach(s => {
      const price = parseInt(s.price.replace(/[^0-9]/g, '')) || 0;
      total += price;
    });

    return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(total);
  };

  const removeItem = (id: string | number, type: 'service' | 'finish') => {
    if (type === 'service') {
      dispatch({ type: 'REMOVE_SERVICE', payload: id });
    } else {
      dispatch({ type: 'REMOVE_FINISH', payload: id as string });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-secondary/80 backdrop-blur-xl"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col"
          >
            <div className="p-8 border-b border-secondary/5 flex justify-between items-center bg-background/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                  <Calculator className="text-white w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-secondary tracking-tighter">Project Summary</h3>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white border border-secondary/5 flex items-center justify-center text-secondary/40 hover:text-secondary transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
              {/* Project Configuration */}
              <section>
                <h4 className="text-[10px] font-black text-secondary/30 uppercase tracking-widest mb-4">Base Configuration</h4>
                <Card className="bg-background/50 border-secondary/5 p-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-[10px] font-black text-secondary/30 uppercase tracking-widest mb-1">Area</p>
                      <p className="text-xl font-black text-secondary">{state.area} sqm</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-secondary/30 uppercase tracking-widest mb-1">Type</p>
                      <p className="text-xl font-black text-secondary">{state.constructionType}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-secondary/30 uppercase tracking-widest mb-1">Finish</p>
                      <p className="text-xl font-black text-secondary">{state.finishLevel}</p>
                    </div>
                  </div>
                </Card>
              </section>

              {/* Selected Services */}
              <section>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-[10px] font-black text-secondary/30 uppercase tracking-widest">Selected Services</h4>
                  <Badge>{state.selectedServices.length} Items</Badge>
                </div>
                <div className="space-y-4">
                  {state.selectedServices.length === 0 ? (
                    <div className="p-8 border-2 border-dashed border-secondary/5 rounded-2xl text-center">
                      <p className="text-sm font-bold text-secondary/40">No services selected yet.</p>
                    </div>
                  ) : (
                    state.selectedServices.map(service => (
                      <div key={service.id} className="flex items-center gap-4 p-4 bg-background rounded-2xl border border-secondary/5 group">
                        <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                          <img src={service.img} alt={service.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="text-sm font-black text-secondary truncate">{service.title}</h5>
                          <p className="text-xs font-bold text-primary">{service.price}</p>
                        </div>
                        <button 
                          onClick={() => removeItem(service.id, 'service')}
                          className="p-2 text-secondary/20 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </section>

              {/* Selected Finishes */}
              <section>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-[10px] font-black text-secondary/30 uppercase tracking-widest">Selected Finishes</h4>
                  <Badge>{state.selectedFinishes.length} Items</Badge>
                </div>
                <div className="space-y-4">
                  {state.selectedFinishes.length === 0 ? (
                    <div className="p-8 border-2 border-dashed border-secondary/5 rounded-2xl text-center">
                      <p className="text-sm font-bold text-secondary/40">No finishes selected yet.</p>
                    </div>
                  ) : (
                    state.selectedFinishes.map(finish => (
                      <div key={finish.id} className="flex items-center gap-4 p-4 bg-background rounded-2xl border border-secondary/5 group">
                        <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                          <img src={finish.img} alt={finish.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="text-sm font-black text-secondary truncate">{finish.title}</h5>
                          <p className="text-xs font-bold text-secondary/40">{finish.category}</p>
                        </div>
                        <button 
                          onClick={() => removeItem(finish.id, 'finish')}
                          className="p-2 text-secondary/20 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </section>
            </div>

            <div className="p-8 border-t border-secondary/5 bg-background/50 space-y-6">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] font-black text-secondary/40 uppercase tracking-widest mb-1">Estimated Total</p>
                  <p className="text-4xl font-black text-primary tracking-tighter">{calculateTotal()}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-secondary/40 uppercase tracking-widest mb-1">Project ID</p>
                  <p className="text-sm font-black text-secondary">DRAFT-2026-001</p>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 btn-primary py-5 text-lg">
                  Submit Project Request <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              <p className="text-[10px] text-secondary/40 text-center font-medium italic">
                By submitting, you agree to our terms of service and privacy policy.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
