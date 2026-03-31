import React from 'react';
import { 
  CheckCircle2, Clock, Calendar, 
  MapPin, HardHat, Building2, 
  ChevronRight, AlertCircle
} from 'lucide-react';
import { Card, Badge, cn } from '../../components/SharedUI';
import { MOCK_TIMELINE } from '../../mocks';

export const ClientTimeline = () => {
  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-secondary tracking-tighter mb-2">Project Timeline</h1>
          <p className="text-secondary/60 font-medium">Track the progress of your construction step-by-step.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-[10px] font-black text-secondary/30 uppercase tracking-widest mb-1">Overall Progress</p>
            <p className="text-2xl font-black text-primary">42%</p>
          </div>
          <div className="w-16 h-16 rounded-full border-4 border-secondary/5 flex items-center justify-center relative">
            <svg className="w-full h-full -rotate-90">
              <circle 
                cx="32" cy="32" r="28" 
                fill="transparent" 
                stroke="currentColor" 
                strokeWidth="4" 
                className="text-primary"
                strokeDasharray={2 * Math.PI * 28}
                strokeDashoffset={2 * Math.PI * 28 * (1 - 0.42)}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-secondary">42%</span>
          </div>
        </div>
      </div>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-secondary/5 rounded-full hidden md:block"></div>

        <div className="space-y-12">
          {MOCK_TIMELINE.map((step, i) => (
            <div key={step.id} className="relative flex flex-col md:flex-row gap-8">
              {/* Timeline Marker */}
              <div className={cn(
                "w-16 h-16 rounded-3xl flex items-center justify-center z-10 shrink-0 transition-all duration-500 border-4 border-white shadow-xl",
                step.status === 'completed' ? "bg-green-500 text-white" :
                step.status === 'current' ? "bg-primary text-white animate-pulse" :
                "bg-white text-secondary/20 border-secondary/5"
              )}>
                {step.status === 'completed' ? <CheckCircle2 className="w-8 h-8" /> :
                 step.status === 'current' ? <Clock className="w-8 h-8" /> :
                 <Calendar className="w-8 h-8" />}
              </div>

              <Card className={cn(
                "flex-1 p-8 md:p-10 transition-all duration-500",
                step.status === 'current' ? "border-primary/20 shadow-xl shadow-primary/5 ring-1 ring-primary/10" : ""
              )}>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-black text-secondary tracking-tighter">{step.title}</h3>
                      <Badge variant={
                        step.status === 'completed' ? 'success' :
                        step.status === 'current' ? 'info' : 'default'
                      }>
                        {step.status}
                      </Badge>
                    </div>
                    <p className="text-sm font-bold text-secondary/40 flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> {step.date}
                    </p>
                  </div>
                  {step.status === 'current' && (
                    <div className="flex items-center gap-3 px-4 py-2 bg-primary/10 rounded-xl text-primary">
                      <AlertCircle className="w-5 h-5" />
                      <span className="text-xs font-black uppercase tracking-widest">In Progress</span>
                    </div>
                  )}
                </div>

                <p className="text-lg text-secondary/60 font-medium leading-relaxed mb-8">{step.description}</p>

                <div className="grid sm:grid-cols-3 gap-6 pt-8 border-t border-secondary/5">
                  <div>
                    <p className="text-[10px] font-black text-secondary/30 uppercase tracking-widest mb-2">Responsible</p>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary/5 flex items-center justify-center text-secondary">
                        <HardHat className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-secondary">Project Manager</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-secondary/30 uppercase tracking-widest mb-2">Location</p>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary/5 flex items-center justify-center text-secondary">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-secondary">On-Site</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-secondary/30 uppercase tracking-widest mb-2">Deliverables</p>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary/5 flex items-center justify-center text-secondary">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-secondary">2 Documents</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
