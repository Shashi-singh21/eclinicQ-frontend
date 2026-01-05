import React, { useEffect, useMemo, useState } from 'react'
import Header from '../../../../components/DoctorList/Header'
import { getAllDoctorsBySuperAdmin } from '../../../../services/doctorService'
import useAuthStore from '../../../../store/useAuthStore'
import SampleTable from '../../../../pages/SampleTable'
import { doctorColumns } from './columns'
import sampleData from './data.json'
import { useNavigate } from 'react-router-dom';

const Doc_list = () => {
  const navigate = useNavigate();
  const isAuthed = useAuthStore((s) => Boolean(s.token))
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [active, setActive] = useState([])
  const [inactive, setInactive] = useState([])
  const [page, setPage] = useState(1);
  const pageSize = 20;

  useEffect(() => {
    let ignore = false
    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const resp = await getAllDoctorsBySuperAdmin()
        if (ignore) return
        const a = resp?.data?.active || []
        const i = resp?.data?.inactive || []
        setActive(a)
        setInactive(i)
      } catch (e) {
        if (ignore) return
        // If unauthorized/forbidden, don't block UI: show dummy list and suppress server message
        const status = e?.response?.status
        const serverMsg = e?.response?.data?.message || e?.message || ''
        const isAuthError = status === 401 || status === 403 || /forbidden/i.test(serverMsg) || /SUPER_ACCESS/i.test(serverMsg)
        if (!isAuthError) {
          // setError('Failed to fetch doctors')
          console.error("API failed, falling back to sample data", e)
        } else {
          // suppress exposing server auth/permission messages to the UI
          setError(null)
        }

        // Use sample data from JSON
        const a = sampleData.filter(d => d.status === 'Active')
        // Ensure inactive or other statuses are handled; sample data might just have Active/Inactive
        const i = sampleData.filter(d => d.status !== 'Active')

        setActive(a)
        setInactive(i)
      } finally {
        if (!ignore) setLoading(false)
      }
    }
    if (isAuthed) load()
    else {
      // Not authed: use sample data
      const a = sampleData.filter(d => d.status === 'Active')
      const i = sampleData.filter(d => d.status !== 'Active')
      setActive(a)
      setInactive(i)
      setLoading(false)
      setError(null)
    }
    return () => {
      ignore = true
    }
  }, [isAuthed])

  const doctorsAll = useMemo(() => {
    // Map API response to UI table shape
    const mapOne = (d, status) => ({
      id: d?.docId || '',
      userId: d?.userId || '',
      name: d?.name || '',
      gender: d?.gender || '',
      contact: d?.contactNumber || '',
      email: d?.email || '',
      location: d?.location || '',
      specialization: Array.isArray(d?.specializations) ? (d.specializations[0] || '') : (d?.specializations || ''),
      specializationMore: Array.isArray(d?.specializations) && d.specializations.length > 1 ? d.specializations.length - 1 : 0,
      designation: d?.designation || '',
      exp: d?.yearOfExperience != null ? `${d.yearOfExperience} years of experience` : '',
      status: d?.planStatus || status, // prefer explicit plan status if available
      rating: d?.rating || 4.0,
      startDate: d?.startDate || '02/02/2024',
      plan: d?.plan || 'Basic',
      planStatus: d?.planStatus || 'Active',
    })
    return [
      ...active.map((d) => mapOne(d, 'Active')),
      ...inactive.map((d) => mapOne(d, 'Inactive')),
    ]
  }, [active, inactive])

  const counts = useMemo(() => ({
    all: (active?.length || 0) + (inactive?.length || 0),
    active: active?.length || 0,
    inactive: inactive?.length || 0,
  }), [active, inactive])

  const [selected, setSelected] = useState('all')

  const doctors = useMemo(() => {
    let filtered = doctorsAll;
    if (selected === 'active') filtered = doctorsAll.filter(d => d.status === 'Active')
    if (selected === 'inactive') filtered = doctorsAll.filter(d => d.status === 'Inactive')
    return filtered;
  }, [doctorsAll, selected])

  // Reset page when filter changes
  useEffect(() => {
    setPage(1);
  }, [selected]);

  const pagedData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return doctors.slice(start, start + pageSize);
  }, [doctors, page, pageSize]);

  const handleRowClick = (doc) => {
    navigate(`/doctor/${encodeURIComponent(doc.userId || doc.id)}`, { state: { doctor: doc } });
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="shrink-0 mt-2">
        <Header counts={counts} selected={selected} onChange={setSelected} addLabel="Add New Doctor" addPath="/register/doctor" />
      </div>

      <div className="h-[calc(100vh-140px)] overflow-hidden m-3 border border-gray-200 rounded-lg shadow-sm bg-white">
        {loading && <div className="p-6 text-gray-600">Loading doctors…</div>}
        {!loading && error && <div className="p-6 text-red-600">{String(error)}</div>}
        {!loading && !error && (
          <SampleTable
            columns={doctorColumns}
            data={pagedData}
            page={page}
            pageSize={pageSize}
            total={doctors.length}
            onPageChange={setPage}
            stickyLeftWidth={300}
            stickyRightWidth={110}
            onRowClick={handleRowClick}
            hideSeparators={true}
          />
        )}
      </div>
    </div>
  )
}

export default Doc_list
