import { useState } from 'react';
import { accounts, contacts, materials, JobMaterial } from '../../data/mock';
import AddMaterialRow from '../AddMaterialRow';

const inputCls = "w-full px-3 py-2.5 rounded-xl text-cream text-sm outline-none transition-colors focus:border-violet";
const inputStyle = { background: '#383838', border: '1px solid rgba(249,247,242,0.1)', fontFamily: "'Roboto Condensed', sans-serif" };
const labelCls = "block text-xs mb-1.5 tracking-wider uppercase";
const labelStyle = { color: 'rgba(249,247,242,0.45)', fontFamily: "'Oswald', sans-serif" };
const sectionStyle = { borderBottom: '1px solid rgba(249,247,242,0.06)' };

interface Props {
  onClose: () => void;
}

export default function NewJobForm({ onClose }: Props) {
  const [accountId, setAccountId] = useState('');
  const [jobType, setJobType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [pmId, setPmId] = useState('');
  const [poNumber, setPoNumber] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('FL');
  const [zip, setZip] = useState('');
  const [deliverWindow, setDeliverWindow] = useState('');
  const [deliverVehicle, setDeliverVehicle] = useState('');
  const [notes, setNotes] = useState('');
  const [concreteBags, setConcreteBags] = useState('');
  const [wireSize, setWireSize] = useState('');
  const [wireLength, setWireLength] = useState('');
  const [extraMaterials, setExtraMaterials] = useState<JobMaterial[]>([]);

  const pmOptions = contacts.filter(
    (c) => c.account_id === accountId && c.role === 'PM'
  );

  const addMaterial = () => {
    setExtraMaterials([...extraMaterials, { material_id: '', amount: 0 }]);
  };

  const updateMaterial = (i: number, v: JobMaterial) => {
    const updated = [...extraMaterials];
    updated[i] = v;
    setExtraMaterials(updated);
  };

  const removeMaterial = (i: number) => {
    setExtraMaterials(extraMaterials.filter((_, idx) => idx !== i));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="pb-5" style={sectionStyle}>
        <p className="text-sm mb-4" style={{ color: 'rgba(249,247,242,0.4)', fontFamily: "'Oswald', sans-serif", letterSpacing: '0.05em' }}>
          JOB DETAILS
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className={labelCls} style={labelStyle}>Account</label>
            <select
              required
              value={accountId}
              onChange={(e) => { setAccountId(e.target.value); setPmId(''); }}
              className={inputCls}
              style={inputStyle}
            >
              <option value="">Select account</option>
              {accounts.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls} style={labelStyle}>Job Type</label>
            <select required value={jobType} onChange={(e) => setJobType(e.target.value)} className={inputCls} style={inputStyle}>
              <option value="">Select type</option>
              <option value="New Build">New Build</option>
              <option value="Addition">Addition</option>
            </select>
          </div>
          <div>
            <label className={labelCls} style={labelStyle}>PO Number</label>
            <input required value={poNumber} onChange={(e) => setPoNumber(e.target.value)} className={inputCls} style={inputStyle} placeholder="PO-2026-XXXX" />
          </div>
          <div>
            <label className={labelCls} style={labelStyle}>Start Date</label>
            <input required type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className={inputCls} style={inputStyle} />
          </div>
          <div>
            <label className={labelCls} style={labelStyle}>End Date</label>
            <input required type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className={inputCls} style={inputStyle} />
          </div>
          <div className="col-span-2">
            <label className={labelCls} style={labelStyle}>Project Manager</label>
            <select
              required
              value={pmId}
              onChange={(e) => setPmId(e.target.value)}
              className={inputCls}
              style={inputStyle}
              disabled={!accountId}
            >
              <option value="">{accountId ? 'Select PM' : 'Select account first'}</option>
              {pmOptions.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="col-span-2">
            <label className={labelCls} style={labelStyle}>Address</label>
            <input required value={address} onChange={(e) => setAddress(e.target.value)} className={inputCls} style={inputStyle} placeholder="Street address" />
          </div>
          <div>
            <label className={labelCls} style={labelStyle}>City</label>
            <input required value={city} onChange={(e) => setCity(e.target.value)} className={inputCls} style={inputStyle} placeholder="City" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className={labelCls} style={labelStyle}>State</label>
              <input required value={state} onChange={(e) => setState(e.target.value)} className={inputCls} style={inputStyle} placeholder="FL" maxLength={2} />
            </div>
            <div>
              <label className={labelCls} style={labelStyle}>Zip</label>
              <input required value={zip} onChange={(e) => setZip(e.target.value)} className={inputCls} style={inputStyle} placeholder="33XXX" />
            </div>
          </div>
          <div>
            <label className={labelCls} style={labelStyle}>Deliver Window</label>
            <select required value={deliverWindow} onChange={(e) => setDeliverWindow(e.target.value)} className={inputCls} style={inputStyle}>
              <option value="">Select</option>
              <option value="Early Run">Early Run</option>
              <option value="Late Run">Late Run</option>
            </select>
          </div>
          <div>
            <label className={labelCls} style={labelStyle}>Deliver Vehicle</label>
            <input required value={deliverVehicle} onChange={(e) => setDeliverVehicle(e.target.value)} className={inputCls} style={inputStyle} placeholder="e.g. Truck 01" />
          </div>
          <div className="col-span-2">
            <label className={labelCls} style={labelStyle}>Notes (optional)</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} className={inputCls} style={inputStyle} placeholder="Site access notes, special instructions..." />
          </div>
        </div>
      </div>

      <div>
        <p className="text-sm mb-4" style={{ color: 'rgba(249,247,242,0.4)', fontFamily: "'Oswald', sans-serif", letterSpacing: '0.05em' }}>
          MATERIALS ORDERED
        </p>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className={labelCls} style={labelStyle}>Concrete</label>
              <div className="flex items-center gap-1.5">
                <input type="number" min={0} value={concreteBags} onChange={(e) => setConcreteBags(e.target.value)} className={inputCls} style={inputStyle} placeholder="0" />
                <span className="text-xs whitespace-nowrap" style={{ color: 'rgba(249,247,242,0.4)' }}>bags</span>
              </div>
            </div>
            <div>
              <label className={labelCls} style={labelStyle}>Wire Size</label>
              <div className="flex items-center gap-1.5">
                <input type="number" min={0} value={wireSize} onChange={(e) => setWireSize(e.target.value)} className={inputCls} style={inputStyle} placeholder="0" />
                <span className="text-xs" style={{ color: 'rgba(249,247,242,0.4)' }}>in</span>
              </div>
            </div>
            <div>
              <label className={labelCls} style={labelStyle}>Wire Length</label>
              <div className="flex items-center gap-1.5">
                <input type="number" min={0} value={wireLength} onChange={(e) => setWireLength(e.target.value)} className={inputCls} style={inputStyle} placeholder="0" />
                <span className="text-xs" style={{ color: 'rgba(249,247,242,0.4)' }}>ft</span>
              </div>
            </div>
          </div>
          {extraMaterials.length > 0 && (
            <div className="space-y-2 pt-2">
              {extraMaterials.map((mat, i) => (
                <AddMaterialRow
                  key={i}
                  materials={materials}
                  value={mat}
                  onChange={(v) => updateMaterial(i, v)}
                  onRemove={() => removeMaterial(i)}
                />
              ))}
            </div>
          )}
          <button
            type="button"
            onClick={addMaterial}
            className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl transition-colors hover:bg-white/5"
            style={{ color: '#788ce3', fontFamily: "'Oswald', sans-serif", fontWeight: 500 }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Add Material
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-3.5 rounded-2xl text-base font-semibold transition-opacity hover:opacity-90"
        style={{ background: '#dff478', color: '#222222', fontFamily: "'Oswald', sans-serif", letterSpacing: '0.06em' }}
      >
        CREATE JOB
      </button>
    </form>
  );
}
