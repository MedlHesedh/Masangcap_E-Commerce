import React, { useState } from 'react';
import { 
  Plus, Search, Edit2, Trash2, 
  MoreVertical, X, Upload, 
  CheckCircle2, AlertCircle
} from 'lucide-react';
import { Card, Badge, Table, cn } from '../../components/SharedUI';
import { SERVICES } from '../../data';
import { AnimatePresence, motion } from 'motion/react';

export const AdminServices = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);

  const filteredServices = SERVICES.filter(s => 
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-secondary tracking-tighter mb-2">Services</h1>
          <p className="text-secondary/60 font-medium">Manage your service catalog and pricing.</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="btn-primary w-full md:w-auto py-4 px-8"
        >
          <Plus className="w-5 h-5" /> Add New Service
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary/30" />
          <input 
            type="text" 
            placeholder="Search services..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-secondary/5 rounded-xl text-sm font-bold focus:outline-none focus:border-primary transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredServices.map((service) => (
          <Card key={service.id} className="group flex flex-col p-0 overflow-hidden">
            <div className="aspect-video relative overflow-hidden shrink-0">
              <img src={service.img} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute top-4 right-4 flex gap-2">
                <button 
                  onClick={() => setEditingService(service)}
                  className="p-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-white hover:bg-white/40 transition-all"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button className="p-2 bg-red-500/20 backdrop-blur-md border border-red-500/30 rounded-lg text-red-500 hover:bg-red-500/40 transition-all">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="absolute bottom-4 left-4">
                <Badge variant="info">{service.category}</Badge>
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-black text-secondary group-hover:text-primary transition-colors">{service.title}</h3>
                <span className="text-sm font-black text-secondary">{service.price}</span>
              </div>
              <p className="text-sm text-secondary/60 font-medium line-clamp-2 mb-6">{service.description}</p>
              
              <div className="mt-auto pt-6 border-t border-secondary/5 flex justify-between items-center">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-secondary/5 flex items-center justify-center text-[10px] font-black text-secondary/40">
                      {i}
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-primary/10 flex items-center justify-center text-[10px] font-black text-primary">
                    +5
                  </div>
                </div>
                <span className="text-[10px] font-black text-secondary/30 uppercase tracking-widest">Active Packages</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {(isAddModalOpen || editingService) && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsAddModalOpen(false);
                setEditingService(null);
              }}
              className="absolute inset-0 bg-secondary/80 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-8 border-b border-secondary/5 flex justify-between items-center bg-background/50">
                <h3 className="text-2xl font-black text-secondary tracking-tighter">
                  {editingService ? 'Edit Service' : 'Add New Service'}
                </h3>
                <button 
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingService(null);
                  }}
                  className="w-10 h-10 rounded-full bg-white border border-secondary/5 flex items-center justify-center text-secondary/40 hover:text-secondary transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <label className="block text-[10px] font-black text-secondary/30 uppercase tracking-widest mb-2">Service Title</label>
                    <input 
                      type="text" 
                      defaultValue={editingService?.title || ''}
                      className="w-full p-4 bg-background border border-secondary/5 rounded-xl text-sm font-bold focus:outline-none focus:border-primary"
                      placeholder="e.g. Modern Kitchen Renovation"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-secondary/30 uppercase tracking-widest mb-2">Category</label>
                    <select className="w-full p-4 bg-background border border-secondary/5 rounded-xl text-sm font-bold focus:outline-none focus:border-primary">
                      <option>House Construction</option>
                      <option>Renovation</option>
                      <option>Add-on</option>
                      <option>Materials</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-secondary/30 uppercase tracking-widest mb-2">Base Price</label>
                    <input 
                      type="text" 
                      defaultValue={editingService?.price || ''}
                      className="w-full p-4 bg-background border border-secondary/5 rounded-xl text-sm font-bold focus:outline-none focus:border-primary"
                      placeholder="e.g. ₱350,000"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[10px] font-black text-secondary/30 uppercase tracking-widest mb-2">Short Description</label>
                    <textarea 
                      defaultValue={editingService?.description || ''}
                      className="w-full p-4 bg-background border border-secondary/5 rounded-xl text-sm font-medium focus:outline-none focus:border-primary min-h-[80px]"
                      placeholder="Brief overview of the service..."
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[10px] font-black text-secondary/30 uppercase tracking-widest mb-2">Service Image</label>
                    <div className="w-full p-8 border-2 border-dashed border-secondary/10 rounded-2xl flex flex-col items-center justify-center gap-4 hover:border-primary hover:bg-primary/5 transition-all cursor-pointer">
                      <Upload className="w-8 h-8 text-secondary/20" />
                      <p className="text-xs font-bold text-secondary/40">Click to upload or drag and drop</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 border-t border-secondary/5 flex gap-4 bg-background/50">
                <button className="flex-1 btn-primary py-4">
                  {editingService ? 'Save Changes' : 'Create Service'}
                </button>
                <button 
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingService(null);
                  }}
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
