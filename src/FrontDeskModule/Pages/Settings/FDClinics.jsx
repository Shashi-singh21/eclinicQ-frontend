import React, { useMemo } from 'react'
import { CheckCircle2, FileText } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import AvatarCircle from '../../../components/AvatarCircle'
import Input from '../../../components/FormItems/Input'
import MapLocation from '../../../components/FormItems/MapLocation'
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

export default function FDClinics() {
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

      {/* Content copied from Doctor Settings – Clinical Details */}
      <div className="mt-4 grid grid-cols-12 gap-4">
        <div className="col-span-12 xl:col-span-6">
          <SectionCard title="Clinic Info" subtitle="Visible to Patient">
            <div className="space-y-3">
              <Input label="Clinic Name" compulsory placeholder="Clinic Name" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <Input label="Mobile Number" placeholder="91753 67487" />
                  <div className="mt-1 text-[12px] text-green-600 inline-flex items-center gap-1"><CheckCircle2 size={14}/>Verified</div>
                </div>
                <div>
                  <Input label="Email" compulsory placeholder="email@example.com" />
                  <div className="mt-1 text-[12px] text-green-600 inline-flex items-center gap-1"><CheckCircle2 size={14}/>Verified</div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input label="Establishment Date" compulsory type="date" />
                <div>
                  <label className="text-sm text-gray-700">Establishment Proof</label>
                  <div className="mt-1 h-[32px] border border-gray-300 rounded-lg flex items-center justify-between px-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600"><span className="inline-flex items-center justify-center w-5 h-5 rounded bg-gray-100"><FileText size={14}/></span> Establishment.pdf</div>
                    <button className="text-blue-600 text-xs">Change</button>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-end">
                <div>
                  <label className="text-sm text-gray-700">Number of Beds</label>
                  <div className="mt-1 flex items-center gap-2">
                    <input className="h-8 w-full border border-gray-300 rounded-lg px-2 text-sm" placeholder="Enter Number of Beds" />
                    <span className="text-xs text-gray-500">Beds</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-700 mb-1">About Clinic</div>
                <div className="border border-gray-200 rounded-md">
                  <div className="px-2 py-1 border-b border-gray-200 text-gray-600 text-sm flex items-center gap-2">
                    <button className="hover:text-gray-900">✎</button>
                    <button className="hover:text-gray-900 font-bold">B</button>
                    <button className="hover:text-gray-900 italic">I</button>
                    <button className="hover:text-gray-900 underline">U</button>
                    <button className="hover:text-gray-900">•</button>
                  </div>
                  <textarea className="w-full min-h-[140px] p-3 text-sm outline-none" defaultValue={'Dr. Milind Chauhan practices Gynaecologist and Obstetrician in Andheri East, Mumbai and has 13 years of experience in this field. He has completed his DNB - Obstetric and Gynecology and MBBS. Dr. Milind Chauhan has gained the confidence of patients and is a popular Gynaecologist and Obstetrician expert in Mumbai who performs treatment and procedures for various health issues related to Gynaecologist and Obstetrician.'} />
                  <div className="px-3 pb-2 text-[12px] text-gray-500 text-right">250/1600</div>
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-700 mb-2">Clinic Photos</div>
                <div className="flex flex-wrap gap-3 items-center">
                  {[1,2,3,4].map((i) => (<div key={i} className="w-28 h-20 bg-gray-100 rounded-md border border-gray-200" />))}
                  <label className="w-40 h-20 border border-dashed border-gray-300 rounded-md grid place-items-center text-blue-600 text-sm cursor-pointer">
                    <input type="file" className="hidden" /> Upload File
                  </label>
                </div>
                <div className="text-[12px] text-gray-500 mt-1">Support Size upto 2MB in .png, .jpg, .svg, .webp</div>
              </div>
            </div>
          </SectionCard>
        </div>

        <div className="col-span-12 xl:col-span-6">
          <SectionCard title="Clinic Address" subtitle="Visible to Patient">
            <div className="space-y-3">
              <label className="text-sm text-gray-700">Map Location</label>
              <div className="h-[220px]"><MapLocation heightClass="h-full" addButtonLabel="Add Location" /></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input label="Block no./Shop no./House no." compulsory placeholder="Shop No 2" />
                <Input label="Road/Area/Street" compulsory placeholder="Jawahar Nagar, Gokul Colony" />
                <Input label="Landmark" compulsory placeholder="Near Chowk" />
                <Input label="Pincode" compulsory placeholder="444001" />
                <Input label="City" compulsory placeholder="Akola" />
                <div>
                  <label className="text-sm text-gray-700">State</label>
                  <select className="mt-1 h-8 w-full border border-gray-300 rounded-lg px-2 text-sm">
                    <option>Maharashtra</option>
                    <option>Karnataka</option>
                    <option>Gujarat</option>
                  </select>
                </div>
              </div>
            </div>
          </SectionCard>
          <div className="flex justify-end mt-4">
            <button className="px-4 h-9 rounded bg-blue-600 text-white text-sm font-medium hover:bg-blue-700">Save</button>
          </div>
        </div>
      </div>
    </div>
  )
}
