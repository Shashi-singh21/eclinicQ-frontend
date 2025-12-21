import React, { useEffect, useRef } from "react";

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
  // indicate dropdown is currently open for UX cursor
  dropdownOpen = false,
  // optional: request parent to close dropdown (outside click or toggle)
  onRequestClose,
  // optional: extra selectors considered as inside when detecting outside clicks
  outsideIgnoreSelectors = [".shadcn-calendar-dropdown", ".input-meta-dropdown"],
}) {
  const rootRef = useRef(null);
  const isReadOnly = !!RightIcon && readonlyWhenIcon;

  const handleOpen = () => {
    if (disabled) return;
    // If already open and a close handler exists, close on re-click
    if (dropdownOpen && onRequestClose) {
      onRequestClose();
      return;
    }
    if (onFieldOpen) onFieldOpen();
    else if (onIconClick) onIconClick();
  };

  // Close when clicking outside input + provided dropdown
  useEffect(() => {
    if (!dropdownOpen) return;
    const onDocMouseDown = (e) => {
      const t = e.target;
      if (!rootRef.current) return;
      const insideRoot = rootRef.current.contains(t);
      const insideIgnored = outsideIgnoreSelectors?.some((sel) => t.closest?.(sel));
      if (!insideRoot && !insideIgnored) {
        onRequestClose?.();
      }
    };
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, [dropdownOpen, onRequestClose, outsideIgnoreSelectors]);

  return (
    <div ref={rootRef} className={`w-full flex flex-col gap-1 ${className}`}>
      <div className="flex items-center justify-between ">
        <label className="text-sm text-secondary-grey300 flex items-center gap-1">
          {label}
          {requiredDot && <div className="bg-red-500 w-1 h-1 rounded-full"></div>}
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
            className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
            onClick={handleOpen}
            disabled={disabled}
            aria-label="open options"
          >
            <RightIcon className="h-3 w-3" />
          </button>
        ) : null}
      </div>

      {dropdown}
    </div>
  );
}
