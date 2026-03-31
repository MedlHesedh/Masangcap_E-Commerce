import React, { useState } from 'react';
import { 
  Upload, FileText, Download, 
  Trash2, Search, Filter, 
  MoreVertical, X, CheckCircle2,
  AlertCircle, File
} from 'lucide-react';
import { Card, Badge, Table, cn } from '../../components/SharedUI';
import { MOCK_DOCUMENTS } from '../../mocks';
import { AnimatePresence, motion } from 'motion/react';

export const ClientDocuments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const filteredDocs = MOCK_DOCUMENTS.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-secondary tracking-tighter mb-2">Documents</h1>
          <p className="text-secondary/60 font-medium">Manage your project files and blueprints.</p>
        </div>
        <button 
          onClick={() => setIsUploadModalOpen(true)}
          className="btn-primary w-full md:w-auto py-4 px-8"
        >
          <Upload className="w-5 h-5" /> Upload Document
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary/30" />
          <input 
            type="text" 
            placeholder="Search documents..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-secondary/5 rounded-xl text-sm font-bold focus:outline-none focus:border-primary transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDocs.map((doc) => (
          <Card key={doc.id} className="group flex flex-col p-6 hover:border-primary/20 transition-all">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-2xl bg-secondary/5 flex items-center justify-center text-secondary group-hover:bg-primary/10 group-hover:text-primary transition-all">
                <FileText className="w-6 h-6" />
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-secondary/40 hover:text-primary transition-colors">
                  <Download className="w-5 h-5" />
                </button>
                <button className="p-2 text-secondary/40 hover:text-red-500 transition-colors">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <h3 className="text-lg font-black text-secondary mb-2 group-hover:text-primary transition-colors truncate">{doc.name}</h3>
            <div className="flex items-center gap-3 mb-6">
              <Badge variant="default">{doc.type}</Badge>
              <span className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest">{doc.size}</span>
            </div>

            <div className="mt-auto pt-6 border-t border-secondary/5 flex justify-between items-center">
              <span className="text-[10px] font-black text-secondary/30 uppercase tracking-widest">Uploaded on {doc.date}</span>
              <div className="flex items-center gap-1 text-green-600">
                <CheckCircle2 className="w-3 h-3" />
                <span className="text-[10px] font-black uppercase tracking-widest">Verified</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {isUploadModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsUploadModalOpen(false)}
              className="absolute inset-0 bg-secondary/80 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="p-8 border-b border-secondary/5 flex justify-between items-center bg-background/50">
                <h3 className="text-2xl font-black text-secondary tracking-tighter">Upload Document</h3>
                <button 
                  onClick={() => setIsUploadModalOpen(false)}
                  className="w-10 h-10 rounded-full bg-white border border-secondary/5 flex items-center justify-center text-secondary/40 hover:text-secondary transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-8 space-y-8">
                <div className="w-full p-12 border-2 border-dashed border-secondary/10 rounded-3xl flex flex-col items-center justify-center gap-6 hover:border-primary hover:bg-primary/5 transition-all cursor-pointer group">
                  <div className="w-20 h-20 rounded-[2rem] bg-secondary/5 flex items-center justify-center text-secondary/20 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                    <Upload className="w-10 h-10" />
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-black text-secondary mb-2">Drop your files here</p>
                    <p className="text-sm font-bold text-secondary/40">Support PDF, DWG, JPG, PNG (Max 50MB)</p>
                  </div>
                  <button className="btn-secondary py-3 px-8">Select Files</button>
                </div>

                <div className="space-y-4">
                  <label className="block text-[10px] font-black text-secondary/30 uppercase tracking-widest">Document Category</label>
                  <div className="grid grid-cols-2 gap-4">
                    {['Blueprint', 'Permit', 'Contract', 'Site Photo'].map(cat => (
                      <button key={cat} className="p-4 bg-background border border-secondary/5 rounded-xl text-sm font-bold text-secondary/60 hover:border-primary hover:text-primary transition-all text-left">
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-8 border-t border-secondary/5 flex gap-4 bg-background/50">
                <button className="flex-1 btn-primary py-4">Upload Now</button>
                <button 
                  onClick={() => setIsUploadModalOpen(false)}
                  className="flex-1 bg-white border border-secondary/10 text-secondary font-black py-4 rounded-xl hover:bg-secondary/5 transition-all"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
