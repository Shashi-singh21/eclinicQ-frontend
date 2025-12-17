import React from "react";

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
  iconSrc = "/Doctor_module/patient/table_white.png",
  iconAlt = "table icon",
  className = "",
  children,
}) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {children ? children : <span>{label}</span>}
      {showIcon && (
        <img src={iconSrc} alt={iconAlt} className="h-4 w-4" />
      )}
    </div>
  );
}
