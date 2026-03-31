export const MOCK_PROJECTS = [
  {
    id: 'PRJ-001',
    client: 'John Doe',
    email: 'john@example.com',
    type: 'Standard House',
    area: 120,
    status: 'Pending',
    date: '2026-03-25',
    total: '₱3,000,000',
  },
  {
    id: 'PRJ-002',
    client: 'Sarah Smith',
    email: 'sarah@example.com',
    type: 'Premium Villa',
    area: 250,
    status: 'In Review',
    date: '2026-03-28',
    total: '₱8,750,000',
  },
  {
    id: 'PRJ-003',
    client: 'Michael Chen',
    email: 'm.chen@example.com',
    type: 'Kitchen Renovation',
    area: 45,
    status: 'Approved',
    date: '2026-03-30',
    total: '₱350,000',
  },
  {
    id: 'PRJ-004',
    client: 'Emma Wilson',
    email: 'emma.w@example.com',
    type: 'Standard House',
    area: 150,
    status: 'Completed',
    date: '2026-02-15',
    total: '₱3,750,000',
  },
];

export const MOCK_DOCUMENTS = [
  { id: 1, name: 'SitePlan_V1.pdf', type: 'PDF', size: '2.4 MB', date: '2026-03-28' },
  { id: 2, name: 'FloorPlan_Final.dwg', type: 'DWG', size: '15.8 MB', date: '2026-03-29' },
  { id: 3, name: 'Permit_Approved.pdf', type: 'PDF', size: '1.1 MB', date: '2026-03-30' },
];

export const MOCK_TIMELINE = [
  { id: 1, title: 'Project Kickoff', date: '2026-03-20', status: 'completed', description: 'Initial meeting and project scope definition.' },
  { id: 2, title: 'Site Survey & Soil Test', date: '2026-03-25', status: 'completed', description: 'Technical assessment of the construction site.' },
  { id: 3, title: 'Permit Processing', date: '2026-04-01', status: 'current', description: 'Liaising with local authorities for building permits.' },
  { id: 4, title: 'Foundation Work', date: '2026-04-15', status: 'upcoming', description: 'Excavation and pouring of the foundation.' },
  { id: 5, title: 'Structural Framing', date: '2026-05-10', status: 'upcoming', description: 'Erection of the main structural elements.' },
];

export const MOCK_STATS = [
  { label: 'Total Leads', value: '124', trend: '+12%', color: 'blue' },
  { label: 'Pending Projects', value: '18', trend: '+5%', color: 'orange' },
  { label: 'Approved Projects', value: '42', trend: '+18%', color: 'green' },
  { label: 'Revenue (MTD)', value: '₱12.4M', trend: '+24%', color: 'purple' },
];
