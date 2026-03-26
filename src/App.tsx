import React from 'react';
import { motion } from 'motion/react';
import { 
  ShoppingCart, 
  ShieldCheck, 
  Zap, 
  Database, 
  Layout, 
  Code2, 
  ArrowRight, 
  Github, 
  ExternalLink,
  CheckCircle2,
  Layers,
  Smartphone,
  Search,
  Mail
} from 'lucide-react';

export default function App() {
  const techStack = [
    { name: 'Next.js', icon: <Zap className="w-5 h-5" />, desc: 'SSR & API Routes' },
    { name: 'React', icon: <Layout className="w-5 h-5" />, desc: 'UI Components' },
    { name: 'TypeScript', icon: <Code2 className="w-5 h-5" />, desc: 'Type Safety' },
    { name: 'PostgreSQL', icon: <Database className="w-5 h-5" />, desc: 'ACID Compliance' },
    { name: 'Stripe', icon: <ShieldCheck className="w-5 h-5" />, desc: 'Secure Payments' },
    { name: 'Tailwind CSS', icon: <Layers className="w-5 h-5" />, desc: 'Responsive Styling' },
  ];

  const features = [
    "Product catalog with filtering and search",
    "Shopping cart with persistent storage",
    "Secure Stripe-powered checkout flow",
    "Real-time inventory management",
    "Order tracking and history",
    "Admin dashboard for product management",
    "Email notifications for orders",
    "Fully responsive UI"
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#1a1a1a] font-sans selection:bg-orange-100 selection:text-orange-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <ShoppingCart className="text-white w-5 h-5" />
            </div>
            <span className="font-bold tracking-tight text-lg">Portfolio.</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
            <a href="#overview" className="hover:text-black transition-colors">Overview</a>
            <a href="#architecture" className="hover:text-black transition-colors">Architecture</a>
            <a href="#features" className="hover:text-black transition-colors">Features</a>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Github className="w-5 h-5" />
            </button>
            <button className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-all flex items-center gap-2">
              Live Demo <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <section id="overview" className="max-w-7xl mx-auto px-6 mb-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-xs font-bold uppercase tracking-wider mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
                Full-Stack Engineering
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-8">
                Full-featured <br />
                <span className="text-gray-400 italic font-serif">E-Commerce</span> Engine.
              </h1>
              <p className="text-xl text-gray-500 leading-relaxed mb-10 max-w-xl">
                A high-performance, scalable storefront solution built to empower small businesses with professional-grade infrastructure and rapid deployment.
              </p>
              <div className="flex flex-wrap gap-4">
                {techStack.map((tech) => (
                  <div key={tech.name} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl shadow-sm hover:border-black transition-colors cursor-default">
                    {tech.icon}
                    <span className="text-sm font-semibold">{tech.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/3] bg-gray-200 rounded-3xl overflow-hidden shadow-2xl relative group">
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426" 
                  alt="Dashboard Preview" 
                  className="w-full h-full object-cover grayscale-[0.2] group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                  <div className="text-white">
                    <p className="text-sm font-medium opacity-80 mb-1">Admin Dashboard</p>
                    <p className="text-2xl font-bold">Real-time Analytics</p>
                  </div>
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                </div>
              </div>
              {/* Floating UI Elements */}
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 hidden md:block">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="text-green-600 w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase">Payment Status</p>
                    <p className="text-sm font-bold">Verified by Stripe</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Narrative Section */}
        <section className="bg-white py-32 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-12 gap-16">
              <div className="lg:col-span-4">
                <h2 className="text-3xl font-bold tracking-tight mb-6">The Challenge</h2>
                <p className="text-gray-500 leading-relaxed">
                  Small businesses frequently encounter a "walled garden" dilemma: either invest heavily in custom, high-maintenance infrastructure or succumb to third-party platforms with restrictive fees and limited flexibility.
                </p>
              </div>
              <div className="lg:col-span-8">
                <h2 className="text-3xl font-bold tracking-tight mb-8">The Solution</h2>
                <div className="prose prose-lg text-gray-600 max-w-none">
                  <p className="mb-6">
                    I engineered a high-performance e-commerce platform designed for extensibility and reliability. The system features a dynamic product catalog, persistent shopping cart architecture, and a secure, PCI-compliant checkout flow.
                  </p>
                  <p>
                    Beyond the storefront, I implemented a robust administrative suite for real-time inventory management and order tracking, providing a comprehensive end-to-end business solution that balances professional-grade features with rapid deployment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Architecture Section */}
        <section id="architecture" className="max-w-7xl mx-auto px-6 py-32">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold tracking-tight mb-4">Architectural Reasoning</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Built with a focus on scalability, data integrity, and developer experience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="text-blue-600 w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-4">Next.js & TypeScript</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Selected for hybrid rendering (SSR/ISR) to optimize SEO and performance. TypeScript ensures type safety across the full stack, critical for payment paths.
              </p>
            </div>

            <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6">
                <Database className="text-indigo-600 w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-4">PostgreSQL Integrity</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Leveraged ACID compliance for non-negotiable data integrity during concurrent inventory updates and transaction records.
              </p>
            </div>

            <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center mb-6">
                <Layers className="text-orange-600 w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-4">State Management</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Implemented a lightweight system using Context API + useReducer, minimizing bundle size while providing predictable state transitions.
              </p>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="bg-black text-white py-32">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div>
                <h2 className="text-4xl font-bold tracking-tight mb-4">Core Capabilities</h2>
                <p className="text-gray-400 max-w-md">
                  A comprehensive feature set designed to handle real-world business requirements.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm">
                  <Smartphone className="w-4 h-4" /> Mobile Ready
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm">
                  <Search className="w-4 h-4" /> SEO Optimized
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="mt-1">
                    <CheckCircle2 className="w-5 h-5 text-orange-500" />
                  </div>
                  <p className="text-lg font-medium text-gray-300">{feature}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Details */}
        <section className="max-w-7xl mx-auto px-6 py-32">
          <div className="bg-gray-50 rounded-[3rem] p-12 md:p-20 overflow-hidden relative">
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-12">System Robustness</h2>
              <div className="grid md:grid-cols-2 gap-16">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">Component Design</h3>
                  <ul className="space-y-4">
                    <li className="flex items-center justify-between py-3 border-b border-gray-200">
                      <span className="font-medium">Reusable UI Library</span>
                      <span className="text-xs bg-white px-2 py-1 rounded border border-gray-200">Atomic Design</span>
                    </li>
                    <li className="flex items-center justify-between py-3 border-b border-gray-200">
                      <span className="font-medium">Custom Business Hooks</span>
                      <span className="text-xs bg-white px-2 py-1 rounded border border-gray-200">useCart, useProducts</span>
                    </li>
                    <li className="flex items-center justify-between py-3 border-b border-gray-200">
                      <span className="font-medium">Separation of Concerns</span>
                      <span className="text-xs bg-white px-2 py-1 rounded border border-gray-200">Container/Presentational</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">Operational Readiness</h3>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                        <Mail className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-bold">Automated Notifications</p>
                        <p className="text-sm text-gray-500">Transactional emails for order confirmation and shipping updates.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                        <ShieldCheck className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-bold">PCI Compliance</p>
                        <p className="text-sm text-gray-500">Secure payment processing via Stripe Elements integration.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative background element */}
            <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-50" />
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-6 text-center py-20">
          <h2 className="text-4xl font-bold mb-8">Ready for Production.</h2>
          <div className="flex justify-center gap-6">
            <button className="bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition-all">
              View Source Code
            </button>
            <button className="bg-white border border-gray-200 px-8 py-4 rounded-full font-bold hover:border-black transition-all">
              Contact Developer
            </button>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-gray-400 text-sm">© 2026 Portfolio Showcase. Built with Next.js & TypeScript.</p>
          <div className="flex gap-8 text-sm font-medium text-gray-400">
            <a href="#" className="hover:text-black transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-black transition-colors">Twitter</a>
            <a href="#" className="hover:text-black transition-colors">Dribbble</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
