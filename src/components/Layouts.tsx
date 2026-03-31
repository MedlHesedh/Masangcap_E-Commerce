import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, FolderKanban, Settings, 
  LogOut, Menu, X, Building2, Bell, 
  User, FileText, Clock, MessageSquare, 
  Upload, CreditCard, ChevronRight
} from 'lucide-react';
import { cn } from './SharedUI';

const SidebarItem = ({ to, icon: Icon, label, active, key }: { to: string, icon: any, label: string, active: boolean, key?: React.Key }) => (
  <Link 
    to={to} 
    className={cn(
      "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-bold text-sm",
      active ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-secondary/60 hover:bg-secondary/5 hover:text-secondary"
    )}
  >
    <Icon className="w-5 h-5" />
    <span>{label}</span>
  </Link>
);

export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Overview' },
    { to: '/admin/projects', icon: FolderKanban, label: 'Projects' },
    { to: '/admin/services', icon: Settings, label: 'Services' },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-secondary/5 transform transition-transform duration-300 lg:translate-x-0 lg:static",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-full flex flex-col p-6">
          <div className="flex items-center gap-3 mb-12 px-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <Building2 className="text-white w-6 h-6" />
            </div>
            <span className="font-extrabold tracking-tighter text-2xl text-secondary">Admin<span className="text-primary">.</span></span>
          </div>

          <nav className="flex-1 space-y-2">
            {menuItems.map(item => (
              <SidebarItem 
                key={item.to} 
                {...item} 
                active={location.pathname === item.to} 
              />
            ))}
          </nav>

          <div className="pt-6 border-t border-secondary/5">
            <button className="flex items-center gap-3 px-4 py-3 w-full text-left text-red-500 font-bold text-sm hover:bg-red-50 rounded-xl transition-all">
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-20 bg-white border-b border-secondary/5 flex items-center justify-between px-6 md:px-10 shrink-0">
          <button className="lg:hidden p-2 text-secondary" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <div className="flex-1 flex justify-end items-center gap-6">
            <button className="relative p-2 text-secondary/40 hover:text-primary transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-secondary/5">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black text-secondary">Admin User</p>
                <p className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest">Super Admin</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-secondary/5 flex items-center justify-center text-secondary">
                <User className="w-6 h-6" />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
};

export const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { to: '/portal/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/portal/documents', icon: Upload, label: 'Documents' },
    { to: '/portal/timeline', icon: Clock, label: 'Timeline' },
    { to: '/portal/messages', icon: MessageSquare, label: 'Messages' },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-secondary/5 transform transition-transform duration-300 lg:translate-x-0 lg:static",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-full flex flex-col p-6">
          <div className="flex items-center gap-3 mb-12 px-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <Building2 className="text-white w-6 h-6" />
            </div>
            <span className="font-extrabold tracking-tighter text-2xl text-secondary">Portal<span className="text-primary">.</span></span>
          </div>

          <nav className="flex-1 space-y-2">
            {menuItems.map(item => (
              <SidebarItem 
                key={item.to} 
                {...item} 
                active={location.pathname === item.to} 
              />
            ))}
          </nav>

          <div className="pt-6 border-t border-secondary/5">
            <button className="flex items-center gap-3 px-4 py-3 w-full text-left text-red-500 font-bold text-sm hover:bg-red-50 rounded-xl transition-all">
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-20 bg-white border-b border-secondary/5 flex items-center justify-between px-6 md:px-10 shrink-0">
          <button className="lg:hidden p-2 text-secondary" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <div className="flex-1 flex justify-end items-center gap-6">
            <button className="relative p-2 text-secondary/40 hover:text-primary transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-secondary/5">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black text-secondary">John Doe</p>
                <p className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest">Client Portal</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-secondary/5 flex items-center justify-center text-secondary">
                <User className="w-6 h-6" />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
};
