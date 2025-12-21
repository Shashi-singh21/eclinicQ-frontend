import React from "react";

export default function InputWithMeta({
  label,
  requiredDot = false,
  rightMeta,
  value,
  onChange,
  placeholder,
  RightIcon,
  onIconClick,
  onFieldOpen,
  readonlyWhenIcon = true,
  dropdown,
  disabled = false,
  className = "",
  // new: indicate dropdown is currently open for UX cursor
  dropdownOpen = false,
}) {
  const isReadOnly = !!RightIcon && readonlyWhenIcon;

  const handleOpen = () => {
    if (disabled) return;
    if (onFieldOpen) onFieldOpen();
    else if (onIconClick) onIconClick();
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between mb-1">
        <label className="text-sm text-secondary-grey300">
          {label}
          {requiredDot && <span className="text-red-500"> *</span>}
        </label>
        {rightMeta ? <div className="text-xs text-green-600">{rightMeta}</div> : null}
      </div>

      <div className="relative">
        <input
          type="text"
          className={`w-full rounded-md border-[0.5px] border-secondary-grey300 p-2 h-8 text-sm focus:ring-blue-300 focus:ring-1 pr-10 ${disabled ? "bg-gray-100 cursor-not-allowed" : ""} ${(isReadOnly || dropdownOpen) ? "cursor-pointer select-none" : ""}`}
          value={value || ""}
          onChange={(e) => {
            if (isReadOnly) return; // prevent typing when read-only
            onChange?.(e.target.value);
          }}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={isReadOnly}
          onMouseDown={(e) => {
            // Ensure opening happens on first click
            if (isReadOnly) e.preventDefault();
            handleOpen();
          }}
          onClick={handleOpen}
          onKeyDown={(e) => {
            if (!isReadOnly) return;
            // Allow navigation keys; block typing
            const allow = ["Tab", "Shift", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Escape", "Enter"]; 
            if (!allow.includes(e.key)) {
              e.preventDefault();
            }
          }}
          style={isReadOnly ? { caretColor: "transparent" } : undefined}
        />
        {RightIcon ? (
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            onClick={handleOpen}
            disabled={disabled}
            aria-label="open options"
          >
            <RightIcon size={16} />
          </button>
        ) : null}
      </div>

      {dropdown}
    </div>
  );
}
