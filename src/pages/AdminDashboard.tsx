import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Clock, FileText, RefreshCcw, LayoutDashboard } from 'lucide-react';

interface Lead {
  id: number;
  timestamp: string;
  projectDetails: string;
  recipientEmail: string;
  source: string;
}

export const AdminDashboard = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/leads');
      const data = await response.json();
      setLeads(data.sort((a: Lead, b: Lead) => b.id - a.id));
    } catch (error) {
      console.error("Failed to fetch leads:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="pt-40 pb-32 min-h-screen bg-[#F9FAFB]"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full border border-secondary/20 mb-6">
              <LayoutDashboard className="w-4 h-4" />
              <span className="text-xs font-black uppercase tracking-widest">Admin Panel</span>
            </div>
            <h1 className="text-5xl font-black text-secondary tracking-tighter">
              Project Leads
            </h1>
          </div>
          <button 
            onClick={fetchLeads}
            className="flex items-center gap-2 bg-white border border-secondary/10 px-6 py-3 rounded-xl font-bold text-secondary hover:bg-secondary/5 transition-all"
          >
            <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : leads.length === 0 ? (
          <div className="bg-white rounded-[2rem] p-20 text-center border border-secondary/5 shadow-xl">
            <div className="w-20 h-20 bg-secondary/5 rounded-3xl flex items-center justify-center text-secondary/20 mx-auto mb-6">
              <FileText className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-secondary mb-2">No leads found</h3>
            <p className="text-secondary/40 font-medium">New project requests will appear here.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {leads.map((lead) => (
              <motion.div 
                key={lead.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[2rem] p-8 border border-secondary/5 shadow-xl hover:shadow-2xl transition-all"
              >
                <div className="flex flex-col md:flex-row justify-between gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="bg-primary/10 text-primary px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">
                        {lead.source.includes('design') ? 'Estimator' : 'Quote Page'}
                      </div>
                      <div className="flex items-center gap-2 text-secondary/40 text-xs font-bold">
                        <Clock className="w-3 h-3" />
                        {new Date(lead.timestamp).toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-secondary/5 rounded-2xl p-6 whitespace-pre-wrap text-secondary/70 font-medium text-sm leading-relaxed">
                      {lead.projectDetails}
                    </div>
                  </div>
                  <div className="md:w-64 shrink-0">
                    <div className="bg-secondary/5 rounded-2xl p-6 h-full flex flex-col justify-center">
                      <p className="text-[10px] font-black text-secondary/30 uppercase tracking-widest mb-2">Recipient</p>
                      <div className="flex items-center gap-2 text-secondary font-bold text-sm break-all">
                        <Mail className="w-4 h-4 text-primary shrink-0" />
                        {lead.recipientEmail}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};
