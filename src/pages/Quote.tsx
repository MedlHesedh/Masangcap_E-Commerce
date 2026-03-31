import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

export const QuotePage = () => (
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
                <p className="text-lg font-black text-secondary">sdglandsph@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-secondary/5">
          <form className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-secondary/30 uppercase tracking-widest">Full Name</label>
                <input type="text" className="w-full p-4 bg-background border border-secondary/5 rounded-xl text-sm font-bold focus:outline-none focus:border-primary transition-all" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-secondary/30 uppercase tracking-widest">Email Address</label>
                <input type="email" className="w-full p-4 bg-background border border-secondary/5 rounded-xl text-sm font-bold focus:outline-none focus:border-primary transition-all" placeholder="john@example.com" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-secondary/30 uppercase tracking-widest">Project Type</label>
              <select className="w-full p-4 bg-background border border-secondary/5 rounded-xl text-sm font-bold focus:outline-none focus:border-primary transition-all">
                <option>Residential Construction</option>
                <option>Commercial Build</option>
                <option>Renovation</option>
                <option>Consultation</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-secondary/30 uppercase tracking-widest">Message</label>
              <textarea className="w-full p-4 bg-background border border-secondary/5 rounded-xl text-sm font-bold focus:outline-none focus:border-primary transition-all min-h-[150px]" placeholder="Tell us about your project..."></textarea>
            </div>
            <button className="w-full btn-primary py-5 text-lg">
              Send Message <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  </motion.div>
);
