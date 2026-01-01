import React, { useState } from "react";
import Info from "../../../SuperAdmin/pages/Doctors/DoctorList/DoctorInfo/Sections/Info";
import Clinical from "../../../SuperAdmin/pages/Doctors/DoctorList/DoctorInfo/Sections/Clinical";
import Consultation from "../../../SuperAdmin/pages/Doctors/DoctorList/DoctorInfo/Sections/Consultation";
import Staff from "../../../SuperAdmin/pages/Doctors/DoctorList/DoctorInfo/Sections/Staff";

const PageNav = ({ doctor }) => {
  const [activeTab, setActiveTab] = useState("personal");

  const tabs = [
    { key: "personal", label: "Personal Info" },
    { key: "consultation", label: "Consultation Details" },
    { key: "clinical", label: "Clinical Details" },
    { key: "staff", label: "Staff Permissions" },
    { key: "billing", label: "Billing & Subscription" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "personal":
        return <Info doctor={doctor} />;
      case "clinical":
        return <Clinical doctor={doctor} />;
      case "consultation":
        return <Consultation doctor={doctor} />;
      case "staff":
        return <Staff doctor={doctor} />;
      case "billing":
        return <div className="p-4 text-gray-500">Billing & Subscription (Coming Soon)</div>;
      default:
        return null;
    }
  };

  return (
    <div className="w-full ">
      {/* Tabs */}
      <div className="px-2 border-b border-secondary-grey100">
        <nav className="px-2 flex items-center gap-2 overflow-x-auto text-sm">
          {tabs.map((t) => {
            const active = activeTab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`whitespace-nowrap px-[6px] py-1 pb-2 border-b-2 transition-colors ${active
                    ? "border-blue-600 text-blue-primary250"
                    : "border-transparent text-secondary-grey300 hover:text-gray-900"
                  }`}
              >
                {t.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      <div className=" bg-secondary-grey50">{renderContent()}</div>
    </div>
  );
};

export default PageNav;
