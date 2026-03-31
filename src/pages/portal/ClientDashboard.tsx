import React from 'react';
import { 
  CheckCircle2, Clock, CreditCard, 
  MessageSquare, FileText, ArrowRight,
  ChevronRight, Building2, HardHat
} from 'lucide-react';
import { Card, Badge, cn } from '../../components/SharedUI';
import { MOCK_TIMELINE } from '../../mocks';

export const ClientDashboard = () => {
  const currentStep = MOCK_TIMELINE.find(s => s.status === 'current');

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-secondary tracking-tighter mb-2">My Project</h1>
          <p className="text-secondary/60 font-medium tracking-tight">Standard House Construction • <span className="text-primary">PRJ-001</span></p>
        </div>
        <button className="btn-primary py-4 px-8">
          <MessageSquare className="w-5 h-5" /> Contact Manager
        </button>
      </div>

      {/* Status Tracker */}
      <Card className="p-8 md:p-12 bg-secondary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <Building2 className="w-full h-full scale-150 translate-x-1/4 translate-y-1/4" />
        </div>
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
            <div>
              <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-2">Current Phase</p>
              <h3 className="text-3xl md:text-4xl font-black tracking-tighter mb-4 italic">{currentStep?.title}</h3>
              <p className="text-white/60 font-medium max-w-md">{currentStep?.description}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-2">Estimated Completion</p>
              <p className="text-3xl font-black tracking-tight">Sept 2026</p>
            </div>
          </div>

          <div className="relative pt-12 pb-4">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2 rounded-full overflow-hidden">
              <div className="w-2/5 h-full bg-primary rounded-full"></div>
            </div>
            <div className="relative flex justify-between">
              {['Planning', 'Permits', 'Foundation', 'Structure', 'Finishing'].map((step, i) => (
                <div key={i} className="flex flex-col items-center gap-4">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center border-4 border-secondary transition-all duration-500",
                    i < 2 ? "bg-primary text-white" : i === 2 ? "bg-white text-secondary animate-pulse" : "bg-white/10 text-white/20"
                  )}>
                    {i < 2 ? <CheckCircle2 className="w-5 h-5" /> : <span className="text-xs font-black">{i + 1}</span>}
                  </div>
                  <span className={cn(
                    "text-[10px] font-black uppercase tracking-widest",
                    i <= 2 ? "text-white" : "text-white/20"
                  )}>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Project Summary */}
        <Card className="lg:col-span-2 space-y-8">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-black text-secondary">Project Details</h3>
            <button className="text-xs font-black text-primary uppercase tracking-widest hover:underline">Edit Details</button>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-black text-secondary/30 uppercase tracking-widest mb-2">Property Info</p>
                <div className="space-y-2">
                  <p className="text-sm font-bold text-secondary flex justify-between">Area: <span className="text-secondary/60">120 sqm</span></p>
                  <p className="text-sm font-bold text-secondary flex justify-between">Location: <span className="text-secondary/60">Orion, Bataan</span></p>
                  <p className="text-sm font-bold text-secondary flex justify-between">Type: <span className="text-secondary/60">Residential</span></p>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-black text-secondary/30 uppercase tracking-widest mb-2">Selected Finishes</p>
                <div className="flex flex-wrap gap-2">
                  <Badge>Modern Minimalist</Badge>
                  <Badge>Polished Marble</Badge>
                  <Badge>Cove Lighting</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-black text-secondary/30 uppercase tracking-widest mb-2">Financial Summary</p>
                <div className="space-y-2">
                  <p className="text-sm font-bold text-secondary flex justify-between">Total Contract: <span className="text-secondary/60">₱3,000,000</span></p>
                  <p className="text-sm font-bold text-secondary flex justify-between">Paid to Date: <span className="text-green-600">₱750,000</span></p>
                  <p className="text-sm font-bold text-secondary flex justify-between">Balance: <span className="text-primary font-black">₱2,250,000</span></p>
                </div>
              </div>
              <button className="w-full py-4 bg-background border border-secondary/5 rounded-xl text-sm font-black text-secondary hover:bg-secondary/5 transition-all flex items-center justify-center gap-2">
                <CreditCard className="w-5 h-5" /> View Payment Schedule
              </button>
            </div>
          </div>
        </Card>

        {/* Quick Actions / Messages */}
        <div className="space-y-8">
          <Card className="bg-primary/5 border-primary/10">
            <h4 className="text-sm font-black text-secondary uppercase tracking-widest mb-6">Recent Messages</h4>
            <div className="space-y-4">
              {[1, 2].map(i => (
                <div key={i} className="flex gap-3 pb-4 border-b border-primary/10 last:border-0 last:pb-0">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                    <HardHat className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-secondary">Engr. Mark Santos</p>
                    <p className="text-[10px] text-secondary/60 font-medium line-clamp-1">The soil test results are in. We can proceed with...</p>
                    <p className="text-[10px] font-bold text-primary mt-1">2 hours ago</p>
                  </div>
                </div>
              ))}
              <button className="w-full text-center text-[10px] font-black text-primary uppercase tracking-widest pt-2 hover:underline">Open Message Center</button>
            </div>
          </Card>

          <Card>
            <h4 className="text-sm font-black text-secondary uppercase tracking-widest mb-6">Next Milestone</h4>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-black text-secondary">Permit Approval</p>
                <p className="text-[10px] font-bold text-secondary/40">Expected: April 15, 2026</p>
              </div>
            </div>
            <div className="p-4 bg-background rounded-xl border border-secondary/5">
              <p className="text-[10px] font-bold text-secondary/60 italic leading-relaxed">"We are currently waiting for the final signature from the local building office."</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
