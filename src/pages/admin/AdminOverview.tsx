import React from 'react';
import { 
  Users, FolderKanban, CheckCircle2, 
  TrendingUp, ArrowUpRight, ArrowDownRight,
  MoreVertical, ExternalLink
} from 'lucide-react';
import { Card, Badge, Table } from '../../components/SharedUI';
import { MOCK_STATS, MOCK_PROJECTS } from '../../mocks';
import { 
  BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';

const chartData = [
  { name: 'Jan', leads: 45, projects: 12 },
  { name: 'Feb', leads: 52, projects: 15 },
  { name: 'Mar', leads: 61, projects: 18 },
  { name: 'Apr', leads: 58, projects: 16 },
  { name: 'May', leads: 72, projects: 22 },
  { name: 'Jun', leads: 85, projects: 25 },
];

export const AdminOverview = () => {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-black text-secondary tracking-tighter mb-2">Overview</h1>
        <p className="text-secondary/60 font-medium">Welcome back, here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {MOCK_STATS.map((stat, i) => (
          <Card key={i} className="relative overflow-hidden group">
            <div className="flex justify-between items-start mb-4">
              <div className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center",
                stat.color === 'blue' ? "bg-blue-50 text-blue-600" :
                stat.color === 'orange' ? "bg-orange-50 text-orange-600" :
                stat.color === 'green' ? "bg-green-50 text-green-600" :
                "bg-purple-50 text-purple-600"
              )}>
                {stat.label.includes('Leads') && <Users className="w-6 h-6" />}
                {stat.label.includes('Pending') && <FolderKanban className="w-6 h-6" />}
                {stat.label.includes('Approved') && <CheckCircle2 className="w-6 h-6" />}
                {stat.label.includes('Revenue') && <TrendingUp className="w-6 h-6" />}
              </div>
              <div className="flex items-center gap-1 text-[10px] font-black text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                <ArrowUpRight className="w-3 h-3" />
                {stat.trend}
              </div>
            </div>
            <p className="text-xs font-black text-secondary/40 uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-3xl font-black text-secondary tracking-tight">{stat.value}</p>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="h-[400px] flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-black text-secondary">Lead Generation</h3>
            <select className="bg-secondary/5 border-none rounded-lg text-xs font-bold px-3 py-2 focus:ring-0">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF6321" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#FF6321" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700, fill: '#94a3b8' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontWeight: 800 }}
                />
                <Area type="monotone" dataKey="leads" stroke="#FF6321" strokeWidth={3} fillOpacity={1} fill="url(#colorLeads)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="h-[400px] flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-black text-secondary">Project Conversion</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span className="text-xs font-bold text-secondary/60">Projects</span>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700, fill: '#94a3b8' }} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="projects" fill="#FF6321" radius={[6, 6, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-lg font-black text-secondary">Recent Project Requests</h3>
          <button className="text-xs font-black text-primary uppercase tracking-widest hover:underline">View All</button>
        </div>
        <Table headers={['Client', 'Project Type', 'Date', 'Status', 'Total', 'Actions']}>
          {MOCK_PROJECTS.slice(0, 5).map((project) => (
            <tr key={project.id} className="group hover:bg-secondary/[0.02] transition-colors">
              <td className="py-4 px-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary/5 flex items-center justify-center text-secondary font-black text-xs">
                    {project.client.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-black text-secondary">{project.client}</p>
                    <p className="text-[10px] font-bold text-secondary/40">{project.email}</p>
                  </div>
                </div>
              </td>
              <td className="py-4 px-4">
                <p className="text-sm font-bold text-secondary">{project.type}</p>
                <p className="text-[10px] font-bold text-secondary/40">{project.area} sqm</p>
              </td>
              <td className="py-4 px-4 text-sm font-bold text-secondary/60">{project.date}</td>
              <td className="py-4 px-4">
                <Badge variant={
                  project.status === 'Completed' ? 'success' :
                  project.status === 'Approved' ? 'info' :
                  project.status === 'In Review' ? 'warning' : 'default'
                }>
                  {project.status}
                </Badge>
              </td>
              <td className="py-4 px-4 text-sm font-black text-secondary">{project.total}</td>
              <td className="py-4 px-4">
                <button className="p-2 text-secondary/40 hover:text-secondary transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </Table>
      </Card>
    </div>
  );
};

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
