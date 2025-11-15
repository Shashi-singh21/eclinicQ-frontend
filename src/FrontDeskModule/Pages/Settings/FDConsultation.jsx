import React, { useMemo, useState } from 'react'
import { NavLink } from 'react-router-dom'
import AvatarCircle from '../../../components/AvatarCircle'
import Input from '../../../components/FormItems/Input'
import Toggle from '../../../components/FormItems/Toggle'
import TimeInput from '../../../components/FormItems/TimeInput'
import { Copy } from 'lucide-react'
import { hospital } from '../../../../public/index.js'

const SectionCard = ({ title, subtitle, children }) => (
  <div className="bg-white rounded-lg border border-gray-200">
    <div className="px-4 py-3 border-b border-gray-200">
      <div className="text-sm">
        <div className="font-medium text-gray-900">{title}</div>
        {subtitle ? <div className="text-[12px] text-gray-500">{subtitle}</div> : null}
      </div>
    </div>
    <div className="p-4">{children}</div>
  </div>
)

export default function FDConsultation() {
  const profile = useMemo(() => ({ name: 'Front Desk' }), [])
  const dayList = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
  const [availability, setAvailability] = useState({
    Monday: true, Tuesday: true, Wednesday: true, Thursday: true, Friday: true, Saturday: false
  })
  const [avgMins, setAvgMins] = useState('5')
  const [autoApprove, setAutoApprove] = useState(true)
  const [sessions, setSessions] = useState(
    dayList.reduce((acc, d) => ({ ...acc, [d]: 2 }), {})
  )

  const addSession = (day) => setSessions((s) => ({ ...s, [day]: (s[day] || 0) + 1 }))
  const copyFromAbove = () => {}

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

      {/* Consultation Hours UI matching screenshot */}
      <div className="mt-4">
        <SectionCard title="Set Your Consultation Hours">
          {/* Header row: avg mins, total tokens, auto approve */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-700">Average Consultation Min per Patient :</span>
              <input
                value={avgMins}
                onChange={(e)=>setAvgMins(e.target.value)}
                className="h-8 w-16 border border-gray-300 rounded-md px-2 text-sm"
              />
              <span className="text-gray-500">Mins</span>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <div className="text-gray-700">
                Total Monthly Tokens Available: <span className="text-green-600 font-medium">775</span> / 800
              </div>
              <label className="inline-flex items-center gap-2 text-gray-700">
                <input type="checkbox" className="h-4 w-4" checked={autoApprove} onChange={(e)=>setAutoApprove(e.target.checked)} />
                Auto Approve Requested Appointment
              </label>
            </div>
          </div>

          {/* Days grid */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {dayList.map((day) => {
              const enabled = availability[day]
              const count = sessions[day] || 0
              return (
                <div key={day} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[15px] font-medium text-gray-800">{day}</span>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>Available</span>
                      <div onClick={()=>setAvailability((a)=>({ ...a, [day]: !a[day] }))}>
                        <Toggle checked={enabled} />
                      </div>
                    </div>
                  </div>
                  {/* Session rows */}
                  <div className="mt-2 space-y-2">
                    {Array.from({ length: count }).map((_, i) => (
                      <div key={i} className={`grid grid-cols-12 items-end gap-2 ${!enabled ? 'opacity-60' : ''}`}>
                        <div className="col-span-12 sm:col-span-2 text-sm text-gray-600">Session {i+1}:</div>
                        <div className="col-span-6 sm:col-span-3"><TimeInput label="" disabled={!enabled} defaultValue={i===0 ? '09:00 AM' : '03:00 PM'} /></div>
                        <div className="col-span-6 sm:col-span-3"><TimeInput label="" disabled={!enabled} defaultValue={i===0 ? '01:00 PM' : '06:00 PM'} /></div>
                        <div className="col-span-12 sm:col-span-3">
                          <label className="text-sm text-gray-700">Token Available:</label>
                          <div className="mt-1 flex items-center gap-2">
                            <input disabled={!enabled} defaultValue={25} placeholder="Value" className="h-8 w-full border border-gray-300 rounded-md px-2 text-sm" />
                            <button type="button" className="h-8 w-8 grid place-items-center border rounded-md text-gray-600" title="Copy from above" onClick={copyFromAbove}>
                              <Copy size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={()=>addSession(day)}
                    className={`mt-2 text-sm text-blue-600 ${!enabled ? 'opacity-50 cursor-not-allowed' : 'hover:underline'}`}
                    disabled={!enabled}
                  >
                    + Add More
                  </button>
                </div>
              )
            })}
          </div>

          {/* Terms + Save */}
          <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <label className="text-[12px] text-gray-700 inline-flex items-start gap-2">
              <input type="checkbox" className="mt-[2px]" defaultChecked />
              <span>
                In order to use the platform to its full potential and continue using your benefits, kindly accept our
                <a href="#" className="text-blue-600 mx-1">Terms and conditions</a>
                and
                <a href="#" className="text-blue-600 mx-1">Privacy policy</a>.
              </span>
            </label>
            <div className="md:ml-auto">
              <button className="px-5 h-9 rounded bg-blue-600 text-white text-sm font-medium hover:bg-blue-700">Save</button>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
