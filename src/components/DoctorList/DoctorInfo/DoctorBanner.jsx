import { ChevronDown, Hospital, MoreHorizontal } from 'lucide-react';
import React from 'react';
import AvatarCircle from '../../AvatarCircle';
import { docIcon, blueBag, whiteBag } from '../../../../public/index.js';
import InfoBox from './InfoBox';
const down = '/angel-down.svg'
const horizontal = '/horizontal.png'

const hospital = '/icons/Sidebar/MainSidebar/hospital_unselect.png'
const DoctorBanner = ({ doctor }) => {
  const isActive = (doctor?.status || '').toLowerCase() === 'active'
  return (
    <div className="w-full p-4 flex  items-center gap-4 bg-white">
      {/* Profile Circle with tick using reusable AvatarCircle */}
      <div className="relative">
        <AvatarCircle name={doctor?.name || 'Doctor'} color="blue" className="w-[90px] h-[90px] text-[2rem]" />
        <img src="/tick.png" alt="Verified" className="absolute -bottom-0 left-16 w-6 h-6" />
      </div>

      {/* Doctor Info */}
      <div className="flex flex-col gap-1 flex-1">
        <div className="flex flex-wrap gap-3 items-center">
          <span className="text-secondary-grey400 font-semibold text-[20px]">
            {doctor?.name || 'Doctor'}
          </span>
      <div className={`min-w-[22px] px-[6px] py-[2px] rounded-sm ${isActive ? 'bg-success-100' : 'bg-[#FFF8F2]'}`}>
            <span className={` text-sm ${isActive ? 'text-success-300' : 'text-[#F59E0B]'}`}>{isActive ? 'Active' : 'Inactive'}</span>
          </div>
          <div className="bg-secondary-grey50 flex items-center px-[6px] py-[2px] gap-1 rounded-sm">
            <img src={hospital} alt="" className='h-3 w-3' />
            <span className="text-secondary-grey400 text-sm font-normal">
        {doctor?.clinicHospitalName || 'Sunrise Family Clinic'}
            </span>
            <div className='flex items-center pl-2 pr-1 border-l ml-1 '>
                 <img src={down} alt="" className='w-3 h-3' />
            </div>
           
          </div>
        </div>

        <div className="flex flex-col gap-1 text-sm text-secondary-grey400">
          <div className="flex gap-1 items-center">
            <img src={docIcon} alt="Doctor icon" className="w-4 h-4" />
            <span className="">
              {doctor?.designation || 'MBBS, MD - General Medicine'}
            </span>
          </div>
          <div className="flex gap-1 items-center">
            <img src={blueBag} alt="Blue bag icon" className="w-4 h-4" />
            <span className="">{doctor?.specialization || 'General Physician'}</span>
          </div>
          <div className="flex  items-center gap-1">
            <img src={whiteBag} alt="White bag icon" className="w-4 h-4" />
            <span className="">{doctor?.exp || 'Experience details'}</span>
          </div>
        </div>
      </div>



  {/* Info Boxes + menu */}
  <div className="flex items-start gap-4">
    <InfoBox label="No. of Patient Managed" value="1,000" valueClass="text-[#2372EC]" />
    <InfoBox label="No. of Appointments Booked" value="1,000" valueClass="text-[#2372EC]" />
    <InfoBox label="Active Package" value={doctor?.activePackage || '-'} valueClass="text-green-600" />
    <InfoBox label="eClinic-Q ID" value={doctor?.id || '-'} valueClass="text-[#2372EC] break-all" />
    <button className="p-2 text-gray-500 hover:text-gray-700 mr-2 ml-1 mt-2" aria-label="More options">
     <img src={horizontal} alt="" />
    </button>
  </div>
    </div>
  );
};

export default DoctorBanner;
