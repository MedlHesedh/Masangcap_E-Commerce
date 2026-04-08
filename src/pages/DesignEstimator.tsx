import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useDesignEstimator } from '../hooks/useDesignEstimator';
import { 
  ClassificationSelect, 
  TypeSelect, 
  LotAreaSlider, 
  StoreyInput, 
  AdditionalServices, 
  CostSummaryCard 
} from '../components/estimator/EstimatorComponents';
import { SuccessModal } from '../components/estimator/SuccessModal';
import { Calculator } from 'lucide-react';
import { ADDITIONAL_SERVICES } from '../types/estimator';

const DesignEstimator = () => {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const { 
    state, 
    setClassification, 
    setType, 
    setLotArea, 
    setStoreys, 
    toggleAdditionalService, 
    formattedCost 
  } = useDesignEstimator();

  const projectDetails = `
- Classification: ${state.classification}
- Project Type: ${state.type}
- Lot Area: ${state.lotArea} sqm
- Number of Storeys: ${state.storeys}
- Additional Services: ${state.additionalServices.length > 0 
    ? state.additionalServices.map(id => ADDITIONAL_SERVICES.find(s => s.id === id)?.label).join(', ') 
    : 'None'}
- Estimated Design Cost: ${formattedCost}
  `.trim();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0 }}
      className="pt-40 pb-32 min-h-screen bg-[#F9FAFB]"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full border border-primary/20 mb-6">
            <Calculator className="w-4 h-4" />
            <span className="text-xs font-black uppercase tracking-widest">Phase 3 Module</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-secondary tracking-tighter mb-4">
            Design Cost Calculator
          </h1>
          <p className="text-xl text-secondary/50 max-w-2xl font-medium">
            Estimate the professional design fees for your next project with our transparent pricing model.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Side: Inputs */}
          <div className="lg:col-span-7 space-y-10">
            <div className="grid sm:grid-cols-2 gap-8">
              <ClassificationSelect 
                value={state.classification} 
                onChange={setClassification} 
              />
              <TypeSelect 
                value={state.type} 
                onChange={setType} 
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-8 items-end">
              <LotAreaSlider 
                value={state.lotArea} 
                onChange={setLotArea} 
              />
              <StoreyInput 
                value={state.storeys} 
                onChange={setStoreys} 
              />
            </div>

            <div className="pt-6">
              <AdditionalServices 
                selected={state.additionalServices} 
                onToggle={toggleAdditionalService} 
              />
            </div>
          </div>

          {/* Right Side: Summary Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-40">
            <CostSummaryCard 
              formattedCost={formattedCost} 
              onQuotation={() => setIsSuccessModalOpen(true)}
            />
          </div>
        </div>
      </div>

      <SuccessModal 
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        projectDetails={projectDetails}
        recipientEmail="medlmasangcapbusiness@gmail.com"
      />
    </motion.div>
  );
};

export default DesignEstimator;
