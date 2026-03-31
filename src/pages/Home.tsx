import React from 'react';
import { motion } from 'motion/react';
import { 
  Building2, HardHat, ArrowRight, 
  Calculator, ShieldCheck, Zap, 
  Activity, ChevronRight, Star 
} from 'lucide-react';
import { SERVICES, FEATURES } from '../data';

export const Home = ({ setActivePage, openModal }: { setActivePage: (page: string) => void, openModal: (item: any) => void }) => (
  <motion.div 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    exit={{ opacity: 0 }}
    className="pt-32"
  >
    {/* Hero Section */}
    <section className="relative pt-24 pb-32 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] opacity-60 animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] opacity-60"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="badge bg-primary/10 text-primary border border-primary/20 mb-8">
              <HardHat className="w-3 h-3" /> Redefining Construction E-Commerce
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-secondary mb-6 md:mb-8 leading-[0.95] tracking-tighter">
              Build your dream <br />
              <span className="text-gradient">with precision.</span>
            </h1>
            <p className="text-lg md:text-2xl text-secondary/60 max-w-xl mb-8 md:mb-12 leading-relaxed font-medium">
              The ultimate platform for construction services, material sourcing, and real-time project estimation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-5">
              <button 
                className="btn-primary text-base md:text-lg px-8 md:px-10 py-4 md:py-5"
                onClick={() => setActivePage('estimator')}
              >
                Start Your Estimate <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </button>
              <button 
                className="btn-secondary text-base md:text-lg px-8 md:px-10 py-4 md:py-5"
                onClick={() => setActivePage('services')}
              >
                View Services
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-secondary/5 p-4">
              <img 
                src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200" 
                alt="Modern Architecture" 
                className="w-full h-full object-cover rounded-[2.5rem]"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 bg-white p-4 md:p-8 rounded-2xl md:rounded-3xl shadow-2xl border border-secondary/5 max-w-[200px] md:max-w-xs animate-float">
              <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-xl md:rounded-2xl flex items-center justify-center text-primary">
                  <Calculator className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-secondary/40 uppercase tracking-widest">Live Estimator</p>
                  <p className="text-lg md:text-xl font-black text-secondary">₱2.5M - ₱8.5M</p>
                </div>
              </div>
              <p className="text-xs md:text-sm text-secondary/60 font-medium">Instant cost breakdowns for your custom project.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Features Grid */}
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-secondary mb-6">Why Choose Structura?</h2>
          <p className="text-xl text-secondary/60 max-w-2xl mx-auto">We combine cutting-edge technology with decades of construction expertise.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 md:gap-10">
          {FEATURES.map((f, i) => (
            <div key={i} className="card-premium group">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-background rounded-xl md:rounded-2xl flex items-center justify-center text-primary mb-6 md:mb-8 group-hover:scale-110 transition-transform">
                {f.icon === 'ShieldCheck' && <ShieldCheck className="w-6 h-6 md:w-8 md:h-8" />}
                {f.icon === 'Zap' && <Zap className="w-6 h-6 md:w-8 md:h-8" />}
                {f.icon === 'Activity' && <Activity className="w-6 h-6 md:w-8 md:h-8" />}
              </div>
              <h3 className="text-xl md:text-2xl font-black mb-3 md:mb-4">{f.title}</h3>
              <p className="text-secondary/60 leading-relaxed font-medium text-sm md:text-base">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Services Preview */}
    <section className="py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="text-left max-w-2xl">
            <div className="badge bg-primary/10 text-primary border border-primary/20 mb-4">Our Expertise</div>
            <h2 className="text-5xl font-black text-secondary mb-6">Built for Excellence.</h2>
            <p className="text-xl text-secondary/60 font-medium">From concept to completion, we provide end-to-end construction solutions.</p>
          </div>
          <button 
            className="btn-secondary"
            onClick={() => setActivePage('services')}
          >
            Explore All Services <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {SERVICES.slice(0, 3).map((s) => (
            <div key={s.id} className="card-premium group cursor-pointer overflow-hidden flex flex-col">
              <div className="aspect-video overflow-hidden shrink-0 relative" onClick={() => openModal(s)}>
                <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white">
                    <Star className="w-5 h-5 fill-white" />
                  </div>
                </div>
              </div>
              <div className="p-6 md:p-8 flex-1 flex flex-col" onClick={() => setActivePage('services')}>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-black text-primary uppercase tracking-widest">{s.category}</span>
                  <span className="text-xs md:text-sm font-bold text-secondary/40">{s.price}</span>
                </div>
                <h4 className="text-xl md:text-2xl font-black mb-2 group-hover:text-primary transition-colors">{s.title}</h4>
                <p className="text-secondary/60 text-xs md:text-sm font-medium line-clamp-2">{s.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Final CTA */}
    <section className="py-40 relative overflow-hidden bg-secondary">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-primary/40 rounded-full blur-[120px]"></div>
      </div>
      
      <div className="max-w-4xl mx-auto px-6 text-center relative">
        <h2 className="text-4xl sm:text-6xl md:text-8xl font-black text-white mb-8 md:mb-10 tracking-tighter leading-none">
          Ready to build <br />your future?
        </h2>
        <p className="text-lg md:text-2xl text-white/60 mb-8 md:mb-12 font-medium max-w-2xl mx-auto leading-relaxed">
          Get an instant project estimate or talk to our experts today.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
          <button 
            className="btn-primary text-lg md:text-xl px-10 md:px-12 py-4 md:py-6"
            onClick={() => setActivePage('estimator')}
          >
            Start Estimate
          </button>
          <button 
            className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 md:px-12 py-4 md:py-6 rounded-xl font-black text-lg md:text-xl hover:bg-white/20 transition-all"
            onClick={() => setActivePage('quote')}
          >
            Contact Sales
          </button>
        </div>
      </div>
    </section>
  </motion.div>
);
