import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { ProjectState, ProjectAction } from '../types';

const initialState: ProjectState = {
  area: 100,
  constructionType: 'Standard',
  finishLevel: 'Fully Finished',
  selectedServices: [],
  selectedFinishes: [],
  selectedMaterials: [],
  clientInfo: {
    name: '',
    email: '',
    phone: '',
    location: '',
  },
};

const projectReducer = (state: ProjectState, action: ProjectAction): ProjectState => {
  switch (action.type) {
    case 'SET_AREA':
      return { ...state, area: action.payload };
    case 'SET_CONSTRUCTION_TYPE':
      return { ...state, constructionType: action.payload };
    case 'SET_FINISH_LEVEL':
      return { ...state, finishLevel: action.payload };
    case 'ADD_SERVICE':
      if (state.selectedServices.some(s => s.id === action.payload.id)) return state;
      return { ...state, selectedServices: [...state.selectedServices, action.payload] };
    case 'REMOVE_SERVICE':
      return { ...state, selectedServices: state.selectedServices.filter(s => s.id !== action.payload) };
    case 'ADD_FINISH':
      if (state.selectedFinishes.some(f => f.id === action.payload.id)) return state;
      return { ...state, selectedFinishes: [...state.selectedFinishes, action.payload] };
    case 'REMOVE_FINISH':
      return { ...state, selectedFinishes: state.selectedFinishes.filter(f => f.id !== action.payload) };
    case 'UPDATE_CLIENT_INFO':
      return { ...state, clientInfo: { ...state.clientInfo, ...action.payload } };
    case 'RESET_PROJECT':
      return initialState;
    default:
      return state;
  }
};

const ProjectContext = createContext<{
  state: ProjectState;
  dispatch: React.Dispatch<ProjectAction>;
} | undefined>(undefined);

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(projectReducer, initialState, (initial) => {
    const localData = localStorage.getItem('structura_project_state');
    return localData ? JSON.parse(localData) : initial;
  });

  useEffect(() => {
    localStorage.setItem('structura_project_state', JSON.stringify(state));
  }, [state]);

  return (
    <ProjectContext.Provider value={{ state, dispatch }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};
