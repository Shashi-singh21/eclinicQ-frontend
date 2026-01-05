import React, { useState, useEffect } from 'react';
import { useRegistration } from '../../../context/RegistrationContext';
import { ProgressBar, ReviewBanner, AgreementBox, ActionButton, RegistrationHeader } from '../../../../components/FormItems';
import useHospitalRegistrationStore from '../../../../store/useHospitalRegistrationStore';
import useHospitalStep1Store from '../../../../store/useHospitalStep1Store';

const verified2 = '/verified-tick.svg';

const Hos_5 = () => {
  const { formData, updateFormData } = useRegistration();

  // Hospital Data Store
  const hospitalStore = useHospitalRegistrationStore();

  // Admin Data Store (Step 1)
  const adminStore = useHospitalStep1Store();
  const adminForm = adminStore.form;

  const currentSubStep = formData.hosStep5SubStep || 1;
  const [termsAccepted, setTermsAccepted] = useState(formData.hosTermsAccepted || false);
  const [privacyAccepted, setPrivacyAccepted] = useState(formData.hosPrivacyAccepted || false);
  const [formError, setFormError] = useState("");

  // Update context when local state changes
  useEffect(() => {
    if (formData.hosTermsAccepted !== termsAccepted || formData.hosPrivacyAccepted !== privacyAccepted) {
      updateFormData({
        hosTermsAccepted: termsAccepted,
        hosPrivacyAccepted: privacyAccepted
      });
    }
  }, [termsAccepted, privacyAccepted, formData.hosTermsAccepted, formData.hosPrivacyAccepted, updateFormData]);

  const handleTermsChange = () => {
    const newValue = !termsAccepted;
    setTermsAccepted(newValue);
    updateFormData({ hosTermsAccepted: newValue });
    if (formError) setFormError("");
  };

  const handlePrivacyChange = () => {
    const newValue = !privacyAccepted;
    setPrivacyAccepted(newValue);
    updateFormData({ hosPrivacyAccepted: newValue });
    if (formError) setFormError("");
  };

  // Helper to safely join strings
  const join = (arr, sep = ', ') => arr.filter(Boolean).join(sep);
  const orDash = (val) => (val ? val : '—');

  // Badge Component
  const StatusBadge = ({ type }) => {
    if (type === 'verified_text') return <span className="text-success-300 text-xs ">Verified</span>;
    if (type === 'done') return <img src={verified2} alt="Verified" className="w-3 h-3" />;
    if (type === 'review') return <span className="text-orange-500 text-xs  bg-orange-50 px-2 py-0.5 rounded-full">Under Verification</span>;
    // Special case for 'Not Attached' text style
    if (type === 'not_attached') return <span className="text-secondary-grey300 text-xs">Not Attached</span>;
    return null;
  };

  const right = '/angel_right_blue.png';

  // Reusable Row Component
  const DetailRow = ({ label, value, type, file, isLink, verified, className, fileName, alignItems = "items-center", valueClass = "" }) => (
    <div className={`flex gap-3 text-xs py-1 min-h-4 ${alignItems} ${className || 'w-full'}`}>
      <div className="w-[140px] text-secondary-grey400 font-medium flex-shrink-0">{label}</div>
      <div className="w-1 font-medium text-secondary-grey400">:</div>
      <div className={`flex-1 flex justify-between ${alignItems}`}>
        <div className={`flex gap-2 ${alignItems}`}>
          {isLink ? (
            file ? (
              <a href={file} target="_blank" rel="noopener noreferrer" className="text-blue-primary250 hover:underline flex items-center gap-1">
                {value || fileName || 'View Document'} <img src={right} alt="" className="w-1 h-2 ml-1" />
              </a>
            ) : (
              <span className="text-blue-primary250">{value}</span>
            )
          ) : (
            <span className={`text-secondary-grey400 ${valueClass}`}>{value || '—'}</span>
          )}

          {file && !isLink && (
            <>
              <span className="text-secondary-grey100">|</span>
              <a href={file} target="_blank" rel="noopener noreferrer" className="text-blue-primary250 hover:underline flex items-center gap-1">
                {fileName || 'View Document'} <img src={right} alt="" className="w-1 h-2 ml-1" />
              </a>
            </>
          )}
        </div>
        {(verified || type) && <StatusBadge type={verified ? 'verified_text' : type} />}
      </div>
    </div>
  );

  // Section Container
  const SectionBox = ({ title, children }) => (
    <div className="border border-secondary-grey150/60 rounded-lg p-4 bg-white">
      <h3 className="text-sm font-semibold text-secondary-grey400 mb-3">{title}</h3>
      {children}
    </div>
  );

  // --- Data Preparation ---
  const hospitalData = {
    name: hospitalStore.name || 'Manipal Hospitals Life\'s On',
    type: hospitalStore.type || 'Private Hospital',
    speciality: 'Multi Speciality', // Hardcoded as per image or need store field? Store has 'medicalSpecialties' but that is list. This looks like a single "Hospital Specialty" field? Assuming hardcode or derived.
    profileUrl: hospitalStore.url || 'manipalhospital@eclinicq.com',
    address: (() => {
      const a = hospitalStore.address || {};
      return join([
        join([hospitalStore.name, a.blockNo, a.street], ', '),
        join([a.landmark, a.state, a.city, hospitalStore.pincode], ', ')
      ], ' ');
    })(),
    email: hospitalStore.emailId || 'support@Manipal.com',
    contact: hospitalStore.phone || '+91 92826 39045',
    rohiniId: '8900080336704',
    website: hospitalStore.url || 'manipalhospital.com/bengaluru',
    upcharId: 'HLN-001'
  };

  const servicesData = {
    medicalSpecialties: join(hospitalStore.medicalSpecialties || [], ', '),
    hospitalServices: join(hospitalStore.hospitalServices || [], ', '),
    hospitalFacilities: 'ICU, Blood Bank, 24/7 Emergency care', // Placeholder or from store?
    accreditations: join(hospitalStore.accreditation || [], ', '),
    operatingHours: (hospitalStore.operatingHours || []).map(d => `${d}(09:0am-06:00pm)`).join(' | ') // Simplified format matching image roughly
  };

  const adminData = {
    name: join([adminForm.firstName, adminForm.lastName], ' '),
    designation: 'Business Owner',
    role: 'Super Admin',
    email: adminForm.emailId,
    contact: adminForm.phone,
    mfaStatus: 'Done'
  };

  const getDoc = (type) => (hospitalStore.documents || []).find(d => d.type === type);
  const getDocVal = (type) => getDoc(type)?.no || '—';
  const getDocUrl = (type) => getDoc(type)?.url || null;
  const isDocVerified = (type) => !!getDoc(type); // Mock verification status based on existence

  // --- Render ---

  const Page1 = () => (
    <div className="max-w-[700px] mx-auto flex flex-col gap-4 pb-10">

      <ReviewBanner
        icon={<img src="/review.png" alt="" className="w-3 h-3" />}
        title="Ready to Activate"
        className="border-green-200 bg-green-50 text-green-800"
      />

      {/* Image Banner */}
      <div className='relative' >
        <img className='h-[140px] w-full object-cover rounded-xl ' src="/images/hospital.png" alt="" />
        <div className='absolute  w-12 h-12 right-1/2 bottom-5 border-[2px] border-[#2372EC] rounded-md translate-x-1/2'>
          <img src="/images/hospital_logo.png" className='w-full rounded-md h-full object-cover' alt="" />
        </div>
        <div className='bg-white h-5'></div>
      </div>

      {/* Hospital Information */}
      <SectionBox title="Hospital Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-1">
          <div className='flex flex-col'>
            <DetailRow label="Hospital Name" value={hospitalData.name} />
            <DetailRow label="Hospital Type" value={hospitalData.type} />
            <DetailRow label="Speciality" value={hospitalData.speciality} />
            <DetailRow label="Profile URL" value={hospitalData.profileUrl} />
            <DetailRow label="Address" value={hospitalData.address} alignItems="items-start" />
          </div>
          <div className='flex flex-col'>
            <DetailRow label="Hospital Email" value={hospitalData.email} type="done" />
            <DetailRow label="Hospital Contact" value={hospitalData.contact} type="done" />
            <DetailRow label="Rohini ID" value={hospitalData.rohiniId} />
            <DetailRow label="Website" value={hospitalData.website} />
            <DetailRow label="Upchar ID" value={hospitalData.upcharId} />
          </div>
        </div>
      </SectionBox>

      {/* Services & Facilities */}
      <SectionBox title="Services & Facilities">
        <div className='flex flex-col'>
          <DetailRow label="Medical Specialties" value={servicesData.medicalSpecialties} />
          <DetailRow label="Hospital Services" value={servicesData.hospitalServices} />
          <DetailRow label="Hospital Facilities" value={servicesData.hospitalFacilities} />
          <DetailRow label="Accreditations" value={servicesData.accreditations || 'NABH - National Accreditation Board for Hospitals & Healthcare Providers'} />
          <DetailRow label="Operating Hours" value={
            <div className='flex flex-col gap-1'>
              {(hospitalStore.operatingHours || ['Sunday(09:0am-06:00pm)', 'Monday(09:0am-06:00pm)']).join(' | ')}
            </div>
          } alignItems='items-start' />
        </div>
      </SectionBox>

      {/* Primary Admin Account Details */}
      <SectionBox title="Primary Admin Account Details">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-1">
          <div className='flex flex-col'>
            <DetailRow label="User Name" value={adminData.name} />
            <DetailRow label="User Designation" value={adminData.designation} />
            <DetailRow label="User Role" value={adminData.role} />
          </div>
          <div className='flex flex-col'>
            <DetailRow label="User Email" value={adminData.email} type="done" />
            <DetailRow label="User Contact" value={adminData.contact} type="done" />
            <DetailRow label="MFA Status" value={<span className='text-green-600'>Done</span>} type="" />
          </div>
        </div>
      </SectionBox>

      {/* Verified Documents & Status */}
      <SectionBox title="Verified Documents & Status">
        <div className='flex flex-col'>
          <DetailRow
            label="GSTIN"
            value={getDocVal('GST')}
            fileName="GSTIN.pdf"
            file={getDocUrl('GST')}
            verified={isDocVerified('GST')}
          />
          <DetailRow
            label="Registration Number"
            value={getDocVal('State Health Reg No')}
            fileName="SHRN.pdf"
            file={getDocUrl('State Health Reg No')}
            verified={isDocVerified('State Health Reg No')}
          />
          <DetailRow
            label="Rohini ID"
            value={getDocVal('Rohini ID')}
            fileName="Rohini.pdf"
            file={getDocUrl('Rohini ID')}
            verified={isDocVerified('Rohini ID')}
          />
          <DetailRow
            label="Pan Card Number"
            value={getDocVal('Pan Card')}
            fileName="Pancard.pdf"
            file={getDocUrl('Pan Card')}
            verified={isDocVerified('Pan Card')}
          />
          <DetailRow
            label="NABH Accreditation"
            value={getDocVal('NABH')}
            fileName="NABH.pdf"
            file={getDocUrl('NABH')}
            verified={isDocVerified('NABH')}
          />
          {/* CIN Logic: Dummy data for verification view */}
          <DetailRow
            label="CIN"
            value="L17110MH1973PLC019786"
            fileName="CIN_Document.pdf"
            file="#"
            verified={true}
          />
        </div>
      </SectionBox>

    </div>
  );

  const Page2 = () => (
    <div className="max-w-[700px] mx-auto flex flex-col gap-4">
      <ReviewBanner
        icon={<img src="/review.png" alt="" className="w-3 h-3" />}
        title="Ready to Activate"
        className="border-green-200 bg-green-50 text-green-800"
      />

      <div className="space-y-4">
        <AgreementBox
          title="Terms & Conditions"
          description="By using this Healthcare Management System, you agree to comply with and be bound by the following terms and conditions:"
          bullets={[
            { title: 'Data Privacy', text: 'You agree to handle all patient data in accordance with HIPAA, NDHM, and other applicable regulations.' },
            { title: 'Security Measures', text: 'You will implement appropriate security measures to protect patient data.' },
            { title: 'Accuracy of Information', text: 'You confirm that all information provided during registration is accurate and complete.' },
            { title: 'User Access', text: 'You will manage user access appropriately and ensure that only authorized personnel have access to sensitive information.' },
            { title: 'Compliance', text: 'You will comply with all applicable laws and regulations related to healthcare data management.' }
          ]}
          accepted={termsAccepted}
          onToggle={handleTermsChange}
          confirmText="I accept the Terms & Conditions and Data Privacy Agreement"
        />

        <AgreementBox
          title="Data Privacy Agreement"
          description="This Data Privacy Agreement outlines how patient data should be handled in compliance with HIPAA, NDHM, and other applicable regulations:"
          bullets={[
            { title: 'Data Collection', text: 'Only collect patient data that is necessary for providing healthcare services.' },
            { title: 'Data Storage', text: 'Store patient data securely with appropriate encryption and access controls.' },
            { title: 'Data Sharing', text: 'Only share patient data with authorized personnel and third parties as required for healthcare services.' },
            { title: 'Patient Rights', text: 'Respect patient rights regarding their data, including the right to access, correct, and delete their information.' },
            { title: 'Breach Notification', text: 'Promptly notify affected patients and authorities in case of a data breach.' }
          ]}
          accepted={privacyAccepted}
          onToggle={handlePrivacyChange}
          confirmText="I understand and will comply with the Data Privacy Agreement"
        />

        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <div className='flex gap-1 items-center'>
              <h3 className="text-sm font-semibold text-secondary-grey400">Digital Signature</h3>
              <div className='w-1 h-1 bg-red-500 rounded-full'></div>
            </div>
            <p className="text-secondary-grey300 text-xs mb-4">Sign digitally using Aadhar eSign and Upload Pan card</p>
          </div>

          <div className="flex gap-4 items-center">
            <ActionButton variant="pancard" className='h-8'>Use Aadhar eSign</ActionButton>
            <ActionButton variant="pancard" className='h-8'>Upload Pancard</ActionButton>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-white rounded-md shadow-sm overflow-hidden">
      <RegistrationHeader
        title="Review and Sign Agreement"
        subtitle="Review your & verification details and submit for Account Activation"
      >
        <div className="mt-3">
          <ProgressBar step={currentSubStep} total={2} />
        </div>
      </RegistrationHeader>

      <div className="flex-1 overflow-y-auto p-6">
        {formError && (
          <div className="max-w-2xl mx-auto p-2">
            <span className="text-red-500 text-sm font-semibold">{formError}</span>
          </div>
        )}
        {currentSubStep === 1 ? <Page1 /> : <Page2 />}
      </div>
    </div>
  );
};

export default Hos_5;