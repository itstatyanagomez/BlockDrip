export interface Account {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  status: string;
  type: string;
}

export interface Contact {
  id: string;
  account_id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  title: string;
}

export interface CrewMember {
  id: string;
  name: string;
  role: string;
  status: string;
  phone: string;
  email: string;
  joined: string;
  license: string;
  emergency_contact: string;
  emergency_phone: string;
}

export interface Material {
  id: string;
  name: string;
  unit: string;
}

export interface JobMaterial {
  material_id: string;
  amount: number;
}

export interface Job {
  id: string;
  account_id: string;
  name: string;
  type: 'New Build' | 'Addition';
  start_date: string;
  end_date: string;
  pm_id: string;
  po_number: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  deliver_window: 'Early Run' | 'Late Run';
  deliver_vehicle: string;
  notes: string;
  crew: string[];
  status: 'Active' | 'Scheduled' | 'Completed' | 'On Hold';
  concrete_bags: number;
  wire_size: number;
  wire_length: number;
  materials: JobMaterial[];
}

export interface Invoice {
  id: string;
  account_id: string;
  job_id: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Overdue';
  issued_date: string;
  due_date: string;
  description: string;
}

export interface Report {
  id: string;
  job_id: string;
  date: string;
  notes: string;
  crew_attendance: Record<string, boolean>;
  materials_received: JobMaterial[];
  materials_placed: JobMaterial[];
  report: Record<string, unknown>;
}

export interface PayrollEntry {
  id: string;
  crew_id: string;
  amount: number;
  date: string;
  period: string;
  status: 'Paid' | 'Pending';
}

export const accounts: Account[] = [
  {
    id: 'a1',
    name: 'Sunrise Developments',
    email: 'ops@sunrisedev.com',
    phone: '(813) 555-0100',
    address: '1200 Bayshore Blvd',
    city: 'Tampa',
    state: 'FL',
    zip: '33606',
    status: 'Active',
    type: 'Developer',
  },
  {
    id: 'a2',
    name: 'Gulf Coast Builders',
    email: 'projects@gulfcoastbuild.com',
    phone: '(239) 555-0200',
    address: '4400 Tamiami Trail N',
    city: 'Naples',
    state: 'FL',
    zip: '34103',
    status: 'Active',
    type: 'General Contractor',
  },
  {
    id: 'a3',
    name: 'Palmetto Construction Group',
    email: 'info@palmettocg.com',
    phone: '(904) 555-0300',
    address: '880 Riverside Ave',
    city: 'Jacksonville',
    state: 'FL',
    zip: '32204',
    status: 'Active',
    type: 'General Contractor',
  },
  {
    id: 'a4',
    name: 'Coastal Edge Properties',
    email: 'mgmt@coastaledge.com',
    phone: '(561) 555-0400',
    address: '250 S Australian Ave',
    city: 'West Palm Beach',
    state: 'FL',
    zip: '33401',
    status: 'Inactive',
    type: 'Developer',
  },
];

export const contacts: Contact[] = [
  {
    id: 'c1',
    account_id: 'a1',
    name: 'Marcus Webb',
    role: 'PM',
    email: 'm.webb@sunrisedev.com',
    phone: '(813) 555-0101',
    title: 'Project Manager',
  },
  {
    id: 'c2',
    account_id: 'a1',
    name: 'Darnell Hughes',
    role: 'Super',
    email: 'd.hughes@sunrisedev.com',
    phone: '(813) 555-0102',
    title: 'Site Superintendent',
  },
  {
    id: 'c3',
    account_id: 'a2',
    name: 'Sofia Reyes',
    role: 'PM',
    email: 's.reyes@gulfcoastbuild.com',
    phone: '(239) 555-0201',
    title: 'Project Manager',
  },
  {
    id: 'c4',
    account_id: 'a2',
    name: 'Brad Kowalski',
    role: 'PM',
    email: 'b.kowalski@gulfcoastbuild.com',
    phone: '(239) 555-0202',
    title: 'Senior Project Manager',
  },
  {
    id: 'c5',
    account_id: 'a3',
    name: 'Theresa Okafor',
    role: 'PM',
    email: 't.okafor@palmettocg.com',
    phone: '(904) 555-0301',
    title: 'Project Manager',
  },
  {
    id: 'c6',
    account_id: 'a3',
    name: 'Jake Monroe',
    role: 'Super',
    email: 'j.monroe@palmettocg.com',
    phone: '(904) 555-0302',
    title: 'Field Superintendent',
  },
  {
    id: 'c7',
    account_id: 'a4',
    name: 'Layla Moreno',
    role: 'PM',
    email: 'l.moreno@coastaledge.com',
    phone: '(561) 555-0401',
    title: 'Project Manager',
  },
];

export const crewMembers: CrewMember[] = [
  {
    id: 'cr1',
    name: 'Carlos Rivera',
    role: 'Lead',
    status: 'Active',
    phone: '(813) 555-1001',
    email: 'c.rivera@blockdrip.com',
    joined: '2023-03-15',
    license: 'CDL-A FL-8821943',
    emergency_contact: 'Maria Rivera',
    emergency_phone: '(813) 555-1002',
  },
  {
    id: 'cr2',
    name: 'Devonte Simmons',
    role: 'Operator',
    status: 'Active',
    phone: '(813) 555-1003',
    email: 'd.simmons@blockdrip.com',
    joined: '2023-07-01',
    license: 'FL-3456712',
    emergency_contact: 'Keisha Simmons',
    emergency_phone: '(813) 555-1004',
  },
  {
    id: 'cr3',
    name: 'Antonio Reyes',
    role: 'Laborer',
    status: 'Active',
    phone: '(813) 555-1005',
    email: 'a.reyes@blockdrip.com',
    joined: '2024-01-10',
    license: '',
    emergency_contact: 'Rosa Reyes',
    emergency_phone: '(813) 555-1006',
  },
  {
    id: 'cr4',
    name: 'Miles Tran',
    role: 'Operator',
    status: 'Active',
    phone: '(813) 555-1007',
    email: 'm.tran@blockdrip.com',
    joined: '2023-09-22',
    license: 'FL-9812341',
    emergency_contact: 'Jenny Tran',
    emergency_phone: '(813) 555-1008',
  },
  {
    id: 'cr5',
    name: 'Jerome Wallace',
    role: 'Laborer',
    status: 'On Leave',
    phone: '(813) 555-1009',
    email: 'j.wallace@blockdrip.com',
    joined: '2024-04-03',
    license: '',
    emergency_contact: 'Pamela Wallace',
    emergency_phone: '(813) 555-1010',
  },
  {
    id: 'cr6',
    name: 'Diego Santos',
    role: 'Lead',
    status: 'Active',
    phone: '(813) 555-1011',
    email: 'd.santos@blockdrip.com',
    joined: '2022-11-15',
    license: 'CDL-B FL-6672918',
    emergency_contact: 'Elena Santos',
    emergency_phone: '(813) 555-1012',
  },
];

export const materials: Material[] = [
  { id: 'm1', name: 'Rebar', unit: 'pieces' },
  { id: 'm2', name: 'Lumber (2x4)', unit: 'boards' },
  { id: 'm3', name: 'Plywood', unit: 'sheets' },
  { id: 'm4', name: 'Masonry Block', unit: 'blocks' },
  { id: 'm5', name: 'Sand', unit: 'tons' },
  { id: 'm6', name: 'Gravel', unit: 'tons' },
  { id: 'm7', name: 'PVC Pipe', unit: 'ft' },
  { id: 'm8', name: 'Conduit', unit: 'ft' },
];

export const jobs: Job[] = [
  {
    id: 'J001',
    account_id: 'a1',
    name: '1847 Harbour Isle Dr, Tampa, FL 33606',
    type: 'New Build',
    start_date: '2026-08-31',
    end_date: '2026-09-12',
    pm_id: 'c1',
    po_number: 'PO-2026-0841',
    address: '1847 Harbour Isle Dr',
    city: 'Tampa',
    state: 'FL',
    zip: '33606',
    deliver_window: 'Early Run',
    deliver_vehicle: 'Truck 01',
    notes: 'Gated community. Call Marcus before arrival.',
    crew: ['cr1', 'cr2', 'cr3'],
    status: 'Active',
    concrete_bags: 120,
    wire_size: 4,
    wire_length: 800,
    materials: [{ material_id: 'm1', amount: 48 }],
  },
  {
    id: 'J002',
    account_id: 'a2',
    name: '3320 Gulf Shore Blvd N, Naples, FL 34103',
    type: 'Addition',
    start_date: '2026-08-31',
    end_date: '2026-09-05',
    pm_id: 'c3',
    po_number: 'PO-2026-0855',
    address: '3320 Gulf Shore Blvd N',
    city: 'Naples',
    state: 'FL',
    zip: '34103',
    deliver_window: 'Late Run',
    deliver_vehicle: 'Truck 02',
    notes: '',
    crew: ['cr4', 'cr6'],
    status: 'Active',
    concrete_bags: 60,
    wire_size: 3,
    wire_length: 400,
    materials: [],
  },
  {
    id: 'J003',
    account_id: 'a3',
    name: '512 Riverside Commons, Jacksonville, FL 32204',
    type: 'New Build',
    start_date: '2026-09-08',
    end_date: '2026-09-22',
    pm_id: 'c5',
    po_number: 'PO-2026-0862',
    address: '512 Riverside Commons',
    city: 'Jacksonville',
    state: 'FL',
    zip: '32204',
    deliver_window: 'Early Run',
    deliver_vehicle: 'Truck 01',
    notes: 'Coordinate with site super Jake Monroe for access.',
    crew: ['cr1', 'cr4', 'cr6'],
    status: 'Scheduled',
    concrete_bags: 200,
    wire_size: 5,
    wire_length: 1200,
    materials: [
      { material_id: 'm4', amount: 240 },
      { material_id: 'm1', amount: 80 },
    ],
  },
  {
    id: 'J004',
    account_id: 'a1',
    name: '99 Baypoint Ct, Tampa, FL 33629',
    type: 'Addition',
    start_date: '2026-09-15',
    end_date: '2026-09-19',
    pm_id: 'c1',
    po_number: 'PO-2026-0871',
    address: '99 Baypoint Ct',
    city: 'Tampa',
    state: 'FL',
    zip: '33629',
    deliver_window: 'Early Run',
    deliver_vehicle: 'Truck 02',
    notes: '',
    crew: ['cr2', 'cr3'],
    status: 'Scheduled',
    concrete_bags: 40,
    wire_size: 3,
    wire_length: 300,
    materials: [],
  },
  {
    id: 'J005',
    account_id: 'a2',
    name: '7700 Tamiami Trail S, Naples, FL 34112',
    type: 'New Build',
    start_date: '2026-07-14',
    end_date: '2026-08-02',
    pm_id: 'c4',
    po_number: 'PO-2026-0799',
    address: '7700 Tamiami Trail S',
    city: 'Naples',
    state: 'FL',
    zip: '34112',
    deliver_window: 'Early Run',
    deliver_vehicle: 'Truck 01',
    notes: '',
    crew: ['cr1', 'cr2', 'cr4', 'cr6'],
    status: 'Completed',
    concrete_bags: 180,
    wire_size: 4,
    wire_length: 900,
    materials: [{ material_id: 'm5', amount: 12 }],
  },
];

export const invoices: Invoice[] = [
  {
    id: 'INV-2026-0041',
    account_id: 'a1',
    job_id: 'J001',
    amount: 38750,
    status: 'Pending',
    issued_date: '2026-09-13',
    due_date: '2026-10-13',
    description: 'New Build — 1847 Harbour Isle Dr',
  },
  {
    id: 'INV-2026-0039',
    account_id: 'a2',
    job_id: 'J002',
    amount: 21400,
    status: 'Pending',
    issued_date: '2026-09-06',
    due_date: '2026-10-06',
    description: 'Addition — 3320 Gulf Shore Blvd N',
  },
  {
    id: 'INV-2026-0031',
    account_id: 'a2',
    job_id: 'J005',
    amount: 67200,
    status: 'Paid',
    issued_date: '2026-08-03',
    due_date: '2026-09-03',
    description: 'New Build — 7700 Tamiami Trail S',
  },
  {
    id: 'INV-2026-0028',
    account_id: 'a4',
    job_id: '',
    amount: 14500,
    status: 'Overdue',
    issued_date: '2026-07-01',
    due_date: '2026-08-01',
    description: 'Misc Materials & Labor',
  },
];

export const reports: Report[] = [
  {
    id: 'R001',
    job_id: 'J001',
    date: '2026-08-31',
    notes: 'Poured first section without issues. Crew arrived on time.',
    crew_attendance: { cr1: true, cr2: true, cr3: false },
    materials_received: [{ material_id: 'm1', amount: 24 }],
    materials_placed: [{ material_id: 'm1', amount: 24 }],
    report: {},
  },
  {
    id: 'R002',
    job_id: 'J002',
    date: '2026-08-31',
    notes: 'Addition footings complete.',
    crew_attendance: { cr4: true, cr6: true },
    materials_received: [],
    materials_placed: [],
    report: {},
  },
  {
    id: 'R003',
    job_id: 'J005',
    date: '2026-07-15',
    notes: 'Site prep and layout complete.',
    crew_attendance: { cr1: true, cr2: true, cr4: true, cr6: false },
    materials_received: [{ material_id: 'm5', amount: 6 }],
    materials_placed: [{ material_id: 'm5', amount: 6 }],
    report: {},
  },
];

export const payrollEntries: PayrollEntry[] = [
  {
    id: 'PR001',
    crew_id: 'cr1',
    amount: 3200,
    date: '2026-08-31',
    period: 'Aug 16–31',
    status: 'Paid',
  },
  {
    id: 'PR002',
    crew_id: 'cr2',
    amount: 2800,
    date: '2026-08-31',
    period: 'Aug 16–31',
    status: 'Paid',
  },
  {
    id: 'PR003',
    crew_id: 'cr3',
    amount: 2400,
    date: '2026-08-31',
    period: 'Aug 16–31',
    status: 'Paid',
  },
  {
    id: 'PR004',
    crew_id: 'cr4',
    amount: 2800,
    date: '2026-08-31',
    period: 'Aug 16–31',
    status: 'Paid',
  },
  {
    id: 'PR005',
    crew_id: 'cr6',
    amount: 3400,
    date: '2026-08-31',
    period: 'Aug 16–31',
    status: 'Paid',
  },
  {
    id: 'PR006',
    crew_id: 'cr1',
    amount: 3200,
    date: '2026-08-15',
    period: 'Aug 1–15',
    status: 'Paid',
  },
  {
    id: 'PR007',
    crew_id: 'cr2',
    amount: 2800,
    date: '2026-08-15',
    period: 'Aug 1–15',
    status: 'Paid',
  },
];
