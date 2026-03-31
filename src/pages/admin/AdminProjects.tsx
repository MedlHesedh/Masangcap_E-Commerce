import React, { useState } from 'react';
import { 
  Search, Filter, MoreVertical, 
  Eye, Download, Trash2, X,
  CheckCircle2, Clock, AlertCircle
} from 'lucide-react';
import { Card, Badge, Table, cn } from '../../components/SharedUI';
import { MOCK_PROJECTS } from '../../mocks';
import { AnimatePresence, motion } from 'motion/react';

export const AdminProjects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const filteredProjects = MOCK_PROJECTS.filter(p => 
    p.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-secondary tracking-tighter mb-2">Projects</h1>
          <p className="text-secondary/60 font-medium">Manage and track all project requests.</p>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary/30" />
            <input 
              type="text" 
              placeholder="Search projects..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-secondary/5 rounded-xl text-sm font-bold focus:outline-none focus:border-primary transition-all"
            />
          </div>
          <button className="p-3 bg-white border border-secondary/5 rounded-xl text-secondary/40 hover:text-primary transition-colors">
            <Filter className="w-6 h-6" />
          </button>
        </div>
      </div>

      <Card className="p-0 overflow-hidden">
        <Table headers={['Project ID', 'Client', 'Type', 'Date', 'Status', 'Total', 'Actions']}>
          {filteredProjects.map((project) => (
            <tr key={project.id} className="group hover:bg-secondary/[0.02] transition-colors">
              <td className="py-5 px-6">
                <span className="text-sm font-black text-secondary">{project.id}</span>
              </td>
              <td className="py-5 px-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary/5 flex items-center justify-center text-secondary font-black text-sm">
                    {project.client.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-black text-secondary">{project.client}</p>
                    <p className="text-[10px] font-bold text-secondary/40">{project.email}</p>
                  </div>
                </div>
              </td>
              <td className="py-5 px-6">
                <p className="text-sm font-bold text-secondary">{project.type}</p>
                <p className="text-[10px] font-bold text-secondary/40">{project.area} sqm</p>
              </td>
              <td className="py-5 px-6 text-sm font-bold text-secondary/60">{project.date}</td>
              <td className="py-5 px-6">
                <Badge variant={
                  project.status === 'Completed' ? 'success' :
                  project.status === 'Approved' ? 'info' :
                  project.status === 'In Review' ? 'warning' : 'default'
                }>
                  {project.status}
                </Badge>
              </td>
              <td className="py-5 px-6 text-sm font-black text-secondary">{project.total}</td>
              <td className="py-5 px-6">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setSelectedProject(project)}
                    className="p-2 text-secondary/40 hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-secondary/40 hover:text-secondary hover:bg-secondary/10 rounded-lg transition-all">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </Table>
      </Card>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-secondary/80 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-8 border-b border-secondary/5 flex justify-between items-center bg-background/50">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-black text-secondary tracking-tighter">{selectedProject.id}</h3>
                    <Badge variant={
                      selectedProject.status === 'Completed' ? 'success' :
                      selectedProject.status === 'Approved' ? 'info' :
                      selectedProject.status === 'In Review' ? 'warning' : 'default'
                    }>
                      {selectedProject.status}
                    </Badge>
                  </div>
                  <p className="text-sm font-bold text-secondary/40">Submitted on {selectedProject.date}</p>
                </div>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="w-10 h-10 rounded-full bg-white border border-secondary/5 flex items-center justify-center text-secondary/40 hover:text-secondary transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-[10px] font-black text-secondary/30 uppercase tracking-widest mb-4">Client Information</h4>
                    <div className="space-y-3">
                      <p className="text-sm font-bold text-secondary flex justify-between">Name: <span className="text-secondary/60">{selectedProject.client}</span></p>
                      <p className="text-sm font-bold text-secondary flex justify-between">Email: <span className="text-secondary/60">{selectedProject.email}</span></p>
                      <p className="text-sm font-bold text-secondary flex justify-between">Phone: <span className="text-secondary/60">+63 912 345 6789</span></p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-secondary/30 uppercase tracking-widest mb-4">Project Details</h4>
                    <div className="space-y-3">
                      <p className="text-sm font-bold text-secondary flex justify-between">Type: <span className="text-secondary/60">{selectedProject.type}</span></p>
                      <p className="text-sm font-bold text-secondary flex justify-between">Area: <span className="text-secondary/60">{selectedProject.area} sqm</span></p>
                      <p className="text-sm font-bold text-secondary flex justify-between">Total: <span className="text-primary font-black">{selectedProject.total}</span></p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] font-black text-secondary/30 uppercase tracking-widest mb-4">Selected Services</h4>
                  <div className="space-y-3">
                    {['Architectural Design', 'Structural Engineering', 'Plumbing & Electrical'].map((s, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-background rounded-xl border border-secondary/5">
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                          <span className="text-sm font-bold text-secondary">{s}</span>
                        </div>
                        <span className="text-xs font-black text-secondary/40">Included</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] font-black text-secondary/30 uppercase tracking-widest mb-4">Internal Notes</h4>
                  <textarea 
                    className="w-full p-4 bg-background border border-secondary/5 rounded-xl text-sm font-medium focus:outline-none focus:border-primary min-h-[100px]"
                    placeholder="Add internal notes for this project..."
                  />
                </div>
              </div>

              <div className="p-8 border-t border-secondary/5 flex gap-4 bg-background/50">
                <button className="flex-1 btn-primary py-4">Approve Project</button>
                <button className="flex-1 bg-white border border-secondary/10 text-secondary font-black py-4 rounded-xl hover:bg-secondary/5 transition-all">Reject</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
