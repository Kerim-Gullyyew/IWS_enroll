import React, { useState } from 'react'
import { Outlet } from "react-router-dom";
import Logo from '../../images/logo1923.png';
// import { Line, Circle } from 'rc-progress';
// import logo from "../img/logo.png";
interface DashLayoutProps {

}

const DashLayout: React.FC<DashLayoutProps> = ({ }) => {
  const [percentage, setPercentage] = useState<number>(15);
  return (
    <>
      <div className="flex flex-col px-2 py-3 h-screen bg-background justify-between">
        {/* <div className='flex flex-col md:flex-row md:justify-center md:items-center'> */}
          <img src={Logo} alt="logo" className=' w-[68px]' />
          {/* <div className='flex flex-1 flex-col md:pt-5 justify-center items-center'>
            <p className=' text-textLight font-poppins py-2 text-center'>Completed: {percentage}%</p>
            <div className=''>
              <Line percent={percentage} className={'w-[250px]'} strokeWidth={2} strokeColor="#1e6cbe" />
            </div>
          </div> */}
        {/* </div> */}
        <div className='flex-1 overflow-auto rounded-lg bg-background'>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default DashLayout