import React from 'react'

import { Input, Upload, MFA, Dropdown, FormContainer, FormSection, FormFieldRow, Radio } from '../../components/FormItems';
import useHospitalStep1Store from '../../store/useHospitalStep1Store';
import { forwardRef, useImperativeHandle } from 'react';
import { useRegistration } from '../../context/RegistrationContext';

const Hos_1 = forwardRef((props, ref) => {
  const form = useHospitalStep1Store((state) => state.form);
  const setField = useHospitalStep1Store((state) => state.setField);
  const setMfa = useHospitalStep1Store((state) => state.setMfa);
  const setProfilePhotoKey = useHospitalStep1Store((state) => state.setProfilePhotoKey);
  const submit = useHospitalStep1Store((state) => state.submit);
  const { updateFormData } = useRegistration();

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'emailId' || name === 'phone') {
      setField(name, value);
    } else if (name === 'isAlsoDoctor') {
      setField('isAlsoDoctor', value === 'yes');
      updateFormData({ isDoctor: value }); // Sync with context for sidebar
    } else {
      setField(name, type === 'checkbox' ? checked : value);
    }
  };

  const handleMfaChange = (mfaField, value) => {
    setMfa(mfaField, value);
  };

  const handleUpload = (key) => {
    setProfilePhotoKey(key);
  };

  // Expose submit method to parent via ref
  useImperativeHandle(ref, () => ({
    async submit() {
      setLoading(true);
      setError(null);
      setSuccess(null);
      try {
        await submit();
        setSuccess('Account created successfully!');
        setLoading(false);
        return true;
      } catch (err) {
        setError(err?.response?.data?.message || err.message || 'Submission failed');
        setLoading(false);
        return false;
      }
    }
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (ref && typeof ref !== 'function' && ref.current && ref.current.submit) {
      await ref.current.submit();
    }
  };

  const commonFieldProps = {
    compulsory: true,
    required: true
  };

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
    { value: 'prefer_not_to_say', label: 'Prefer not to say' }
  ];

  const cityOptions = [
    { value: 'Akola', label: 'Akola, Maharashtra' },
    { value: 'Mumbai', label: 'Mumbai, Maharashtra' },
    { value: 'Delhi', label: 'Delhi, Delhi' },
    { value: 'Bangalore', label: 'Bangalore, Karnataka' },
    { value: 'Chennai', label: 'Chennai, Tamil Nadu' }
  ];

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormSection
        title="Owner Account Creation"
        subtitle="Set up the primary administrator account for your hospital"
      >
        <div className="space-y-6">
          <FormFieldRow>
            <Input
              label="First Name"
              name="firstName"
              value={form.firstName}
              onChange={handleInputChange}
              {...commonFieldProps}
            />
            <Input
              label="Last Name"
              name="lastName"
              value={form.lastName}
              onChange={handleInputChange}
              {...commonFieldProps}
            />
          </FormFieldRow>
          <FormFieldRow>
            <Input
              label="Email"
              name="emailId"
              type="email"
              value={form.emailId}
              onChange={handleInputChange}
              {...commonFieldProps}
            />
            <Input
              label="Phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleInputChange}
              {...commonFieldProps}
            />
          </FormFieldRow>
          <FormFieldRow>
            <Dropdown
              label="Gender"
              name="gender"
              value={form.gender}
              onChange={handleInputChange}
              options={genderOptions}
              {...commonFieldProps}
            />
            <Dropdown
              label="City"
              name="city"
              value={form.city}
              onChange={handleInputChange}
              options={cityOptions}
              {...commonFieldProps}
            />
          </FormFieldRow>
          <div>
            <Upload label="Upload Profile Picture" compulsory={true} onUpload={handleUpload} />
            {form.profilePhotoKey && (
              <div className="text-xs text-green-600 mt-1">Image uploaded!</div>
            )}
          </div>
          <Radio
            label="Are you a doctor?"
            name="isAlsoDoctor"
            compulsory={true}
            value={form.isAlsoDoctor ? 'yes' : 'no'}
            onChange={handleInputChange}
            options={[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' }
            ]}
          />
          <MFA
            formData={form.mfa}
            handleInputChange={(e) => handleMfaChange(e.target.name, e.target.checked)}
          />
          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
          {success && <div className="text-green-600 text-sm mt-2">{success}</div>}
          <div className="pb-8"></div>
        </div>
      </FormSection>
  {/* Submit button removed; submission is now triggered by parent via ref and Save & Next in footer */}
    </FormContainer>
  );
});

export default Hos_1;
