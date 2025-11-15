import React, { useState } from "react";
import Info from "../../../SuperAdmin/pages/Doctors/DoctorList/DoctorInfo/Sections/Info";
import Clinical from "../../../SuperAdmin/pages/Doctors/DoctorList/DoctorInfo/Sections/Clinical";
import Consultation from "../../../SuperAdmin/pages/Doctors/DoctorList/DoctorInfo/Sections/Consultation";
import Staff from "../../../SuperAdmin/pages/Doctors/DoctorList/DoctorInfo/Sections/Staff";

const PageNav = ({ doctor }) => {
  const [activeTab, setActiveTab] = useState("info");

  const tabs = [
    { key: "info", label: "Info" },
    { key: "clinical", label: "Clinical Details" },
    { key: "consultation", label: "Consultation Details" },
    { key: "staff", label: "Staff Access" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "info":
        return <Info doctor={doctor} />;
      case "clinical":
        return <Clinical doctor={doctor} />;
      case "consultation":
        return <Consultation doctor={doctor} />;
      case "staff":
        return <Staff doctor={doctor} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full p-4">
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`relative px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 
              ${activeTab === tab.key ? "text-blue-600" : ""}`}
          >
            {tab.label}
            {activeTab === tab.key && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-600 rounded-full"></span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mt-4">{renderContent()}</div>
    </div>
  );
};

export default PageNav;
