import React, { useState } from 'react';
import { 
  Input,
  Dropdown,
  Upload,
  Radio,
  FormContainer,
  FormSection,
  FormFieldRow
} from '../../components/FormItems';

const Hos_2 = () => {
  // Doctor registration form data
  const [doctorFormData, setDoctorFormData] = useState({
    councilNumber: "",
    councilName: "",
    regYear: "",
    graduation: "",
    graduationCollege: "",
    graduationYear: "",
    hasPG: "", // radio value
    pgDegree: "",
    pgCollege: "",
    pgYear: "",
    specialization: "",
    experience: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDoctorFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Common form field props
  const commonFieldProps = {
    compulsory: true,
    required: true
  };

  return (
    <FormContainer>
      <FormSection
        title="Register as Doctor"
        subtitle="Complete the following information to register as a doctor in the system"
      >
        <div className="space-y-6">
          {/* Medical Registration */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Medical Registration
            </h2>
            <FormFieldRow>
              <Input
                label="Medical Council Registration Number"
                name="councilNumber"
                value={doctorFormData.councilNumber}
                onChange={handleInputChange}
                {...commonFieldProps}
              />
              <Dropdown
                label="Registration Council"
                name="councilName"
                value={doctorFormData.councilName}
                onChange={handleInputChange}
                options={[
                  { value: "Maharashtra Medical Council", label: "Maharashtra Medical Council" },
                  { value: "Delhi Medical Council", label: "Delhi Medical Council" }
                ]}
                placeholder="Select Council"
                {...commonFieldProps}
              />
            </FormFieldRow>
            <FormFieldRow>
              <div>
                <Input
                  label="Registration Year"
                  name="regYear"
                  value={doctorFormData.regYear}
                  onChange={handleInputChange}
                  {...commonFieldProps}
                />
                <p className="text-xs text-gray-400 mt-1">Visible to Patient</p>
              </div>
              <Upload
                label="Upload MRN Proof"
                compulsory={true}
              />
            </FormFieldRow>
          </div>

          {/* Education Details */}
          <div className="space-y-4 mb-3">
            <h2 className="text-lg font-semibold text-gray-900">
              Education Details
            </h2>
            <FormFieldRow>
              <Input
                label="Graduation Degree"
                name="graduation"
                value={doctorFormData.graduation}
                onChange={handleInputChange}
                {...commonFieldProps}
              />
              <Input
                label="Graduation College"
                name="graduationCollege"
                value={doctorFormData.graduationCollege}
                onChange={handleInputChange}
                {...commonFieldProps}
              />
            </FormFieldRow>
            <FormFieldRow>
              <Input
                label="Graduation Year"
                name="graduationYear"
                value={doctorFormData.graduationYear}
                onChange={handleInputChange}
                {...commonFieldProps}
              />
              <Upload label="Upload Degree Proof" compulsory={true} />
            </FormFieldRow>
          </div>

          {/* Post Graduation */}
          <div className="space-y-4">
            <Radio
              label="Do you have Post Graduation Degree?"
              name="hasPG"
              value={doctorFormData.hasPG}
              onChange={handleInputChange}
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" }
              ]}
            />
            {doctorFormData.hasPG === "yes" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <Dropdown
                    label="Post Graduate Degree"
                    name="pgDegree"
                    value={doctorFormData.pgDegree}
                    onChange={handleInputChange}
                    options={[
                      { value: "MD", label: "MD" },
                      { value: "MS", label: "MS" },
                      { value: "DM", label: "DM" },
                      { value: "MCh", label: "MCh" },
                      { value: "DNB", label: "DNB" }
                    ]}
                    placeholder="Select Degree"
                    {...commonFieldProps}
                  />
                  <Input
                    label="Year of Completion"
                    name="pgYear"
                    value={doctorFormData.pgYear}
                    onChange={handleInputChange}
                    {...commonFieldProps}
                  />
                </div>
                <div className="space-y-4">
                  <Input
                    label="College/ University"
                    name="pgCollege"
                    value={doctorFormData.pgCollege}
                    onChange={handleInputChange}
                    placeholder="Search or Enter College"
                    {...commonFieldProps}
                  />
                  <Upload 
                    label="Upload Degree Proof" 
                    compulsory={false}
                  />
                </div>
              </div>
            )}
          </div>

          <div className='border mb'></div>

          {/* Practice Details */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Practice Details
            </h2>
            <FormFieldRow>
              <Input
                label="Specialization"
                name="specialization"
                value={doctorFormData.specialization}
                onChange={handleInputChange}
                {...commonFieldProps}
              />
              <Input
                label="Years of Experience"
                name="experience"
                value={doctorFormData.experience}
                onChange={handleInputChange}
                {...commonFieldProps}
              />
            </FormFieldRow>
          </div>
        </div>
      </FormSection>
    </FormContainer>
  );
};

export default Hos_2;
