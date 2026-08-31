import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { crewMembers, jobs, payrollEntries, accounts, CrewMember } from '../data/mock';

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, { bg: string; text: string }> = {
    Active: { bg: 'rgba(223,244,120,0.12)', text: '#dff478' },
    'On Leave': { bg: 'rgba(255,180,80,0.12)', text: '#ffb450' },
    Inactive: { bg: 'rgba(249,247,242,0.06)', text: 'rgba(249,247,242,0.4)' },
  };
  const c = colors[status] ?? colors.Inactive;
  return (
    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: c.bg, color: c.text, fontFamily: "'Oswald', sans-serif", fontWeight: 500 }}>
      {status}
    </span>
  );
}

function CrewDetail({ id }: { id: string }) {
  const { closeDetail } = useApp();
  const [tab, setTab] = useState<'info' | 'jobs' | 'payroll'>('info');

  const member = crewMembers.find((c) => c.id === id);
  if (!member) return null;

  const memberJobs = jobs.filter((j) => j.crew.includes(id));
  const memberPayroll = payrollEntries.filter((p) => p.crew_id === id).sort((a, b) => b.date.localeCompare(a.date));

  const tabs = [
    { id: 'info', label: 'Info' },
    { id: 'jobs', label: 'Jobs' },
    { id: 'payroll', label: 'Payroll' },
  ] as const;

  const initials = member.name.split(' ').map((n) => n[0]).join('').toUpperCase();

  return (
    <div className="px-4 pt-6 pb-32 max-w-2xl mx-auto">
      <button
        onClick={closeDetail}
        className="flex items-center gap-2 mb-5 text-sm transition-opacity hover:opacity-70"
        style={{ color: '#788ce3', fontFamily: "'Oswald', sans-serif", fontWeight: 500 }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
        Crew
      </button>

      <div className="flex items-center gap-4 mb-6">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold shrink-0"
          style={{ background: 'linear-gradient(135deg, #283c69, #788ce3)', color: '#f9f7f2', fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.04em', fontSize: 22 }}
        >
          {initials}
        </div>
        <div>
          <h1 className="text-2xl text-cream leading-tight" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.04em' }}>
            {member.name}
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm" style={{ color: 'rgba(249,247,242,0.5)', fontFamily: "'Oswald', sans-serif" }}>{member.role}</span>
            <StatusBadge status={member.status} />
          </div>
        </div>
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

      {tab === 'info' && (
        <div className="space-y-3">
          <div className="px-4 py-4 rounded-2xl space-y-3" style={{ background: '#2d2d2d', border: '1px solid rgba(249,247,242,0.06)' }}>
            {[
              { label: 'Phone', value: member.phone },
              { label: 'Email', value: member.email },
              { label: 'Joined', value: new Date(member.joined + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) },
              member.license ? { label: 'License', value: member.license } : null,
            ].filter(Boolean).map((item) => (
              <div key={item!.label} className="flex items-start justify-between gap-4">
                <span className="text-xs shrink-0" style={{ color: 'rgba(249,247,242,0.4)', fontFamily: "'Oswald', sans-serif", fontWeight: 500, letterSpacing: '0.04em' }}>{item!.label}</span>
                <span className="text-sm text-cream text-right">{item!.value}</span>
              </div>
            ))}
          </div>
          {(member.emergency_contact || member.emergency_phone) && (
            <div className="px-4 py-4 rounded-2xl" style={{ background: '#2d2d2d', border: '1px solid rgba(249,247,242,0.06)' }}>
              <p className="text-xs mb-3" style={{ color: 'rgba(249,247,242,0.4)', fontFamily: "'Oswald', sans-serif", letterSpacing: '0.05em' }}>EMERGENCY</p>
              <div className="space-y-2">
                {member.emergency_contact && (
                  <div className="flex justify-between">
                    <span className="text-xs" style={{ color: 'rgba(249,247,242,0.4)', fontFamily: "'Oswald', sans-serif" }}>Contact</span>
                    <span className="text-sm text-cream">{member.emergency_contact}</span>
                  </div>
                )}
                {member.emergency_phone && (
                  <div className="flex justify-between">
                    <span className="text-xs" style={{ color: 'rgba(249,247,242,0.4)', fontFamily: "'Oswald', sans-serif" }}>Phone</span>
                    <span className="text-sm text-cream">{member.emergency_phone}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {tab === 'jobs' && (
        <div className="space-y-3">
          {memberJobs.length === 0 ? (
            <p className="text-sm text-center py-8" style={{ color: 'rgba(249,247,242,0.3)' }}>No jobs assigned</p>
          ) : memberJobs.map((j) => {
            const account = accounts.find((a) => a.id === j.account_id);
            return (
              <div key={j.id} className="px-4 py-4 rounded-2xl" style={{ background: '#2d2d2d', border: '1px solid rgba(249,247,242,0.06)' }}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-cream font-medium truncate">{j.address}, {j.city}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'rgba(249,247,242,0.4)' }}>{account?.name}</p>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full shrink-0 ml-2" style={{ background: j.status === 'Active' ? 'rgba(223,244,120,0.12)' : j.status === 'Scheduled' ? 'rgba(120,140,227,0.12)' : 'rgba(249,247,242,0.06)', color: j.status === 'Active' ? '#dff478' : j.status === 'Scheduled' ? '#788ce3' : 'rgba(249,247,242,0.5)', fontFamily: "'Oswald', sans-serif" }}>{j.status}</span>
                </div>
                <p className="text-xs" style={{ color: 'rgba(249,247,242,0.35)' }}>
                  {new Date(j.start_date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – {new Date(j.end_date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {tab === 'payroll' && (
        <div className="space-y-3">
          {memberPayroll.length === 0 ? (
            <p className="text-sm text-center py-8" style={{ color: 'rgba(249,247,242,0.3)' }}>No payroll records</p>
          ) : memberPayroll.map((p) => (
            <div key={p.id} className="px-4 py-4 rounded-2xl flex items-center justify-between" style={{ background: '#2d2d2d', border: '1px solid rgba(249,247,242,0.06)' }}>
              <div>
                <p className="text-sm text-cream font-medium">{p.period}</p>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(249,247,242,0.4)' }}>{new Date(p.date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
              </div>
              <div className="text-right">
                <p className="text-lg" style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, color: '#dff478' }}>${p.amount.toLocaleString()}</p>
                <span className="text-xs" style={{ color: p.status === 'Paid' ? '#92bad5' : '#ffb450', fontFamily: "'Oswald', sans-serif" }}>{p.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CrewCard({ member, onClick }: { member: CrewMember; onClick: () => void }) {
  const initials = member.name.split(' ').map((n) => n[0]).join('').toUpperCase();
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-4 py-4 rounded-2xl transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center gap-4"
      style={{ background: '#2d2d2d', border: '1px solid rgba(249,247,242,0.07)' }}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold shrink-0"
        style={{ background: 'linear-gradient(135deg, #283c69, #788ce3)', color: '#f9f7f2', fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.04em', fontSize: 15 }}
      >
        {initials}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-cream">{member.name}</p>
        <p className="text-xs mt-0.5" style={{ color: 'rgba(249,247,242,0.4)', fontFamily: "'Oswald', sans-serif" }}>{member.role}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <StatusBadge status={member.status} />
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ color: 'rgba(249,247,242,0.2)' }}><polyline points="9 18 15 12 9 6"/></svg>
      </div>
    </button>
  );
}

export default function CrewPage({ detailId }: { detailId?: string }) {
  const { openDetail } = useApp();
  const [search, setSearch] = useState('');

  if (detailId) return <CrewDetail id={detailId} />;

  const filtered = crewMembers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.role.toLowerCase().includes(search.toLowerCase())
  );

  const active = filtered.filter((c) => c.status === 'Active');
  const others = filtered.filter((c) => c.status !== 'Active');

  return (
    <div className="px-4 pt-8 pb-32 max-w-2xl mx-auto">
      <h1 className="text-5xl text-cream mb-6 leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.04em' }}>
        Crew
      </h1>

      <div className="relative mb-5">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'rgba(249,247,242,0.3)' }}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search crew..."
          className="w-full pl-9 pr-4 py-3 rounded-2xl text-cream text-sm outline-none"
          style={{ background: '#2d2d2d', border: '1px solid rgba(249,247,242,0.08)', fontFamily: "'Roboto Condensed', sans-serif" }}
        />
      </div>

      {active.length > 0 && (
        <div className="mb-5">
          <p className="text-xs mb-3 px-1" style={{ color: 'rgba(249,247,242,0.4)', fontFamily: "'Oswald', sans-serif", letterSpacing: '0.05em' }}>ACTIVE ({active.length})</p>
          <div className="space-y-2">
            {active.map((m) => <CrewCard key={m.id} member={m} onClick={() => openDetail('crew', m.id)} />)}
          </div>
        </div>
      )}
      {others.length > 0 && (
        <div>
          <p className="text-xs mb-3 px-1" style={{ color: 'rgba(249,247,242,0.4)', fontFamily: "'Oswald', sans-serif", letterSpacing: '0.05em' }}>OTHER</p>
          <div className="space-y-2">
            {others.map((m) => <CrewCard key={m.id} member={m} onClick={() => openDetail('crew', m.id)} />)}
          </div>
        </div>
      )}
    </div>
  );
}
