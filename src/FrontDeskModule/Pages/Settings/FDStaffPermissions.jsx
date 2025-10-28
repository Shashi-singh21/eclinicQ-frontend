import React, { useMemo } from 'react'
import { NavLink } from 'react-router-dom'
import AvatarCircle from '../../../components/AvatarCircle'
import { ShieldPlus } from 'lucide-react'
import { hospital } from '../../../../public/index.js'

export default function FDStaffPermissions() {
  const profile = useMemo(() => ({ name: 'Front Desk' }), [])

  return (
    <div className="px-6 pb-10">
      {/* Header with banner + avatar + tabs */}
      <div className="-mx-6">
        <div className="relative">
          <img src={hospital} alt="cover" className="w-full h-32 object-cover" />
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
            <div className="rounded-full ring-4 ring-white shadow-md">
              <AvatarCircle name={profile.name} size="l" color="blue" className="w-20 h-20 text-2xl" />
            </div>
          </div>
        </div>
        <div className="bg-white border-b border-gray-200">
          <div className="px-6 pt-10">
            <nav className="flex items-center gap-6 overflow-x-auto text-sm">
              <NavLink to="/fd/settings/clinics" className={({isActive})=>`pb-3 border-b-2 ${isActive? 'border-blue-600 text-gray-900' : 'border-transparent text-gray-600 hover:text-gray-900'}`}>Clinic Details</NavLink>
              <NavLink to="/fd/settings/consultation" className={({isActive})=>`pb-3 border-b-2 ${isActive? 'border-blue-600 text-gray-900' : 'border-transparent text-gray-600 hover:text-gray-900'}`}>Consultation Details</NavLink>
              <NavLink to="/fd/settings/staff-permissions" className={({isActive})=>`pb-3 border-b-2 ${isActive? 'border-blue-600 text-gray-900' : 'border-transparent text-gray-600 hover:text-gray-900'}`}>Staff Permissions</NavLink>
            </nav>
          </div>
        </div>
      </div>

      {/* Simple Permissions grid placeholder */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {["Frontdesk Admin","Receptionist","Nurse"].map((role) => (
          <div key={role} className="bg-white border rounded-lg p-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full grid place-items-center text-blue-600 bg-blue-50"><ShieldPlus size={16}/></div>
              <div className="font-medium text-sm">{role}</div>
            </div>
            <div className="mt-3 text-xs text-gray-600">View, edit and manage permissions for {role}.</div>
            <div className="mt-3 flex gap-2">
              <button className="h-8 px-3 border rounded text-sm">View</button>
              <button className="h-8 px-3 border rounded text-sm">Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
