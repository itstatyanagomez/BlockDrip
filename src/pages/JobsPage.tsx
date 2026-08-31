import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { jobs, accounts, contacts, crewMembers, reports, invoices, materials, Job } from '../data/mock';

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, { bg: string; text: string }> = {
    Active: { bg: 'rgba(223,244,120,0.12)', text: '#dff478' },
    Scheduled: { bg: 'rgba(120,140,227,0.12)', text: '#788ce3' },
    Completed: { bg: 'rgba(146,186,213,0.12)', text: '#92bad5' },
    'On Hold': { bg: 'rgba(255,180,80,0.12)', text: '#ffb450' },
  };
  const c = colors[status] ?? { bg: 'rgba(249,247,242,0.06)', text: 'rgba(249,247,242,0.4)' };
  return (
    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: c.bg, color: c.text, fontFamily: "'Oswald', sans-serif", fontWeight: 500 }}>
      {status}
    </span>
  );
}

function fmt(d: string) {
  return new Date(d + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function JobDetail({ id }: { id: string }) {
  const { closeDetail } = useApp();
  const [tab, setTab] = useState<'details' | 'reports' | 'payments'>('details');

  const job = jobs.find((j) => j.id === id);
  if (!job) return null;

  const account = accounts.find((a) => a.id === job.account_id);
  const pm = contacts.find((c) => c.id === job.pm_id);
  const jobCrew = crewMembers.filter((c) => job.crew.includes(c.id));
  const jobReports = reports.filter((r) => r.job_id === id).sort((a, b) => b.date.localeCompare(a.date));
  const jobInvoice = invoices.find((i) => i.job_id === id);

  const tabs = [
    { id: 'details', label: 'Details' },
    { id: 'reports', label: 'Reports' },
    { id: 'payments', label: 'Payments' },
  ] as const;

  return (
    <div className="px-4 pt-6 pb-32 max-w-2xl mx-auto">
      <button
        onClick={closeDetail}
        className="flex items-center gap-2 mb-5 text-sm transition-opacity hover:opacity-70"
        style={{ color: '#788ce3', fontFamily: "'Oswald', sans-serif", fontWeight: 500 }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
        Jobs
      </button>

      <div className="mb-5">
        <div className="flex items-center gap-2 mb-1">
          <StatusBadge status={job.status} />
          <span className="text-xs" style={{ color: 'rgba(249,247,242,0.4)', fontFamily: "'Oswald', sans-serif" }}>{job.type}</span>
        </div>
        <h1 className="text-2xl text-cream leading-snug" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.03em' }}>
          {job.address}
        </h1>
        <p className="text-sm" style={{ color: 'rgba(249,247,242,0.5)', fontFamily: "'Oswald', sans-serif" }}>{job.city}, {job.state} {job.zip}</p>
      </div>

      <div className="flex gap-1 mb-6 p-1 rounded-2xl" style={{ background: '#2d2d2d' }}>
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="flex-1 py-2 rounded-xl text-sm transition-all"
            style={{
              background: tab === t.id ? '#383838' : 'transparent',
              color: tab === t.id ? '#f9f7f2' : 'rgba(249,247,242,0.4)',
              fontFamily: "'Oswald', sans-serif",
              fontWeight: tab === t.id ? 600 : 400,
              letterSpacing: '0.04em',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'details' && (
        <div className="space-y-4">
          <div className="px-4 py-4 rounded-2xl space-y-3" style={{ background: '#2d2d2d', border: '1px solid rgba(249,247,242,0.06)' }}>
            {[
              { label: 'Account', value: account?.name ?? '—' },
              { label: 'PM', value: pm?.name ?? '—' },
              { label: 'PO #', value: job.po_number },
              { label: 'Start', value: fmt(job.start_date) },
              { label: 'End', value: fmt(job.end_date) },
              { label: 'Deliver Window', value: job.deliver_window },
              { label: 'Vehicle', value: job.deliver_vehicle },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-start justify-between gap-4">
                <span className="text-xs shrink-0" style={{ color: 'rgba(249,247,242,0.4)', fontFamily: "'Oswald', sans-serif", fontWeight: 500, letterSpacing: '0.04em' }}>{label}</span>
                <span className="text-sm text-cream text-right">{value}</span>
              </div>
            ))}
          </div>

          <div className="px-4 py-4 rounded-2xl" style={{ background: '#2d2d2d', border: '1px solid rgba(249,247,242,0.06)' }}>
            <p className="text-xs mb-3" style={{ color: 'rgba(249,247,242,0.4)', fontFamily: "'Oswald', sans-serif", letterSpacing: '0.05em' }}>MATERIALS</p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-xs" style={{ color: 'rgba(249,247,242,0.4)', fontFamily: "'Oswald', sans-serif" }}>Concrete</span>
                <span className="text-sm text-cream">{job.concrete_bags} bags</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs" style={{ color: 'rgba(249,247,242,0.4)', fontFamily: "'Oswald', sans-serif" }}>Wire Size</span>
                <span className="text-sm text-cream">{job.wire_size} in</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs" style={{ color: 'rgba(249,247,242,0.4)', fontFamily: "'Oswald', sans-serif" }}>Wire Length</span>
                <span className="text-sm text-cream">{job.wire_length} ft</span>
              </div>
              {job.materials.map((m) => {
                const mat = materials.find((mt) => mt.id === m.material_id);
                return mat ? (
                  <div key={m.material_id} className="flex justify-between">
                    <span className="text-xs" style={{ color: 'rgba(249,247,242,0.4)', fontFamily: "'Oswald', sans-serif" }}>{mat.name}</span>
                    <span className="text-sm text-cream">{m.amount} {mat.unit}</span>
                  </div>
                ) : null;
              })}
            </div>
          </div>

          {jobCrew.length > 0 && (
            <div className="px-4 py-4 rounded-2xl" style={{ background: '#2d2d2d', border: '1px solid rgba(249,247,242,0.06)' }}>
              <p className="text-xs mb-3" style={{ color: 'rgba(249,247,242,0.4)', fontFamily: "'Oswald', sans-serif", letterSpacing: '0.05em' }}>CREW ({jobCrew.length})</p>
              <div className="space-y-2">
                {jobCrew.map((c) => (
                  <div key={c.id} className="flex items-center justify-between">
                    <span className="text-sm text-cream">{c.name}</span>
                    <span className="text-xs" style={{ color: 'rgba(249,247,242,0.4)', fontFamily: "'Oswald', sans-serif" }}>{c.role}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {job.notes && (
            <div className="px-4 py-4 rounded-2xl" style={{ background: '#2d2d2d', border: '1px solid rgba(249,247,242,0.06)' }}>
              <p className="text-xs mb-2" style={{ color: 'rgba(249,247,242,0.4)', fontFamily: "'Oswald', sans-serif", letterSpacing: '0.05em' }}>NOTES</p>
              <p className="text-sm text-cream/80">{job.notes}</p>
            </div>
          )}
        </div>
      )}

      {tab === 'reports' && (
        <div className="space-y-3">
          {jobReports.length === 0 ? (
            <p className="text-sm text-center py-8" style={{ color: 'rgba(249,247,242,0.3)' }}>No reports submitted yet</p>
          ) : jobReports.map((r) => {
            const presentCount = Object.values(r.crew_attendance).filter(Boolean).length;
            const totalCount = Object.keys(r.crew_attendance).length;
            return (
              <div key={r.id} className="px-4 py-4 rounded-2xl" style={{ background: '#2d2d2d', border: '1px solid rgba(249,247,242,0.06)' }}>
                <div className="flex items-start justify-between mb-2">
                  <p className="text-sm font-medium text-cream">{fmt(r.date)}</p>
                  <span className="text-xs" style={{ color: '#788ce3', fontFamily: "'Oswald', sans-serif" }}>
                    {presentCount}/{totalCount} crew
                  </span>
                </div>
                {r.notes && <p className="text-xs text-cream/60 mb-2">{r.notes}</p>}
                {(r.materials_received.length > 0 || r.materials_placed.length > 0) && (
                  <div className="flex gap-4 pt-2" style={{ borderTop: '1px solid rgba(249,247,242,0.06)' }}>
                    <span className="text-xs" style={{ color: 'rgba(249,247,242,0.35)', fontFamily: "'Oswald', sans-serif" }}>
                      {r.materials_received.length} received · {r.materials_placed.length} placed
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {tab === 'payments' && (
        <div>
          {!jobInvoice ? (
            <p className="text-sm text-center py-8" style={{ color: 'rgba(249,247,242,0.3)' }}>No invoice linked to this job</p>
          ) : (
            <div className="px-4 py-5 rounded-2xl" style={{ background: '#2d2d2d', border: '1px solid rgba(249,247,242,0.06)' }}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-cream">{jobInvoice.id}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(249,247,242,0.4)' }}>{jobInvoice.description}</p>
                </div>
                <StatusBadge status={jobInvoice.status} />
              </div>
              <p className="text-3xl mb-4" style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, color: '#f9f7f2' }}>
                ${jobInvoice.amount.toLocaleString()}
              </p>
              <div className="space-y-2 pt-3" style={{ borderTop: '1px solid rgba(249,247,242,0.06)' }}>
                <div className="flex justify-between">
                  <span className="text-xs" style={{ color: 'rgba(249,247,242,0.4)', fontFamily: "'Oswald', sans-serif" }}>Issued</span>
                  <span className="text-sm text-cream">{fmt(jobInvoice.issued_date)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs" style={{ color: 'rgba(249,247,242,0.4)', fontFamily: "'Oswald', sans-serif" }}>Due</span>
                  <span className="text-sm" style={{ color: jobInvoice.status === 'Overdue' ? '#ff6b6b' : '#f9f7f2' }}>{fmt(jobInvoice.due_date)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function CalendarView({ onJobClick }: { onJobClick: (id: string) => void }) {
  const [viewDate, setViewDate] = useState(new Date());
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const getJobsForDay = (day: number | null) => {
    if (!day) return [];
    const pad = (n: number) => String(n).padStart(2, '0');
    const dateStr = `${year}-${pad(month + 1)}-${pad(day)}`;
    return jobs.filter((j) => j.start_date <= dateStr && j.end_date >= dateStr);
  };

  const today = new Date().toISOString().split('T')[0];
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const jobColors: Record<string, string> = {
    Active: '#dff478',
    Scheduled: '#788ce3',
    Completed: '#92bad5',
    'On Hold': '#ffb450',
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-white/10" style={{ color: 'rgba(249,247,242,0.6)' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <h2 style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: 18, letterSpacing: '0.04em', color: '#f9f7f2' }}>
          {monthNames[month]} {year}
        </h2>
        <button onClick={nextMonth} className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-white/10" style={{ color: 'rgba(249,247,242,0.6)' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>

      <div className="grid grid-cols-7 mb-2">
        {dayNames.map((d) => (
          <div key={d} className="text-center py-1 text-xs" style={{ color: 'rgba(249,247,242,0.35)', fontFamily: "'Oswald', sans-serif", letterSpacing: '0.04em' }}>
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (!day) return <div key={i} />;
          const pad = (n: number) => String(n).padStart(2, '0');
          const dateStr = `${year}-${pad(month + 1)}-${pad(day)}`;
          const isToday = dateStr === today;
          const dayJobs = getJobsForDay(day);
          return (
            <div
              key={i}
              className="rounded-xl p-1.5 min-h-[56px]"
              style={{
                background: isToday ? 'rgba(120,140,227,0.15)' : 'rgba(249,247,242,0.03)',
                border: isToday ? '1px solid rgba(120,140,227,0.35)' : '1px solid rgba(249,247,242,0.04)',
              }}
            >
              <p
                className="text-xs mb-1"
                style={{
                  color: isToday ? '#788ce3' : 'rgba(249,247,242,0.5)',
                  fontFamily: "'Oswald', sans-serif",
                  fontWeight: isToday ? 700 : 400,
                }}
              >
                {day}
              </p>
              {dayJobs.slice(0, 2).map((j) => (
                <button
                  key={j.id}
                  onClick={() => onJobClick(j.id)}
                  className="w-full text-left mb-0.5 px-1 py-0.5 rounded text-xs leading-tight"
                  style={{
                    background: `${jobColors[j.status] ?? '#788ce3'}18`,
                    color: jobColors[j.status] ?? '#788ce3',
                    fontFamily: "'Roboto Condensed', sans-serif",
                    fontSize: 9,
                  }}
                >
                  {j.city}
                </button>
              ))}
              {dayJobs.length > 2 && (
                <p className="text-xs" style={{ color: 'rgba(249,247,242,0.3)', fontSize: 9 }}>+{dayJobs.length - 2}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function JobCard({ job, onClick }: { job: Job; onClick: () => void }) {
  const account = accounts.find((a) => a.id === job.account_id);
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-4 py-4 rounded-2xl transition-all hover:scale-[1.01] active:scale-[0.99]"
      style={{ background: '#2d2d2d', border: '1px solid rgba(249,247,242,0.07)' }}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <StatusBadge status={job.status} />
          <span className="text-xs" style={{ color: 'rgba(249,247,242,0.4)', fontFamily: "'Oswald', sans-serif" }}>{job.type}</span>
        </div>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ color: 'rgba(249,247,242,0.2)', flexShrink: 0 }}><polyline points="9 18 15 12 9 6"/></svg>
      </div>
      <p className="text-sm font-medium text-cream truncate mb-0.5">{job.address}, {job.city}</p>
      <div className="flex items-center justify-between">
        <p className="text-xs" style={{ color: 'rgba(249,247,242,0.4)' }}>{account?.name}</p>
        <p className="text-xs" style={{ color: 'rgba(249,247,242,0.35)', fontFamily: "'Oswald', sans-serif" }}>
          {new Date(job.start_date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – {new Date(job.end_date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </p>
      </div>
    </button>
  );
}

export default function JobsPage({ detailId }: { detailId?: string }) {
  const { openDetail } = useApp();
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [search, setSearch] = useState('');

  if (detailId) return <JobDetail id={detailId} />;

  const filtered = jobs.filter((j) =>
    j.name.toLowerCase().includes(search.toLowerCase()) ||
    j.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="px-4 pt-8 pb-32 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-5xl text-cream leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.04em' }}>
          Jobs
        </h1>
        <div className="flex gap-1 p-1 rounded-xl" style={{ background: '#2d2d2d' }}>
          {(['list', 'calendar'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setViewMode(m)}
              className="px-3 py-1.5 rounded-lg text-xs transition-all"
              style={{
                background: viewMode === m ? '#383838' : 'transparent',
                color: viewMode === m ? '#f9f7f2' : 'rgba(249,247,242,0.4)',
                fontFamily: "'Oswald', sans-serif",
                fontWeight: viewMode === m ? 600 : 400,
                letterSpacing: '0.04em',
              }}
            >
              {m === 'list' ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              )}
            </button>
          ))}
        </div>
      </div>

      {viewMode === 'list' && (
        <>
          <div className="relative mb-5">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'rgba(249,247,242,0.3)' }}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search jobs..."
              className="w-full pl-9 pr-4 py-3 rounded-2xl text-cream text-sm outline-none"
              style={{ background: '#2d2d2d', border: '1px solid rgba(249,247,242,0.08)', fontFamily: "'Roboto Condensed', sans-serif" }}
            />
          </div>
          <div className="space-y-3">
            {filtered.map((j) => (
              <JobCard key={j.id} job={j} onClick={() => openDetail('job', j.id)} />
            ))}
            {filtered.length === 0 && (
              <p className="text-sm text-center py-8" style={{ color: 'rgba(249,247,242,0.3)' }}>No jobs found</p>
            )}
          </div>
        </>
      )}

      {viewMode === 'calendar' && (
        <CalendarView onJobClick={(id) => openDetail('job', id)} />
      )}
    </div>
  );
}
