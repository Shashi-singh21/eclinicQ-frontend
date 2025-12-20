import React from 'react'
import { Calendar } from 'lucide-react'
import {scheduleCalender} from '../../public/index.js'

const OverviewStatCard = ({
  title,
  value,
  subtitle = 'Patients',
  icon,
  className = '',
}) => {
  const RightIcon = icon ?? <img src={scheduleCalender} className="w-12 h-12"  />

  const formattedValue =
    typeof value === 'number' ? new Intl.NumberFormat().format(value) : value

  return (
    <div className={`bg-white rounded-lg shadow-sm  p-4 flex items-center justify-between ${className}`}>
      <div className='w-full '>
        <div className="text-sm text-gray-600">{title}</div>
        <div className='flex items-center gap-1'>
            <div className="text-2xl font-semibold text-gray-900">{formattedValue}</div>
            {subtitle && <div className="mt-2 text-xs text-gray-500">{subtitle}</div>}
        </div>
      </div>
      <div className="w-16 h-16 rounded-full flex items-center justify-center text-gray-400">
        {RightIcon}
      </div>
    </div>
  )
}

export default OverviewStatCard
