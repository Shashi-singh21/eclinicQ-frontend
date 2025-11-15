import React from 'react'
import { 
  Input, 
  Dropdown, 
  Upload, 
  FormContainer, 
  FormSection, 
  MFA,
  FormFieldRow,
  MapLocation
} from '../../../../components/FormItems';
import useDoctorRegistrationStore from '../../../../store/useDoctorRegistrationStore';


const Step3 = () => {
  const {
    clinicData,
    setClinicField,
    setField
  } = useDoctorRegistrationStore();

  const [formErrors, setFormErrors] = React.useState({});

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
    <FormContainer>
      <FormSection
        title="Clinical Details & Document Upload"
        subtitle="Enter your clinic information & document"
      >
        <div className="space-y-6">
          {/* Clinic Info Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Clinic Info</h2>
            {/* Clinic Name and Contact Email Row */}
            <FormFieldRow>
              <div className="w-full">
                <Input
                  label="Clinic Name"
                  name="name"
                  value={clinicData.name}
                  onChange={handleInputChange}
                  placeholder="Enter Clinic Name"
                  {...commonFieldProps}
                />
                {formErrors.name && <span className="text-red-500 text-xs">{formErrors.name}</span>}
              </div>
              <div className="w-full">
                <Input
                  label="Clinic Contact Email"
                  name="email"
                  type="email"
                  value={clinicData.email}
                  onChange={handleInputChange}
                  placeholder="Enter Clinic Email"
                  {...commonFieldProps}
                />
                {formErrors.email && <span className="text-red-500 text-xs">{formErrors.email}</span>}
              </div>
            </FormFieldRow>

            {/* Contact Number and Upload Establishment Proof Row */}
            <FormFieldRow>
              <div className="w-full">
                <Input
                  label="Clinic Contact Number"
                  name="phone"
                  type="tel"
                  value={clinicData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter Contact Number"
                  {...commonFieldProps}
                />
                {formErrors.phone && <span className="text-red-500 text-xs">{formErrors.phone}</span>}
              </div>
              <Upload
                label="Upload Establishment Proof"
                compulsory={true}
                onUpload={key => setClinicField('proof', key)}
              />
            </FormFieldRow>
          </div>

          <div className="border border-b mt-1"></div>

          {/* Clinic Address Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Clinic Address</h2>
            {/* Map Location */}
            <div className='flex flex-col gap-2'>
              <label className="block text-sm font-medium text-gray-700">
                Map Location <span className="text-red-500">*</span>
              </label>
              <MapLocation 
                heightClass="h-32" 
                onChange={({ lat, lng }) => {
                  setClinicField('latitude', lat);
                  setClinicField('longitude', lng);
                }}
              />
            </div>

            {/* Block No and Road/Area/Street Row */}
            <FormFieldRow>
              <div className="w-full">
                <Input
                  label="Block No./Shop no./House no."
                  name="blockNo"
                  value={clinicData.blockNo}
                  onChange={handleInputChange}
                  {...commonFieldProps}
                />
                {formErrors.blockNo && <span className="text-red-500 text-xs">{formErrors.blockNo}</span>}
              </div>
              <div className="w-full">
                <Input
                  label="Road/Area/Street"
                  name="areaStreet"
                  value={clinicData.areaStreet}
                  onChange={handleInputChange}
                  {...commonFieldProps}
                />
                {formErrors.areaStreet && <span className="text-red-500 text-xs">{formErrors.areaStreet}</span>}
              </div>
            </FormFieldRow>

            {/* Landmark and Pincode Row */}
            <FormFieldRow>
              <div className="w-full">
                <Input
                  label="Landmark"
                  name="landmark"
                  value={clinicData.landmark}
                  onChange={handleInputChange}
                  {...commonFieldProps}
                />
                {formErrors.landmark && <span className="text-red-500 text-xs">{formErrors.landmark}</span>}
              </div>
              <div className="w-full">
                <Input
                  label="Pincode"
                  name="pincode"
                  value={clinicData.pincode}
                  onChange={handleInputChange}
                  {...commonFieldProps}
                />
                {formErrors.pincode && <span className="text-red-500 text-xs">{formErrors.pincode}</span>}
              </div>
            </FormFieldRow>

            {/* City and State Row */}
            <FormFieldRow>
              <div className="w-full">
                <Dropdown
                  label="City"
                  name="city"
                  value={clinicData.city}
                  onChange={handleInputChange}
                  options={cityOptions}
                  placeholder="Select City"
                  {...commonFieldProps}
                />
                {formErrors.city && <span className="text-red-500 text-xs">{formErrors.city}</span>}
              </div>
              <div className="w-full">
                <Dropdown
                  label="State"
                  name="state"
                  value={clinicData.state}
                  onChange={handleInputChange}
                  options={stateOptions}
                  placeholder="Select State"
                  {...commonFieldProps}
                />
                {formErrors.state && <span className="text-red-500 text-xs">{formErrors.state}</span>}
              </div>
            </FormFieldRow>
          </div>

          <div className="border border-b mt-1"></div>

          {/* Document Upload Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Document Upload</h2>
            {/* Upload Hospital Image */}
            <div>
              <Upload
                label="Upload Hospital Image"
                compulsory={true}
                onUpload={key => setClinicField('image', key)}
              />
            </div>
          </div>

          {/* Multi-Factor Authentication (always checked & disabled) */}
          <MFA 
            formData={{
              emailVerification: true,
              smsVerification: true
            }}
            disabled={true}
          />
        </div>
  {/* Navigation handled by parent, no submit button here */}
      </FormSection>
    </FormContainer>
  );
}


export default Step3