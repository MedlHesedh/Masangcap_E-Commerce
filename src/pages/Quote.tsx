import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import { SuccessModal } from '../components/estimator/SuccessModal';

export const QuotePage = () => {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'Residential Construction',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to server database
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectDetails,
          recipientEmail: 'medlmasangcapbusiness@gmail.com',
          source: window.location.pathname
        })
      });
    } catch (error) {
      console.error("Failed to save lead to server:", error);
    }

    setIsSuccessModalOpen(true);
  };

  const projectDetails = `
- Name: ${formData.name}
- Email: ${formData.email}
- Project Type: ${formData.type}
- Message: ${formData.message}
  `.trim();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0 }}
      className="pt-48 pb-32"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 md:gap-24">
          <div>
            <div className="badge bg-primary/10 text-primary border border-primary/20 mb-6">Contact Us</div>
            <h1 className="text-5xl md:text-7xl font-black text-secondary mb-8 tracking-tighter">Let's build <br />something great.</h1>
            <p className="text-xl text-secondary/60 mb-12 font-medium leading-relaxed">
              Our experts are ready to help you navigate your construction journey. Reach out for a custom consultation.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-xl border border-secondary/5 flex items-center justify-center text-primary">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-secondary/30 uppercase tracking-widest mb-1">Headquarters</p>
                  <p className="text-lg font-black text-secondary">Orion, Bataan, Philippines</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-xl border border-secondary/5 flex items-center justify-center text-primary">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-secondary/30 uppercase tracking-widest mb-1">Phone</p>
                  <p className="text-lg font-black text-secondary">+63 912 491 2134</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-xl border border-secondary/5 flex items-center justify-center text-primary">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-secondary/30 uppercase tracking-widest mb-1">Email</p>
                  <p className="text-lg font-black text-secondary">medlmasangcapbusiness@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-secondary/5">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-secondary/30 uppercase tracking-widest">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-4 bg-background border border-secondary/5 rounded-xl text-sm font-bold focus:outline-none focus:border-primary transition-all" 
                    placeholder="John Doe" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-secondary/30 uppercase tracking-widest">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-4 bg-background border border-secondary/5 rounded-xl text-sm font-bold focus:outline-none focus:border-primary transition-all" 
                    placeholder="john@example.com" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-secondary/30 uppercase tracking-widest">Project Type</label>
                <select 
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full p-4 bg-background border border-secondary/5 rounded-xl text-sm font-bold focus:outline-none focus:border-primary transition-all"
                >
                  <option>Residential Construction</option>
                  <option>Commercial Build</option>
                  <option>Renovation</option>
                  <option>Consultation</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-secondary/30 uppercase tracking-widest">Message</label>
                <textarea 
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-4 bg-background border border-secondary/5 rounded-xl text-sm font-bold focus:outline-none focus:border-primary transition-all min-h-[150px]" 
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>
              <button type="submit" className="w-full btn-primary py-5 text-lg">
                Send Message <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>

      <SuccessModal 
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        projectDetails={projectDetails}
        recipientEmail="medlmasangcapbusiness@gmail.com"
      />
    </motion.div>
  );
};
