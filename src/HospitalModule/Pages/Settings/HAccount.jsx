import React, { useMemo, useState, useEffect } from 'react'
import { CheckCircle2, Upload, FileText } from 'lucide-react'
import AvatarCircle from '../../../components/AvatarCircle'
import { hospital as coverImg,
  add,
  pencil,
  verifiedTick
 } from '../../../../public/index.js'
import { useLocation, useNavigate } from 'react-router-dom'
import Input from "../../../components/FormItems/Input";
import Toggle from "../../../components/FormItems/Toggle";
import TimeInput from "../../../components/FormItems/TimeInput";
import MapLocation from "../../../components/FormItems/MapLocation";


const InfoField = ({ label, value, right }) => (
  <div className="grid grid-cols-12 gap-2 text-[13px] leading-5">
    <div className="col-span-4 text-gray-500">{label}</div>
    <div className="col-span-8 text-gray-900 flex items-center gap-2 min-h-[26px]">
      <span className="truncate">{value || '-'}</span>
      {right}
    </div>
  </div>
)

const SectionCard = ({ title, subtitle, action, Icon, children,onIconClick, variant = 'default' }) => (
  <div className="bg-white rounded-lg border border-gray-200">
    {variant === 'default' ? (
      <>
        <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
          <div className="text-sm">
            <div className="font-medium text-gray-900">{title}</div>
            {subtitle ? <div className="text-[12px] text-gray-500">{subtitle}</div> : null}
          </div>
         
        
        {Icon && (
          <button
            onClick={onIconClick}
            className="p-1 text-gray-500 hover:bg-gray-50"
          >
            {typeof Icon === "string" ? (
              <img src={Icon} alt="icon" className="w-7 h-7" />
            ) : (
              <Icon className="w-7 h-7" />
            )}
          </button>
        )}
        </div>
        <div className="p-4">{children}</div>
      </>
    ) : (
      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="text-sm font-medium text-gray-900">{title}</div>
            {subtitle ? (
              <span className="text-[11px] px-2 py-0.5 rounded border bg-gray-50 text-gray-600">{subtitle}</span>
            ) : null}
          </div>
         
        </div>
        <div>{children}</div>
      </div>
    )}
  </div>
)

export default function HAccount(){
  const location = useLocation()
  const navigate = useNavigate()
  const [hospitalDrawerOpen, setHospitalDrawerOpen] = useState(false);
  const [hospital, setHospital] = useState(null);


  const tabs = [
    { key: 'account', label: 'Account Detail', path: '/hospital/settings/account' },
    { key: 'timing', label: 'Timing and Schedule', path: '/hospital/settings/timing' },
    { key: 'surgeries', label: 'Surgeries', path: '/hospital/settings/surgeries' },
    { key: 'staff', label: 'Staff Permissions', path: '/hospital/settings/staff-permissions' },
    { key: 'security', label: 'Security Settings', path: '/hospital/settings/security' },
  ]

  const activeKey = useMemo(() => {
    const p = location.pathname
    if (p.endsWith('/settings/account')) return 'account'
    if (p.endsWith('/settings/timing')) return 'timing'
    if (p.endsWith('/settings/surgeries')) return 'surgeries'
    if (p.endsWith('/settings/staff-permissions')) return 'staff'
    if (p.endsWith('/settings/security')) return 'security'
    return 'account'
  }, [location.pathname])

  const [activeTab, setActiveTab] = useState(activeKey)
  useEffect(() => setActiveTab(activeKey), [activeKey])

  const profile = useMemo(() => ({
    name: 'Manipal Hospital - Baner',
    status: 'Active',
    phone: '91753 67487',
    email: 'milindchahun@gmail.com',
    gender: 'Male',
    city: 'Akola, Maharashtra',
    designation: 'Business Owner',
    role: 'Super Admin',
    specialties: ['Anaesthesiology','Cardiology','Dermatology','Orthopedics','Physiotherapy','ENT','Pulmonology','Haematology','Oncology'],
    services: ['MRI Scan','CT Scan','Blood Bank','Parking','Path Lab','X Ray','Pharmacy','Radiology','Private Room','General Ward'],
    gst: { number: '27AAECA1234F1Z5', proof: 'GST Proof.pdf' },
    cin: {
      number: '27AAECA1234F1Z5', company: 'Manipal Hospital Pvt. Ltd.', type: 'Private Limited',
      incorporation: '02/05/2015', address: '101, FC Road, Pune', stateCode: 'PN (Maharashtra)', director: 'Dr. R. Mehta', code: '012345'
    },
    about: `Dr. Milind Chauhan practices Gynaecologist and Obstetrician in Andheri East, Mumbai and has 13 years of experience in this field. He has completed his DNB - Obstetric and Gynecology and MBBS. Dr. Milind Chauhan has gained the confidence of patients and is a popular Gynaecologist and Obstetrician expert in Mumbai who performs treatment and procedures for various health issues related to Gynaecologist and Obstetrician.`,
    photos: [
      'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400',
      'https://images.unsplash.com/photo-1584985592394-8c40a30e2531?w=400',
      'https://images.unsplash.com/photo-1504439904031-93ded9f93b28?w=400',
      'https://images.unsplash.com/photo-1579154206451-2bdb0fd2d375?w=400',
    ],
  }), [])
    const [showAddMenu, setShowAddMenu] = useState(false);

  return (
    <div className="px-6 pb-10">
      {/* Top banner + centered avatar + tabs */}
      <div className="-mx-6">
        <div className="relative">
          <img src={coverImg} alt="cover" className="w-full h-40 object-cover" />
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
            <div className="rounded-full ring-4 ring-white shadow-md">
              <AvatarCircle name={profile.name} size="l" color="blue" className="w-24 h-24 text-3xl" />
            </div>
          </div>
        </div>
        <div className="bg-white border-b border-gray-200">
          <div className="px-6 pt-10">
            <div className="flex items-center justify-between">
              <div className="text-center mx-auto">
                <div className="text-lg font-medium text-gray-900">{profile.name}</div>
                <div className="text-green-600 text-sm">{profile.status}</div>
              </div>
              <div className="text-sm text-gray-600">Baner, Pune</div>
            </div>
            <nav className="mt-3 flex items-center gap-6 overflow-x-auto text-sm">
              {tabs.map((t) => (
                <button key={t.key} onClick={() => navigate(t.path)} className={`whitespace-nowrap pb-3 border-b-2 transition-colors ${activeTab===t.key? 'border-blue-600 text-gray-900' : 'border-transparent text-gray-600 hover:text-gray-900'}`}>
                  {t.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Account Detail content */}
      {activeTab === 'account' && (
        <div className="mt-4 grid grid-cols-12 gap-4">
          {/* Two-column layout: left 7, right 5 */}
          <div className="col-span-12 xl:col-span-7 space-y-4">
            <SectionCard
              title="Basic Info"
              subtitle="Visible to Patient"
              Icon={pencil}
              onIconClick={() => setBasicOpen(true)}
            >
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-[14px] mb-4">
                  <InfoField
                    label="First Name"
                    value={profile.basic?.firstName}
                  />
                  <InfoField
                    label="Last Name"
                    value={profile.basic?.lastName}
                  />
                  <InfoField
                    label="Mobile Number"
                    value={profile.basic?.phone}
                    right={
                      <span className="inline-flex items-center text-green-600 border border-green-400 py-0.5 px-1 rounded-md text-[12px]">
                        <img
                          src={verifiedTick}
                          alt="Verified"
                          className="w-3.5 h-3.5 mr-1"
                        />
                        Verified
                      </span>
                    }
                  />
                  <InfoField
                    label="Email"
                    value={profile.basic?.email}
                    right={
                      <span className="inline-flex items-center text-green-600 border border-green-400 py-0.5 px-1 rounded-md text-[12px]">
                        <img
                          src={verifiedTick}
                          alt="Verified"
                          className="w-3.5 h-3.5 mr-1"
                        />
                        Verified
                      </span>
                    }
                  />
                  <InfoField
                    label="Gender"
                    value={
                      profile.basic?.gender?.charAt(0).toUpperCase() +
                      profile.basic?.gender?.slice(1).toLowerCase()
                    }
                  />
                  
                  <InfoField
                    label="Language"
                    value={
                      Array.isArray(profile.basic?.languages) && profile.basic.languages.length > 0 ? (
                        <div className="flex gap-1">
                          {profile.basic.languages.map((lang, idx) => (
                            <span
                              key={`${lang}-${idx}`}
                              className="inline-flex items-center h-5 gap-2 px-[6px] rounded-[4px] bg-secondary-grey50 text-secondary-grey400"
                            >
                              <span className="text-[14px] text-secondary-grey400 inline-flex items-center">{lang}</span>
                              {/* removable button omitted in read-only view */}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-secondary-grey100 px-1">Select Language</span>
                      )
                    }
                  />
                  <InfoField label="City" value={profile.basic?.city} />
                  <InfoField label="Website" value={profile.basic?.website} />
                </div>

                <div className="flex flex-col gap-5">
                  <InfoField
                    label="Profile Headline"
                    value={profile.basic?.headline}
                  />
                  <InfoField label="About" value={profile.basic?.about} />
                </div>
                 <p className="text-[13px] leading-6 text-gray-800">{profile.about}</p>

                 {/* <SectionCard variant="subtle" title="Hospital Photos"> */}
              <div className="flex items-center gap-3 overflow-x-auto">

                {profile.photos.map((src, i) => (
                  <img key={i} src={src} alt="hospital" className="w-36 h-24 rounded-md object-cover border" />
                ))}
              </div>
            {/* </SectionCard> */}
              </div>
            </SectionCard>
            {/* About */}
            {/* <div className="bg-white border border-gray-200 rounded-lg p-4">

             
            </div> */}

            {/* Photos */}
            
 
            {/* Medical Specialties */}
            <SectionCard
              variant="subtle"
              title="Medical Specialties"
              subtitle="Visible to Patient"
              action={<button className="text-blue-600 text-sm inline-flex items-center gap-1" title="Edit">✎</button>}
            >
              <div className="flex flex-wrap gap-2">
                {profile.specialties.map((s,i)=>(<span key={i} className="text-xs px-2 py-1 rounded border bg-gray-50 text-gray-700">{s}</span>))}
              </div>
            </SectionCard>

            {/* Services & Facilities */}
            <SectionCard
              variant="subtle"
              title="Hospital Services & Facilities"
              subtitle="Visible to Patient"
              action={<button className="text-blue-600 text-sm inline-flex items-center gap-1" title="Edit">✎</button>}
            >
              <div className="flex flex-wrap gap-2">
                {profile.services.map((s,i)=>(<span key={i} className="text-xs px-2 py-1 rounded border bg-gray-50 text-gray-700">{s}</span>))}
              </div>
            </SectionCard>

            {/* Awards */}
            <SectionCard
              variant="subtle"
              title="Awards & Accreditations"
              subtitle="Visible to Patient"
              Icon={add}
              onIconClick={() => setShowAddMenu((v)=>!v)}
            >
              <div className="space-y-3">
                <div className="p-3 border border-gray-200 rounded-md">
                  <div className="text-sm text-gray-900 font-medium">Best Plasticene Award</div>
                  <div className="text-[12px] text-gray-600">Manipal hospital</div>
                </div>
              </div>
            </SectionCard>
          </div>

          <div className="col-span-12 xl:col-span-5 space-y-4">

            <SectionCard
              title="hospital Address"
              subtitle="Visible to Patient"
              Icon={pencil}
              onIconClick={() => setHospitalDrawerOpen(true)}
            >
              <div className="mb-3">
                <div className="text-[13px] text-gray-500 mb-1">
                  Map Location
                </div>
                <div className="h-[220px] rounded overflow-hidden border">
                  <MapLocation
                    heightClass="h-full"
                    initialPosition={[
                      parseFloat(hospital?.latitude) || 19.07,
                      parseFloat(hospital?.longitude) || 72.87,
                    ]}
                    readOnly
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <InfoField
                  label="Block no./Shop no./House no."
                  value={hospital?.blockNo}
                />
                <InfoField
                  label="Road/Area/Street"
                  value={hospital?.areaStreet}
                />
                <InfoField label="Landmark" value={hospital?.landmark} />
                <InfoField label="Pincode" value={hospital?.pincode} />
                <InfoField label="City" value={hospital?.city} />
                <InfoField label="State" value={hospital?.state} />
              </div>
            
            </SectionCard>
          


          <div className="col-span-12 xl:col-span-5 xl:col-start-8 space-y-4">

            {/* Basic Info on right */}
            <SectionCard variant="subtle" title="Primary Admin Account detail" subtitle="Visible to Patient">
              <div className="grid grid-cols-2 gap-3 text-[13px]">
               <InfoField
                    label="First Name"
                    value={profile.basic?.firstName}
                  />
                  <InfoField
                    label="Last Name"
                    value={profile.basic?.lastName}
                  />
                  <InfoField
                    label="Mobile Number"
                    value={profile.basic?.phone}
                    right={
                      <span className="inline-flex items-center text-green-600 border border-green-400 py-0.5 px-1 rounded-md text-[12px]">
                        <img
                          src={verifiedTick}
                          alt="Verified"
                          className="w-3.5 h-3.5 mr-1"
                        />
                        Verified
                      </span>
                    }
                  /> 
                  <InfoField
                    label="Email"
                    value={profile.basic?.email}
                    right={
                      <span className="inline-flex items-center text-green-600 border border-green-400 py-0.5 px-1 rounded-md text-[12px]">
                        <img
                          src={verifiedTick}
                          alt="Verified"
                          className="w-3.5 h-3.5 mr-1"
                        />
                        Verified
                      </span>
                    }
                  />
                  <InfoField
                    label="Gender"
                    value={
                      profile.basic?.gender?.charAt(0).toUpperCase() +
                      profile.basic?.gender?.slice(1).toLowerCase()
                    }
                  />
                  <InfoField label="City" value={profile.basic?.city} />
                  <InfoField label="Designation" value={profile.basic?.designation} />
                  <InfoField label="Role" value={profile.basic?.role} />
              </div>
            </SectionCard>

            {/* Verification Documents */}
            <SectionCard title="Verification Documents" subtitle="Visible to Patient" action={<span className="text-[12px] text-gray-500">To Change your Medical proof please <a href="#" className="text-blue-600" onClick={(e)=>e.preventDefault()}>Call Us</a></span>}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[12px] text-gray-500 mb-2">GST Details</div>
                  <InfoField label="GST Number" value={profile.gst.number} />
                </div>
                <div>
                  <div className="text-[12px] text-gray-500 mb-2">Proof of GST Registration</div>
                  <div className="mt-1 flex items-center justify-between gap-2 w-full max-w-xs border rounded px-2 py-1 text-[12px] bg-gray-50">
                    <span className="inline-flex items-center gap-1 text-gray-700"><FileText size={14}/> {profile.gst.proof}</span>
                    <button className="text-gray-500 hover:text-gray-700" title="More">⋮</button>
                  </div>
                </div>
              </div>

              <div className="my-3 h-px bg-gray-200" />

              <div className="mt-2">
                <div className="text-[12px] text-gray-500 mb-2">CIN Details</div>
                <div className="grid grid-cols-2 gap-3 text-[13px]">
                  <InfoField label="CIN Number" value={profile.cin.number} />
                  <InfoField label="Registered Company Name" value={profile.cin.company} />
                  <InfoField label="Company Type" value={profile.cin.type} />
                  <InfoField label="Date of Incorporation" value={profile.cin.incorporation} />
                  <InfoField label="Registered Office Address" value={profile.cin.address} />
                  <InfoField label="State and ROC Code" value={profile.cin.stateCode} />
                  <InfoField label="Authorized Director" value={profile.cin.director} />
                  <InfoField label="Director Code" value={profile.cin.code} />
                </div>
              </div>
            </SectionCard>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
