import { useState, useMemo } from 'react';
import { 
  EstimatorState, 
  Classification, 
  ProjectType, 
  DESIGN_RATES, 
  ADDITIONAL_SERVICES 
} from '../types/estimator';

export const useDesignEstimator = () => {
  const [state, setState] = useState<EstimatorState>({
    classification: 'Residential',
    type: 'Ground Up Construction',
    lotArea: 50,
    storeys: 1,
    additionalServices: [],
  });

  const setClassification = (classification: Classification) => 
    setState(prev => ({ ...prev, classification }));

  const setType = (type: ProjectType) => 
    setState(prev => ({ ...prev, type }));

  const setLotArea = (lotArea: number) => 
    setState(prev => ({ ...prev, lotArea }));

  const setStoreys = (storeys: number) => 
    setState(prev => ({ ...prev, storeys }));

  const toggleAdditionalService = (serviceId: string) => {
    setState(prev => {
      const isSelected = prev.additionalServices.includes(serviceId);
      const newServices = isSelected
        ? prev.additionalServices.filter(id => id !== serviceId)
        : [...prev.additionalServices, serviceId];
      return { ...prev, additionalServices: newServices };
    });
  };

  const totalCost = useMemo(() => {
    const baseRate = DESIGN_RATES[state.classification][state.type];
    const areaCost = state.lotArea * baseRate;
    
    // Storey multiplier: Each storey adds 5% to the area cost
    const storeyMultiplier = 1 + (state.storeys - 1) * 0.05;
    const adjustedAreaCost = areaCost * storeyMultiplier;

    const servicesCost = state.additionalServices.reduce((acc, id) => {
      const service = ADDITIONAL_SERVICES.find(s => s.id === id);
      return acc + (service?.price || 0);
    }, 0);

    return adjustedAreaCost + servicesCost;
  }, [state]);

  const formattedCost = new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 0,
  }).format(totalCost);

  return {
    state,
    setClassification,
    setType,
    setLotArea,
    setStoreys,
    toggleAdditionalService,
    totalCost,
    formattedCost,
  };
};
