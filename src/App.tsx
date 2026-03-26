import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, Zap, Activity, ArrowRight, 
  Github, ExternalLink, CheckCircle2, Search, 
  Mail, Package, Users, ChevronRight, Star, 
  Menu, X, Play, Quote, Home as HomeIcon,
  Calculator, Palette, FileText, Phone, MapPin,
  Upload, HardHat, Building2, Hammer, Ruler,
  Globe
} from 'lucide-react';
import { SERVICES, FINISHES, FEATURES } from './data';

// --- Components ---

const Navbar = ({ scrolled, activePage, setActivePage }: { 
  scrolled: boolean, 
  activePage: string, 
  setActivePage: (page: string) => void 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'finishes', label: 'Finishes' },
    { id: 'estimator', label: 'Estimator' },
    { id: 'quote', label: 'Get a Quote' }
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-4' : 'py-8'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`rounded-3xl transition-all duration-700 ease-in-out ${scrolled ? 'glass px-6 py-3' : 'px-0 py-0'}`}>
          <div className="flex items-center justify-between">
            <div 
              className="flex items-center gap-3 group cursor-pointer"
              onClick={() => setActivePage('home')}
            >
              <div className="w-11 h-11 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:rotate-6 transition-all duration-500">
                <Building2 className="text-white w-6 h-6" />
              </div>
              <span className="font-extrabold tracking-tighter text-2xl text-secondary">Structura<span className="text-primary">.</span></span>
            </div>
            
            <div className="hidden lg:flex items-center gap-10 text-[13px] font-bold uppercase tracking-widest text-secondary/60">
              {navItems.map(item => (
                <button 
                  key={item.id} 
                  onClick={() => setActivePage(item.id)}
                  className={`hover:text-primary transition-colors relative group ${activePage === item.id ? 'text-primary' : ''}`}
                >
                  {item.label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all ${activePage === item.id ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                className="hidden sm:flex items-center gap-2 text-sm font-bold text-secondary/60 hover:text-primary transition-colors px-4 py-2"
                onClick={() => setActivePage('quote')}
              >
                Contact
              </button>
              <button 
                className="btn-primary text-sm py-3 px-6"
                onClick={() => setActivePage('estimator')}
              >
                Start Estimate <ArrowRight className="w-4 h-4" />
              </button>
              <button className="lg:hidden p-2 text-secondary" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-primary/10 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {navItems.map(item => (
                <button 
                  key={item.id} 
                  onClick={() => {
                    setActivePage(item.id);
                    setIsOpen(false);
                  }}
                  className={`text-lg font-bold text-left ${activePage === item.id ? 'text-primary' : 'text-secondary/60'}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = ({ setActivePage }: { setActivePage: (page: string) => void }) => (
  <footer className="bg-white border-t border-secondary/5 pt-32 pb-16">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-12 gap-16 mb-24">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <Building2 className="text-white w-6 h-6" />
            </div>
            <span className="font-extrabold tracking-tighter text-2xl text-secondary">Structura<span className="text-primary">.</span></span>
          </div>
          <p className="text-xl text-secondary/60 max-w-sm leading-relaxed mb-10 font-medium">
            Premium construction e-commerce and project estimator for modern builders.
          </p>
          <div className="flex gap-4">
            {[Github, Mail, Globe].map((Icon, i) => (
              <a key={i} href="#" className="w-12 h-12 bg-background rounded-2xl flex items-center justify-center text-secondary/40 hover:bg-primary/10 hover:text-primary transition-all">
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
        
        <div className="md:col-span-2">
          <h4 className="font-black text-secondary mb-8 uppercase tracking-widest text-xs">Platform</h4>
          <ul className="space-y-4 text-secondary/60 font-bold">
            <li><button onClick={() => setActivePage('services')} className="hover:text-primary transition-colors">Services</button></li>
            <li><button onClick={() => setActivePage('finishes')} className="hover:text-primary transition-colors">Finishes</button></li>
            <li><button onClick={() => setActivePage('estimator')} className="hover:text-primary transition-colors">Estimator</button></li>
            <li><button onClick={() => setActivePage('quote')} className="hover:text-primary transition-colors">Quote</button></li>
          </ul>
        </div>
        
        <div className="md:col-span-2">
          <h4 className="font-black text-secondary mb-8 uppercase tracking-widest text-xs">Company</h4>
          <ul className="space-y-4 text-secondary/60 font-bold">
            <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Press</a></li>
          </ul>
        </div>
        
        <div className="md:col-span-3">
          <h4 className="font-black text-secondary mb-8 uppercase tracking-widest text-xs">Contact</h4>
          <ul className="space-y-4 text-secondary/60 font-bold">
            <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> 123 Builder St, Manila</li>
            <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /> +63 912 345 6789</li>
            <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary" /> hello@structura.ph</li>
          </ul>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-secondary/5 text-secondary/40 font-bold text-sm gap-6">
        <p>© 2026 Structura Construction. All rights reserved.</p>
        <div className="flex gap-10">
          <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

// --- Pages ---

const HomePage = ({ setActivePage }: { setActivePage: (page: string) => void }) => (
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
            <h1 className="text-6xl md:text-8xl font-black text-secondary mb-8 leading-[0.95] tracking-tighter">
              Build your dream <br />
              <span className="text-gradient">with precision.</span>
            </h1>
            <p className="text-xl md:text-2xl text-secondary/60 max-w-xl mb-12 leading-relaxed font-medium">
              The ultimate platform for construction services, material sourcing, and real-time project estimation.
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <button 
                className="btn-primary text-lg px-10 py-5"
                onClick={() => setActivePage('estimator')}
              >
                Start Your Estimate <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                className="btn-secondary text-lg px-10 py-5"
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
                src="https://images.unsplash.com/photo-1503387762-592dee58c460?w=1200" 
                alt="Modern Architecture" 
                className="w-full h-full object-cover rounded-[2.5rem]"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-2xl border border-secondary/5 max-w-xs animate-float">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <Calculator className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-black text-secondary/40 uppercase tracking-widest">Live Estimator</p>
                  <p className="text-xl font-black text-secondary">₱2.5M - ₱8.5M</p>
                </div>
              </div>
              <p className="text-sm text-secondary/60 font-medium">Instant cost breakdowns for your custom project.</p>
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
        <div className="grid md:grid-cols-3 gap-10">
          {FEATURES.map((f, i) => (
            <div key={i} className="card-premium p-12 group">
              <div className="w-16 h-16 bg-background rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
                {f.icon === 'ShieldCheck' && <ShieldCheck className="w-8 h-8" />}
                {f.icon === 'Zap' && <Zap className="w-8 h-8" />}
                {f.icon === 'Activity' && <Activity className="w-8 h-8" />}
              </div>
              <h3 className="text-2xl font-black mb-4">{f.title}</h3>
              <p className="text-secondary/60 leading-relaxed font-medium">{f.description}</p>
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

        <div className="grid md:grid-cols-3 gap-10">
          {SERVICES.slice(0, 3).map((s) => (
            <div key={s.id} className="card-premium group cursor-pointer" onClick={() => setActivePage('services')}>
              <div className="aspect-video overflow-hidden">
                <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="p-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-black text-primary uppercase tracking-widest">{s.category}</span>
                  <span className="text-sm font-bold text-secondary/40">{s.price}</span>
                </div>
                <h4 className="text-2xl font-black mb-2 group-hover:text-primary transition-colors">{s.title}</h4>
                <p className="text-secondary/60 text-sm font-medium line-clamp-2">{s.description}</p>
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
        <h2 className="text-6xl md:text-8xl font-black text-white mb-10 tracking-tighter leading-none">
          Ready to build <br />your future?
        </h2>
        <p className="text-2xl text-white/60 mb-12 font-medium max-w-2xl mx-auto leading-relaxed">
          Get an instant project estimate or talk to our experts today.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <button 
            className="btn-primary text-xl px-12 py-6"
            onClick={() => setActivePage('estimator')}
          >
            Start Estimate
          </button>
          <button 
            className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-12 py-6 rounded-xl font-black text-xl hover:bg-white/20 transition-all"
            onClick={() => setActivePage('quote')}
          >
            Contact Sales
          </button>
        </div>
      </div>
    </section>
  </motion.div>
);

const ServicesPage = () => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }} 
    animate={{ opacity: 1, y: 0 }} 
    exit={{ opacity: 0 }}
    className="pt-48 pb-32"
  >
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-24">
        <div className="badge bg-primary/10 text-primary border border-primary/20 mb-6">Service Catalog</div>
        <h1 className="text-5xl md:text-7xl font-black text-secondary mb-8 tracking-tighter">Construction Solutions</h1>
        <p className="text-xl text-secondary/60 max-w-2xl mx-auto font-medium">Comprehensive packages tailored to your specific building needs.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {SERVICES.map((s) => (
          <div key={s.id} className="card-premium group">
            <div className="aspect-[4/3] overflow-hidden relative">
              <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute top-6 right-6">
                <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-xl text-primary font-black text-sm">
                  {s.price}
                </div>
              </div>
            </div>
            <div className="p-10">
              <span className="text-[10px] font-black text-primary uppercase tracking-widest mb-4 block">{s.category}</span>
              <h3 className="text-2xl font-black mb-4">{s.title}</h3>
              <p className="text-secondary/60 leading-relaxed font-medium mb-8">{s.description}</p>
              <button className="w-full btn-secondary py-4">
                Add to Estimate
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

const FinishesPage = () => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }} 
    animate={{ opacity: 1, y: 0 }} 
    exit={{ opacity: 0 }}
    className="pt-48 pb-32"
  >
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-24">
        <div className="badge bg-primary/10 text-primary border border-primary/20 mb-6">Finish Selector</div>
        <h1 className="text-5xl md:text-7xl font-black text-secondary mb-8 tracking-tighter">Curated Styles</h1>
        <p className="text-xl text-secondary/60 max-w-2xl mx-auto font-medium">Select the perfect finishes to bring your vision to life.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {FINISHES.map((f) => (
          <div key={f.id} className="card-premium group">
            <div className="aspect-square overflow-hidden">
              <img src={f.img} alt={f.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            <div className="p-10">
              <span className="text-[10px] font-black text-primary uppercase tracking-widest mb-4 block">{f.category}</span>
              <h3 className="text-2xl font-black mb-4">{f.title}</h3>
              <p className="text-secondary/60 leading-relaxed font-medium mb-8">{f.description}</p>
              <button className="w-full btn-secondary py-4">
                Select Style
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

const EstimatorPage = () => {
  const [area, setArea] = useState(100);
  const [type, setType] = useState('Standard');
  const [finish, setFinish] = useState('Fully Finished');

  const calculateEstimate = () => {
    const baseRates: Record<string, number> = {
      'Standard': 25000,
      'Premium': 35000,
      'Luxury': 55000,
      'Industrial': 30000
    };
    const finishMultipliers: Record<string, number> = {
      'Bare': 0.7,
      'Semi-Finished': 0.85,
      'Fully Finished': 1.0
    };
    
    const total = area * baseRates[type] * finishMultipliers[finish];
    return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(total);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0 }}
      className="pt-48 pb-32"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7">
            <div className="badge bg-primary/10 text-primary border border-primary/20 mb-6">Project Estimator</div>
            <h1 className="text-5xl font-black text-secondary mb-8 tracking-tighter">Calculate Your Build</h1>
            
            <div className="space-y-12 mt-16">
              {/* Area Input */}
              <div>
                <label className="block text-sm font-black text-secondary/40 uppercase tracking-widest mb-6">Project Area (sqm)</label>
                <div className="flex items-center gap-8">
                  <input 
                    type="range" 
                    min="20" 
                    max="1000" 
                    value={area} 
                    onChange={(e) => setArea(parseInt(e.target.value))}
                    className="w-full accent-primary"
                  />
                  <div className="w-32 text-4xl font-black text-secondary tabular-nums">{area}</div>
                </div>
              </div>

              {/* Construction Type */}
              <div>
                <label className="block text-sm font-black text-secondary/40 uppercase tracking-widest mb-6">Construction Type</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {['Standard', 'Premium', 'Luxury', 'Industrial'].map(t => (
                    <button 
                      key={t}
                      onClick={() => setType(t)}
                      className={`py-4 rounded-xl font-bold text-sm transition-all border ${type === t ? 'bg-secondary text-white border-secondary shadow-xl' : 'bg-white text-secondary/60 border-secondary/5 hover:border-primary'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Finish Level */}
              <div>
                <label className="block text-sm font-black text-secondary/40 uppercase tracking-widest mb-6">Finish Level</label>
                <div className="grid grid-cols-3 gap-4">
                  {['Bare', 'Semi-Finished', 'Fully Finished'].map(f => (
                    <button 
                      key={f}
                      onClick={() => setFinish(f)}
                      className={`py-4 rounded-xl font-bold text-sm transition-all border ${finish === f ? 'bg-secondary text-white border-secondary shadow-xl' : 'bg-white text-secondary/60 border-secondary/5 hover:border-primary'}`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="card-premium p-12 sticky top-48">
              <h3 className="text-2xl font-black mb-8">Estimate Summary</h3>
              <div className="space-y-6 mb-12">
                <div className="flex justify-between items-center py-4 border-b border-secondary/5">
                  <span className="font-bold text-secondary/60">Base Construction</span>
                  <span className="font-black text-secondary">{type}</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-secondary/5">
                  <span className="font-bold text-secondary/60">Total Floor Area</span>
                  <span className="font-black text-secondary">{area} sqm</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-secondary/5">
                  <span className="font-bold text-secondary/60">Finish Quality</span>
                  <span className="font-black text-secondary">{finish}</span>
                </div>
              </div>
              
              <div className="mb-12">
                <p className="text-xs font-black text-secondary/40 uppercase tracking-widest mb-2">Estimated Total Cost</p>
                <p className="text-5xl font-black text-primary tracking-tighter">{calculateEstimate()}</p>
                <p className="text-xs text-secondary/40 mt-4 font-medium italic">*This is a preliminary estimate and may vary based on site conditions and material fluctuations.</p>
              </div>

              <button className="w-full btn-primary py-5">
                Proceed to Project Summary
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const QuotePage = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0 }}
      className="pt-48 pb-32"
    >
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="badge bg-primary/10 text-primary border border-primary/20 mb-6">Request a Quote</div>
          <h1 className="text-5xl font-black text-secondary mb-6 tracking-tighter">Tell us about your project</h1>
          <p className="text-xl text-secondary/60 font-medium">Our experts will review your details and get back to you within 24 hours.</p>
        </div>

        {submitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card-premium p-16 text-center"
          >
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-8">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h2 className="text-3xl font-black mb-4">Request Received!</h2>
            <p className="text-secondary/60 font-medium mb-10">Thank you for reaching out. We've sent a confirmation email to your inbox.</p>
            <button className="btn-secondary mx-auto" onClick={() => setSubmitted(false)}>
              Send Another Request
            </button>
          </motion.div>
        ) : (
          <form className="card-premium p-12 space-y-8" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-black text-secondary/40 uppercase tracking-widest">Full Name</label>
                <input type="text" required className="w-full bg-background border border-secondary/5 rounded-xl px-6 py-4 focus:outline-none focus:border-primary transition-colors font-medium" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-secondary/40 uppercase tracking-widest">Email Address</label>
                <input type="email" required className="w-full bg-background border border-secondary/5 rounded-xl px-6 py-4 focus:outline-none focus:border-primary transition-colors font-medium" placeholder="john@example.com" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-black text-secondary/40 uppercase tracking-widest">Phone Number</label>
                <input type="tel" required className="w-full bg-background border border-secondary/5 rounded-xl px-6 py-4 focus:outline-none focus:border-primary transition-colors font-medium" placeholder="+63 9XX XXX XXXX" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-secondary/40 uppercase tracking-widest">Project Location</label>
                <input type="text" required className="w-full bg-background border border-secondary/5 rounded-xl px-6 py-4 focus:outline-none focus:border-primary transition-colors font-medium" placeholder="City, Province" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-black text-secondary/40 uppercase tracking-widest">Project Type</label>
                <select className="w-full bg-background border border-secondary/5 rounded-xl px-6 py-4 focus:outline-none focus:border-primary transition-colors font-medium appearance-none">
                  <option>New Construction</option>
                  <option>Renovation</option>
                  <option>Commercial</option>
                  <option>Interior Design</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-secondary/40 uppercase tracking-widest">Budget Range</label>
                <select className="w-full bg-background border border-secondary/5 rounded-xl px-6 py-4 focus:outline-none focus:border-primary transition-colors font-medium appearance-none">
                  <option>₱500k - ₱1M</option>
                  <option>₱1M - ₱5M</option>
                  <option>₱5M - ₱10M</option>
                  <option>₱10M+</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-secondary/40 uppercase tracking-widest">Upload Blueprints (Optional)</label>
              <div className="border-2 border-dashed border-secondary/10 rounded-2xl p-12 text-center hover:border-primary transition-colors cursor-pointer group">
                <Upload className="w-10 h-10 text-secondary/20 mx-auto mb-4 group-hover:text-primary transition-colors" />
                <p className="text-sm font-bold text-secondary/40">Drag and drop your PDF blueprints here, or click to browse.</p>
              </div>
            </div>

            <button type="submit" className="w-full btn-primary py-5">
              Submit Request
            </button>
          </form>
        )}
      </div>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [activePage, setActivePage] = useState('home');
  
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  return (
    <div className="min-h-screen">
      <Navbar scrolled={scrolled} activePage={activePage} setActivePage={setActivePage} />

      <main>
        <AnimatePresence mode="wait">
          {activePage === 'home' && <HomePage setActivePage={setActivePage} />}
          {activePage === 'services' && <ServicesPage key="services" />}
          {activePage === 'finishes' && <FinishesPage key="finishes" />}
          {activePage === 'estimator' && <EstimatorPage key="estimator" />}
          {activePage === 'quote' && <QuotePage key="quote" />}
        </AnimatePresence>
      </main>

      <Footer setActivePage={setActivePage} />
    </div>
  );
}
