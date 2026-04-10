import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { 
  Building2, ArrowRight, Menu, X, 
  ChevronRight, HardHat, Mail, Globe, 
  MapPin, Phone, CheckCircle2, Star,
  X as CloseIcon, Calculator
} from 'lucide-react';

// Context
import { ProjectProvider, useProject } from './context/ProjectContext';

// Layouts
import { AdminLayout, ClientLayout } from './components/Layouts';

// Components
import { ProjectSummary } from './components/ProjectSummary';

// Pages
import { Home } from './pages/Home';
import { ServicesPage } from './pages/Services';
import { FinishesPage } from './pages/Finishes';
import { EstimatorPage } from './pages/Estimator';
import { QuotePage } from './pages/Quote';
import DesignEstimator from './pages/DesignEstimator';

// Admin Pages
import { AdminOverview } from './pages/admin/AdminOverview';
import { AdminProjects } from './pages/admin/AdminProjects';
import { AdminServices } from './pages/admin/AdminServices';

// Client Pages
import { ClientDashboard } from './pages/portal/ClientDashboard';
import { ClientDocuments } from './pages/portal/ClientDocuments';
import { ClientTimeline } from './pages/portal/ClientTimeline';

import { AdminDashboard } from './pages/AdminDashboard';

// --- Shared Components ---

const Modal = ({ item, isOpen, onClose, onAdd }: { item: any, isOpen: boolean, onClose: () => void, onAdd: (item: any) => void }) => {
  if (!item) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-secondary/80 backdrop-blur-xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-5xl bg-white rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] md:max-h-[80vh]"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 md:top-8 md:right-8 z-10 w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all"
            >
              <CloseIcon className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            <div className="w-full md:w-1/2 h-64 md:h-auto relative">
              <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 to-transparent md:hidden" />
              <div className="absolute bottom-6 left-6 md:hidden">
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-2 block">{item.category}</span>
                <h3 className="text-2xl font-black text-white tracking-tighter">{item.title}</h3>
              </div>
            </div>

            <div className="w-full md:w-1/2 p-8 md:p-16 overflow-y-auto custom-scrollbar">
              <div className="hidden md:block mb-8">
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-4 block">{item.category}</span>
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-secondary tracking-tighter leading-none italic mb-6">
                  {item.title}
                </h3>
              </div>

              <div className="space-y-8">
                <div>
                  <h4 className="text-xs font-black text-secondary/30 uppercase tracking-widest mb-4">Overview</h4>
                  <p className="text-lg text-secondary/70 font-medium leading-relaxed">
                    {item.longDescription || item.description}
                  </p>
                </div>

                {item.features && (
                  <div>
                    <h4 className="text-xs font-black text-secondary/30 uppercase tracking-widest mb-4">Key Features</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {item.features.map((feature: string, i: number) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                            <CheckCircle2 className="w-3 h-3" />
                          </div>
                          <span className="text-sm font-bold text-secondary/60">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {item.durability && (
                  <div>
                    <h4 className="text-xs font-black text-secondary/30 uppercase tracking-widest mb-4">Durability Rating</h4>
                    <div className="flex items-center gap-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-5 h-5 ${i < parseInt(item.durability) ? 'text-primary fill-primary' : 'text-secondary/10'}`} 
                        />
                      ))}
                      <span className="ml-2 text-sm font-black text-secondary">{item.durability}/5</span>
                    </div>
                  </div>
                )}

                <div className="pt-8 border-t border-secondary/5 flex flex-col sm:flex-row items-center justify-between gap-6">
                  {item.price && (
                    <div>
                      <p className="text-[10px] font-black text-secondary/30 uppercase tracking-widest mb-1">Investment</p>
                      <p className="text-3xl font-black text-secondary tracking-tight">{item.price}</p>
                    </div>
                  )}
                  <button 
                    onClick={() => {
                      onAdd(item);
                      onClose();
                    }}
                    className="btn-primary w-full sm:w-auto px-10 py-5"
                  >
                    Add to Project
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const Navbar = ({ scrolled, onOpenSummary }: { scrolled: boolean, onOpenSummary: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { state } = useProject();
  
  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Services' },
    { to: '/finishes', label: 'Finishes' },
    { to: '/design-estimator', label: 'Design Cost' },
    { to: '/estimator', label: 'Build Cost' },
    { to: '/quote', label: 'Get a Quote' }
  ];

  const cartCount = state.selectedServices.length + state.selectedFinishes.length;

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-4' : 'py-8'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`rounded-3xl transition-all duration-700 ease-in-out ${scrolled ? 'glass px-6 py-3' : 'px-0 py-0'}`}>
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center gap-2 md:gap-3 group cursor-pointer shrink-0"
              onClick={() => window.location.href = '/'}
            >
              <div className="w-9 h-9 md:w-11 md:h-11 bg-primary rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:rotate-6 transition-all duration-500">
                <Building2 className="text-white w-5 h-5 md:w-6 md:h-6" />
              </div>
              <span className="font-extrabold tracking-tighter text-xl md:text-2xl text-secondary">Structura<span className="text-primary">.</span></span>
            </motion.div>
            
            <div className="hidden lg:flex items-center gap-10 text-[13px] font-bold uppercase tracking-widest text-secondary/60">
              {navItems.map(item => (
                <motion.div key={item.to}>
                  <motion.a 
                    href={item.to}
                    className={`hover:text-primary transition-colors relative group ${location.pathname === item.to ? 'text-primary' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      window.history.pushState({}, '', item.to);
                      window.dispatchEvent(new PopStateEvent('popstate'));
                    }}
                  >
                    {item.label}
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all ${location.pathname === item.to ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                  </motion.a>
                </motion.div>
              ))}
            </div>
            
            <div className="flex items-center gap-2 md:gap-4">
              <button 
                onClick={onOpenSummary}
                className="relative p-2 text-secondary/60 hover:text-primary transition-colors"
              >
                <Calculator className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white">
                    {cartCount}
                  </span>
                )}
              </button>
              <button 
                className="btn-primary text-[10px] md:text-sm py-2 px-4 md:py-3 md:px-6"
                onClick={() => {
                  window.history.pushState({}, '', '/design-estimator');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }}
              >
                <span className="hidden xs:inline">Start Estimate</span>
                <span className="xs:hidden">Estimate</span>
                <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
              </button>
              <button className="lg:hidden p-1.5 md:p-2 text-secondary" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X className="w-5 h-5 md:w-6 md:h-6" /> : <Menu className="w-5 h-5 md:w-6 md:h-6" />}
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
            <div className="px-6 py-8 flex flex-col gap-4">
              {navItems.map(item => (
                <button 
                  key={item.to} 
                  onClick={() => {
                    window.history.pushState({}, '', item.to);
                    window.dispatchEvent(new PopStateEvent('popstate'));
                    setIsOpen(false);
                  }}
                  className={`text-lg font-bold text-left px-4 py-3 rounded-xl transition-all ${location.pathname === item.to ? 'bg-primary/10 text-primary' : 'text-secondary/60 hover:bg-background'}`}
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

const Footer = () => (
  <footer className="bg-white border-t border-secondary/5 pt-20 md:pt-32 pb-12 md:pb-16">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-16 mb-16 md:mb-24">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3 mb-6 md:mb-8">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <Building2 className="text-white w-5 h-5 md:w-6 md:h-6" />
            </div>
            <span className="font-extrabold tracking-tighter text-2xl text-secondary">Structura<span className="text-primary">.</span></span>
          </div>
          <p className="text-lg md:text-xl text-secondary/60 max-w-sm leading-relaxed mb-8 md:mb-10 font-medium">
            Premium construction e-commerce and project estimator for modern builders.
          </p>
          <div className="flex gap-4">
            {[Globe, Mail, Globe].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 md:w-12 md:h-12 bg-background rounded-xl md:rounded-2xl flex items-center justify-center text-secondary/40 hover:bg-primary/10 hover:text-primary transition-all">
                <Icon className="w-4 h-4 md:w-5 md:h-5" />
              </a>
            ))}
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <h4 className="font-black text-secondary mb-6 md:mb-8 uppercase tracking-widest text-[10px] md:text-xs">Platform</h4>
          <ul className="space-y-3 md:space-y-4 text-secondary/60 font-bold text-sm md:text-base">
            <li><a href="/services" className="hover:text-primary transition-colors">Services</a></li>
            <li><a href="/finishes" className="hover:text-primary transition-colors">Finishes</a></li>
            <li><a href="/design-estimator" className="hover:text-primary transition-colors">Design Cost</a></li>
            <li><a href="/estimator" className="hover:text-primary transition-colors">Build Cost</a></li>
            <li><a href="/quote" className="hover:text-primary transition-colors">Quote</a></li>
          </ul>
        </div>
        
        <div className="lg:col-span-2">
          <h4 className="font-black text-secondary mb-6 md:mb-8 uppercase tracking-widest text-[10px] md:text-xs">Company</h4>
          <ul className="space-y-3 md:space-y-4 text-secondary/60 font-bold text-sm md:text-base">
            <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Press</a></li>
          </ul>
        </div>
        
        <div className="lg:col-span-3">
          <h4 className="font-black text-secondary mb-6 md:mb-8 uppercase tracking-widest text-[10px] md:text-xs">Contact</h4>
          <ul className="space-y-3 md:space-y-4 text-secondary/60 font-bold text-sm md:text-base">
            <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary shrink-0" /> Orion, Bataan</li>
            <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary shrink-0" /> +63 912 491 2134</li>
            <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary shrink-0" /> medlmasangcapbusiness@gmail.com</li>
          </ul>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-center pt-8 md:pt-12 border-t border-secondary/5 text-secondary/40 font-bold text-xs md:text-sm gap-6">
        <p>© 2026 Structura Construction. All rights reserved.</p>
        <div className="flex gap-6 md:gap-10">
          <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

// --- Main App ---

const AppContent = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [modalItem, setModalItem] = useState<any>(null);
  const { dispatch } = useProject();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleAdd = (item: any) => {
    if (item.category === 'Tiles' || item.category === 'Paint' || item.category === 'Windows' || item.category === 'Ceiling') {
      dispatch({ type: 'ADD_FINISH', payload: item });
    } else {
      dispatch({ type: 'ADD_SERVICE', payload: item });
    }
    setIsSummaryOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar scrolled={scrolled} onOpenSummary={() => setIsSummaryOpen(true)} />
      
      <AnimatePresence mode="wait">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home setActivePage={navigateTo} openModal={setModalItem} />} />
          <Route path="/services" element={<ServicesPage openModal={setModalItem} onAction={handleAdd} />} />
          <Route path="/finishes" element={<FinishesPage openModal={setModalItem} onAction={handleAdd} />} />
          <Route path="/estimator" element={<EstimatorPage onComplete={() => setIsSummaryOpen(true)} />} />
          <Route path="/design-estimator" element={<DesignEstimator />} />
          <Route path="/quote" element={<QuotePage />} />
          <Route path="/admin" element={<AdminDashboard />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>

      <Footer />

      <Modal 
        item={modalItem} 
        isOpen={!!modalItem} 
        onClose={() => setModalItem(null)} 
        onAdd={handleAdd}
      />
      
      <ProjectSummary 
        isOpen={isSummaryOpen} 
        onClose={() => setIsSummaryOpen(false)} 
      />
    </div>
  );
};

export default function App() {
  return (
    <ProjectProvider>
      <Router>
        <AppContent />
      </Router>
    </ProjectProvider>
  );
}
