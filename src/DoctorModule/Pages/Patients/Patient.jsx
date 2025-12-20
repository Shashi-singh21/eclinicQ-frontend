import React, { useMemo, useState, useEffect } from 'react';
import PatientHeader from '../../../components/PatientList/Header';
// Replaced the custom PatientTable with the reusable SampleTable component
import SampleTable from '../../../pages/SampleTable.jsx';
import AddPatientDrawer from '../../../components/PatientList/AddPatientDrawer';
import useDoctorPatientListStore from '../../../store/useDoctorPatientListStore';
import { action_calendar, action_dot, action_heart, vertical } from "../../../../public/index.js";
import AvatarCircle from '../../../components/AvatarCircle.jsx';


const demoPatients = Array.from({ length: 30 }).map((_, i) => ({
  name: `Patient ${i + 1}`,
  gender: i % 2 === 0 ? 'M' : 'F',
  dob: `01/${(i % 28) + 1}/1990 (35Y)`,
  patientId: `P${100000 + i}`,
  contact: `+91 98765${(i % 10).toString().repeat(4)}`,
  email: `patient${i + 1}@example.com`,
  location: ['Delhi, DL', 'Mumbai, MH', 'Bangalore, KA', 'Chennai, TN', 'Kolkata, WB'][i % 5],
  lastVisit: `03/${(i % 28) + 1}/2025 | ${(i % 12) + 1}:00 PM`,
  reason: ['Routine check-up', 'Follow-up visit', 'Consultation for headache', 'Diabetes management', 'General health check-up'][i % 5],
}));

export default function Patient() {
  const [selected, setSelected] = useState('all');
  const [addOpen, setAddOpen] = useState(false);
  const { patients, loading, error, fetchPatients, clearPatientsStore } = useDoctorPatientListStore();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        await fetchPatients();
      } catch (e) {
        // If fetch fails, keep using demoPatients as fallback
        if (mounted) {
          // noop - patient table will render demo data below if patients empty
        }
      }
    })();
    return () => {
      mounted = false;
      // keep store clean when unmounting page
      clearPatientsStore();
    };
  }, [fetchPatients, clearPatientsStore]);

  const displayPatients = loading ? [] : (patients && patients.length > 0 ? patients : (error ? demoPatients : []));
  const counts = useMemo(() => ({ all: displayPatients.length, online: 0, walkin: 0 }), [displayPatients]);
  // Simple pagination state
  const [page, setPage] = useState(1);
  const pageSize = 30;
  const total = displayPatients.length;
  const pageRows = useMemo(() => displayPatients.slice((page - 1) * pageSize, page * pageSize), [displayPatients, page, pageSize]);

  // Define columns for patient table view
  const columns = useMemo(() => [
    {
      key: 'patient',
      header: 'Patient',
      sticky: 'left',
      width: 260,
      render: (row) => (
        <div className="flex items-center gap-3">
          <AvatarCircle size='s' name= {row.name?.[0] ?? '?'}></AvatarCircle>
          <div className=''>
            <div className="font-medium text-sm text-secondary-grey400">{row.name}</div>
            <div className="text-xs text-gray-500">
              {row.gender} | {row.dob}
            </div>
          </div>
        </div>
      ),
    },
    { key: 'patientId', header: 'Patient ID' ,width :140},
    { key: 'contact', header: 'Contact',width :160 },
  { key: 'email', header: 'Email' ,width : 190, icon: false},
    {
      key: 'location',
      width: 160,
  header: 'Location',
  icon: false,
      render: (row) => (
        <span className="rounded bg-gray-100 px-2 py-1 text-sm text-secondary-grey400">{row.location}</span>
      ),
    },
    { key: 'lastVisit', header: 'Last Visit' ,width:200},
  { key: 'reason', header: 'Reason',width:450, cellClass: 'w-[720px] whitespace-normal break-words' },
    {
      key: 'actions',
  header: 'Actions',
  icon: false,
      sticky: 'right',
      align: 'center',
    width: 160,
      render: (row) => (
        <div className="flex items-center justify-center gap-4 text-gray-600">
          {/* Wire your own action handlers here */}
      <img src={action_calendar} alt="" className='w-5 h-5' />
      <img src={vertical} alt="|" className='w-[1px] h-5' />
      <img src={action_heart} alt="" className='w-5 '/>
      <img src={vertical} alt="|" className='w-[1px] h-5' />
      <img src={action_dot} alt="" className='w-4'/>
        </div>
      ),
    },
  ], []);

  return (
    <>
  <div className="px-3">

  <div className='pt-2 pb-1'>
          <PatientHeader counts={counts} selected={selected} onChange={setSelected} addLabel="Add New Patient" addPath={() => setAddOpen(true)} />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" aria-hidden="true" />
            <div className="text-sm text-gray-600">Loading patients...</div>
          </div>
        </div>
      ) : (
  <div className='overflow-y-hidden'>
        <SampleTable
          columns={columns}
          data={pageRows}
          page={page}
          pageSize={pageSize}
          total={total}
          onPageChange={setPage}
          stickyLeftWidth={260}
          stickyRightWidth={160}
        />
        </div>
      )}



      <AddPatientDrawer open={addOpen} onClose={() => setAddOpen(false)} onSave={(data)=>{ setAddOpen(false); }} />
      
    </div>
    </>
  );
}
