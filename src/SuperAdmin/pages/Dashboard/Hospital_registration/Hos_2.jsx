import React, { useState } from 'react';
import { 
  Input,
  Dropdown,
  Upload,
  Radio,
  FormContainer,
  FormSection,
  FormFieldRow
} from '../../../../components/FormItems';
import useHospitalDoctorDetailsStore from '../../../../store/useHospitalDoctorDetailsStore';
import useDoctorRegistrationStore from '../../../../store/useDoctorRegistrationStore';

const Hos_2 = () => {
  // Use dedicated hospital doctor details store
  const drStore = useHospitalDoctorDetailsStore();
  const { setField } = drStore;
  // Minimal local state to control PG conditional fields
  const [hasPG, setHasPG] = useState('');

  // Registration store only for additional specialization rows
  const regStore = useDoctorRegistrationStore();
  const { userId: regUserId } = regStore;
  const { additionalPractices, addPractice, updatePractice, setDocument } = drStore;

  // Make sure the doctor userId from Step1 is mirrored here
  if (!drStore.userId && regUserId) {
    setField('userId', String(regUserId));
  }

  // Options replicated from Doctor Step2
  const councilOptions = [
    { value: "Maharashtra Medical Council", label: "Maharashtra Medical Council" },
  { value: "Medical Council of India", label: "Medical Council of India" },
    { value: "Andhra Pradesh Medical Council", label: "Andhra Pradesh Medical Council" },
    { value: "Arunachal Pradesh Medical Council", label: "Arunachal Pradesh Medical Council" },
    { value: "Assam Medical Council", label: "Assam Medical Council" },
    { value: "Bihar Medical Council", label: "Bihar Medical Council" },
    { value: "Chhattisgarh Medical Council", label: "Chhattisgarh Medical Council" },
    { value: "Delhi Medical Council", label: "Delhi Medical Council" },
    { value: "Goa Medical Council", label: "Goa Medical Council" },
    { value: "Gujarat Medical Council", label: "Gujarat Medical Council" },
    { value: "Haryana Medical Council", label: "Haryana Medical Council" }
  ];

  const gradDegreeOptions = [
    { value: "MBBS", label: "MBBS" },
    { value: "BDS", label: "BDS" },
    { value: "BAMS", label: "BAMS" },
    { value: "BHMS", label: "BHMS" },
    { value: "BUMS", label: "BUMS" },
    { value: "BNYS", label: "BNYS" },
    { value: "BSMS", label: "BSMS" }
  ];

  const collegeOptions = [
    { value: "AIIMS Delhi", label: "AIIMS Delhi" },
    { value: "Grant Medical College Mumbai", label: "Grant Medical College Mumbai" },
    { value: "KEM Hospital Mumbai", label: "KEM Hospital Mumbai" },
    { value: "Christian Medical College Vellore", label: "Christian Medical College Vellore" },
    { value: "Maulana Azad Medical College Delhi", label: "Maulana Azad Medical College Delhi" },
    { value: "Other", label: "Other" }
  ];

  const pgDegreeOptions = [
    { value: "MD (Internal Medicine)", label: "MD (Internal Medicine)" },
    { value: "MS (General Surgery)", label: "MS (General Surgery)" },
    { value: "MD (Pediatrics)", label: "MD (Pediatrics)" },
    { value: "MS (Orthopedics)", label: "MS (Orthopedics)" },
    { value: "MD (Radiology)", label: "MD (Radiology)" },
    { value: "MS (ENT)", label: "MS (ENT)" }
  ];

  const specializationOptions = [
    { value: "General Medicine (Internal Medicine)", label: "General Medicine (Internal Medicine)" },
    { value: "General Surgery", label: "General Surgery" },
    { value: "Pediatrics", label: "Pediatrics" },
    { value: "Orthopedics", label: "Orthopedics" },
    { value: "Obstetrics & Gynecology", label: "Obstetrics & Gynecology" },
    { value: "Dermatology", label: "Dermatology" },
  ];


  const [formErrors, setFormErrors] = React.useState({});

  // Validation functions
  const validateField = (name, value) => {
    switch (name) {
      case 'councilNumber':
        if (!value) return 'Required';
        if (!/^\w{4,}$/.test(value)) return 'Invalid Reg. No.';
        return '';
      case 'councilName':
        if (!value) return 'Required';
        return '';
      case 'regYear':
        if (!value) return 'Required';
        if (!/^\d{4}$/.test(value)) return 'Year must be 4 digits';
        return '';
      case 'graduation':
      case 'graduationCollege':
      case 'graduationYear':
        if (!value) return 'Required';
        return '';
      case 'specialization':
        if (!value || (typeof value === 'object' && !value.value && !value.name)) return 'Required';
        return '';
      case 'experience':
        if (!value) return 'Required';
        if (!/^\d+$/.test(value) || Number(value) < 0) return 'Invalid years';
        return '';
      case 'pgDegree':
      case 'pgCollege':
      case 'pgYear':
        if (hasPG === 'yes' && !value) return 'Required';
        return '';
      default:
        return '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // ...existing code...
    switch (name) {
      case 'councilNumber':
        setField('medicalCouncilRegNo', value);
        break;
      case 'councilName':
        setField('medicalCouncilName', value);
        break;
      case 'regYear':
        setField('medicalCouncilRegYear', value);
        break;
      case 'graduation':
        setField('medicalDegreeType', value);
        break;
      case 'graduationCollege':
        setField('medicalDegreeUniversityName', value);
        break;
      case 'graduationYear':
        setField('medicalDegreeYearOfCompletion', value);
        break;
      case 'hasPG':
        setHasPG(value);
        if (value !== 'yes') {
          setField('pgMedicalDegreeType', '');
          setField('pgMedicalDegreeUniversityName', '');
          setField('pgMedicalDegreeYearOfCompletion', '');
        }
        break;
      case 'pgDegree':
        setField('pgMedicalDegreeType', value);
        break;
      case 'pgCollege':
        setField('pgMedicalDegreeUniversityName', value);
        break;
      case 'pgYear':
        setField('pgMedicalDegreeYearOfCompletion', value);
        break;
      case 'specialization':
        {
          const opt = specializationOptions.find(o => o.value === value);
          setField('specialization', { name: opt?.label || value, value });
        }
        break;
      case 'experience':
        setField('experienceYears', value);
        break;
      default:
        break;
    }
    setFormErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value)
    }));
  };

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
              <div className="w-full">
                <Input
                  label="Medical Council Registration Number"
                  name="councilNumber"
                  value={drStore.medicalCouncilRegNo || ''}
                  onChange={handleInputChange}
                  {...commonFieldProps}
                />
                {formErrors.councilNumber && <span className="text-red-500 text-xs">{formErrors.councilNumber}</span>}
              </div>
              <div className="w-full">
                <Dropdown
                  label="Registration Council"
                  name="councilName"
                  value={drStore.medicalCouncilName || ''}
                  onChange={handleInputChange}
                  options={councilOptions}
                  placeholder="Select Council"
                  {...commonFieldProps}
                />
                {formErrors.councilName && <span className="text-red-500 text-xs">{formErrors.councilName}</span>}
              </div>
            </FormFieldRow>
            <FormFieldRow>
              <div className="w-full">
                <Input
                  label="Registration Year"
                  name="regYear"
                  value={drStore.medicalCouncilRegYear || ''}
                  onChange={handleInputChange}
                  {...commonFieldProps}
                />
                {formErrors.regYear && <span className="text-red-500 text-xs">{formErrors.regYear}</span>}
                <p className="text-xs text-gray-400 mt-1">Visible to Patient</p>
              </div>
              <Upload
                label="Upload MRN Proof"
                compulsory={true}
                onUpload={key => setDocument({ no: 1, type: 'medical_license', url: key })}
              />
            </FormFieldRow>
          </div>

          {/* Education Details */}
          <div className="space-y-4 mb-3">
            <h2 className="text-lg font-semibold text-gray-900">
              Education Details
            </h2>
            <FormFieldRow>
              <div className="w-full">
                <Dropdown
                  label="Graduation Degree"
                  name="graduation"
                  value={drStore.medicalDegreeType || ''}
                  onChange={handleInputChange}
                  options={gradDegreeOptions}
                  placeholder="Select Degree"
                  {...commonFieldProps}
                />
                {formErrors.graduation && <span className="text-red-500 text-xs">{formErrors.graduation}</span>}
              </div>
              <div className="w-full">
                <Dropdown
                  label="College/ University"
                  name="graduationCollege"
                  value={drStore.medicalDegreeUniversityName || ''}
                  onChange={handleInputChange}
                  options={collegeOptions}
                  placeholder="Select College/University"
                  {...commonFieldProps}
                />
                {formErrors.graduationCollege && <span className="text-red-500 text-xs">{formErrors.graduationCollege}</span>}
              </div>
            </FormFieldRow>
            <FormFieldRow>
              <div className="w-full">
                <Input
                  label="Graduation Year"
                  name="graduationYear"
                  value={drStore.medicalDegreeYearOfCompletion || ''}
                  onChange={handleInputChange}
                  {...commonFieldProps}
                />
                {formErrors.graduationYear && <span className="text-red-500 text-xs">{formErrors.graduationYear}</span>}
              </div>
              <Upload 
                label="Upload Degree Proof" 
                compulsory={true} 
                onUpload={key => setDocument({ no: 2, type: 'degree_certificate', url: key })}
              />
            </FormFieldRow>
          </div>

          {/* Post Graduation */}
          <div className="space-y-4">
            <Radio
              label="Do you have Post Graduation Degree?"
              name="hasPG"
              value={hasPG}
              onChange={handleInputChange}
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" }
              ]}
            />
            {hasPG === "yes" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <Dropdown
                    label="Post Graduate Degree"
                    name="pgDegree"
                    value={drStore.pgMedicalDegreeType || ''}
                    onChange={handleInputChange}
                    options={pgDegreeOptions}
                    placeholder="Select Degree"
                    {...commonFieldProps}
                  />
                  {formErrors.pgDegree && <span className="text-red-500 text-xs">{formErrors.pgDegree}</span>}
                  <Input
                    label="Year of Completion"
                    name="pgYear"
                    value={drStore.pgMedicalDegreeYearOfCompletion || ''}
                    onChange={handleInputChange}
                    {...commonFieldProps}
                  />
                  {formErrors.pgYear && <span className="text-red-500 text-xs">{formErrors.pgYear}</span>}
                </div>
                <div className="space-y-4">
                  <Dropdown
                    label="College/ University"
                    name="pgCollege"
                    value={drStore.pgMedicalDegreeUniversityName || ''}
                    onChange={handleInputChange}
                    options={collegeOptions}
                    placeholder="Select College/University"
                    {...commonFieldProps}
                  />
                  {formErrors.pgCollege && <span className="text-red-500 text-xs">{formErrors.pgCollege}</span>}
                  <Upload 
                    label="Upload Degree Proof" 
                    compulsory={false}
                    onUpload={key => setDocument({ no: 3, type: 'specialization_certificate', url: key })}
                  />
                </div>
              </div>
            )}
          </div>

          <div className='border mb'></div>

          {/* Practice Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-gray-900">Practice Details</h2>
              <button
                type="button"
                onClick={addPractice}
                title="Add specialization"
                className="w-6 h-6 flex items-center justify-center rounded border border-gray-300 text-gray-600 hover:bg-gray-50"
                aria-label="Add specialization"
              >
                +
              </button>
            </div>
            <FormFieldRow>
              <div className="w-full">
                <Dropdown
                  label="Specialization"
                  name="specialization"
                  value={typeof drStore.specialization === 'object' ? (drStore.specialization?.value || drStore.specialization?.name || '') : (drStore.specialization || '')}
                  onChange={handleInputChange}
                  options={specializationOptions}
                  placeholder="Select Specialization"
                  {...commonFieldProps}
                />
                {formErrors.specialization && <span className="text-red-500 text-xs">{formErrors.specialization}</span>}
              </div>
              <div className="w-full">
                <Input
                  label="Year of Experience"
                  name="experience"
                  value={drStore.experienceYears || ''}
                  onChange={handleInputChange}
                  placeholder="Enter Year"
                  {...commonFieldProps}
                />
                {formErrors.experience && <span className="text-red-500 text-xs">{formErrors.experience}</span>}
              </div>
            </FormFieldRow>

            {Array.isArray(additionalPractices) && additionalPractices.length > 0 && (
              <div className="space-y-3">
                {additionalPractices.map((p, idx) => (
                  <FormFieldRow key={idx}>
                    <Dropdown
                      label="Specialization"
                      name={`additional_specialization_${idx}`}
                      value={typeof p.specialization === 'object' ? (p.specialization?.value || p.specialization?.name || '') : (p.specialization || '')}
                      onChange={e => {
                        const val = e.target.value;
                        const opt = specializationOptions.find(o => o.value === val);
                        updatePractice(idx, { specialization: { name: opt?.label || val, value: val } });
                      }}
                      options={specializationOptions}
                      placeholder="Select Specialization"
                      compulsory
                      required
                    />
                    <Input
                      label="Year of Experience"
                      name={`additional_experience_${idx}`}
                      value={p.experienceYears}
                      onChange={e => updatePractice(idx, { experienceYears: e.target.value })}
                      placeholder="Enter Year"
                      compulsory
                      required
                    />
                  </FormFieldRow>
                ))}
              </div>
            )}
          </div>
        </div>
      </FormSection>
    </FormContainer>
  );
};

export default Hos_2;
