import React, { useMemo, useState } from 'react';
import PatientHeader from '../../../components/PatientList/Header';
import PatientTable from '../../../components/PatientList/Table';

const demoPatients = [
  { name: 'Rahul Sharma', gender: 'M', dob: '03/14/1990 (33Y)', patientId: 'P654321', contact: '+91 9876543210', email: 'rajesh.kumar@example.com', location: 'Akola, MH', lastVisit: '02/02/2025 | 12:30 PM', reason: 'Routine check-up for overall health assessment.' },
  { name: 'Arjun Singh', gender: 'M', dob: '09/21/1988 (35Y)', patientId: 'P456789', contact: '+91 7654321098', email: 'suresh.patel@mail.com', location: 'Jaipur, RJ', lastVisit: '02/02/2025 | 12:30 PM', reason: 'Follow-up visit for ongoing treatment.' },
  { name: 'Kavya Nair', gender: 'F', dob: '05/16/1987 (36Y)', patientId: 'P789123', contact: '+91 5432109876', email: 'vikram.agarwal@service.com', location: 'Chennai, TN', lastVisit: '02/02/2025 | 12:30 PM', reason: 'Evaluation of recent weight and fatigue.' },
];

export default function Patient() {
  const [selected, setSelected] = useState('all');
  const [patients] = useState(demoPatients);
  const counts = useMemo(() => ({ all: patients.length, online: 0, walkin: 0 }), [patients]);

  return (
    <div className="flex flex-col gap-2">
      <PatientHeader counts={counts} selected={selected} onChange={setSelected} />
      <PatientTable patients={patients} />
    </div>
  );
}
