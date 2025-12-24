import React, { useState } from "react";
import Badge from "../../../components/Badge";
import AvatarCircle from "../../../components/AvatarCircle";
import { Filter, MoreVertical } from "lucide-react";

const SUB_TABS = [
  "Problems",
  "Conditions",
  "Allergies",
  "Immunizations",
  "Family History",
  "Social",
];

function SubTabs({ value, onChange }) {
  return (
    <div className="flex items-center gap-[4px] text-xs">
      {SUB_TABS.map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className={`group flex items-center gap-[2px] p-1 rounded-md border text-nowrap ${
            value === t
              ? "bg-blue-50 text-blue-700 border-blue-200"
              : "text-gray-700 border-none hover:bg-gray-50"
          }`}
        >
          <img
            src={`/${t}.svg`}
            alt={`${t} icon`}
            width={16}
            height={16}
            className=""
          />
          {t}
        </button>
      ))}
    </div>
  );
}

function statusColor(s) {
  if (s === "Resolved" || s === "Completed") return "green";
  if (s === "Active") return "red";
  if (s === "Current") return "green";
  if (s === "Former" || s === "Former ") return "gray";
  if (
    s === "Pending" ||
    s === "Inactive" ||
    s === "In-Active" ||
    s === "Entered in Error" ||
    s === "Historical"
  )
    return "yellow";
  return "gray";
}

function severityColor(s) {
  if (s === "Severe") return "red";
  if (s === "High" || s === "Moderate") return "yellow";
  if (s === "Low") return "gray";
  return "gray";
}

const problemsRows = [
  {
    problem: "Pain after surgery",
    since: "02/02/2025",
    severity: "High",
    status: "Active",
    by: "Milind Chauhan",
  },
  {
    problem: "Chronic back pain",
    since: "10/01/2025",
    severity: "Low",
    status: "Active",
    by: "Milind Chauhan",
  },
  {
    problem: "Migraine episodes",
    since: "08/20/2025",
    severity: "Low",
    status: "Resolved",
    by: "Milind Chauhan",
  },
  {
    problem: "Post-surgery fatigue",
    since: "05/14/2025",
    severity: "Severe",
    status: "Active",
    by: "Milind Chauhan",
  },
  {
    problem: "Joint stiffness",
    since: "03/10/2025",
    severity: "Low",
    status: "Entered in Error",
    by: "Milind Chauhan",
  },
  {
    problem: "Anxiety attacks",
    since: "01/25/2025",
    severity: "Low",
    status: "Pending",
    by: "Sarah Connors",
  },
  {
    problem: "Post-operative nausea",
    since: "12/15/2024",
    severity: "Moderate",
    status: "Inactive",
    by: "Sarah Connors",
  },
  {
    problem: "Insomnia",
    since: "11/30/2024",
    severity: "Moderate",
    status: "Inactive",
    by: "Milind Chauhan",
  },
];

function ProblemsTable() {
  return (
    <table className="min-w-full border-t-[0.5px] border-b-[0.5px] border-[#D6D6D6]">
      <colgroup>
        <col className="w-[200px]" />
        <col className="w-[200px]" />
        <col className="w-[200px]" />
        <col className="w-[180px]" />
        <col className="w-[220px]" />
        <col className="w-[64px]" />
      </colgroup>

      {/* HEADER */}
      <thead className="border-b border-[#D6D6D6]">
        <tr className="h-[32px]">
          {["Problem", "Since", "Severity", "Status", "Created by", ""].map(
            (h, i) => (
              <th
                key={i}
                className={`px-[8px] font-inter font-medium text-sm leading-[120%] tracking-normal text-left text-[#424242] ${
                  i === 5 ? "text-right" : ""
                }`}
              >
                <div className="flex items-center">
                  <div>{h}</div>
                  {h === "" ? null : (
                    <img
                      src="/Action Button.svg"
                      alt="sort icon"
                      width={24}
                      height={24}
                    />
                  )}
                </div>
              </th>
            )
          )}
        </tr>
      </thead>

      {/* BODY */}
      <tbody>
        {problemsRows.map((r, i) => (
          <tr key={i} className="border-b border-gray-200">
            {/* Problem */}
            <td className="px-[8px] py-2 font-inter font-normal text-xs 2xl:text-sm leading-[120%] tracking-normal text-[#424242]">
              {r.problem}
            </td>

            {/* Since */}
            <td className="px-[8px] py-2 font-inter font-normal text-xs 2xl:text-sm leading-[120%] tracking-normal text-[#424242]">
              {r.since}
            </td>

            {/* Severity */}
            <td className="px-[8px] py-2">
              <p className="text-xs text-gray-600">{r.severity}</p>
            </td>

            {/* Status */}
            <td className="px-[8px] py-2">
              <Badge size="s" type="ghost" color={statusColor(r.status)}>
                {r.status}
              </Badge>
            </td>

            {/* Created by */}
            <td className="px-[8px] py-2">
              <div className="flex items-center gap-2">
                <AvatarCircle name={r.by} size="xs" />
                <span className="font-inter font-normal text-xs 2xl:text-sm leading-[120%] tracking-normal text-[#424242]">
                  {r.by}
                </span>
              </div>
            </td>

            {/* Actions */}
            <td className="px-[8px] py-2">
              <div className="flex items-center justify-end">
                <button
                  className="p-1.5 rounded hover:bg-gray-100"
                  aria-label="More"
                >
                  <MoreVertical className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const conditionsRows = [
  {
    condition: "Type 2 Diabetes Mellitus",
    onset: "02/02/2025",
    severity: "Low",
    type: "Chronic",
    status: "Active",
    by: "Milind Chauhan",
  },
  {
    condition: "Common Cold",
    onset: "12/02/2025",
    severity: "Moderate",
    type: "Acute",
    status: "Active",
    by: "Milind Chauhan",
  },
  {
    condition: "Hypertension",
    onset: "15/03/2025",
    severity: "High",
    type: "Chronic",
    status: "In-Active",
    by: "Milind Chauhan",
  },
  {
    condition: "Seasonal Allergies",
    onset: "01/04/2025",
    severity: "Moderate",
    type: "Acute",
    status: "Resolved",
    by: "Milind Chauhan",
  },
];

function ConditionsTable() {
  return (
    <table className="min-w-full border-t-[0.5px] border-b-[0.5px] border-[#D6D6D6] mt-2">
      <colgroup>
        <col className="w-[200px]" />
        <col className="w-[200px]" />
        <col className="w-[200px]" />
        <col className="w-[180px]" />
        <col className="w-[200px]" />
        <col className="w-[220px]" />
        <col className="w-[64px]" />
      </colgroup>

      {/* HEADER */}
      <thead className="border-b border-[#D6D6D6]">
        <tr className="h-[32px]">
          {[
            "Condition",
            "Onset Date",
            "Severity",
            "Type",
            "Status",
            "Created by",
            "",
          ].map((h, i) => (
            <th
              key={i}
              className={`px-[8px] text-nowrap font-inter font-medium text-sm leading-[120%] tracking-normal text-left text-[#424242] ${
                i === 6 ? "text-right" : ""
              }`}
            >
              <div className="flex items-center">
                <div>{h}</div>
                {h === "" ? null : (
                  <img
                    src="/Action Button.svg"
                    alt="sort icon"
                    width={24}
                    height={24}
                  />
                )}
              </div>
            </th>
          ))}
        </tr>
      </thead>

      {/* BODY */}
      <tbody>
        {conditionsRows.map((r, i) => (
          <tr key={i} className="border-b border-gray-200">
            {/* Condition */}
            <td className="px-[8px] py-2 font-inter font-normal text-xs 2xl:text-sm leading-[120%] tracking-normal text-[#424242]">
              {r.condition}
            </td>

            {/* Onset Date */}
            <td className="px-[8px] py-2 font-inter font-normal text-xs 2xl:text-sm leading-[120%] tracking-normal text-[#424242]">
              {r.onset}
            </td>

            {/* Severity */}
            <td className="px-[8px] py-2">
              <Badge size="s" type="ghost" color={severityColor(r.severity)}>
                {r.severity}
              </Badge>
            </td>

            {/* Type */}
            <td className="px-[8px] py-2 font-inter font-normal text-xs 2xl:text-sm leading-[120%] tracking-normal text-[#424242]">
              {r.type}
            </td>

            {/* Status */}
            <td className="px-[8px] py-2">
              <Badge size="s" type="ghost" color={statusColor(r.status)}>
                {r.status}
              </Badge>
            </td>

            {/* Created by */}
            <td className="px-[8px] py-2">
              <div className="flex items-center gap-2">
                <AvatarCircle name={r.by} size="xs" />
                <span className="font-inter font-normal text-xs 2xl:text-sm leading-[120%] tracking-normal text-[#424242]">
                  {r.by}
                </span>
              </div>
            </td>

            {/* Actions */}
            <td className="px-[8px] py-2">
              <div className="flex items-center justify-end">
                <button
                  className="p-1.5 rounded hover:bg-gray-100"
                  aria-label="More"
                >
                  <MoreVertical className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const allergiesRows = [
  {
    allergen: "Penicillin",
    reaction: "Skin rash, difficulty breathing",
    since: "02/02/2025",
    severity: "Mild",
    type: "Drug",
    status: "Active",
    by: "Milind Chauhan",
  },
  {
    allergen: "Peanuts",
    reaction: "Nausea",
    since: "02/02/2025",
    severity: "Severe",
    type: "Food",
    status: "Resolved",
    by: "Milind Chauhan",
  },
  {
    allergen: "Shellfish",
    reaction: "Hives, swelling of the lips",
    since: "02/03/2025",
    severity: "Moderate",
    type: "Food",
    status: "Active",
    by: "Milind Chauhan",
  },
  {
    allergen: "Gluten",
    reaction: "Abdominal pain, bloating",
    since: "02/04/2025",
    severity: "Mild",
    type: "Food",
    status: "Entered in Error",
    by: "Milind Chauhan",
  },
];

function AllergiesTable() {
  return (
    <table className="min-w-full border-t-[0.5px] border-b-[0.5px] border-[#D6D6D6] mt-2">
      <colgroup>
        <col className="w-[220px]" />
        <col className="w-[360px]" />
        <col className="w-[120px]" />
        <col className="w-[120px]" />
        <col className="w-[120px]" />
        <col className="w-[140px]" />
        <col className="w-[160px]" />
        <col className="w-[64px]" />
      </colgroup>

      {/* HEADER */}
      <thead className="border-b border-[#D6D6D6]">
        <tr className="h-[32px]">
          {[
            "Allergen",
            "Reaction",
            "Since",
            "Severity",
            "Type",
            "Status",
            "Created by",
            "",
          ].map((h, i) => (
            <th
              key={i}
              className={`px-[8px] text-nowrap font-inter font-medium text-sm leading-[120%] tracking-normal text-left text-[#424242] ${
                i === 7 ? "text-right" : ""
              }`}
            >
              <div className="flex items-center">
                <div>{h}</div>
                {h === "" ? null : (
                  <img
                    src="/Action Button.svg"
                    alt="sort icon"
                    width={24}
                    height={24}
                  />
                )}
              </div>
            </th>
          ))}
        </tr>
      </thead>

      {/* BODY */}
      <tbody>
        {allergiesRows.map((r, i) => (
          <tr key={i} className="border-b border-gray-200">
            {/* Allergen */}
            <td className="px-[8px] py-2 font-inter font-normal text-xs 2xl:text-sm leading-[120%] tracking-normal text-[#424242]">
              {r.allergen}
            </td>

            {/* Reaction */}
            <td className="px-[8px] py-2 font-inter font-normal text-xs 2xl:text-sm leading-[120%] tracking-normal text-[#424242] break-words">
              {r.reaction}
            </td>

            {/* Since */}
            <td className="px-[8px] py-2 font-inter font-normal text-xs 2xl:text-sm leading-[120%] tracking-normal text-[#424242]">
              {r.since}
            </td>

            {/* Severity */}
            <td className="px-[8px] py-2">
              <Badge size="s" type="ghost" color={severityColor(r.severity)}>
                {r.severity}
              </Badge>
            </td>

            {/* Type */}
            <td className="px-[8px] py-2 font-inter font-normal text-xs 2xl:text-sm leading-[120%] tracking-normal text-[#424242]">
              {r.type}
            </td>

            {/* Status */}
            <td className="px-[8px] py-2">
              <Badge size="s" type="ghost" color={statusColor(r.status)}>
                {r.status}
              </Badge>
            </td>

            {/* Created by */}
            <td className="px-[8px] py-2">
              <div className="flex items-center gap-2">
                <AvatarCircle name={r.by} size="xs" />
                <span className="font-inter font-normal text-xs 2xl:text-sm leading-[120%] tracking-normal text-[#424242]">
                  {r.by}
                </span>
              </div>
            </td>

            {/* Actions */}
            <td className="px-[8px] py-2">
              <div className="flex items-center justify-end">
                <button
                  className="p-1.5 rounded hover:bg-gray-100"
                  aria-label="More"
                >
                  <MoreVertical className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const immunizationsRows = [
  {
    name: "COVID-19",
    date: "02/02/2025",
    dose: 2,
    status: "Completed",
    doctor: "Milind Chauhan",
    note: "No fever or other adverse effects.",
  },
  {
    name: "Influenza",
    date: "10/20/2023",
    dose: 1,
    status: "Historical",
    doctor: "Dr. Rajesh Sharma",
    note: "Annual flu shot administered.",
  },
  {
    name: "Hepatitis B",
    date: "05/15/2024",
    dose: 1,
    status: "Completed",
    doctor: "Nisha Patel",
    note: "Completed three-dose series.",
  },
  {
    name: "Tetanus",
    date: "08/30/2023",
    dose: 1,
    status: "Historical",
    doctor: "Dr. Anil Gupta",
    note: "Booster received.",
  },
];

const socialRows = [
  {
    category: "Smoking",
    since: "02/02/2025",
    freq: "Daily",
    status: "Current",
    source: "Patient",
    note: "Patient wants to quit. Counseled during last visit.",
    by: "Milind Chauhan",
  },
  {
    category: "Substance Use",
    since: "12/02/2024",
    freq: "Weekly",
    status: "Former",
    source: "Patient",
    note: "Occasional recreational cannabis use in college. Stopped recently.",
    by: "Milind Chauhan",
  },
  {
    category: "Alcohol Consumption",
    since: "01/15/2025",
    freq: "Monthly",
    status: "Current",
    source: "Patient",
    note: "Patient reports drinking socially on weekends, no plans to quit.",
    by: "Milind Chauhan",
  },
];

function SocialTable() {
  return (
    <table className="min-w-full border-t-[0.5px] border-b-[0.5px] border-[#D6D6D6] mt-2">
      <colgroup>
        <col className="w-[220px]" />
        <col className="w-[120px]" />
        <col className="w-[100px]" />
        <col className="w-[120px]" />
        <col className="w-[36%]" />
        <col className="w-[120px]" />
        <col className="w-[160px]" />
      </colgroup>

      {/* HEADER */}
      <thead className="border-b border-[#D6D6D6]">
        <tr className="h-[32px]">
          {[
            "Category",
            "Since",
            "Freq.",
            "Status",
            "Note",
            "Source",
            "Verified by",
          ].map((h, i) => (
            <th
              key={i}
              className={`px-[8px] font-inter font-medium text-sm leading-[120%] tracking-normal text-left text-[#424242] ${
                i === 6 ? "text-right" : ""
              }`}
            >
              <div className="flex items-center">
                <div>{h}</div>
                <img
                  src="/Action Button.svg"
                  alt="sort icon"
                  width={24}
                  height={24}
                />
              </div>
            </th>
          ))}
        </tr>
      </thead>

      {/* BODY */}
      <tbody>
        {socialRows.map((r, i) => (
          <tr key={i} className="border-b border-gray-200">
            {/* Category */}
            <td className="px-[8px] py-2 font-inter font-normal text-xs 2xl:text-sm leading-[120%] tracking-normal text-[#424242]">
              {r.category}
            </td>

            {/* Since */}
            <td className="px-[8px] py-2 font-inter font-normal text-xs 2xl:text-sm leading-[120%] tracking-normal text-[#424242]">
              {r.since}
            </td>

            {/* Freq */}
            <td className="px-[8px] py-2 font-inter font-normal text-xs 2xl:text-sm leading-[120%] tracking-normal text-[#424242]">
              {r.freq}
            </td>

            {/* Status */}
            <td className="px-[8px] py-2">
              <Badge size="s" type="ghost" color={statusColor(r.status)}>
                {r.status}
              </Badge>
            </td>

            {/* Note */}
            <td
              className="px-[8px] py-2
                  font-inter font-normal
                  text-xs 2xl:text-sm
                  leading-[120%]
                  tracking-normal
                  text-[#424242]
                  align-top
                  whitespace-normal
                  break-words
                  sm:line-clamp-2"
            >
              {r.note}
            </td>

            {/* Source */}
            <td className="px-[8px] py-2 font-inter font-normal text-xs 2xl:text-sm leading-[120%] tracking-normal text-[#424242]">
              {r.source}
            </td>

            {/* Verified by */}
            <td className="px-[8px] py-2">
              <div className="flex items-center justify-end gap-2">
                <AvatarCircle name={r.by} size="xs" />
                <span className="font-inter font-normal text-xs 2xl:text-sm leading-[120%] tracking-normal text-[#424242] truncate max-w-[88px]">
                  {r.by}
                </span>
                <button
                  className="p-1.5 rounded hover:bg-gray-100"
                  aria-label="More"
                >
                  <MoreVertical className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function DoctorCell({ name }) {
  return (
    <div className="flex items-center gap-2">
      <AvatarCircle name={name} size="s" />
      <span className="text-gray-800">{name}</span>
    </div>
  );
}

function ImmunizationsTable() {
  return (
    <table className="min-w-full border-t-[0.5px] border-b-[0.5px] border-[#D6D6D6] mt-2">
      <colgroup>
        <col className="w-[30%]" />
        <col className="w-[14%]" />
        <col className="w-[8%]" />
        <col className="w-[30%]" />
        <col className="w-[20%]" />
        <col className="w-[64px]" />
      </colgroup>

      {/* HEADER */}
      <thead className="border-b border-[#D6D6D6]">
        <tr className="h-[32px]">
          {["Vaccine Name", "Date", "Dose", "Note", "Doctor", ""].map(
            (h, i) => (
              <th
                key={i}
                className={`px-[8px] font-inter font-medium text-sm leading-[120%] tracking-normal text-left text-[#424242] ${
                  i === 5 ? "text-right" : ""
                }`}
              >
                <div className="flex items-center">
                  <div>{h}</div>
                  {h === "" ? null : (
                    <img
                      src="/Action Button.svg"
                      alt="sort icon"
                      width={24}
                      height={24}
                    />
                  )}
                </div>
              </th>
            )
          )}
        </tr>
      </thead>

      {/* BODY */}
      <tbody>
        {immunizationsRows.map((r, i) => (
          <tr key={i} className="border-b border-gray-200">
            {/* Vaccine Name */}
            <td className="px-[8px] py-2 font-inter font-normal text-xs 2xl:text-sm leading-[120%] tracking-normal text-[#424242]">
              {r.name}
            </td>

            {/* Date */}
            <td className="px-[8px] py-2 font-inter font-normal text-xs 2xl:text-sm leading-[120%] tracking-normal text-[#424242]">
              {r.date}
            </td>

            {/* Dose */}
            <td className="px-[8px] py-2 font-inter font-normal text-xs 2xl:text-sm leading-[120%] tracking-normal text-[#424242]">
              {r.dose}
            </td>

            {/* Note */}
            <td className="px-[8px] py-2 font-inter font-normal text-xs 2xl:text-sm leading-[120%] tracking-normal text-[#424242] break-words">
              {r.note}
            </td>

            {/* Doctor */}
            <td className="px-[8px] py-2">
              <div className="flex items-center gap-2">
                <AvatarCircle name={r.doctor} size="xs" />
                <span className="font-inter font-normal text-xs 2xl:text-sm leading-[120%] tracking-normal text-[#424242]">
                  {r.doctor}
                </span>
              </div>
            </td>

            {/* Actions */}
            <td className="px-[8px] py-2">
              <div className="flex items-center justify-end">
                <button
                  className="p-1.5 rounded hover:bg-gray-100"
                  aria-label="More"
                >
                  <MoreVertical className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const familyRows = [
  {
    relation: "Father",
    problems: ["Hypertension"],
    since: "02/02/2025",
    status: "Active",
    note: "Normal From Last 1 Year",
  },
  {
    relation: "Mother",
    problems: ["High Cholesterol"],
    since: "02/02/2025",
    status: "Active",
    note: "Still This Problems Active",
  },
];

function FamilyHistoryTable() {
  return (
    <table className="min-w-full border-t-[0.5px] border-b-[0.5px] border-[#D6D6D6] mt-2">
      <colgroup>
        <col className="w-[160px]" />
        <col />
        <col className="w-[140px]" />
        <col className="w-[120px]" />
        <col className="w-[260px]" />
        <col className="w-[64px]" />
      </colgroup>

      {/* HEADER */}
      <thead className="border-b border-[#D6D6D6]">
        <tr className="h-[32px]">
          {["Relation", "Problems", "Since", "Status", "Note", ""].map(
            (h, i) => (
              <th
                key={i}
                className={`px-[8px] font-inter font-medium text-sm leading-[120%] tracking-normal text-left text-[#424242] ${
                  i === 5 ? "text-right" : ""
                }`}
              >
                <div className="flex items-center">
                  <div>{h}</div>
                  {h === "" ? null : (
                    <img
                      src="/Action Button.svg"
                      alt="sort icon"
                      width={24}
                      height={24}
                    />
                  )}
                </div>
              </th>
            )
          )}
        </tr>
      </thead>

      {/* BODY */}
      <tbody>
        {familyRows.map((r, i) => (
          <tr key={i} className="border-b border-gray-200">
            {/* Relation */}
            <td className="px-[8px] py-2 font-inter font-normal text-xs 2xl:text-sm leading-[120%] tracking-normal text-[#424242]">
              {r.relation}
            </td>

            {/* Problems */}
            <td className="px-[8px] py-2">
              <div className="flex flex-wrap gap-2">
                {r.problems.map((p, idx) => (
                  <Badge key={idx} size="s" type="ghost" color="gray">
                    {p}
                  </Badge>
                ))}
              </div>
            </td>

            {/* Since */}
            <td className="px-[8px] py-2 font-inter font-normal text-xs 2xl:text-sm leading-[120%] tracking-normal text-[#424242]">
              {r.since}
            </td>

            {/* Status */}
            <td className="px-[8px] py-2">
              <Badge size="s" type="ghost" color={statusColor(r.status)}>
                {r.status}
              </Badge>
            </td>

            {/* Note */}
            <td className="px-[8px] py-2 font-inter font-normal text-xs 2xl:text-sm leading-[120%] tracking-normal text-[#424242] break-words">
              {r.note}
            </td>

            {/* Actions */}
            <td className="px-[8px] py-2">
              <div className="flex items-center justify-end">
                <button
                  className="p-1.5 rounded hover:bg-gray-100"
                  aria-label="More"
                >
                  <MoreVertical className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function PatientMedicalHistory() {
  const [active, setActive] = useState("Problems");
  const addLabel =
    active === "Problems"
      ? "Add Problem"
      : active === "Conditions"
      ? "Add Condition"
      : active === "Family History"
      ? "Add History"
      : `Add ${active}`;
  return (
    <div className="">
      <div className="flex items-center justify-between mb-4">
        <SubTabs value={active} onChange={setActive} />
        <div className="flex items-center gap-3 text-sm">
          <button className="text-blue-600 hover:underline">
            + {addLabel}
          </button>
          <button
            className="p-1.5 rounded hover:bg-gray-100"
            aria-label="Filter"
          >
            <Filter className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      </div>

      {active === "Problems" && <ProblemsTable />}
      {active === "Conditions" && <ConditionsTable />}
      {active === "Allergies" && <AllergiesTable />}
      {active === "Immunizations" && <ImmunizationsTable />}
      {active === "Family History" && <FamilyHistoryTable />}
      {active === "Social" && <SocialTable />}

      {active !== "Problems" &&
        active !== "Conditions" &&
        active !== "Allergies" &&
        active !== "Immunizations" &&
        active !== "Family History" &&
        active !== "Social" && (
          <div className="text-sm text-gray-500 border border-dashed border-gray-200 rounded-md p-6">
            {`${active} section coming soon.`}
          </div>
        )}
    </div>
  );
}
