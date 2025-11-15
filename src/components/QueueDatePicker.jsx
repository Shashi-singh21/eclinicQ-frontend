import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Reusable popover calendar for queue headers (doctor & front desk)
// Props: date (Date), onChange(newDate:Date)
export default function QueueDatePicker({ date, onChange }) {
  const [showCal, setShowCal] = useState(false);
  const [viewYear, setViewYear] = useState(date.getFullYear());
  const [viewMonth, setViewMonth] = useState(date.getMonth()); // 0-11
  const anchorRef = useRef(null);
  const popRef = useRef(null);

  // Close on outside click / esc
  useEffect(() => {
    const onClick = (e) => {
      if (anchorRef.current && anchorRef.current.contains(e.target)) return;
      if (popRef.current && popRef.current.contains(e.target)) return;
      setShowCal(false);
    };
    const onKey = (e) => { if (e.key === 'Escape') setShowCal(false); };
    window.addEventListener('mousedown', onClick);
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('mousedown', onClick); window.removeEventListener('keydown', onKey); };
  }, []);

  // Build days matrix
  const buildDays = () => {
    const first = new Date(viewYear, viewMonth, 1);
    const startDow = first.getDay(); // 0 Sun
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < startDow; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    // pad to full weeks
    while (cells.length % 7 !== 0) cells.push(null);
    const weeks = [];
    for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
    return weeks;
  };
  const weeks = buildDays();

  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const currentKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

  const apply = (d) => {
    const newDate = new Date(viewYear, viewMonth, d);
    onChange?.(newDate);
    setShowCal(false);
  };

  const goToday = () => { const t = new Date(); setViewYear(t.getFullYear()); setViewMonth(t.getMonth()); onChange?.(t); };
  const goPrevDay = () => { const nd = new Date(date.getTime() - 24*3600*1000); onChange?.(nd); setViewYear(nd.getFullYear()); setViewMonth(nd.getMonth()); };
  const goNextDay = () => { const nd = new Date(date.getTime() + 24*3600*1000); onChange?.(nd); setViewYear(nd.getFullYear()); setViewMonth(nd.getMonth()); };

  // Compute portal container lazily
  const [portalEl, setPortalEl] = useState(null);
  useEffect(() => {
    let el = document.getElementById('queue-date-picker-root');
    if (!el) {
      el = document.createElement('div');
      el.id = 'queue-date-picker-root';
      document.body.appendChild(el);
    }
    setPortalEl(el);
  }, []);

  // Position state for popover
  const [pos, setPos] = useState({ top: 0, left: 0 });
  useEffect(() => {
    if (showCal && anchorRef.current) {
      const rect = anchorRef.current.getBoundingClientRect();
      const width = 260; // match w-[260px]
      const top = rect.bottom + window.scrollY + 6; // gap
      let left = rect.left + window.scrollX + rect.width / 2 - width / 2;
      // Keep within viewport margins
      const margin = 8;
      if (left < margin) left = margin;
      const maxLeft = window.scrollX + window.innerWidth - width - margin;
      if (left > maxLeft) left = maxLeft;
      setPos({ top, left });
    }
  }, [showCal, date, viewMonth, viewYear]);

  return (
    <div className="flex items-center space-x-4" ref={anchorRef}>
      <ChevronLeft className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600" onClick={goPrevDay} />
      <div className="flex items-center space-x-2">
        <button className="text-blue-600 font-medium" onClick={goToday}>Today</button>
        <button
          type="button"
          onClick={() => setShowCal(v => !v)}
          className="text-gray-700 font-medium hover:text-gray-900"
        >
          {date.toDateString().replace(/^[A-Za-z]{3} /,'')}
        </button>
      </div>
      <ChevronRight className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600" onClick={goNextDay} />
      {showCal && portalEl && createPortal(
        <div ref={popRef} style={{ top: pos.top, left: pos.left, width: 260 }} className="absolute bg-white border border-gray-200 rounded-2xl shadow-xl z-[999] p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <select className="text-sm font-medium bg-gray-50 border border-gray-200 rounded-md px-2 py-1" value={viewMonth} onChange={e=> setViewMonth(parseInt(e.target.value))}>
                {months.map((m,i)=> <option key={m} value={i}>{m}</option>)}
              </select>
              <select className="text-sm font-medium bg-gray-50 border border-gray-200 rounded-md px-2 py-1" value={viewYear} onChange={e=> setViewYear(parseInt(e.target.value))}>
                {Array.from({length:7},(_,i)=> viewYear-3+i).map(y=> <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
            <button onClick={goToday} className="text-xs text-blue-600 font-medium hover:text-blue-700">Today</button>
          </div>
          {/* Weekday labels */}
          <div className="grid grid-cols-7 text-[11px] text-gray-500 mb-2">
            {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d=> <div key={d} className="text-center font-medium">{d}</div>)}
          </div>
          {/* Weeks */}
          <div className="space-y-1">
            {weeks.map((w,wi)=> (
              <div key={wi} className="grid grid-cols-7 text-xs">
                {w.map((d,i)=> d ? (
                  <button
                    key={i}
                    onClick={()=> apply(d)}
                    className={`h-8 w-8 mx-auto rounded-full flex items-center justify-center transition-colors ${currentKey===`${viewYear}-${viewMonth}-${d}` ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-700 hover:bg-blue-50'}`}
                  >{d}</button>
                ) : <div key={i} className="h-8 w-8" />)}
              </div>
            ))}
          </div>
        </div>, portalEl
      )}
    </div>
  );
}
