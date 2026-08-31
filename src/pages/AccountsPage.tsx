import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { accounts, contacts, jobs, invoices, Account } from '../data/mock';

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className="text-xs px-2 py-0.5 rounded-full"
      style={{
        background: status === 'Active' ? 'rgba(223,244,120,0.12)' : 'rgba(255,255,255,0.06)',
        color: status === 'Active' ? '#dff478' : 'rgba(249,247,242,0.4)',
        fontFamily: "'Oswald', sans-serif",
        fontWeight: 500,
      }}
    >
      {status}
    </span>
  );
}

function AccountDetail({ id }: { id: string }) {
  const { closeDetail } = useApp();
  const [tab, setTab] = useState<'info' | 'jobs' | 'invoices'>('info');
  const account = accounts.find((a) => a.id === id);
  if (!account) return null;

  const accountContacts = contacts.filter((c) => c.account_id === id);
  const accountJobs = jobs.filter((j) => j.account_id === id);
  const accountInvoices = invoices.filter((i) => i.account_id === id);

  const tabs = [
    { id: 'info', label: 'Info' },
    { id: 'jobs', label: 'Jobs' },
    { id: 'invoices', label: 'Invoices' },
  ] as const;

  return (
    <div className="px-4 pt-6 pb-32 max-w-2xl mx-auto">
      <button
        onClick={closeDetail}
        className="flex items-center gap-2 mb-5 text-sm transition-opacity hover:opacity-70"
        style={{ color: '#788ce3', fontFamily: "'Oswald', sans-serif", fontWeight: 500 }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
        Accounts
      </button>

      <div className="mb-5">
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-3xl text-cream leading-tight" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.04em' }}>
            {account.name}
          </h1>
          <StatusBadge status={account.status} />
        </div>
        <p className="text-sm" style={{ color: 'rgba(249,247,242,0.4)', fontFamily: "'Oswald', sans-serif" }}>{account.type}</p>
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
        <div className="space-y-4">
          <div className="px-4 py-4 rounded-2xl space-y-3" style={{ background: '#2d2d2d', border: '1px solid rgba(249,247,242,0.06)' }}>
            {[
              { label: 'Email', value: account.email },
              { label: 'Phone', value: account.phone },
              { label: 'Address', value: `${account.address}, ${account.city}, ${account.state} ${account.zip}` },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-start justify-between gap-4">
                <span className="text-xs shrink-0" style={{ color: 'rgba(249,247,242,0.4)', fontFamily: "'Oswald', sans-serif", fontWeight: 500, letterSpacing: '0.04em' }}>{label}</span>
                <span className="text-sm text-cream text-right">{value}</span>
              </div>
            ))}
          </div>

          {accountContacts.length > 0 && (
            <div>
              <p className="text-xs mb-3 px-1" style={{ color: 'rgba(249,247,242,0.4)', fontFamily: "'Oswald', sans-serif", letterSpacing: '0.05em' }}>CONTACTS</p>
              <div className="space-y-2">
                {accountContacts.map((c) => (
                  <div key={c.id} className="flex items-center justify-between px-4 py-3 rounded-2xl" style={{ background: '#2d2d2d', border: '1px solid rgba(249,247,242,0.06)' }}>
                    <div>
                      <p className="text-sm text-cream font-medium">{c.name}</p>
                      <p className="text-xs" style={{ color: 'rgba(249,247,242,0.4)' }}>{c.title}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: c.role === 'PM' ? 'rgba(120,140,227,0.12)' : 'rgba(249,247,242,0.06)', color: c.role === 'PM' ? '#788ce3' : 'rgba(249,247,242,0.5)', fontFamily: "'Oswald', sans-serif" }}>{c.role}</span>
                      <p className="text-xs mt-1" style={{ color: 'rgba(249,247,242,0.35)' }}>{c.phone}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {tab === 'jobs' && (
        <div className="space-y-3">
          {accountJobs.length === 0 ? (
            <p className="text-sm text-center py-8" style={{ color: 'rgba(249,247,242,0.3)' }}>No jobs for this account</p>
          ) : accountJobs.map((j) => (
            <div key={j.id} className="px-4 py-4 rounded-2xl" style={{ background: '#2d2d2d', border: '1px solid rgba(249,247,242,0.06)' }}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-cream font-medium mb-1">{j.address}, {j.city}</p>
                  <p className="text-xs" style={{ color: 'rgba(249,247,242,0.4)' }}>{j.type} · {j.po_number}</p>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: j.status === 'Active' ? 'rgba(223,244,120,0.12)' : j.status === 'Scheduled' ? 'rgba(120,140,227,0.12)' : 'rgba(249,247,242,0.06)', color: j.status === 'Active' ? '#dff478' : j.status === 'Scheduled' ? '#788ce3' : 'rgba(249,247,242,0.5)', fontFamily: "'Oswald', sans-serif" }}>{j.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'invoices' && (
        <div className="space-y-3">
          {accountInvoices.length === 0 ? (
            <p className="text-sm text-center py-8" style={{ color: 'rgba(249,247,242,0.3)' }}>No invoices for this account</p>
          ) : accountInvoices.map((inv) => {
            const statusColor = inv.status === 'Paid' ? '#92bad5' : inv.status === 'Overdue' ? '#ff6b6b' : '#dff478';
            const statusBg = inv.status === 'Paid' ? 'rgba(146,186,213,0.1)' : inv.status === 'Overdue' ? 'rgba(255,107,107,0.1)' : 'rgba(223,244,120,0.1)';
            return (
              <div key={inv.id} className="px-4 py-4 rounded-2xl" style={{ background: '#2d2d2d', border: '1px solid rgba(249,247,242,0.06)' }}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm text-cream font-medium">{inv.id}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'rgba(249,247,242,0.4)' }}>{inv.description}</p>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: statusBg, color: statusColor, fontFamily: "'Oswald', sans-serif" }}>{inv.status}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-lg" style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, color: '#f9f7f2' }}>${inv.amount.toLocaleString()}</p>
                  <p className="text-xs" style={{ color: 'rgba(249,247,242,0.35)' }}>Due {new Date(inv.due_date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function AccountCard({ account, onClick }: { account: Account; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-4 py-4 rounded-2xl transition-all hover:scale-[1.01] active:scale-[0.99]"
      style={{ background: '#2d2d2d', border: '1px solid rgba(249,247,242,0.07)' }}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <p className="text-sm font-medium text-cream">{account.name}</p>
          </div>
          <p className="text-xs" style={{ color: 'rgba(249,247,242,0.4)' }}>{account.type} · {account.city}, {account.state}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <StatusBadge status={account.status} />
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ color: 'rgba(249,247,242,0.2)' }}><polyline points="9 18 15 12 9 6"/></svg>
        </div>
      </div>
    </button>
  );
}

export default function AccountsPage({ detailId }: { detailId?: string }) {
  const { openDetail } = useApp();
  const [search, setSearch] = useState('');

  if (detailId) return <AccountDetail id={detailId} />;

  const filtered = accounts.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="px-4 pt-8 pb-32 max-w-2xl mx-auto">
      <h1 className="text-5xl text-cream mb-6 leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.04em' }}>
        Accounts
      </h1>

      <div className="relative mb-5">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'rgba(249,247,242,0.3)' }}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search accounts..."
          className="w-full pl-9 pr-4 py-3 rounded-2xl text-cream text-sm outline-none"
          style={{ background: '#2d2d2d', border: '1px solid rgba(249,247,242,0.08)', fontFamily: "'Roboto Condensed', sans-serif" }}
        />
      </div>

      <div className="space-y-3">
        {filtered.map((a) => (
          <AccountCard key={a.id} account={a} onClick={() => openDetail('account', a.id)} />
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-center py-8" style={{ color: 'rgba(249,247,242,0.3)' }}>No accounts found</p>
        )}
      </div>
    </div>
  );
}
