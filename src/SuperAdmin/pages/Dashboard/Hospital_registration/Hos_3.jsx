import React, { useState, useEffect } from 'react';
import {
  FormFieldRow,
  MapLocation,
  RegistrationHeader,
  ProgressBar,
  Toggle
} from '../../../../components/FormItems'; // Removed Checkbox from here
import InputWithMeta from '../../../../components/GeneralDrawer/InputWithMeta';
import useHospitalRegistrationStore from '../../../../store/useHospitalRegistrationStore';
import CustomUpload from '../Doctor_registration/CustomUpload';
import { ChevronDown, Plus, Trash2 } from 'lucide-react';
import useHospitalStep1Store from '../../../../store/useHospitalStep1Store';
// Import context for sub-step management
import { useRegistration } from '../../../../SuperAdmin/context/RegistrationContext';
import { Checkbox } from '../../../../components/ui/checkbox'; // Added UI Checkbox import
import TimeInput from '../../../../components/FormItems/TimeInput';

const Hos_3 = () => {
  const store = useHospitalRegistrationStore();
  const { formData } = useRegistration(); // Get global formData for sub-step

  // Destructure sub-step from formData, default to 1
  const currentSubStep = formData.hosStep3SubStep || 1;

  const {
    setField,
    setAddressField,
    // destructure state variables for cleaner access
    name, type, emailId, phone, establishmentYear, website, url, logo, image, noOfBeds,
    address, city, state, pincode, latitude, longitude,
    documents,
    hospitalServices,
    medicalSpecialties,
    accreditation
  } = store;

  // We might need adminId from Step 1
  const setAdminId = useHospitalRegistrationStore(s => s.setField);
  const step1AdminId = useHospitalStep1Store(s => s.adminId || s.response?.adminId);

  useEffect(() => {
    if (step1AdminId) {
      setAdminId('adminId', step1AdminId);
    }
  }, [step1AdminId, setAdminId]);

  const [openDropdowns, setOpenDropdowns] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const toggleDropdown = (key) => {
    setOpenDropdowns(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const closeDropdown = (key) => {
    setOpenDropdowns(prev => ({ ...prev, [key]: false }));
  };

  // Validation
  const validateField = (name, value) => {
    switch (name) {
      case 'name':
      case 'type':
      case 'emailId':
      case 'phone':
      case 'blockNo':
      case 'street':
      case 'landmark':
      case 'city':
      case 'state':
      case 'pincode':
        if (!value) return 'Required';
        return '';
      case 'noOfBeds':
        if (value && isNaN(value)) return 'Must be a number';
        return '';
      default: return '';
    }
  };

  const handleChange = (field, value) => {
    setField(field, value);
    setFormErrors(prev => ({ ...prev, [field]: validateField(field, value) }));
  };

  const handleAddressChange = (field, value) => {
    setAddressField(field, value);
    setFormErrors(prev => ({ ...prev, [field]: validateField(field, value) }));
  };

  const hospitalTypeOptions = [
    { value: 'General Hospital', label: 'General Hospital' },
    { value: 'Specialized Hospital', label: 'Specialized Hospital' },
    { value: 'Clinic', label: 'Clinic' },
    { value: 'Nursing Home', label: 'Nursing Home' },
    { value: 'Medical College Hospital', label: 'Medical College Hospital' },
  ];

  const yearOptions = Array.from({ length: 100 }, (_, i) => {
    const y = new Date().getFullYear() - i;
    return { value: String(y), label: String(y) };
  });

  const cityOptions = [
    { value: "Akola", label: "Akola" },
    { value: "Mumbai", label: "Mumbai" },
    { value: "Delhi", label: "Delhi" },
    { value: "Bangalore", label: "Bangalore" },
    { value: "Chennai", label: "Chennai" }
  ];

  const stateOptions = [
    { value: "Maharashtra", label: "Maharashtra" },
    { value: "Delhi", label: "Delhi" },
    { value: "Karnataka", label: "Karnataka" },
    { value: "Tamil Nadu", label: "Tamil Nadu" },
    { value: "Gujarat", label: "Gujarat" }
  ];

  // Page 2 Data Lists
  const specialtiesList = [
    "Cardiology", "Orthopedics", "Emergency Medicine", "Radiology", "Dermatology",
    "Neurology", "Internal Medicine", "Anesthesiology", "Oncology", "Pediatrics",
    "Obstetrics & Gynecology", "Surgery", "Psychiatry", "Endocrinology"
  ];

  const servicesList = [
    "Emergency Care", "Laboratory Services", "Rehabilitation Services", "Pediatric Care",
    "24/7 Emergency Services", "Emergency Department", "Laboratory", "Surgery",
    "Outpatient Care", "Mental Health Services", "Pharmacy", "Ambulance Services",
    "Blood Bank", "Diagnostics Imaging", "Inpatient Care", "Maternity Care",
    "ICU", "Patient Rooms"
  ];

  const accreditationList = [
    "NABH – National Accreditation Board for Hospitals & Healthcare Providers",
    "ISO Certifications",
    "JCI – Joint Commission International",
    "NABL – National Accreditation Board for Testing and Calibration Laboratories"
  ];



  const toggleSelection = (field, item) => {
    const current = Array.isArray(store[field]) ? store[field] : [];
    if (current.includes(item)) {
      setField(field, current.filter(i => i !== item));
    } else {
      setField(field, [...current, item]);
    }
  };

  /* const toggleDay = (day) => {
    const current = Array.isArray(store.operatingHours) ? store.operatingHours : [];
    if (current.includes(day)) {
      store.setOperatingHours(current.filter(d => d !== day));
    } else {
      store.setOperatingHours([...current, day]);
    }
  }; */

  const getDoc = (type) => documents?.find(d => d.type === type);
  const SectionHeading = ({ title, subtitle, required }) => (
    <div>
      <h3 className="flex items-center  text-sm font-semibold text-secondary-grey400">
        <span>{title}</span>
        {required && (
          <span className="w-1 h-1 bg-red-500 rounded-full inline-block mb-2.5" />
        )}
      </h3>
      <p className="text-xs text-secondary-grey300 ">{subtitle}</p>
    </div>
  );

  const LabeledCheckbox = ({ label, checked, onChange }) => (
    <div className="flex items-center gap-2">
      <Checkbox
        id={label}
        checked={checked}
        onCheckedChange={onChange}
        className="data-[state=checked]:bg-blue-primary250 data-[state=checked]:border-blue-primary250 border-secondary-grey200 w-4 h-4 rounded-[4px]"
      />
      <label htmlFor={label} className="text-xs text-secondary-grey300 cursor-pointer select-none">
        {label}
      </label>
    </div>
  );


  // Page 1: Hospital Details
  const Page1 = () => (
    <div className="max-w-[700px] mx-auto space-y-5">
      {/* Hospital Info */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-secondary-grey400">Hospital Info</h2>

        <FormFieldRow>
          <div className='w-full'>
            <InputWithMeta
              label="Hospital Name"
              requiredDot
              value={name}
              onChange={(v) => handleChange('name', v)}
              placeholder="Hospital Name"
              meta="Visible to Patient"
            />
            {formErrors.name && <span className="text-red-500 text-xs">{formErrors.name}</span>}
          </div>
          <div className='w-full'>
            <InputWithMeta
              label="Hospital Type"
              requiredDot
              value={type}
              placeholder="Select Hospital Type"
              RightIcon={ChevronDown}
              readonlyWhenIcon
              onIconClick={() => toggleDropdown('type')}
              dropdownOpen={openDropdowns['type']}
              onRequestClose={() => closeDropdown('type')}
              dropdownItems={hospitalTypeOptions}
              onSelectItem={(item) => {
                handleChange('type', item.value);
                closeDropdown('type');
              }}
              meta="Visible to Patient"
            />
            {formErrors.type && <span className="text-red-500 text-xs">{formErrors.type}</span>}
          </div>
        </FormFieldRow>

        <FormFieldRow>
          <div className='w-full'>
            <InputWithMeta
              label="Hospital Contact Email"
              requiredDot
              value={emailId}
              onChange={(v) => handleChange('emailId', v)}
              placeholder="Enter Work Email"
              meta="Visible to Patient"
            />
            {formErrors.emailId && <span className="text-red-500 text-xs">{formErrors.emailId}</span>}
          </div>
          <div className='w-full'>
            <InputWithMeta
              label="Hospital Contact Number"
              requiredDot
              value={phone}
              onChange={(v) => handleChange('phone', v)}
              placeholder="Enter Work Email"
              meta="Visible to Patient"
            />
            {formErrors.phone && <span className="text-red-500 text-xs">{formErrors.phone}</span>}
          </div>
        </FormFieldRow>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div className='w-full'>
            <InputWithMeta
              label="Established Year"
              value={establishmentYear}
              placeholder="Select Year"
              RightIcon={ChevronDown}
              readonlyWhenIcon
              onIconClick={() => toggleDropdown('year')}
              dropdownOpen={openDropdowns['year']}
              onRequestClose={() => closeDropdown('year')}
              dropdownItems={yearOptions}
              onSelectItem={(item) => {
                handleChange('establishmentYear', item.value);
                closeDropdown('year');
              }}
            />
          </div>
          <div className='w-full'>
            <InputWithMeta
              label="Website"
              value={website}
              onChange={(v) => handleChange('website', v)}
              placeholder="Paste Website Link"
            />
          </div>
          <div className='w-full'>
            <InputWithMeta
              label="Number of Beds"
              value={noOfBeds}
              onChange={(v) => handleChange('noOfBeds', v)}
              placeholder="Enter Beds Count"
            />
            {formErrors.noOfBeds && <span className="text-red-500 text-xs">{formErrors.noOfBeds}</span>}
          </div>
        </div>
      </div>

      <div className="border-t border-secondary-grey200/20 my-4"></div>

      {/* Clinic Address */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-secondary-grey400 flex justify-between">
          <span>Clinic Address</span>
        </h2>

        <div className='flex flex-col gap-2'>
          <div className='flex justify-between items-center  flex-nowrap'>
            <InputWithMeta
              label="Map Location"
              infoIcon
              showInput={false}
            />
            <button type="button" className="text-sm text-blue-primary250 whitespace-nowrap">Add Location</button>
          </div>
          <div className='h-[100px] w-full rounded-md overflow-hidden relative'>
            <MapLocation
              heightClass="h-full"
              onChange={({ lat, lng }) => {
                handleChange('latitude', lat);
                handleChange('longitude', lng);
              }}
            />
          </div>
        </div>

        <FormFieldRow>
          <div className='w-full'>
            <InputWithMeta
              label="Block no./Shop no./House no."
              requiredDot
              value={address?.blockNo || ''}
              onChange={(v) => handleAddressChange('blockNo', v)}
              placeholder="Enter Block Number/ Shop Number/ House Number"
            />
            {formErrors.blockNo && <span className="text-red-500 text-xs">{formErrors.blockNo}</span>}
          </div>
          <div className='w-full'>
            <InputWithMeta
              label="Road/Area/Street"
              requiredDot
              infoIcon
              value={address?.street || ''}
              onChange={(v) => handleAddressChange('street', v)}
              placeholder="Enter Road/Area/Street"
            />
            {formErrors.street && <span className="text-red-500 text-xs">{formErrors.street}</span>}
          </div>
        </FormFieldRow>

        <FormFieldRow>
          <div className='w-full'>
            <InputWithMeta
              label="Landmark"
              requiredDot
              value={address?.landmark || ''}
              onChange={(v) => handleAddressChange('landmark', v)}
              placeholder="Enter landmark"
            />
            {formErrors.landmark && <span className="text-red-500 text-xs">{formErrors.landmark}</span>}
          </div>
          <div className='w-full'>
            <InputWithMeta
              label="Pincode"
              requiredDot
              infoIcon
              value={pincode}
              onChange={(v) => handleChange('pincode', v)}
              placeholder="Enter Pincode"
            />
            {formErrors.pincode && <span className="text-red-500 text-xs">{formErrors.pincode}</span>}
          </div>
        </FormFieldRow>

        <FormFieldRow>
          <div className='w-full'>
            <InputWithMeta
              label="City"
              requiredDot
              infoIcon
              value={city}
              placeholder="Select City"
              RightIcon={ChevronDown}
              readonlyWhenIcon
              onIconClick={() => toggleDropdown('city')}
              dropdownOpen={openDropdowns['city']}
              onRequestClose={() => closeDropdown('city')}
              dropdownItems={cityOptions}
              onSelectItem={(item) => {
                handleChange('city', item.value);
                closeDropdown('city');
              }}
            />
            {formErrors.city && <span className="text-red-500 text-xs">{formErrors.city}</span>}
          </div>
          <div className='w-full'>
            <InputWithMeta
              label="State"
              requiredDot
              infoIcon
              value={state}
              placeholder="Select State"
              RightIcon={ChevronDown}
              readonlyWhenIcon
              onIconClick={() => toggleDropdown('state')}
              dropdownOpen={openDropdowns['state']}
              onRequestClose={() => closeDropdown('state')}
              dropdownItems={stateOptions}
              onSelectItem={(item) => {
                handleChange('state', item.value);
                closeDropdown('state');
              }}
            />
            {formErrors.state && <span className="text-red-500 text-xs">{formErrors.state}</span>}
          </div>
        </FormFieldRow>
      </div>

      <div className="border-t border-secondary-grey200/20 my-4"></div>

      {/* Social Presence */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-secondary-grey400">Social Presence</h2>

        <FormFieldRow>
          <div className="w-full">
            <InputWithMeta
              label="Hospital URL"
              infoIcon
              requiredDot
              inputRightMeta=".eclinicq.com"
              placeholder="Enter Hospital User Name"
              value={url}
              onChange={(val) => handleChange('url', val)}
            />
          </div>
          <div className="w-full">
            <CustomUpload
              label="Upload Company Logo"
              compulsory={false}
              infoIcon
              uploadContent="Upload File"
              meta="Support Size upto 1MB in .png, .jpg, .svg, .webp"
              onUpload={(key, name) => handleChange('logo', key)}
              uploadedKey={logo}
            />
          </div>
        </FormFieldRow>

        <FormFieldRow>
          <div className="w-full">
            <CustomUpload
              label="Upload Hospital Image"
              compulsory={true}
              uploadContent="Upload File"
              meta="Support Size upto 2MB in .png, .jpg, .svg, .webp"
              onUpload={(key, name) => handleChange('image', key)}
              uploadedKey={image}
            />
          </div>
          <div className="w-full"></div>
        </FormFieldRow>
      </div>
      <div className='pb-4'></div>
    </div>
  );

  // Page 2: Services & Facilities
  const Page2 = () => (
    <div className="max-w-[700px] mx-auto space-y-6">



      {/* Medical Specialties */}
      <div className="space-y-2">
        <SectionHeading
          title="Medical Specialties"
          required
          subtitle="Select the medical specialties available at your hospital"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-4 border border-secondary-grey100 rounded-lg p-3">
          {specialtiesList.map(item => (
            <LabeledCheckbox
              key={item}
              label={item}
              checked={(medicalSpecialties || []).includes(item)}
              onChange={() => toggleSelection('medicalSpecialties', item)}
            />
          ))}
        </div>
      </div>

      <div className='border-t border-secondary-grey200/20'></div>

      {/* Hospital Services & Facilities */}
      <div className="space-y-2 ">
        <SectionHeading
          title="Hospital Services & Facilities"
          required
          subtitle="Select the services provided by your hospital"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-4 border border-secondary-grey100 rounded-lg p-3">
          {servicesList.map(item => (
            <LabeledCheckbox
              key={item}
              label={item}
              checked={(hospitalServices || []).includes(item)}
              onChange={() => toggleSelection('hospitalServices', item)}
            />
          ))}
        </div>
      </div>
      <div className='border-t border-secondary-grey200/20 '></div>

      {/* Accreditations */}
      <div className="space-y-2">
        <SectionHeading
          title="Accreditations"
          subtitle="Select accreditations held by your hospital"
        />
        <div className="flex flex-col gap-3 border border-secondary-grey100 rounded-lg p-3">
          {accreditationList.map(item => (
            <LabeledCheckbox
              key={item}
              label={item}
              checked={(accreditation || []).includes(item)}
              onChange={() => toggleSelection('accreditation', item)}
            />
          ))}
        </div>
      </div>

      <div className='border-t border-secondary-grey200/20'></div>

      {/* Operating Hours */}
      <div className="space-y-4">
        <SectionHeading
          title="Operating Hours"
          subtitle="Select the days and times your hospital is open"
        />
        <div className="flex flex-col gap-4 ">
          {(store.schedule || []).map((dayData, index) => {
            const { day, available, is24Hours, sessions } = dayData;

            const handleUpdate = (updates) => {
              store.updateDay(day, updates);
            };

            return (
              <div key={day} className="border h-auto min-h-[46px] rounded-lg border-secondary-grey100 p-3 bg-white transition-all duration-200">
                {/* Header Row: Day Name + Toggle */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-secondary-grey400">{day}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-secondary-grey300">Available</span>
                    <Toggle
                      checked={available}
                      onChange={(e) => handleUpdate({ available: e.target.checked })}
                    />
                  </div>
                </div>

                {/* Expanded Content */}
                {available && (
                  <div className="mt-4 border-t border-secondary-grey100 pt-4 space-y-3">
                    {/* Sessions List (only if not 24 hours) */}
                    {!is24Hours && sessions && (
                      <div className="space-y-4">
                        {sessions.map((session, sIdx) => (
                          <div key={sIdx} className="flex flex-wrap items-center justify-between">
                            <div className='flex items-center gap-3'>
                               <span className="text-sm whitespace-nowrap text-gray-500 ">Availability Time:</span>
                            <TimeInput
                              value={session.startTime}
                              onChange={(e) => {
                                const newSessions = [...sessions];
                                newSessions[sIdx] = { ...newSessions[sIdx], startTime: e.target.value };
                                handleUpdate({ sessions: newSessions });
                              }}
                              className=""
                            />
                            <span className="text-sm text-secondary-grey300">-</span>
                            <TimeInput
                              value={session.endTime}
                              onChange={(e) => {
                                const newSessions = [...sessions];
                                newSessions[sIdx] = { ...newSessions[sIdx], endTime: e.target.value };
                                handleUpdate({ sessions: newSessions });
                              }}
                              className="w-[160px]"
                            />

                            </div>
                           
                            <div className="flex items-center gap-2 ml-2">
                              {/* Delete Button (only if > 1 session) */}
                              {sessions.length > 1 && sIdx !== sessions.length - 1  && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newSessions = sessions.filter((_, i) => i !== sIdx);
                                    handleUpdate({ sessions: newSessions });
                                  }}
                                  className="text-gray-400 hover:text-red-500 transition-colors"
                                >
                                  <Trash2 size={16} />
                                </button>
                              )}

                              {/* Add More Button (only on last item) */}
                              {sIdx === sessions.length - 1 && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (sessions.length >= 6) {
                                      alert("Maximum 6 slots allowed");
                                      return;
                                    }
                                    const newSessions = [...sessions, { startTime: '09:00', endTime: '18:00' }];
                                    handleUpdate({ sessions: newSessions });
                                  }}
                                  className="text-sm text-blue-primary250 hover:bg-blue-primary50 p-1 rounded-md ml-2 whitespace-nowrap"
                                >
                                  + Add More
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* 24 Hours Toggle Row */}
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id={`24h-${day}`}
                        checked={is24Hours}
                        onCheckedChange={(checked) => handleUpdate({ is24Hours: !!checked })}
                        className="w-4 h-4 rounded-[4px] border-secondary-grey200 data-[state=checked]:bg-blue-primary250 data-[state=checked]:border-blue-primary250"
                      />
                      <label htmlFor={`24h-${day}`} className="text-xs text-secondary-grey300 cursor-pointer select-none">
                        Available 24 Hours
                      </label>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className='pb-4'></div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-white rounded-md shadow-sm overflow-hidden">
      <RegistrationHeader
        title={currentSubStep === 1 ? "Hospital Details" : "Services & Facilities"}
        subtitle={currentSubStep === 1 ? "Provide your hospital details" : "Medical services and hospital facilities"}
      >
        <div className="mt-3">
          <ProgressBar step={currentSubStep} total={2} />
        </div>
      </RegistrationHeader>

      <div className="flex-1 overflow-y-auto p-6">
        {currentSubStep === 1 ? <Page1 /> : <Page2 />}
      </div>
    </div>
  );
};

export default Hos_3;
