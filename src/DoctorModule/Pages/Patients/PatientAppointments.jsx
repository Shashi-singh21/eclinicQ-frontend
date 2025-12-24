import React from "react";
import AvatarCircle from "../../../components/AvatarCircle";
import Badge from "../../../components/Badge";
import { Eye, MoreVertical, Filter } from "lucide-react";

const upcoming = [
  {
    date: "20/02/2025 | 12:30 PM",
    doctor: { name: "Milind Chauhan", title: "General Physician" },
    type: "Follow-Up",
    reason: "High Blood Pressure",
    status: "Confirmed",
  },
];

const past = [
  {
    date: "02/02/2025 | 12:30 PM",
    doctor: { name: "Milind Chauhan", title: "General Physician" },
    type: "New",
    reason: "Fever & Weakness",
    status: "Completed",
  },
  {
    date: "12/02/2025 | 12:30 PM",
    doctor: { name: "Milind Chauhan", title: "General Physician" },
    type: "Follow-Up",
    reason: "Fever & Weakness",
    status: "Completed",
  },
  {
    date: "03/02/2025 | 02:00 PM",
    doctor: { name: "Milind Chauhan", title: "General Physician" },
    type: "New",
    reason: "Headache & Fatigue",
    status: "Completed",
  },
  {
    date: "05/02/2025 | 11:00 AM",
    doctor: { name: "Milind Chauhan", title: "General Physician" },
    type: "Follow-Up",
    reason: "Headache & Fatigue",
    status: "Declined",
  },
  {
    date: "09/02/2025 | 09:30 AM",
    doctor: { name: "Milind Chauhan", title: "General Physician" },
    type: "New",
    reason: "Abdominal Pain",
    status: "Cancelled",
  },
];

function StatusBadge({ status }) {
  const color =
    status === "Confirmed" || status === "Completed"
      ? status === "Confirmed"
        ? "green"
        : "gray"
      : "red";
  return (
    <Badge size="s" type="ghost" color={color}>
      {status}
    </Badge>
  );
}

function AppointmentsTable({ rows }) {
  return (
    <table className="min-w-full h-8 min-h-8 max-h-8 border-t-[0.5px] border-b-[0.5px] border-[#D6D6D6]">
      <colgroup>
        <col className="w-[200px] xxl:w-[260px]" />
        <col className="w-[220px] xxl:w-[280px]" />
        <col className="w-[140px] xxl:w-[160px]" />
        <col />
        <col className="w-[140px]" />
        <col className="w-[64px]" />
      </colgroup>

      <thead className="font-medium text-gray-500 border-b">
        <tr className="h-[32px]">
          <th className="px-[8px] font-inter font-medium text-sm leading-[120%] tracking-normal text-left text-[#424242]">
            <div className="flex items-center">
              <div>Date</div>
              <button>
                <img
                  src="/Action Button.svg"
                  width={24}
                  height={24}
                  alt="sort button"
                />
              </button>
            </div>
          </th>
          <th className="px-[8px] font-inter font-medium text-sm leading-[120%] tracking-normal text-left text-[#424242]">
            <div className="flex items-center">
              <div>Doctor</div>
              <button>
                <img
                  src="/Action Button.svg"
                  width={24}
                  height={24}
                  alt="sort button"
                />
              </button>
            </div>
          </th>
          <th className="font-inter font-medium text-sm leading-[120%] tracking-normal text-left text-[#424242]">
            <div className="flex items-center">
              <div>Type</div>
              <button>
                <img
                  src="/Action Button.svg"
                  width={24}
                  height={24}
                  alt="sort button"
                />
              </button>
            </div>
          </th>
          <th className="px-[8px] font-inter font-medium text-sm leading-[120%] tracking-normal text-left text-[#424242]">
            <div className="flex items-center">
              <div>Reason For Visit</div>
              <button>
                <img
                  src="/Action Button.svg"
                  width={24}
                  height={24}
                  alt="sort button"
                />
              </button>
            </div>
          </th>
          <th className="px-[8px] font-inter font-medium text-sm leading-[120%] tracking-normal text-left text-[#424242]">
            <div className="flex items-center">
              <div>Status</div>
              <button>
                <img
                  src="/Action Button.svg"
                  width={24}
                  height={24}
                  alt="sort button"
                />
              </button>
            </div>
          </th>
          {/* <th className="px-[8px] text-right font-inter font-medium text-sm leading-[120%] tracking-normal text-[#424242]">
            {" "}
          </th> */}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i} className="border-b border-gray-200">
            <td className="pl-1 py-2 font-inter font-normal text-xs 2xl:text-sm leading-[120%] tracking-normal text-[#424242]">
              {r.date}
            </td>
            <td className="py-2">
              <div className="flex items-center gap-2">
                <AvatarCircle name={r.doctor.name} size="xs" />
                <div className="leading-tight">
                  <div className="py-1 font-inter font-normal text-xs 2xl:text-sm leading-[120%] tracking-normal text-gray-800">
                    {r.doctor.name}
                  </div>
                  <div className="py-1 font-inter font-normal text-xs 2xl:text-sm leading-[120%] tracking-normal text-[#424242]">
                    {r.doctor.title}
                  </div>
                </div>
              </div>
            </td>
            <td className="py-2 font-inter font-normal text-xs 2xl:text-sm leading-[120%] tracking-normal text-[#424242]">
              {r.type}
            </td>
            <td className="py-2 font-inter font-normal text-xs 2xl:text-sm leading-[120%] tracking-normal text-[#424242]">
              {r.reason}
            </td>
            <td className="py-2 px-2">
              <StatusBadge status={r.status} />
            </td>
            <td className="py-2 pr-2">
              <div className="flex items-center justify-end gap-2 text-gray-600">
                <button
                  className=""
                  aria-label="View"
                >
                  <img src="/Eye.svg" width={24} height={24} className="h-[24px] w-[24px]" alt="view" />
                </button>
                <button
                  className="p-1.5 rounded hover:bg-gray-100"
                  aria-label="More"
                >
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function PatientAppointments({ embedded = true }) {
  return (
    <div className="flex flex-col gap-[24px]">
      <div>
        {/* Top right actions */}
        <div className="flex items-center justify-between text-sm mb-2">
          <div className="text-sm font-semibold text-gray-800">
            Upcoming Appointment
          </div>
          <div className="flex items-center gap-3">
            <button className="text-blue-600 hover:underline">
              + Schedule
            </button>
            <button
              className="p-1.5 rounded hover:bg-gray-100"
              aria-label="Filter"
            >
              <Filter className="h-4 w-4 text-gray-600" />
            </button>
          </div>
        </div>
        <AppointmentsTable rows={upcoming} />
      </div>

      <div className="mb-2">
        <div className="text-sm font-semibold text-gray-800 mb-2">
          Past Appointments
        </div>
        <AppointmentsTable rows={past} />
      </div>
    </div>
  );
}
