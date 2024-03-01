import React from 'react'
import { useLocation } from 'react-router-dom';

interface SuccessProps {
  
}

const Success: React.FC<SuccessProps> = ({}) => {
  const location = useLocation();
  const { mobile, email, amount } = location.state || { mobile: '', email: '', amount: 0 };
  return (
    <div className="fixed inset-0 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-[700px] w-[700px] min-w-[300px]">
      <div className="flex flex-col items-center mb-4">
        <h2 className="text-2xl font-bold text-green-500 mb-2">Payment successful!</h2>
        <div className="text-green-500">
          {/* Checkmark icon */}
          <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      <div className="text-sm">
        <div className="flex justify-between py-3">
          <span>Payment type</span>
          <span>Card</span>
        </div>
        <div className="flex justify-between py-3">
          <span>Mobile</span>
          <span>{mobile}</span>
        </div>
        <div className="flex justify-between py-3">
          <span>Email</span>
          <span>{email}</span>
        </div>
        <div className="flex justify-between py-3">
          <span>Amount paid</span>
          <span>£{amount}.00</span>
        </div>
       
      </div>

      {/* <div className="flex space-x-4 justify-center mt-6">
        <button onClick={() => console.log('Printing receipt...')} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Print</button>
        <button onClick={onClose} className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">Close</button>
      </div> */}
    </div>
  </div>
  // <div className='flex justify-center items-center pt-10'>
  //   <div className='max-w-[700px] w-[700px] min-[300px] shadow-lg h-48'>
        
  //   </div>
  // </div>
  )
}

export default Success