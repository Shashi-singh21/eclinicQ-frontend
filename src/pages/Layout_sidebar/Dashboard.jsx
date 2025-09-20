import React from 'react'
import Overview_cards from '../../components/Dashboard/Overview_cards'
import AppointmentsChart from '../../components/Dashboard/AppointmentsChart'
import Tire_cards from '../../components/Dashboard/Tire_cards'


const Dashboard = () => {
  return (
    <>
    <div className='p-5 flex flex-col gap-6'>

  <div className='gap-3 flex flex-col'>
          <div>
            <span className='text-xl font-medium text-[#424242]'>Overview</span>
          </div>

          <div className='flex flex-wrap gap-4 w-full'>
            <Overview_cards
              title="Total Patients"
              value={12043}
              percent={12}
              periodText="from last month"
              variant="profit"
              className="flex-1 min-w-[240px]"
            />

            <Overview_cards
              title="Completed Appointments"
              value={600}
              percent={8}
              periodText="from last week"
              variant="loss"
              className="flex-1 min-w-[240px]"
            />

            <Overview_cards
              title="Active Doctors"
              value={1200}
              percent={5}
              periodText="from last month"
              variant="profit"
              className="flex-1 min-w-[240px]"
            />

            <Overview_cards
              title="Cancellations"
              value={42}
              percent={3}
              periodText="from last week"
              variant="loss"
              className="flex-1 min-w-[240px]"
            />

            <Overview_cards
              title="New Registrations"
              value={320}
              percent={9}
              periodText="from last month"
              variant="profit"
              className="flex-1 min-w-[240px]"
            />
          </div>
      </div>
      

      <div className='flex flex-col gap-3'>
      <div>
        <span className='text-xl font-medium text-[#424242]'>Appointments Overview</span>
      </div>

      <div className='' >
        <AppointmentsChart className='' />
      </div>
      </div>


      <div className='flex flex-col gap-3'>
      <div>
        <span className='text-xl font-medium text-[#424242]'>Tire Usages</span>
      </div>

      <div className="flex justify-between w-full">
        <Tire_cards className="" />
        <Tire_cards className="" />
        <Tire_cards className="" />
        <Tire_cards className="" />
        <Tire_cards className="" />
      </div>

      </div>

 
      
    </div>
    </>
    
  )
}

export default Dashboard

