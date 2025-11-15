import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Eye, MoreVertical, Plus, ChevronDown } from 'lucide-react';
import Badge from '../../../components/Badge';

const vitals = [
  { name: 'Blood Pressure', unit: 'mmHg', normal: '90/60 - 120/80', status: 'Worse', trend: [
    { value: '130/85 ↑', date: '30/1/25' },
    { value: '145/90 ↑', date: '3/3/25' },
    { value: '118/76', date: '5/11/24' },
  ]},
  { name: 'Oxygen Saturation', unit: '%', normal: '95.7 - 100', status: 'Improved', trend: [
    { value: '98', date: '1/8/25' },
    { value: '95', date: '4/5/25' },
    { value: '97', date: '6/25/24' },
  ]},
  { name: 'Pulse Rate', unit: 'bpm', normal: '60 - 100', status: 'Stabled', trend: [
    { value: '72', date: '1/10/25' },
    { value: '80', date: '4/25/25' },
    { value: '65', date: '6/15/24' },
  ]},
  { name: 'Respiratory Rate', unit: 'breaths/min', normal: '12-18', status: 'Improved', trend: [
    { value: '16 ↓', date: '2/15/25' },
    { value: '18', date: '5/25/25' },
    { value: '15', date: '3/30/24' },
  ]},
  { name: 'Body Temperature', unit: '°F', normal: '97.7 - 99.1', status: 'Stabled', trend: [
    { value: '98.6', date: '1/20/25' },
    { value: '99.1', date: '4/1/25' },
    { value: '98.4', date: '5/18/24' },
  ]},
  { name: 'Blood Glucose Level', unit: 'mg/dL', normal: '70 - 100', status: 'Worse', trend: [
    { value: '110 ↑', date: '1/5/25' },
    { value: '140 ↑', date: '3/22/25' },
    { value: '95', date: '5/12/24' },
  ]},
];

const biometrics = [
  { name: 'Weight', unit: 'Kgs', trend: [
    { value: '70 ↑', date: '1/22/25' }, { value: '75 ↑', date: '4/15/25' }, { value: '68', date: '6/10/24' }, { value: '80 ↑', date: '9/15/24' }, { value: '72', date: '11/20/24' },
  ]},
  { name: 'Height', unit: 'feets', trend: [
    { value: `5'4"`, date: '1/22/25' }, { value: `5'6"`, date: '4/15/25' }, { value: `5'3"`, date: '6/10/24' }, { value: `5'8"`, date: '9/15/24' }, { value: `5'5"`, date: '11/20/24' },
  ]},
  { name: 'BMI', unit: 'kg/m²', trend: [
    { value: '22.5 ↑', date: '2/10/25' }, { value: '24.0 ↑', date: '5/15/25' }, { value: '21.0', date: '3/25/24' }, { value: '23.5 ↑', date: '8/5/24' }, { value: '22.0', date: '10/10/24' },
  ]},
  { name: 'Waist Circumference', unit: 'inches', trend: [
    { value: '32', date: '1/22/25' }, { value: '34 ↑', date: '4/15/25' }, { value: '31', date: '6/10/24' }, { value: '36 ↑', date: '9/15/24' }, { value: '33', date: '11/20/24' },
  ]},
];

function SectionHeader({ title, actionLabel }) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-sm font-semibold text-gray-800">{title}</div>
      <div className="flex items-center gap-2 text-sm">
        <button className="text-blue-600 hover:underline flex items-center gap-1">+ {actionLabel}</button>
        <button className="p-1.5 rounded hover:bg-gray-100" aria-label="Columns"><ChevronDown className="h-4 w-4 text-gray-600"/></button>
      </div>
    </div>
  );
}

function VitalsTable() {
  return (
    <div className="mt-2 border border-gray-200 rounded-md">
      <table className="min-w-full table-fixed text-sm text-left text-gray-700">
        <colgroup>
          <col className="w-[240px]" />
          <col />
          <col className="w-[180px]" />
          <col className="w-[160px]" />
          <col className="w-[64px]" />
        </colgroup>
        <thead className="bg-gray-50 text-[12px] uppercase font-medium text-gray-500 border-b">
          <tr className="h-8">
            <th className="pl-3">Name</th>
            <th className="">Last 3 Recorded Values</th>
            <th className="">Status</th>
            <th className="">Normal Range</th>
            <th className="pr-2 text-right"> </th>
          </tr>
        </thead>
        <tbody>
          {vitals.map((v, i) => (
            <tr key={i} className="border-b border-gray-200">
              <td className="pl-3 py-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-800">{v.name}</span>
                  <span className="text-xs text-gray-500">{v.unit}</span>
                </div>
              </td>
              <td className="py-2">
                <div className="flex items-center gap-8">
                  {v.trend.map((t, idx) => (
                    <div key={idx} className="flex flex-col">
                      <span className={`text-sm ${/↑/.test(t.value) ? 'text-red-600' : /↓/.test(t.value) ? 'text-green-600' : 'text-gray-800'}`}>{t.value}</span>
                      <span className="text-[11px] text-gray-500">{t.date}</span>
                    </div>
                  ))}
                </div>
              </td>
              <td className="py-2">
                <Badge size="s" type="ghost" color={v.status === 'Improved' ? 'green' : v.status === 'Worse' ? 'red' : 'gray'}>{v.status}</Badge>
              </td>
              <td className="py-2 text-gray-700">{v.normal}</td>
              <td className="py-2 pr-2">
                <div className="flex items-center justify-end gap-2 text-gray-600">
                  <button className="p-1.5 rounded hover:bg-gray-100" aria-label="View"><Eye className="h-4 w-4" /></button>
                  <button className="p-1.5 rounded hover:bg-gray-100" aria-label="More"><MoreVertical className="h-4 w-4" /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BiometricsTable() {
  return (
    <div className="mt-2 border border-gray-200 rounded-md">
      <table className="min-w-full table-fixed text-sm text-left text-gray-700">
        <colgroup>
          <col className="w-[240px]" />
          <col />
          <col className="w-[64px]" />
        </colgroup>
        <thead className="bg-gray-50 text-[12px] uppercase font-medium text-gray-500 border-b">
          <tr className="h-8">
            <th className="pl-3">Name</th>
            <th className="">Last 5 Recorded Values</th>
            <th className="pr-2 text-right"> </th>
          </tr>
        </thead>
        <tbody>
          {biometrics.map((b, i) => (
            <tr key={i} className="border-b border-gray-200">
              <td className="pl-3 py-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-800">{b.name}</span>
                  <span className="text-xs text-gray-500">{b.unit}</span>
                </div>
              </td>
              <td className="py-2">
                <div className="flex items-center gap-8 flex-wrap">
                  {b.trend.map((t, idx) => (
                    <div key={idx} className="flex flex-col">
                      <span className={`text-sm ${/↑/.test(t.value) ? 'text-red-600' : /↓/.test(t.value) ? 'text-green-600' : 'text-gray-800'}`}>{t.value}</span>
                      <span className="text-[11px] text-gray-500">{t.date}</span>
                    </div>
                  ))}
                </div>
              </td>
              <td className="py-2 pr-2">
                <div className="flex items-center justify-end gap-2 text-gray-600">
                  <button className="p-1.5 rounded hover:bg-gray-100" aria-label="View"><Eye className="h-4 w-4" /></button>
                  <button className="p-1.5 rounded hover:bg-gray-100" aria-label="More"><MoreVertical className="h-4 w-4" /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PatientVitals({ embedded = false }) {
  const { id } = useParams();
  if (embedded) {
    return (
      <>
        <div className="py-3">
          <SectionHeader title="Vitals" actionLabel="Add Vitals" />
          <VitalsTable />
        </div>
        <div className="py-3">
          <SectionHeader title="Biometrics" actionLabel="Add Biometrics" />
          <BiometricsTable />
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white px-4 py-3 rounded-md border border-gray-200">
        <div className="flex items-center gap-6 text-sm h-10">
          <NavLink to={`/doc/patients/${encodeURIComponent(id || '')}`} className={({isActive}) => `h-10 ${isActive ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}>Overview</NavLink>
          <NavLink to={`/doc/patients/${encodeURIComponent(id || '')}/vitals`} className={({isActive}) => `h-10 ${isActive ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}>Vitals & Biometrics</NavLink>
          <span className="text-gray-400">Appointment</span>
          <span className="text-gray-400">Medical History</span>
          <span className="text-gray-400">Documents</span>
          <span className="text-gray-400">Demographics</span>
        </div>
        <div className="py-3">
          <SectionHeader title="Vitals" actionLabel="Add Vitals" />
          <VitalsTable />
        </div>
        <div className="py-3">
          <SectionHeader title="Biometrics" actionLabel="Add Biometrics" />
          <BiometricsTable />
        </div>
      </div>
    </div>
  );
}
