import React, { useState } from 'react'
import {
  MFA,
  FormFieldRow,
  MapLocation,
  RegistrationHeader
} from '../../../../components/FormItems';
import InputWithMeta from '../../../../components/GeneralDrawer/InputWithMeta';
import useDoctorRegistrationStore from '../../../../store/useDoctorRegistrationStore';
import CustomUpload from './CustomUpload';
import { ChevronDown } from 'lucide-react';
import RadioButton from '../../../../components/GeneralDrawer/RadioButton';
const upload= '/upload_blue.png'


const Step3 = () => {
  const {
    clinicData,
    setClinicField,
    setField,
    hasClinic
  } = useDoctorRegistrationStore();

  const [formErrors, setFormErrors] = React.useState({});
  const [openDropdowns, setOpenDropdowns] = useState({});

  const toggleDropdown = (key) => {
    setOpenDropdowns(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const closeDropdown = (key) => {
    setOpenDropdowns(prev => ({ ...prev, [key]: false }));
  };

  // Common form field props
  const commonFieldProps = {
    compulsory: true,
    required: true
  };

  // Validation functions
  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (!value) return "Required";
        return "";
      case "email":
        if (!value) return "Required";
        if (!/^\S+@\S+\.\S+$/.test(value)) return "Invalid email format";
        return "";
      case "phone":
        if (!value) return "Required";
        if (!/^\d{10}$/.test(value)) return "Phone must be 10 digits";
        return "";
      case "blockNo":
      case "areaStreet":
      case "landmark":
      case "city":
      case "state":
        if (!value) return "Required";
        return "";
      case "pincode":
        if (!value) return "Required";
        if (!/^\d{6}$/.test(value)) return "Pincode must be 6 digits";
        return "";
      default:
        return "";
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClinicField(name, value);
    setFormErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value)
    }));
  };

  // City options
  const cityOptions = [
    { value: "Akola", label: "Akola" },
    { value: "Mumbai", label: "Mumbai" },
    { value: "Delhi", label: "Delhi" },
    { value: "Bangalore", label: "Bangalore" },
    { value: "Chennai", label: "Chennai" }
  ];

  // State options
  const stateOptions = [
    { value: "Maharashtra", label: "Maharashtra" },
    { value: "Delhi", label: "Delhi" },
    { value: "Karnataka", label: "Karnataka" },
    { value: "Tamil Nadu", label: "Tamil Nadu" },
    { value: "Gujarat", label: "Gujarat" }
  ];

  return (
    <div className="flex flex-col h-full bg-white rounded-md shadow-sm overflow-hidden">
      <RegistrationHeader
        title="Clinical Details & Document Upload"
        subtitle="Enter your clinic information & document"
      />

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-[700px] mx-auto space-y-6">

          <div className="space-y-4">
            <div className="flex gap-6 ">
              <label className="text-sm text-secondary-grey400 ">Do you have your own clinic?</label>
              <div className="flex gap-4">
                <RadioButton
                  name="hasClinic"
                  value="yes"
                  label="Yes"
                  checked={hasClinic === true}
                  onChange={() => setField('hasClinic', true)}
                />
                <RadioButton
                  name="hasClinic"
                  value="no"
                  label="No"
                  checked={hasClinic === false}
                  onChange={() => setField('hasClinic', false)}
                />
              </div>
            </div>
          </div>


          {hasClinic && (
            <>
              {/* Clinic Info Section */}
              <div className="space-y-4">
                <h2 className="text-sm font-semibold text-secondary-grey400">Clinic Info</h2>
                {/* Clinic Name and Contact Email Row */}
                <FormFieldRow>
                  <div className="w-full">
                    <InputWithMeta
                      label="Clinic Name"
                      requiredDot
                      value={clinicData.name}
                      onChange={(val) => handleInputChange({ target: { name: 'name', value: val } })}
                      placeholder="Enter Clinic Name"
                      {...commonFieldProps}
                      meta="Visible to Patient"
                    />
                    {formErrors.name && <span className="text-red-500 text-xs">{formErrors.name}</span>}
                  </div>
                  <div className="w-full">
                    <InputWithMeta
                      label="Clinic Contact Email"
                      requiredDot
                      type="email"
                      value={clinicData.email}
                      onChange={(val) => handleInputChange({ target: { name: 'email', value: val } })}
                      placeholder="Enter Work Email"
                      {...commonFieldProps}
                      meta="Visible to Patient"
                    />
                    {formErrors.email && <span className="text-red-500 text-xs">{formErrors.email}</span>}
                  </div>
                </FormFieldRow>

                {/* Contact Number and Upload Establishment Proof Row */}
                <FormFieldRow>
                  <div className="w-full">
                    <InputWithMeta
                      label="Clinic Contact Number"
                      requiredDot
                      type="tel"
                      value={clinicData.phone}
                      onChange={(val) => handleInputChange({ target: { name: 'phone', value: val } })}
                      placeholder="Enter Work Email"
                      {...commonFieldProps}
                      meta="Visible to Patient"
                    />
                    {formErrors.phone && <span className="text-red-500 text-xs">{formErrors.phone}</span>}
                  </div>
                  <CustomUpload
                    label="Upload Establishment Proof"
                    compulsory={true}
                    onUpload={(key, name) => {
                      setClinicField('proof', key);
                      // Assuming we might want to store filename somewhere if needed, 
                      // but Step3 store assumes flat structure for proof.
                      // The CustomUpload handles filename display if we pass it back.
                      // For now, let's just update proof key.
                    }}
                    meta="Support Size upto 1MB in .png, .jpg, .svg, .webp"
                    uploadedKey={clinicData.proof}
                  // fileName={...} // Need to check if filenames are stored for clinic
                  />
                </FormFieldRow>
              </div>

              <div className="border border-b-[0.5px] mt-1"></div>

              {/* Clinic Address Section */}
              <div className="space-y-4">
                <h2 className="text-sm font-semibold text-secondary-grey400">Clinic Address</h2>
                {/* Map Location */}
                <div className='flex flex-col gap-2'>
                  <InputWithMeta
                    label="Map Location"
                    requiredDot
                    infoIcon
                    placeholder="Search Location"
                    fileName={clinicData.latitude + ', ' + clinicData.longitude}
                    
                    
                  />
                  <MapLocation
                    heightClass="h-[100px]"
                    onChange={({ lat, lng }) => {
                      setClinicField('latitude', lat);
                      setClinicField('longitude', lng);
                    }}
                  />
                </div>

                {/* Block No and Road/Area/Street Row */}
                <FormFieldRow>
                  <div className="w-full">
                    <InputWithMeta
                      label="Block no./Shop no./House no."
                      requiredDot
                      value={clinicData.blockNo}
                      onChange={(val) => handleInputChange({ target: { name: 'blockNo', value: val } })}
                      placeholder="Enter Block Number/ Shop Number/ House Number"
                      {...commonFieldProps}
                    />
                    {formErrors.blockNo && <span className="text-red-500 text-xs">{formErrors.blockNo}</span>}
                  </div>
                  <div className="w-full">
                    <InputWithMeta
                      label="Road/Area/Street"
                      requiredDot
                      infoIcon
                      value={clinicData.areaStreet}
                      onChange={(val) => handleInputChange({ target: { name: 'areaStreet', value: val } })}
                      placeholder="Enter Road/Area/Street"
                      {...commonFieldProps}
                    />
                    {formErrors.areaStreet && <span className="text-red-500 text-xs">{formErrors.areaStreet}</span>}
                  </div>
                </FormFieldRow>

                {/* Landmark and Pincode Row */}
                <FormFieldRow>
                  <div className="w-full">
                    <InputWithMeta
                      label="Landmark"
                      requiredDot
                      infoIcon
                      value={clinicData.landmark}
                      onChange={(val) => handleInputChange({ target: { name: 'landmark', value: val } })}
                      placeholder="Enter landmark"
                      {...commonFieldProps}
                    />
                    {formErrors.landmark && <span className="text-red-500 text-xs">{formErrors.landmark}</span>}
                  </div>
                  <div className="w-full">
                    <InputWithMeta
                      label="Pincode"
                      requiredDot
                      infoIcon
                      value={clinicData.pincode}
                      onChange={(val) => handleInputChange({ target: { name: 'pincode', value: val } })}
                      placeholder="Enter Pincode"
                      {...commonFieldProps}
                    />
                    {formErrors.pincode && <span className="text-red-500 text-xs">{formErrors.pincode}</span>}
                  </div>
                </FormFieldRow>

                {/* City and State Row */}
                <FormFieldRow>
                  <div className="w-full">
                    <InputWithMeta
                      label="City"
                      requiredDot
                      infoIcon
                      value={clinicData.city}
                      placeholder="Select City"
                      RightIcon={ChevronDown}
                      readonlyWhenIcon={true}
                      onIconClick={() => toggleDropdown('city')}
                      dropdownOpen={openDropdowns['city']}
                      onRequestClose={() => closeDropdown('city')}
                      dropdownItems={cityOptions}
                      onSelectItem={(item) => {
                        handleInputChange({ target: { name: 'city', value: item.value } });
                        closeDropdown('city');
                      }}
                      {...commonFieldProps}
                    />
                    {formErrors.city && <span className="text-red-500 text-xs">{formErrors.city}</span>}
                  </div>
                  <div className="w-full">
                    <InputWithMeta
                      label="State"
                      requiredDot
                      infoIcon
                      value={clinicData.state}
                      placeholder="Select State"
                      RightIcon={ChevronDown}
                      readonlyWhenIcon={true}
                      onIconClick={() => toggleDropdown('state')}
                      dropdownOpen={openDropdowns['state']}
                      onRequestClose={() => closeDropdown('state')}
                      dropdownItems={stateOptions}
                      onSelectItem={(item) => {
                        handleInputChange({ target: { name: 'state', value: item.value } });
                        closeDropdown('state');
                      }}
                      {...commonFieldProps}
                    />
                    {formErrors.state && <span className="text-red-500 text-xs">{formErrors.state}</span>}
                  </div>
                </FormFieldRow>
              </div>

          <div className='flex flex-col '>
              <InputWithMeta
                label="Upload Profile Picture"
                showInput={false}
                infoIcon
                requiredDot
              />
              <span className="text-xs text-secondary-grey200 mb-1">Support Size upto 1MB in .png, .jpg, .svg, .webp</span>
              <div className='flex gap-1 cursor-pointer items-center justify-center flex-col rounded-sm border-[0.5px] border-dashed border-blue-primary150 w-[130px] h-[130px]'>
                    <img src={upload} alt="" className='w-4 h-4' />
                    <span className='text-blue-primary250 text-sm'>Upload</span>
              </div>
          </div>

            </>
          )}

          
        </div>
      </div>
    </div >
  );
}


export default Step3