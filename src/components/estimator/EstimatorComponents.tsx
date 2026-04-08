import React from 'react';
import { Classification, ProjectType, ADDITIONAL_SERVICES } from '../../types/estimator';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '../SharedUI';

export const ClassificationSelect = ({ 
  value, 
  onChange 
}: { 
  value: Classification, 
  onChange: (val: Classification) => void 
}) => (
  <div className="space-y-2">
    <label className="text-sm font-bold text-secondary/60">Classification</label>
    <div className="relative">
      <select 
        value={value}
        onChange={(e) => onChange(e.target.value as Classification)}
        className="w-full appearance-none bg-white border border-secondary/10 rounded-xl px-4 py-3.5 text-secondary font-bold focus:outline-none focus:border-primary transition-all cursor-pointer"
      >
        <option value="Residential">Residential</option>
        <option value="Commercial">Commercial</option>
      </select>
      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary/40 pointer-events-none" />
    </div>
  </div>
);

export const TypeSelect = ({ 
  value, 
  onChange 
}: { 
  value: ProjectType, 
  onChange: (val: ProjectType) => void 
}) => (
  <div className="space-y-2">
    <label className="text-sm font-bold text-secondary/60">Type</label>
    <div className="relative">
      <select 
        value={value}
        onChange={(e) => onChange(e.target.value as ProjectType)}
        className="w-full appearance-none bg-white border border-secondary/10 rounded-xl px-4 py-3.5 text-secondary font-bold focus:outline-none focus:border-primary transition-all cursor-pointer"
      >
        <option value="Ground Up Construction">Ground Up Construction</option>
        <option value="Renovation">Renovation</option>
        <option value="Extension">Extension</option>
        <option value="Fit-Out">Fit-Out</option>
      </select>
      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary/40 pointer-events-none" />
    </div>
  </div>
);

export const LotAreaSlider = ({ 
  value, 
  onChange 
}: { 
  value: number, 
  onChange: (val: number) => void 
}) => (
  <div className="space-y-4">
    <div className="flex justify-between items-center">
      <label className="text-sm font-bold text-secondary/60">Lot Area</label>
      <div className="bg-secondary/5 px-3 py-1 rounded-lg">
        <span className="text-sm font-black text-secondary">{value} sqm</span>
      </div>
    </div>
    <input 
      type="range" 
      min="50" 
      max="1000" 
      step="10"
      value={value}
      onChange={(e) => onChange(parseInt(e.target.value))}
      className="w-full accent-primary h-1.5 bg-secondary/5 rounded-lg appearance-none cursor-pointer"
    />
    <div className="flex justify-between text-[10px] font-black text-secondary/30 uppercase tracking-widest">
      <span>50 sqm</span>
      <span>1,000 sqm</span>
    </div>
  </div>
);

export const StoreyInput = ({ 
  value, 
  onChange 
}: { 
  value: number, 
  onChange: (val: number) => void 
}) => (
  <div className="space-y-2">
    <label className="text-sm font-bold text-secondary/60">Number of Storeys</label>
    <input 
      type="number" 
      min="1" 
      max="10"
      value={value}
      onChange={(e) => onChange(Math.max(1, parseInt(e.target.value) || 1))}
      className="w-full bg-white border border-secondary/10 rounded-xl px-4 py-3.5 text-secondary font-bold focus:outline-none focus:border-primary transition-all"
    />
  </div>
);

export const AdditionalServices = ({ 
  selected, 
  onToggle 
}: { 
  selected: string[], 
  onToggle: (id: string) => void 
}) => (
  <div className="space-y-4">
    <div>
      <h4 className="text-sm font-bold text-secondary">Additional Services</h4>
      <p className="text-xs text-secondary/40">Cost to be included in the formal quotation</p>
    </div>
    <div className="space-y-3">
      {ADDITIONAL_SERVICES.map((service) => (
        <label 
          key={service.id} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative flex items-center justify-center">
            <input 
              type="checkbox" 
              className="peer sr-only"
              checked={selected.includes(service.id)}
              onChange={() => onToggle(service.id)}
            />
            <div className="w-5 h-5 border-2 border-secondary/10 rounded-md transition-all peer-checked:bg-primary peer-checked:border-primary group-hover:border-primary/50 flex items-center justify-center">
              <Check className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
            </div>
          </div>
          <span className="text-sm font-bold text-secondary/70 group-hover:text-secondary transition-colors">
            {service.label}
          </span>
        </label>
      ))}
    </div>
  </div>
);

export const CostSummaryCard = ({ 
  formattedCost 
}: { 
  formattedCost: string 
}) => (
  <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-xl shadow-secondary/5 border border-secondary/5 h-full flex flex-col">
    <div className="mb-8">
      <h3 className="text-lg font-bold text-secondary/60 mb-2">Total Design Cost</h3>
      <div className="text-4xl md:text-5xl font-black text-secondary tracking-tighter">
        {formattedCost}
      </div>
      <p className="text-xs text-secondary/40 mt-4 leading-relaxed font-medium">
        Design Cost is calculated based on the computed Floor Area and project complexity.
      </p>
    </div>

    <div className="mt-auto pt-10 border-t border-secondary/5">
      <h4 className="text-xl font-black text-secondary mb-2">Ready to design your dream space?</h4>
      <p className="text-sm text-secondary/60 mb-8 font-medium">Get a formal quotation today!</p>
      
      <button className="w-full bg-primary hover:bg-primary/90 text-white font-black py-4 rounded-2xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98]">
        Get Quotation
      </button>
    </div>
  </div>
);
