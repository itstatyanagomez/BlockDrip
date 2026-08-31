import { useState } from 'react';
import { jobs, crewMembers, materials, JobMaterial } from '../../data/mock';
import AddMaterialRow from '../AddMaterialRow';

const inputCls = "w-full px-3 py-2.5 rounded-xl text-cream text-sm outline-none";
const inputStyle = { background: '#383838', border: '1px solid rgba(249,247,242,0.1)', fontFamily: "'Roboto Condensed', sans-serif" };
const labelCls = "block text-xs mb-1.5 tracking-wider uppercase";
const labelStyle = { color: 'rgba(249,247,242,0.45)', fontFamily: "'Oswald', sans-serif" };
const sectionStyle = { borderBottom: '1px solid rgba(249,247,242,0.06)' };

interface Props {
  onClose: () => void;
}

export default function EODReportForm({ onClose }: Props) {
  const today = new Date().toISOString().split('T')[0];
  const [jobId, setJobId] = useState('');
  const [date, setDate] = useState(today);
  const [notes, setNotes] = useState('');
  const [received, setReceived] = useState<JobMaterial[]>([]);
  const [placed, setPlaced] = useState<JobMaterial[]>([]);
  const [attendance, setAttendance] = useState<Record<string, boolean>>({});

  const selectedJob = jobs.find((j) => j.id === jobId);
  const jobCrew = selectedJob
    ? crewMembers.filter((c) => selectedJob.crew.includes(c.id))
    : [];

  const handleJobChange = (id: string) => {
    setJobId(id);
    const job = jobs.find((j) => j.id === id);
    if (job) {
      const init: Record<string, boolean> = {};
      job.crew.forEach((cid) => (init[cid] = true));
      setAttendance(init);
    } else {
      setAttendance({});
    }
  };

  const addReceived = () => setReceived([...received, { material_id: '', amount: 0 }]);
  const addPlaced = () => setPlaced([...placed, { material_id: '', amount: 0 }]);

  const updateReceived = (i: number, v: JobMaterial) => {
    const u = [...received]; u[i] = v; setReceived(u);
  };
  const updatePlaced = (i: number, v: JobMaterial) => {
    const u = [...placed]; u[i] = v; setPlaced(u);
  };

  const toggleAttendance = (id: string) => {
    setAttendance((a) => ({ ...a, [id]: !a[id] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="pb-5 space-y-4" style={sectionStyle}>
        <p className="text-sm" style={{ color: 'rgba(249,247,242,0.4)', fontFamily: "'Oswald', sans-serif", letterSpacing: '0.05em' }}>DETAILS</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className={labelCls} style={labelStyle}>Job</label>
            <select required value={jobId} onChange={(e) => handleJobChange(e.target.value)} className={inputCls} style={inputStyle}>
              <option value="">Select job</option>
              {jobs.filter(j => j.status !== 'Completed').map((j) => (
                <option key={j.id} value={j.id}>{j.name}</option>
              ))}
            </select>
          </div>
          <div className="col-span-2">
            <label className={labelCls} style={labelStyle}>Date</label>
            <input required type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputCls} style={inputStyle} />
          </div>
          <div className="col-span-2">
            <label className={labelCls} style={labelStyle}>Notes (optional)</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} className={inputCls} style={inputStyle} placeholder="Summary of work completed today..." />
          </div>
        </div>
      </div>

      <div className="pb-5" style={sectionStyle}>
        <p className="text-sm mb-4" style={{ color: 'rgba(249,247,242,0.4)', fontFamily: "'Oswald', sans-serif", letterSpacing: '0.05em' }}>MATERIALS RECEIVED</p>
        <div className="space-y-2">
          {received.map((mat, i) => (
            <AddMaterialRow
              key={i}
              materials={materials}
              value={mat}
              onChange={(v) => updateReceived(i, v)}
              onRemove={() => setReceived(received.filter((_, idx) => idx !== i))}
            />
          ))}
          <button
            type="button"
            onClick={addReceived}
            className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl transition-colors hover:bg-white/5"
            style={{ color: '#788ce3', fontFamily: "'Oswald', sans-serif", fontWeight: 500 }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Add Received
          </button>
        </div>
      </div>

      <div className="pb-5" style={sectionStyle}>
        <p className="text-sm mb-4" style={{ color: 'rgba(249,247,242,0.4)', fontFamily: "'Oswald', sans-serif", letterSpacing: '0.05em' }}>MATERIALS PLACED</p>
        <div className="space-y-2">
          {placed.map((mat, i) => (
            <AddMaterialRow
              key={i}
              materials={materials}
              value={mat}
              onChange={(v) => updatePlaced(i, v)}
              onRemove={() => setPlaced(placed.filter((_, idx) => idx !== i))}
            />
          ))}
          <button
            type="button"
            onClick={addPlaced}
            className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl transition-colors hover:bg-white/5"
            style={{ color: '#788ce3', fontFamily: "'Oswald', sans-serif", fontWeight: 500 }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Add Placed
          </button>
        </div>
      </div>

      <div>
        <p className="text-sm mb-4" style={{ color: 'rgba(249,247,242,0.4)', fontFamily: "'Oswald', sans-serif", letterSpacing: '0.05em' }}>CREW ATTENDANCE</p>
        {!jobId && (
          <p className="text-sm" style={{ color: 'rgba(249,247,242,0.3)' }}>Select a job to see assigned crew.</p>
        )}
        <div className="space-y-2">
          {jobCrew.map((member) => {
            const present = attendance[member.id] !== false;
            return (
              <div
                key={member.id}
                className="flex items-center justify-between px-4 py-3 rounded-xl"
                style={{ background: '#383838', border: '1px solid rgba(249,247,242,0.06)' }}
              >
                <div>
                  <p className="text-sm text-cream font-medium">{member.name}</p>
                  <p className="text-xs" style={{ color: 'rgba(249,247,242,0.4)' }}>{member.role}</p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleAttendance(member.id)}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
                  style={{
                    background: present ? 'rgba(223,244,120,0.15)' : 'rgba(255,80,80,0.12)',
                    border: present ? '1px solid rgba(223,244,120,0.3)' : '1px solid rgba(255,80,80,0.25)',
                  }}
                >
                  {present ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#dff478" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff5050" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-3.5 rounded-2xl text-base font-semibold transition-opacity hover:opacity-90"
        style={{ background: '#dff478', color: '#222222', fontFamily: "'Oswald', sans-serif", letterSpacing: '0.06em' }}
      >
        SUBMIT REPORT
      </button>
    </form>
  );
}
