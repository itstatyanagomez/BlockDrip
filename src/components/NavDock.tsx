import { useApp, Page } from '../context/AppContext';

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L12 3L21 9.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5Z" fill={active ? 'currentColor' : 'none'} />
      <polyline points="9,22 9,12 15,12 15,22" stroke={active ? '#222' : 'currentColor'} />
    </svg>
  );
}

function AccountsIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="3" fill={active ? 'currentColor' : 'none'} />
      <path d="M8 10h8M8 14h5" stroke={active ? '#222' : 'currentColor'} />
    </svg>
  );
}

function CrewIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="7" r="3" fill={active ? 'currentColor' : 'none'} />
      <circle cx="16" cy="8" r="2.5" fill={active ? 'currentColor' : 'none'} />
      <path d="M3 20v-1a6 6 0 0 1 6-6 6 6 0 0 1 6 6v1" />
      <path d="M16 14c1.7 0 4 1 4 4v2" />
    </svg>
  );
}

function InvoicesIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill={active ? 'currentColor' : 'none'} />
      <polyline points="14 2 14 8 20 8" stroke={active ? '#222' : 'currentColor'} />
      <line x1="8" y1="13" x2="16" y2="13" stroke={active ? '#222' : 'currentColor'} />
      <line x1="8" y1="17" x2="13" y2="17" stroke={active ? '#222' : 'currentColor'} />
    </svg>
  );
}

function JobsIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="3" fill={active ? 'currentColor' : 'none'} />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" stroke={active ? '#222' : 'currentColor'} />
      <line x1="12" y1="12" x2="12" y2="16" stroke={active ? '#222' : 'currentColor'} />
      <line x1="10" y1="14" x2="14" y2="14" stroke={active ? '#222' : 'currentColor'} />
    </svg>
  );
}

const NAV_ITEMS: Array<{ id: Page; label: string; Icon: React.FC<{ active: boolean }> }> = [
  { id: 'home', label: 'Home', Icon: HomeIcon },
  { id: 'accounts', label: 'Accounts', Icon: AccountsIcon },
  { id: 'crew', label: 'Crew', Icon: CrewIcon },
  { id: 'invoices', label: 'Invoices', Icon: InvoicesIcon },
  { id: 'jobs', label: 'Jobs', Icon: JobsIcon },
];

export default function NavDock() {
  const { page, navigate } = useApp();

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
      <div
        className="flex items-center gap-1 px-2 py-2 rounded-full"
        style={{
          background: 'rgba(28, 36, 60, 0.92)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(120, 140, 227, 0.18)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)',
        }}
      >
        {NAV_ITEMS.map(({ id, label, Icon }) => {
          const active = page === id;
          return (
            <button
              key={id}
              onClick={() => navigate(id)}
              className="flex flex-col items-center gap-0.5 px-3.5 py-2 rounded-full transition-all duration-200"
              style={{
                background: active ? '#dff478' : 'transparent',
                color: active ? '#222222' : 'rgba(249, 247, 242, 0.6)',
                minWidth: 60,
              }}
            >
              <Icon active={active} />
              <span
                className="text-xs tracking-wide"
                style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 500 }}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
