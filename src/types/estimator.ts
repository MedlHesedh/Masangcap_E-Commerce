export type Classification = 'Residential' | 'Commercial';

export type ProjectType = 'Ground Up Construction' | 'Renovation' | 'Extension' | 'Fit-Out';

export interface AdditionalService {
  id: string;
  label: string;
  price: number;
}

export interface EstimatorState {
  classification: Classification;
  type: ProjectType;
  lotArea: number;
  storeys: number;
  additionalServices: string[];
}

export const DESIGN_RATES: Record<Classification, Record<ProjectType, number>> = {
  Residential: {
    'Ground Up Construction': 150,
    'Renovation': 120,
    'Extension': 130,
    'Fit-Out': 100,
  },
  Commercial: {
    'Ground Up Construction': 200,
    'Renovation': 160,
    'Extension': 180,
    'Fit-Out': 140,
  },
};

export const ADDITIONAL_SERVICES: AdditionalService[] = [
  { id: 'signed-sealed', label: 'Signed and Sealed Construction Plans', price: 15000 },
  { id: 'permit-assist', label: 'Permit Application Assistance', price: 10000 },
  { id: 'rendering', label: '3D Rendering Package', price: 8000 },
  { id: 'site-visit', label: 'Site Assessment Visit', price: 5000 },
];
