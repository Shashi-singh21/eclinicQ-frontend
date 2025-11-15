import React from 'react';
import AvatarCircle from '../../../components/AvatarCircle';
import Badge from '../../../components/Badge';
import { Eye, MoreVertical, Filter } from 'lucide-react';

const upcoming = [
  {
    date: '20/02/2025 | 12:30 PM',
    doctor: { name: 'Milind Chauhan', title: 'General Physician' },
    type: 'Follow-Up',
    reason: 'High Blood Pressure',
    status: 'Confirmed',
  },
];

const past = [
  { date: '02/02/2025 | 12:30 PM', doctor: { name: 'Milind Chauhan', title: 'General Physician' }, type: 'New', reason: 'Fever & Weakness', status: 'Completed' },
  { date: '12/02/2025 | 12:30 PM', doctor: { name: 'Milind Chauhan', title: 'General Physician' }, type: 'Follow-Up', reason: 'Fever & Weakness', status: 'Completed' },
  { date: '03/02/2025 | 02:00 PM', doctor: { name: 'Milind Chauhan', title: 'General Physician' }, type: 'New', reason: 'Headache & Fatigue', status: 'Completed' },
  { date: '05/02/2025 | 11:00 AM', doctor: { name: 'Milind Chauhan', title: 'General Physician' }, type: 'Follow-Up', reason: 'Headache & Fatigue', status: 'Declined' },
  { date: '09/02/2025 | 09:30 AM', doctor: { name: 'Milind Chauhan', title: 'General Physician' }, type: 'New', reason: 'Abdominal Pain', status: 'Cancelled' },
];

function StatusBadge({ status }) {
  const color = status === 'Confirmed' || status === 'Completed' ? (status === 'Confirmed' ? 'green' : 'gray') : 'red';
  return (
    <Badge size="s" type="ghost" color={color}>{status}</Badge>
  );
}

function AppointmentsTable({ rows }) {
  return (
    <div className="mt-2 border border-gray-200 rounded-md">
      <table className="min-w-full table-fixed text-sm text-left text-gray-700">
        <colgroup>
          <col className="w-[260px]" />
          <col className="w-[280px]" />
          <col className="w-[160px]" />
          <col />
          <col className="w-[140px]" />
          <col className="w-[64px]" />
        </colgroup>
        <thead className="bg-gray-50 text-[12px] uppercase font-medium text-gray-500 border-b">
          <tr className="h-8">
            <th className="pl-3">Date</th>
            <th>Doctor</th>
            <th>Type</th>
            <th>Reason For Visit</th>
            <th>Status</th>
            <th className="pr-2 text-right"> </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-gray-200">
              <td className="pl-3 py-2 text-gray-800">{r.date}</td>
              <td className="py-2">
                <div className="flex items-center gap-2">
                  <AvatarCircle name={r.doctor.name} size="s" />
                  <div className="leading-tight">
                    <div className="font-medium text-gray-800">{r.doctor.name}</div>
                    <div className="text-[11px] text-gray-500">{r.doctor.title}</div>
                  </div>
                </div>
              </td>
              <td className="py-2 text-gray-800">{r.type}</td>
              <td className="py-2 text-gray-800">{r.reason}</td>
              <td className="py-2"><StatusBadge status={r.status} /></td>
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

export default function PatientAppointments({ embedded = true }) {
  return (
    <div className="py-2">
      {/* Top right actions */}
      <div className="flex items-center justify-end gap-3 text-sm mb-2">
        <button className="text-blue-600 hover:underline">+ Schedule</button>
        <button className="p-1.5 rounded hover:bg-gray-100" aria-label="Filter">
          <Filter className="h-4 w-4 text-gray-600" />
        </button>
      </div>

      <div className="mb-4">
        <div className="text-sm font-semibold text-gray-800">Upcoming Appointment</div>
        <AppointmentsTable rows={upcoming} />
      </div>

      <div className="mb-2">
        <div className="text-sm font-semibold text-gray-800">Past Appointments</div>
        <AppointmentsTable rows={past} />
      </div>
    </div>
  );
}
