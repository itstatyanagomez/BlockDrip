import { useState } from 'react';

const inputCls = "w-full px-3 py-2.5 rounded-xl text-cream text-sm outline-none";
const inputStyle = { background: '#383838', border: '1px solid rgba(249,247,242,0.1)', fontFamily: "'Roboto Condensed', sans-serif" };
const labelCls = "block text-xs mb-1.5 tracking-wider uppercase";
const labelStyle = { color: 'rgba(249,247,242,0.45)', fontFamily: "'Oswald', sans-serif" };

interface Props {
  onClose: () => void;
}

export default function NewCrewForm({ onClose }: Props) {
  const [form, setForm] = useState({
    name: '',
    role: '',
    status: 'Active',
    phone: '',
    email: '',
    joined: '',
    license: '',
    emergency_contact: '',
    emergency_phone: '',
  });

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className={labelCls} style={labelStyle}>Full Name</label>
          <input required value={form.name} onChange={(e) => set('name', e.target.value)} className={inputCls} style={inputStyle} placeholder="First Last" />
        </div>
        <div>
          <label className={labelCls} style={labelStyle}>Role</label>
          <select required value={form.role} onChange={(e) => set('role', e.target.value)} className={inputCls} style={inputStyle}>
            <option value="">Select role</option>
            <option value="Lead">Lead</option>
            <option value="Operator">Operator</option>
            <option value="Laborer">Laborer</option>
            <option value="Driver">Driver</option>
          </select>
        </div>
        <div>
          <label className={labelCls} style={labelStyle}>Status</label>
          <select value={form.status} onChange={(e) => set('status', e.target.value)} className={inputCls} style={inputStyle}>
            <option value="Active">Active</option>
            <option value="On Leave">On Leave</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div>
          <label className={labelCls} style={labelStyle}>Phone</label>
          <input required value={form.phone} onChange={(e) => set('phone', e.target.value)} className={inputCls} style={inputStyle} placeholder="(XXX) XXX-XXXX" />
        </div>
        <div>
          <label className={labelCls} style={labelStyle}>Email</label>
          <input type="email" value={form.email} onChange={(e) => set('email', e.target.value)} className={inputCls} style={inputStyle} placeholder="name@blockdrip.com" />
        </div>
        <div>
          <label className={labelCls} style={labelStyle}>Date Joined</label>
          <input required type="date" value={form.joined} onChange={(e) => set('joined', e.target.value)} className={inputCls} style={inputStyle} />
        </div>
        <div>
          <label className={labelCls} style={labelStyle}>License #</label>
          <input value={form.license} onChange={(e) => set('license', e.target.value)} className={inputCls} style={inputStyle} placeholder="Optional" />
        </div>
        <div>
          <label className={labelCls} style={labelStyle}>Emergency Contact</label>
          <input value={form.emergency_contact} onChange={(e) => set('emergency_contact', e.target.value)} className={inputCls} style={inputStyle} placeholder="Name" />
        </div>
        <div>
          <label className={labelCls} style={labelStyle}>Emergency Phone</label>
          <input value={form.emergency_phone} onChange={(e) => set('emergency_phone', e.target.value)} className={inputCls} style={inputStyle} placeholder="(XXX) XXX-XXXX" />
        </div>
      </div>
      <button
        type="submit"
        className="w-full py-3.5 rounded-2xl text-base font-semibold transition-opacity hover:opacity-90 mt-2"
        style={{ background: '#dff478', color: '#222222', fontFamily: "'Oswald', sans-serif", letterSpacing: '0.06em' }}
      >
        ADD CREW MEMBER
      </button>
    </form>
  );
}
