import React from 'react'
import { useRegistration } from '../../context/RegistrationContext';
import { 
  Input, 
  Upload, 
  MFA, 
  Dropdown, 
  FormContainer, 
  FormSection, 
  FormFieldRow, 
  Radio
} from '../../components/FormItems';

const Hos_1 = () => {
  const { formData, updateFormData } = useRegistration();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    updateFormData({
      [name]: type === 'checkbox' ? checked : value
    });
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
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' },
    { value: 'Prefer not to say', label: 'Prefer not to say' }
  ];

  // City options
  const cityOptions = [
    { value: 'Akola, Maharashtra', label: 'Akola, Maharashtra' },
    { value: 'Mumbai, Maharashtra', label: 'Mumbai, Maharashtra' },
    { value: 'Delhi, Delhi', label: 'Delhi, Delhi' },
    { value: 'Bangalore, Karnataka', label: 'Bangalore, Karnataka' },
    { value: 'Chennai, Tamil Nadu', label: 'Chennai, Tamil Nadu' }
  ];

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormSection
        title="Owner Account Creation"
        subtitle="Set up the primary administrator account for your hospital"
      >
        <div className="space-y-6">
          {/* Name Row */}
          <FormFieldRow>
            <Input
              label="First Name"
              name="firstName"
              value={formData.firstName || ''}
              onChange={handleInputChange}
              {...commonFieldProps}
            />
            <Input
              label="Last Name"
              name="lastName"
              value={formData.lastName || ''}
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
              value={formData.workEmail || ''}
              onChange={handleInputChange}
              {...commonFieldProps}
            />
            <Input
              label="Contact Number"
              name="contactNumber"
              type="tel"
              value={formData.contactNumber || ''}
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

          <Radio label="Are you a doctor?" name="isDoctor" compulsory={true} value={formData.isDoctor} onChange={handleInputChange} options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" }
          ]} />

          <MFA formData={formData} handleInputChange={handleInputChange} />

          {/* Add some bottom padding to ensure content doesn't get cut off by footer */}
          <div className="pb-8"></div>
        </div>
      </FormSection>
    </FormContainer>
  );
}

export default Hos_1
