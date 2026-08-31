import { useState } from 'react';

const inputCls = "w-full px-3 py-2.5 rounded-xl text-cream text-sm outline-none";
const inputStyle = { background: '#383838', border: '1px solid rgba(249,247,242,0.1)', fontFamily: "'Roboto Condensed', sans-serif" };
const labelCls = "block text-xs mb-1.5 tracking-wider uppercase";
const labelStyle = { color: 'rgba(249,247,242,0.45)', fontFamily: "'Oswald', sans-serif" };

interface Props {
  onClose: () => void;
}

export default function NewAccountForm({ onClose }: Props) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: 'FL',
    zip: '',
    type: '',
    status: 'Active',
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
          <label className={labelCls} style={labelStyle}>Company Name</label>
          <input required value={form.name} onChange={(e) => set('name', e.target.value)} className={inputCls} style={inputStyle} placeholder="e.g. Sunrise Developments" />
        </div>
        <div>
          <label className={labelCls} style={labelStyle}>Email</label>
          <input required type="email" value={form.email} onChange={(e) => set('email', e.target.value)} className={inputCls} style={inputStyle} placeholder="contact@company.com" />
        </div>
        <div>
          <label className={labelCls} style={labelStyle}>Phone</label>
          <input required value={form.phone} onChange={(e) => set('phone', e.target.value)} className={inputCls} style={inputStyle} placeholder="(XXX) XXX-XXXX" />
        </div>
        <div>
          <label className={labelCls} style={labelStyle}>Type</label>
          <select required value={form.type} onChange={(e) => set('type', e.target.value)} className={inputCls} style={inputStyle}>
            <option value="">Select type</option>
            <option value="Developer">Developer</option>
            <option value="General Contractor">General Contractor</option>
            <option value="Sub-Contractor">Sub-Contractor</option>
            <option value="Owner">Owner</option>
          </select>
        </div>
        <div>
          <label className={labelCls} style={labelStyle}>Status</label>
          <select value={form.status} onChange={(e) => set('status', e.target.value)} className={inputCls} style={inputStyle}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div className="col-span-2">
          <label className={labelCls} style={labelStyle}>Address</label>
          <input required value={form.address} onChange={(e) => set('address', e.target.value)} className={inputCls} style={inputStyle} placeholder="Street address" />
        </div>
        <div>
          <label className={labelCls} style={labelStyle}>City</label>
          <input required value={form.city} onChange={(e) => set('city', e.target.value)} className={inputCls} style={inputStyle} placeholder="City" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className={labelCls} style={labelStyle}>State</label>
            <input required value={form.state} onChange={(e) => set('state', e.target.value)} className={inputCls} style={inputStyle} placeholder="FL" maxLength={2} />
          </div>
          <div>
            <label className={labelCls} style={labelStyle}>Zip</label>
            <input required value={form.zip} onChange={(e) => set('zip', e.target.value)} className={inputCls} style={inputStyle} placeholder="33XXX" />
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="w-full py-3.5 rounded-2xl text-base font-semibold transition-opacity hover:opacity-90 mt-2"
        style={{ background: '#dff478', color: '#222222', fontFamily: "'Oswald', sans-serif", letterSpacing: '0.06em' }}
      >
        CREATE ACCOUNT
      </button>
    </form>
  );
}
