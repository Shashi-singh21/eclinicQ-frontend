import React from "react";
import { sortIcon } from "../../public/index.js";

/**
 * TableHeader: header label with optional icon
 *
 * Props:
 * - label: string | ReactNode (text to display when not using children)
 * - showIcon: boolean (default true) whether to show the table icon
 * - iconSrc: string (default "/Doctor_module/patient/table_white.png")
 * - iconAlt: string (default "table icon")
 * - className: string additional classes for wrapper
 * - children: ReactNode optional custom label; when provided, still can show icon
 */
export default function TableHeader({
  label,
  showIcon = true,
  iconSrc = sortIcon,
  iconAlt = "table icon",
  className = "",
  children,
}) {
  return (
    <div
      className={`flex items-center gap-2 h-8 text-secondary-grey400 ${className}`}
      style={{
        fontFamily: 'Inter',
        fontWeight: 500,
        fontSize: '14px',
        lineHeight: '120%',
        letterSpacing: '0%',
        verticalAlign: 'middle'
      }}
    >
      {children ? children : <span>{label}</span>}
      {showIcon && <img src={iconSrc} alt={iconAlt} className="h-4 w-4" />}
    </div>
  );
}
