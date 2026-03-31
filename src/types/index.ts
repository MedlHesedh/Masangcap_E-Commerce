export interface Service {
  id: number | string;
  title: string;
  description: string;
  longDescription?: string;
  price: string;
  category: string;
  img: string;
  features?: string[];
}

export interface Finish {
  id: string;
  category: string;
  title: string;
  description: string;
  longDescription?: string;
  img: string;
  durability: string;
}

export interface ProjectState {
  area: number;
  constructionType: string;
  finishLevel: string;
  selectedServices: Service[];
  selectedFinishes: Finish[];
  selectedMaterials: any[];
  clientInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
  };
}

export type ProjectAction =
  | { type: 'SET_AREA'; payload: number }
  | { type: 'SET_CONSTRUCTION_TYPE'; payload: string }
  | { type: 'SET_FINISH_LEVEL'; payload: string }
  | { type: 'ADD_SERVICE'; payload: Service }
  | { type: 'REMOVE_SERVICE'; payload: number | string }
  | { type: 'ADD_FINISH'; payload: Finish }
  | { type: 'REMOVE_FINISH'; payload: string }
  | { type: 'UPDATE_CLIENT_INFO'; payload: Partial<ProjectState['clientInfo']> }
  | { type: 'RESET_PROJECT' };
