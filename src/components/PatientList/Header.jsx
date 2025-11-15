import { Search } from "lucide-react";
import Badge from "../Badge";

const fmt = (n) => {
  if (typeof n !== 'number') return String(n ?? 0);
  if (n >= 1000) return `${Math.round(n/100)/10}K`;
  return String(n);
};

export default function PatientHeader({
  counts = { all: 0, online: 0, walkin: 0 },
  selected = 'all',
  onChange = () => {},
}) {
  const tabs = [
    { key: 'all', label: 'All' },
    { key: 'online', label: 'Online' },
    { key: 'walkin', label: 'Walk-in' },
  ];

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white">
      {/* Tabs */}
      <div className="flex items-center gap-1 text-sm" role="tablist" aria-label="Patient filters">
        {tabs.map((t) => {
          const isSel = selected === t.key;
          const label = `${t.label} (${fmt(counts?.[t.key])})`;
          return (
            <button
              key={t.key}
              role="tab"
              aria-selected={isSel}
              className={
                `h-8 inline-flex items-center px-3 rounded-md border font-medium transition-colors ` +
                (isSel
                  ? 'border-blue-400 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-200')
              }
              onClick={isSel ? undefined : () => onChange(t.key)}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Search + Actions */}
      <div className="flex items-center gap-2">
        <div className="relative">
          <Search className="h-4 w-4 text-gray-400 absolute left-2 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search Patient"
            className="pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <Badge type="ghost" color="gray" size="l" className="!rounded-md">Import Patient List</Badge>
        <Badge type="ghost" color="blue" size="l" className="!rounded-md">Add New Patient</Badge>
      </div>
    </div>
  );
}
