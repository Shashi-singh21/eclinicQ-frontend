import React, { useState } from 'react'
import { 
  Input, 
  Upload, 
  Dropdown, 
  FormContainer, 
  FormSection, 
  FormFieldRow, 
  MFA
} from '../../components/FormItems';

const Step1 = () => {
  const [formData, setFormData] = useState({
    firstName: 'Milind',
    lastName: 'Chauhan',
    workEmail: 'milind.chauhan@gmail.com',
    contactNumber: '91753 67487',
    gender: 'Male',
    city: 'Akola, Maharashtra',
    emailVerification: true,
    smsVerification: true
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Account creation form submitted!');
  };

  // Common form field props
  const commonFieldProps = {
    compulsory: true,
    required: true
  };

  // Gender options
  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
    { value: "Prefer not to say", label: "Prefer not to say" }
  ];

  // City options
  const cityOptions = [
    { value: "Akola, Maharashtra", label: "Akola, Maharashtra" },
    { value: "Mumbai, Maharashtra", label: "Mumbai, Maharashtra" },
    { value: "Delhi, Delhi", label: "Delhi, Delhi" },
    { value: "Bangalore, Karnataka", label: "Bangalore, Karnataka" },
    { value: "Chennai, Tamil Nadu", label: "Chennai, Tamil Nadu" }
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
            <Input
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              {...commonFieldProps}
            />
            <Input
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              {...commonFieldProps}
            />
          </FormFieldRow>

          {/* Email and Phone Row */}
          <FormFieldRow>
            <Input
              label="Work Email"
              name="workEmail"
              type="email"
              value={formData.workEmail}
              onChange={handleInputChange}
              {...commonFieldProps}
            />
            <Input
              label="Contact Number"
              name="contactNumber"
              type="tel"
              value={formData.contactNumber}
              onChange={handleInputChange}
              {...commonFieldProps}
            />
          </FormFieldRow>

          {/* Gender and City Row */}
          <FormFieldRow>
            <Dropdown
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              options={genderOptions}
              {...commonFieldProps}
            />
            <Dropdown
              label="City"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              options={cityOptions}
              {...commonFieldProps}
            />
          </FormFieldRow>

          {/* Upload Profile Picture */}
          <div>
            <Upload label="Upload Profile Picture" compulsory={true} />
          </div>

          {/* Multi-Factor Authentication */}
          <MFA formData={formData} handleInputChange={handleInputChange} />

          {/* Add some bottom padding to ensure content doesn't get cut off by footer */}
          <div className="pb-8"></div>
        </div>
      </FormSection>
    </FormContainer>
  );
}

export default Step1
