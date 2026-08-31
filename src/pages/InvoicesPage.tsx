import { useState } from 'react';
import { invoices, accounts } from '../data/mock';

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, { bg: string; text: string }> = {
    Paid: { bg: 'rgba(146,186,213,0.12)', text: '#92bad5' },
    Pending: { bg: 'rgba(223,244,120,0.12)', text: '#dff478' },
    Overdue: { bg: 'rgba(255,107,107,0.12)', text: '#ff6b6b' },
  };
  const c = colors[status] ?? { bg: 'rgba(249,247,242,0.06)', text: 'rgba(249,247,242,0.4)' };
  return (
    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: c.bg, color: c.text, fontFamily: "'Oswald', sans-serif", fontWeight: 500 }}>
      {status}
    </span>
  );
}

type Filter = 'All' | 'Pending' | 'Paid' | 'Overdue';

export default function InvoicesPage() {
  const [filter, setFilter] = useState<Filter>('All');

  const filtered = filter === 'All' ? invoices : invoices.filter((i) => i.status === filter);
  const filters: Filter[] = ['All', 'Pending', 'Overdue', 'Paid'];

  const totals = {
    pending: invoices.filter((i) => i.status === 'Pending').reduce((s, i) => s + i.amount, 0),
    overdue: invoices.filter((i) => i.status === 'Overdue').reduce((s, i) => s + i.amount, 0),
    paid: invoices.filter((i) => i.status === 'Paid').reduce((s, i) => s + i.amount, 0),
  };

  return (
    <div className="px-4 pt-8 pb-32 max-w-2xl mx-auto">
      <h1 className="text-5xl text-cream mb-6 leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.04em' }}>
        Invoices
      </h1>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: 'Pending', amount: totals.pending, color: '#dff478' },
          { label: 'Overdue', amount: totals.overdue, color: '#ff6b6b' },
          { label: 'Paid', amount: totals.paid, color: '#92bad5' },
        ].map((stat) => (
          <div key={stat.label} className="px-3 py-3 rounded-2xl" style={{ background: '#2d2d2d', border: '1px solid rgba(249,247,242,0.06)' }}>
            <p className="text-xs mb-1" style={{ color: 'rgba(249,247,242,0.4)', fontFamily: "'Oswald', sans-serif", letterSpacing: '0.04em' }}>{stat.label}</p>
            <p className="text-base font-semibold" style={{ color: stat.color, fontFamily: "'Oswald', sans-serif" }}>
              ${stat.amount.toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-4 py-1.5 rounded-full text-sm shrink-0 transition-all"
            style={{
              background: filter === f ? '#dff478' : '#2d2d2d',
              color: filter === f ? '#222222' : 'rgba(249,247,242,0.5)',
              fontFamily: "'Oswald', sans-serif",
              fontWeight: filter === f ? 600 : 400,
              letterSpacing: '0.04em',
              border: filter === f ? 'none' : '1px solid rgba(249,247,242,0.08)',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <p className="text-sm text-center py-8" style={{ color: 'rgba(249,247,242,0.3)' }}>No invoices found</p>
        ) : filtered.map((inv) => {
          const account = accounts.find((a) => a.id === inv.account_id);
          return (
            <div
              key={inv.id}
              className="px-4 py-4 rounded-2xl"
              style={{ background: '#2d2d2d', border: '1px solid rgba(249,247,242,0.07)' }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-medium text-cream" style={{ fontFamily: "'Oswald', sans-serif" }}>{inv.id}</p>
                    <StatusBadge status={inv.status} />
                  </div>
                  <p className="text-xs" style={{ color: 'rgba(249,247,242,0.4)' }}>{account?.name}</p>
                </div>
                <p className="text-xl font-semibold" style={{ fontFamily: "'Oswald', sans-serif", color: '#f9f7f2' }}>
                  ${inv.amount.toLocaleString()}
                </p>
              </div>
              <p className="text-xs mb-3 text-cream/60">{inv.description}</p>
              <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid rgba(249,247,242,0.06)' }}>
                <div>
                  <span className="text-xs" style={{ color: 'rgba(249,247,242,0.35)', fontFamily: "'Oswald', sans-serif" }}>Issued </span>
                  <span className="text-xs text-cream/60">{new Date(inv.issued_date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div>
                  <span className="text-xs" style={{ color: 'rgba(249,247,242,0.35)', fontFamily: "'Oswald', sans-serif" }}>Due </span>
                  <span className="text-xs" style={{ color: inv.status === 'Overdue' ? '#ff6b6b' : 'rgba(249,247,242,0.6)' }}>
                    {new Date(inv.due_date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
