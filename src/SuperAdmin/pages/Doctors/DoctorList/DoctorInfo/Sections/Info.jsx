import React from "react";

const InfoRow = ({ label, value, link }) => (
  <div className="border-b border-[#F0F0F0] flex gap-2 py-2">
    <span className="font-normal min-w-[180px] text-sm text-[#626060]">
      {label}
    </span>
    {link ? (
      <a
        href={link}
        className="font-medium text-sm text-blue-600 underline"
        target="_blank"
        rel="noreferrer"
      >
        {value}
      </a>
    ) : (
      <span className="font-medium text-sm text-[#424242]">{value}</span>
    )}
  </div>
);

const InfoSection = ({ title, children }) => (
  <div className="flex flex-col gap-1 w-full md:w-[48%]">
    <span className="text-[#424242] font-medium text-sm">{title}</span>
    <div className="border-t border-[#D6D6D6] flex flex-col">{children}</div>
  </div>
);

const Info = ({ doctor }) => {
  return (
    <div className="flex flex-col pt-3 px-3 pb-6 gap-6">
      {/* About Doctor */}
      <div className="border flex flex-col p-3 gap-2 border-[#B8B8B8] rounded-lg">
        <div className="flex gap-1 items-center">
          <span className="text-[#424242] text-sm font-semibold">
            About Doctor
          </span>
        </div>
        <span className="font-normal text-[#626060] text-xs">
          {doctor?.specializationWithExperience?.length
            ? doctor.specializationWithExperience
                .map((s) => `${s.specialization} (${s.experience} yrs)`).join(', ')
            : doctor?.specialization || '—'}
        </span>
      </div>

      {/* Sections in 2-column layout */}
      <div className="flex flex-wrap gap-6">
        {/* Basic Info */}
        <InfoSection title="Basic Info">
          <InfoRow label="Name:" value={doctor?.name || '-'} />
          <InfoRow label="Date Of Birth:" value={doctor?.dateOfBirth || '-'} />
          <InfoRow label="Age:" value={doctor?.age != null ? String(doctor.age) : '-'} />
          <InfoRow label="Gender:" value={doctor?.gender ? String(doctor.gender).toUpperCase() : '-'} />
          <InfoRow label="Date Joined Platform:" value={doctor?.dateJoinedPlatform || '-'} />
          <InfoRow label="Profile Created:" value={doctor?.profileCreated || '-'} />
        </InfoSection>

        {/* Contact Details */}
        <InfoSection title="Contact Details">
          <InfoRow label="Primary Phone:" value={doctor?.primaryPhone || doctor?.contact || '-'} />
          <InfoRow label="Email Address:" value={doctor?.emailAddress || doctor?.email || '-'} />
          <InfoRow label="Location:" value={doctor?.location || '-'} />
        </InfoSection>

        {/* Professional Information */}
        <InfoSection title="Professional Information">
          <InfoRow label="MRN Number:" value={doctor?.mrnNumber || '-'} />
          <InfoRow label="Registration Council:" value={doctor?.registrationCouncil || '-'} />
          <InfoRow label="Registration Year:" value={doctor?.registrationYear || '-'} />
          <InfoRow label="Specialization:" value={doctor?.specialization || '-'} />
        </InfoSection>

        {/* Educational Information */}
        <InfoSection title="Educational Information">
          <InfoRow
            label="Graduation Degree:"
            value={doctor?.graduationDegree
              ? `${doctor.graduationDegree.degree || ''} (Completed - ${doctor.graduationDegree.completionYear || '-'}) ${doctor.graduationDegree.college || ''}`.trim()
              : '-'}
          />
          <InfoRow
            label="Post Graduation Degree:"
            value={doctor?.postGraduationDegree
              ? `${doctor.postGraduationDegree.degree || ''} (Completed - ${doctor.postGraduationDegree.completionYear || '-'}) ${doctor.postGraduationDegree.college || ''}`.trim()
              : '-'}
          />
        </InfoSection>

        {/* Certificates & Documents */}
        <InfoSection title="Certificates & Documents">
          <InfoRow label="MRN Number Proof:" value={doctor?.mrnNumberProof || '-'} link={doctor?.mrnNumberProof || undefined} />
          <InfoRow label="GST Proof:" value={doctor?.gstProof || '-'} link={doctor?.gstProof || undefined} />
          <InfoRow label="Graduation Degree Proof:" value={doctor?.graduationDegreeProof || '-'} link={doctor?.graduationDegreeProof || undefined} />
          <InfoRow label="Post Graduation Degree Proof:" value={doctor?.postGraduationProof || '-'} link={doctor?.postGraduationProof || undefined} />
          <InfoRow label="Identity Proof:" value={doctor?.identityProof || '-'} link={doctor?.identityProof || undefined} />
          <InfoRow label="Clinic Establishment Proof:" value={doctor?.clinicEstablishmentProof || '-'} link={doctor?.clinicEstablishmentProof || undefined} />
        </InfoSection>

        {/* Address Details */}
        <InfoSection title="Address Details">
          <InfoRow label="Address:" value={doctor?.address || '-'} />
          <InfoRow label="Location:" value={doctor?.location || '-'} />
        </InfoSection>
      </div>
    </div>
  );
};

export default Info;
