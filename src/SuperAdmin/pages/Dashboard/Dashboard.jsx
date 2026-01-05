import React, { useState } from 'react'
import Overview_cards from '../../../components/Dashboard/Overview_cards'
import AppointmentsChart from '../../../components/Dashboard/AppointmentsChart'
import Button from '../../../components/Button'

const Dashboard = () => {
  const [activeRange, setActiveRange] = useState('Yearly')
  const ranges = ['Daily', 'Weekly', 'Monthly', 'Yearly']

  return (
    <>
      <div className='p-5 flex flex-col gap-6 bg-white'>
        {/* Heading and search live in navbar per mock; no extra top tabs here */}

        {/* Platform Overview using Overview_cards */}
        <div>
          <div className='text-[20px] font-medium text-secondary-grey400 mb-3'>Platform Overview</div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            <Overview_cards title='Total Active Doctors' value={120043} percent={12} periodText='from last year' variant='profit' />
            <Overview_cards title='Total Clinics' value={20043} percent={12} periodText='from last year' variant='profit' />
            <Overview_cards title='Total Active Hospitals' value={50000} percent={2} periodText='from last year' variant='profit' />
            <Overview_cards title='Total Enrolled Patients' value={'1.3M'} percent={8} periodText='from last year' variant='profit' />
          </div>
          {/* Controls row: tabs on the left, month/year dropdowns on the right */}
          <div className='mt-6 flex items-center justify-between'>
            <div className='flex items-center gap-2 p-[2px] rounded-sm bg-blue-primary50  h-8 overflow-hidden w-fit'>
              {ranges.map((range, idx) => {
                const isActive = activeRange === range

                return (
                  <React.Fragment key={range}>
                    <button
                      onClick={() => setActiveRange(range)}
                      className={`
                        px-[6px] h-7 py-1 text-sm rounded-sm transition
                        ${isActive
                          ? 'bg-blue-primary250 text-white'
                          : 'text-[#6B7280] hover:bg-gray-100'}
                      `}
                    >
                      {range}
                    </button>


                  </React.Fragment>
                )
              })}
            </div>


            <div className='flex items-center gap-2'>
              {/* All Months dropdown pill */}
              <Button
                variant="secondary"
                dropdown={true}
                className="border-[0.5px] border-secondary-grey200 bg-white text-secondary-grey400 text-sm font-medium"
              >
                All Months
              </Button>

              {/* Year dropdown pill */}

              {/* Year dropdown pill */}
              <Button
                variant="secondary"
                dropdown={true}
                className="border border-secondary-grey200 bg-white text-sm text-secondary-grey400 font-medium"
              >
                2025
              </Button>
            </div>
          </div>
        </div>

        {/* Appointment Overview metrics — full grid per mock */}
        <div className='flex flex-col gap-3'>
          <div className='text-md font-medium text-secondary-grey400'>Appointment Overview</div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            <Overview_cards title='Avg. Appointment Booked' value={103} percent={12} periodText='from last Year' variant='profit' />
            <Overview_cards title='Avg. Engage Patient' value={80} percent={8} periodText='from last Year' variant='loss' />
            <Overview_cards title='Avg. Patient Serve' value={'100 /Doctor'} percent={12} periodText='from last Year' variant='profit' />
            <Overview_cards title='Avg. time Spent/Doctor' value={'06:05 min/Patient'} percent={5} periodText='from last Year' variant='profit' />
            <Overview_cards title='Avg. Waiting Time' value={'12:30 min / Patient'} percent={12} periodText='from last Year' variant='profit' />
            <Overview_cards title='Avg. Appt Cancelled by Patient' value={5} percent={12} periodText='from last Year' variant='loss' />
            <Overview_cards title='Avg. Appt Cancelled by Doctor' value={5} percent={12} periodText='from last Year' variant='loss' />
          </div>
        </div>

        {/* Analytics Overview */}
        <div className='flex flex-col gap-3'>
          <div className='text-sm font-medium text-[#424242]'>Analytics Overview</div>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
            <div className='bg-white rounded-lg border border-gray-200 p-3'>
              <div className='text-sm text-gray-600 mb-2'>Patients Served</div>
              {/* placeholder chart */}
              <AppointmentsChart />
            </div>
            <div className='bg-white rounded-lg border border-gray-200 p-3'>
              <div className='text-sm text-gray-600 mb-2'>Appointment Booking Through</div>
              {/* placeholder chart */}
              <AppointmentsChart />
            </div>
          </div>
        </div>

      </div>
    </>

  )
}

export default Dashboard

