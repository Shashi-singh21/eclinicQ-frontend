import React from 'react';

function Row({ label, value }) {
  return (
    <div className="grid grid-cols-3 gap-4 py-1 text-sm">
      <div className="text-gray-500">{label}</div>
      <div className="col-span-2 text-gray-800">{value}</div>
    </div>
  );
}

function SectionCard({ title, children }) {
  return (
    <div className="border border-gray-200 rounded-md bg-white">
      <div className="px-4 py-2 border-b text-sm font-semibold text-gray-800">{title}</div>
      <div className="px-4 py-2">{children}</div>
    </div>
  );
}

export default function PatientDemographics() {
  return (
    <div className="py-2">
      <div className="text-sm font-semibold text-gray-800 mb-2">Demographics Details</div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <SectionCard title="Basic Info">
            <Row label="Name:" value="Rahul Sharma" />
            <Row label="Date Of Birth:" value="02 Feb 1996" />
            <Row label="Age:" value="29 Years" />
            <Row label="Gender:" value="Male" />
            <Row label="Blood Group:" value="B+" />
            <Row label="Marital Status:" value="Married" />
          </SectionCard>

          <SectionCard title="Address Details">
            <div className="text-xs text-blue-600 mb-1">Permanent Address</div>
            <Row label="Address:" value="Jawahar Nagar Gokul Colony" />
            <Row label="City:" value="Akola" />
            <Row label="State:" value="Maharashtra" />
            <Row label="Zip Code:" value="444001" />
          </SectionCard>
        </div>

        <div className="space-y-4">
          <SectionCard title="Contact Details">
            <div className="text-right -mt-1 -mr-1">
              <button className="text-xs text-blue-600 hover:underline">Edit</button>
            </div>
            <Row label="Primary Phone:" value="+91 98765 43210" />
            <Row label="Secondary Phone:" value="+91 87654 32109" />
            <Row label="Email Address:" value="rahul.sharma@email.com" />
            <Row label="Emergency Contact:" value="+91 98765 43211 (Wife)" />
            <Row label="Primary Language:" value="Hindi" />
            <Row label="Secondary Language:" value="English/Marathi" />
          </SectionCard>

          <SectionCard title="Family Information">
            <Row label="Spouse:" value="Priya Sharma · F | 42 Years" />
            <Row label="Daughter:" value="Kavya Sharma · F | 18 Years" />
            <Row label="Son:" value="Arjun Sharma · M | 18 Years" />
            <Row label="Father:" value="Kumar Sharma · M | 70 Years" />
            <Row label="Mother:" value="Sunita Sharma · F | 68 Years" />
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
