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
  // Built-in dropdown support (optional)
  dropdownItems,
  onSelectItem,
  selectedValue,
  itemRenderer,
  closeOnReclick = true,
  disabled = false,
  className = "",
  // indicate dropdown is currently open for UX cursor
  dropdownOpen = false,
  // optional: request parent to close dropdown (outside click or toggle)
  onRequestClose,
  // optional: extra selectors considered as inside when detecting outside clicks
  outsideIgnoreSelectors = [
    ".shadcn-calendar-dropdown",
    ".input-meta-dropdown",
  ],
  // Optional: render custom content instead of the input element
  children,
  // Controls whether the input box should be shown. Defaults to true.
  showInput = true,
  // Immutable display mode: show a prefaded, non-editable UI with optional right badge icon
  immutable = false,
  ImmutableRightIcon,
  // Badges/chips display mode: pass an array to render inside a bordered container; optional removal handler
  badges = null,
  badgesRemovable = true,
  onBadgeRemove,
  badgesEmptyPlaceholder = "Select Language",
  badgesClassName = "",
}) {
  const rootRef = useRef(null);
  const isReadOnly = !!RightIcon && readonlyWhenIcon;

  const handleOpen = () => {
    if (disabled) return;
    // If already open and close-on-reclick is enabled, close instead
    if (dropdownOpen && closeOnReclick) {
      onRequestClose?.();
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
      const insideIgnored = outsideIgnoreSelectors?.some((sel) =>
        t.closest?.(sel)
      );
      if (!insideRoot && !insideIgnored) {
        onRequestClose?.();
      }
    };
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, [dropdownOpen, onRequestClose, outsideIgnoreSelectors]);

  return (
    <div
      ref={rootRef}
      className={`w-full flex flex-col gap-1 relative ${className}`}
    >
      <div className="flex items-center justify-between ">
        <label className={`text-sm ${immutable ? "text-secondary-grey200" : "text-secondary-grey300"} flex items-center gap-1`}>
          {label}
          {requiredDot && (
            <div className="bg-red-500 w-1 h-1 rounded-full"></div>
          )}
        </label>
        {rightMeta ? (
          <div className="text-xs text-green-600">{rightMeta}</div>
        ) : null}
      </div>

      <div className="relative">
        {/* Immutable display mode (non-editable, prefaded, with optional right badge) */}
        {immutable ? (
          <div
            className={`w-full rounded-md border-[0.5px] border-secondary-grey150 h-8 text-sm text-secondary-grey400 bg-secondary-grey50 flex items-center justify-between px-2 select-none`}
            aria-readonly="true"
          >
            <span className="truncate">{value || ""}</span>
            {ImmutableRightIcon ? (
              <span className="ml-2 inline-flex items-center justify-center h-6 w-6 rounded-md border border-green-400 text-green-500">
                <ImmutableRightIcon className="h-4 w-4" />
              </span>
            ) : null}
          </div>
        ) : Array.isArray(badges) ? (
          <div className={`w-full rounded-md border-[0.5px] border-secondary-grey200 p-1 min-h-8 text-sm text-secondary-grey400 flex items-center flex-wrap gap-2 ${badgesClassName}`}>
            {badges.length > 0 ? (
              badges.map((b, idx) => (
                <span
                  key={`${b}-${idx}`}
          className="inline-flex items-center h-5 gap-2 px-2 rounded-[6px] bg-secondary-grey50 text-secondary-grey400"
                >
          <span className="text-[15px] leading-[1] inline-flex items-center">{b}</span>
                  {badgesRemovable ? (
                    <button
                      type="button"
                      aria-label={`remove ${b}`}
            className="text-secondary-grey300 hover:text-gray-700  mb-[0.5] inline-flex items-center justify-center"
                      onClick={() => onBadgeRemove?.(b)}
                    >
                      ×
                    </button>
                  ) : null}
                </span>
              ))
            ) : (
              <span className="text-secondary-grey100 px-1">{badgesEmptyPlaceholder}</span>
            )}
          </div>
        ) : showInput ? (
          <>
            <input
              type="text"
              className={`w-full rounded-md border-[0.5px] border-secondary-grey200 p-2 h-8 text-sm text-secondary-grey400 focus:outline-none focus:ring-0 focus:border-blue-primary150 focus:border-[2px] placeholder:text-secondary-grey100   ${
                disabled ? "bg-gray-100 cursor-not-allowed" : ""
              } ${isReadOnly || dropdownOpen ? "cursor-pointer select-none" : ""}`}
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
              onKeyDown={(e) => {
                if (!isReadOnly) return;
                // Allow navigation keys; block typing
                const allow = [
                  "Tab",
                  "Shift",
                  "ArrowLeft",
                  "ArrowRight",
                  "ArrowUp",
                  "ArrowDown",
                  "Escape",
                  "Enter",
                ];
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
          </>
        ) : null}

        {/* Custom content slot replacing the input box when showInput=false */}
        {!showInput && children}
      </div>

      {/* External dropdown slot */}
      {dropdown}

      {/* Built-in dropdown menu */}
      {dropdownOpen &&
        Array.isArray(dropdownItems) &&
        dropdownItems.length > 0 && (
          <div className="input-meta-dropdown absolute left-0 top-full mt-1 z-[10000] bg-white border border-gray-200 rounded-xl shadow-2xl w-full max-h-60 overflow-auto">
            <ul className="py-1">
              {dropdownItems.map((it, idx) => {
                const isSelected = selectedValue === (it.value ?? it.label);
                return (
                  <li key={it.value ?? idx}>
                    <button
                      type="button"
                      className={`w-full text-left px-3 py-2 text-sm text-secondary-grey400 hover:bg-gray-50 ${
                        isSelected ? "bg-gray-100" : ""
                      }`}
                      onClick={() => {
                        onSelectItem?.(it);
                        onRequestClose?.();
                      }}
                    >
                      {itemRenderer
                        ? itemRenderer(it, { isSelected })
                        : it.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
    </div>
  );
}
