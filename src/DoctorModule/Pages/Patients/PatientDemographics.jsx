import React from "react";

function Row({ label, value }) {
  return (
    <div className="flex items-center py-2 gap-[0.5rem] text-sm">
      <div className="text-gray-500 w-[184px]">{label}</div>
      <div className="text-gray-800">{value}</div>
    </div>
  );
}

function SectionCard({ title, children, editButtonGroup }) {
  return (
    <div>
      <div className=" text-sm font-semibold text-gray-800 flex items-center justify-between">
        <div>{title}</div>
        {editButtonGroup ? <div>{editButtonGroup}</div> : null}
      </div>
      {/* horizontal line */}
      <div className="border-b border-gray-300 my-2" />
      <div>{children}</div>
    </div>
  );
}

export default function PatientDemographics() {
  return (
    <div className="">
      <div className="space-y-[1rem]">
        <SectionCard
          title="Basic Info"
          editButtonGroup={
            <button
              className="font-inter text-xs font-normal leading-[1.2] tracking-normal align-middle
            text-[#2372EC] flex items-center gap-1"
            >
              <img
                src="/icons/Pen.svg"
                alt="edit icon"
                width={14}
                height={14}
              />
              <div>Edit</div>
            </button>
          }
        >
          <Row label="Name:" value="Rahul Sharma" />
          <Row label="Date Of Birth:" value="02 Feb 1996" />
          <Row label="Age:" value="29 Years" />
          <Row label="Gender:" value="Male" />
          <Row label="Blood Group:" value="B+" />
          <Row label="Marital Status:" value="Married" />
        </SectionCard>

        <SectionCard title="Contact Details">
          <Row label="Primary Phone:" value="+91 98765 43210" />
          <Row label="Secondary Phone:" value="+91 87654 32109" />
          <Row label="Email Address:" value="rahul.sharma@email.com" />
          <Row label="Emergency Contact:" value="+91 98765 43211 (Wife)" />
          <Row label="Primary Language:" value="Hindi" />
          <Row label="Secondary Language:" value="English/Marathi" />
        </SectionCard>

        <SectionCard title="Address Details">
          <div
            className=" text-[#0D47A1] font-inter text-sm font-normal leading-[22px] tracking-[0px]"
          >
            Permanent Address
          </div>
          <Row label="Address:" value="Jawahar Nagar Gokul Colony" />
          <Row label="City:" value="Akola" />
          <Row label="State:" value="Maharashtra" />
          <Row label="Zip Code:" value="444001" />
        </SectionCard>

        <SectionCard
          title="Dependant"
          editButtonGroup={
            <div className="flex items-center justify-end">
              <button
                className=" text-[#2372EC] font-inter text-xs font-normal leading-[1.2] tracking-normal align-middle
"
              >
                + Add New
              </button>
            </div>
          }
        >
          <div className="flex items-center gap-3 py-2">
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold">
              R
            </div>
            <div>
              <div className="text-gray-800">
                Rashmi Sharma{" "}
                <span className="text-xs text-gray-500">Dependant</span>
              </div>
              <div className="text-xs text-gray-500">
                Wife · +91 91753 67487
              </div>
            </div>
            <div className="ml-auto">
              <button className="p-1.5 rounded hover:bg-gray-100">
                <img
                  src="/icons/Menu Dots.svg"
                  alt="options"
                  width={16}
                  height={16}
                />
              </button>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
