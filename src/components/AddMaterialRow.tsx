import { Material } from '../data/mock';

interface MaterialEntry {
  material_id: string;
  amount: number;
}

interface AddMaterialRowProps {
  materials: Material[];
  value: MaterialEntry;
  onChange: (v: MaterialEntry) => void;
  onRemove: () => void;
}

export default function AddMaterialRow({ materials, value, onChange, onRemove }: AddMaterialRowProps) {
  const selectedMaterial = materials.find((m) => m.id === value.material_id);
  const unit = selectedMaterial?.unit ?? '';

  return (
    <div className="flex items-center gap-2">
      <select
        value={value.material_id}
        onChange={(e) => onChange({ ...value, material_id: e.target.value })}
        className="flex-1 px-3 py-2.5 rounded-xl text-cream text-sm outline-none"
        style={{ background: '#383838', border: '1px solid rgba(249,247,242,0.1)', fontFamily: "'Roboto Condensed', sans-serif" }}
      >
        <option value="">Select material</option>
        {materials.map((m) => (
          <option key={m.id} value={m.id}>
            {m.name}
          </option>
        ))}
      </select>
      <div className="flex items-center gap-1.5" style={{ minWidth: 110 }}>
        <input
          type="number"
          min={0}
          value={value.amount || ''}
          onChange={(e) => onChange({ ...value, amount: Number(e.target.value) })}
          placeholder="0"
          className="w-16 px-3 py-2.5 rounded-xl text-cream text-sm outline-none text-center"
          style={{ background: '#383838', border: '1px solid rgba(249,247,242,0.1)', fontFamily: "'Roboto Condensed', sans-serif" }}
        />
        {unit && (
          <span className="text-xs" style={{ color: 'rgba(249,247,242,0.4)', minWidth: 28 }}>
            {unit}
          </span>
        )}
      </div>
      <button
        onClick={onRemove}
        className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-red-500/20"
        style={{ color: 'rgba(249,247,242,0.4)' }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}
