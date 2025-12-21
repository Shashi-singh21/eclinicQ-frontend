import React, { useEffect, useRef } from "react";

/**
 * Dropdown — floating menu component.
 * Props:
 * - open: boolean (controls visibility)
 * - onClose: () => void (called when clicking outside or pressing ESC)
 * - items: Array<{ label: string, value: any }>
 * - onSelect: (item) => void
 * - anchorClassName: string (optional class for the container that hosts the dropdown)
 * - className: string (extra classes for panel)
 * - itemClassName: string (extra classes for items)
 */
export default function Dropdown({
  open,
  onClose,
  items = [],
  onSelect,
  anchorClassName = "",
  className = "",
  itemClassName = "",
  // value of currently selected item for highlighting
  selectedValue,
}) {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose?.(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const onBackdropClick = (e) => {
    // close when click is outside the panel
    if (panelRef.current && !panelRef.current.contains(e.target)) onClose?.();
  };

  if (!open) return null;

  return (
    <div className={`relative ${anchorClassName}`}>
      {/* global backdrop to catch clicks anywhere */}
      <div className="fixed inset-0 z-[5999]" onClick={onClose} />
      <div
        ref={panelRef}
        className={`absolute z-[6000]  w-[360px] rounded-md border border-gray-200 bg-white shadow-lg ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
  <ul className="max-h-[240px] overflow-auto py-1 scrollbar-hide">
          {items.map((it) => {
            const isSel = selectedValue !== undefined && it.value === selectedValue;
            return (
              <li key={String(it.value)}>
                <button
                  type="button"
                  className={`w-full text-left px-3 py-2 text-sm ${isSel ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"} ${itemClassName}`}
                  onClick={() => { onSelect?.(it); onClose?.(); }}
                >
                  {it.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
