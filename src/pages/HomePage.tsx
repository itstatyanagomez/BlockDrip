import { useApp } from '../context/AppContext';
import { jobs, accounts } from '../data/mock';

const today = new Date().toISOString().split('T')[0];

function formatDate(d: string) {
  return new Date(d + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, { bg: string; text: string }> = {
    Active: { bg: 'rgba(223,244,120,0.12)', text: '#dff478' },
    Scheduled: { bg: 'rgba(120,140,227,0.12)', text: '#788ce3' },
    Completed: { bg: 'rgba(146,186,213,0.12)', text: '#92bad5' },
    'On Hold': { bg: 'rgba(255,180,80,0.12)', text: '#ffb450' },
  };
  const c = colors[status] ?? { bg: 'rgba(255,255,255,0.08)', text: '#f9f7f2' };
  return (
    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: c.bg, color: c.text, fontFamily: "'Oswald', sans-serif", fontWeight: 500 }}>
      {status}
    </span>
  );
}

export default function HomePage() {
  const { openModal, openDetail, navigate } = useApp();

  const todayJobs = jobs.filter(
    (j) => j.start_date <= today && j.end_date >= today && j.status !== 'Completed'
  );
  const upcomingJobs = jobs
    .filter((j) => j.start_date > today && j.status === 'Scheduled')
    .sort((a, b) => a.start_date.localeCompare(b.start_date))
    .slice(0, 5);

  const quickActions = [
    { label: 'Add Job', icon: '⊕', action: () => openModal('new-job'), accent: '#dff478' },
    { label: 'New Report', icon: '≡', action: () => openModal('eod-report'), accent: '#788ce3' },
    { label: 'Add Crew', icon: '＋', action: () => openModal('new-crew'), accent: '#92bad5' },
    { label: 'Add Account', icon: '◉', action: () => openModal('new-account'), accent: '#283c69' },
  ];

  return (
    <div className="px-4 pt-8 pb-32 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1
          className="text-5xl text-cream leading-none"
          style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.04em' }}
        >
          BLOCKDRIP
        </h1>
        <p className="text-sm mt-1" style={{ color: 'rgba(249,247,242,0.4)', fontFamily: "'Oswald', sans-serif" }}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-8">
        {quickActions.map((qa) => (
          <button
            key={qa.label}
            onClick={qa.action}
            className="flex items-center gap-3 px-4 py-4 rounded-2xl text-left transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: qa.accent === '#dff478' ? '#dff478' : '#2d2d2d',
              border: qa.accent === '#dff478' ? 'none' : '1px solid rgba(249,247,242,0.08)',
            }}
          >
            <span
              className="text-xl w-9 h-9 rounded-xl flex items-center justify-center"
              style={{
                background: qa.accent === '#dff478' ? 'rgba(0,0,0,0.1)' : qa.accent,
                color: qa.accent === '#dff478' ? '#222' : '#f9f7f2',
                fontSize: 18,
              }}
            >
              {qa.icon}
            </span>
            <span
              className="text-sm font-semibold"
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 600,
                color: qa.accent === '#dff478' ? '#222222' : '#f9f7f2',
                letterSpacing: '0.04em',
              }}
            >
              {qa.label}
            </span>
          </button>
        ))}
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2
            className="text-xl text-cream"
            style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, letterSpacing: '0.04em' }}
          >
            Today
          </h2>
          <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: '#dff478', color: '#222' }}>
            {todayJobs.length} jobs
          </span>
        </div>
        {todayJobs.length === 0 ? (
          <div className="px-4 py-6 rounded-2xl text-center" style={{ background: '#2d2d2d', border: '1px solid rgba(249,247,242,0.06)' }}>
            <p className="text-sm" style={{ color: 'rgba(249,247,242,0.35)' }}>No jobs scheduled for today</p>
          </div>
        ) : (
          <div className="space-y-3">
            {todayJobs.map((job) => {
              const account = accounts.find((a) => a.id === job.account_id);
              return (
                <button
                  key={job.id}
                  onClick={() => { navigate('jobs'); openDetail('job', job.id); }}
                  className="w-full text-left px-4 py-4 rounded-2xl transition-all hover:scale-[1.01] active:scale-[0.99]"
                  style={{ background: '#2d2d2d', border: '1px solid rgba(249,247,242,0.07)' }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <StatusBadge status={job.status} />
                        <span className="text-xs" style={{ color: 'rgba(249,247,242,0.35)', fontFamily: "'Oswald', sans-serif" }}>{job.type}</span>
                      </div>
                      <p className="text-sm font-medium text-cream truncate">{job.address}, {job.city}</p>
                      <p className="text-xs mt-0.5" style={{ color: 'rgba(249,247,242,0.45)' }}>{account?.name}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs" style={{ color: 'rgba(249,247,242,0.4)', fontFamily: "'Oswald', sans-serif" }}>{job.deliver_window}</p>
                      <p className="text-xs mt-0.5" style={{ color: 'rgba(249,247,242,0.4)' }}>{job.deliver_vehicle}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2
            className="text-xl text-cream"
            style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, letterSpacing: '0.04em' }}
          >
            Upcoming
          </h2>
        </div>
        {upcomingJobs.length === 0 ? (
          <div className="px-4 py-6 rounded-2xl text-center" style={{ background: '#2d2d2d', border: '1px solid rgba(249,247,242,0.06)' }}>
            <p className="text-sm" style={{ color: 'rgba(249,247,242,0.35)' }}>No upcoming jobs</p>
          </div>
        ) : (
          <div className="space-y-3">
            {upcomingJobs.map((job) => {
              const account = accounts.find((a) => a.id === job.account_id);
              return (
                <button
                  key={job.id}
                  onClick={() => { navigate('jobs'); openDetail('job', job.id); }}
                  className="w-full text-left px-4 py-4 rounded-2xl transition-all hover:scale-[1.01]"
                  style={{ background: '#2d2d2d', border: '1px solid rgba(249,247,242,0.07)' }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-cream truncate">{job.address}, {job.city}</p>
                      <p className="text-xs mt-0.5" style={{ color: 'rgba(249,247,242,0.45)' }}>{account?.name}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm" style={{ color: '#788ce3', fontFamily: "'Oswald', sans-serif", fontWeight: 500 }}>
                        {formatDate(job.start_date)}
                      </p>
                      <p className="text-xs" style={{ color: 'rgba(249,247,242,0.35)' }}>{job.type}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
