import React, { useEffect, forwardRef, useImperativeHandle, useRef } from 'react'
import useDoctorStep1Store from "../../../../store/useDoctorStep1Store";
import useImageUploadStore from "../../../../store/useImageUploadStore";
import { 
  Input, 
  Upload, 
  Dropdown, 
  FormContainer, 
  FormSection, 
  FormFieldRow, 
  MFA
} from '../../../../components/FormItems';


const Step1 = forwardRef((props, ref) => {
  const {
    firstName,
    lastName,
    emailId,
    phone,
    gender,
    city,
    password,
    mfa,
    profilePhotoKey,
    loading,
    error,
    success,
    setField,
    setMfaField,
    submit,
    reset
  } = useDoctorStep1Store();

  const [formErrors, setFormErrors] = React.useState({});

  const uploadUrlData = useImageUploadStore((state) => state.uploadUrl);

  useEffect(() => {
    if (uploadUrlData && uploadUrlData.key) {
      setField('profilePhotoKey', uploadUrlData.key);
    }
  }, [uploadUrlData, setField]);

  // Ensure MFA flags are always true in state
  useEffect(() => {
    setMfaField('emailId', true);
    setMfaField('phone', true);
  }, [setMfaField]);


  // Validation functions
  const validateField = (name, value) => {
    switch (name) {
      case "firstName":
      case "lastName":
        if (!value || value.trim().length === 0) return "Required";
        return "";
      case "emailId":
        if (!value) return "Required";
        // Simple email regex
        if (!/^\S+@\S+\.\S+$/.test(value)) return "Invalid email format";
        return "";
      case "phone":
        if (!value) return "Required";
        if (!/^\d{10}$/.test(value)) return "Phone must be 10 digits";
        return "";
      case "gender":
      case "city":
        if (!value) return "Required";
        return "";
      default:
        return "";
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "emailVerification" || name === "smsVerification") {
      setMfaField(name === "emailVerification" ? "emailId" : "phone", checked);
    } else {
      setField(name, type === "checkbox" ? checked : value);
      // Validate on change
      setFormErrors((prev) => ({
        ...prev,
        [name]: validateField(name, type === "checkbox" ? checked : value)
      }));
    }
  };


  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    // Validate all fields before submit
    const fieldsToValidate = { firstName, lastName, emailId, phone, gender, city };
    const newErrors = {};
    Object.entries(fieldsToValidate).forEach(([key, val]) => {
      const err = validateField(key, val);
      if (err) newErrors[key] = err;
    });
    setFormErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      // Focus first error field if needed
      return false;
    }
    const result = await submit();
    if (result?.success) {
      alert("Account created successfully!");
      return true;
    }
    const msg = result?.error || error || "Registration failed";
    alert(msg);
    return false;
  };

  useImperativeHandle(ref, () => ({
    submit: handleSubmit
  }));

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "Other", label: "Other" },
    { value: "Prefer not to say", label: "Prefer not to say" },
  ];

  const cityOptions = [
    { value: "Akola, Maharashtra", label: "Akola, Maharashtra" },
    { value: "Aurangabad, Maharashtra", label: "Aurangabad, Maharashtra" },
    { value: "Nagpur, Maharashtra", label: "Nagpur, Maharashtra" },
    { value: "Amravati, Maharashtra", label: "Amravati, Maharashtra" },
    { value: "Akot, Maharashtra", label: "Akot, Maharashtra" }
  ];

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormSection
        title="Account Creation"
        subtitle="Please provide your personal information"
      >
        <div className="space-y-6">
          {/* Name Row */}
          <FormFieldRow>
            <div className="w-full">
              <Input
                label="First Name"
                name="firstName"
                value={firstName}
                onChange={handleInputChange}
                compulsory
              />
              {formErrors.firstName && <span className="text-red-500 text-xs">{formErrors.firstName}</span>}
            </div>
            <div className="w-full">
              <Input
                label="Last Name"
                name="lastName"
                value={lastName}
                onChange={handleInputChange}
                compulsory
              />
              {formErrors.lastName && <span className="text-red-500 text-xs">{formErrors.lastName}</span>}
            </div>
          </FormFieldRow>

          {/* Email and Phone Row */}
          <FormFieldRow>
            <div className="w-full">
              <Input
                label="Work Email"
                name="emailId"
                type="email"
                value={emailId}
                onChange={handleInputChange}
                compulsory
              />
              {formErrors.emailId && <span className="text-red-500 text-xs">{formErrors.emailId}</span>}
            </div>
            <div className="w-full">
              <Input
                label="Contact Number"
                name="phone"
                type="tel"
                value={phone}
                onChange={handleInputChange}
                compulsory
              />
              {formErrors.phone && <span className="text-red-500 text-xs">{formErrors.phone}</span>}
            </div>
          </FormFieldRow>

          {/* Gender and City Row */}
          <FormFieldRow>
            <div className="w-full">
              <Dropdown
                label="Gender"
                name="gender"
                value={gender}
                onChange={handleInputChange}
                options={genderOptions}
                compulsory
              />
              {formErrors.gender && <span className="text-red-500 text-xs">{formErrors.gender}</span>}
            </div>
            <div className="w-full">
              <Dropdown
                label="City"
                name="city"
                value={city}
                onChange={handleInputChange}
                options={cityOptions}
                compulsory
              />
              {formErrors.city && <span className="text-red-500 text-xs">{formErrors.city}</span>}
            </div>
          </FormFieldRow>

          {/* Upload Profile Picture */}
          <div>
            <Upload 
              label="Upload Profile Picture" 
              compulsory={true} 
              onUpload={(key) => setField('profilePhotoKey', key)}
            />
          </div>

          {/* Multi-Factor Authentication (always checked & disabled) */}
          <MFA 
            formData={{
              emailVerification: true,
              smsVerification: true
            }} 
            handleInputChange={handleInputChange} 
            disabled={true}   // <-- pass down a disabled flag
          />

          <div className="pb-8"></div>
        </div>
      </FormSection>

  {/* No submit button here; handled by footer */}
    </FormContainer>
  );
});

export default Step1;
