import React, { useState } from 'react'

interface RadioButtonProps {
  label1: string;
  label2?: string;
  label3?: string;
  value: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({ label1, label2, label3, value, checked, onChange }) => {

  return (
    <label className={`w-[340px] min-w-[320px] h-[200px] min-h-[190px] ${checked ? 'border-2 border-primary bg-lightGreen' : 'border-none shadow-lg'}  rounded-lg flex flex-col justify-center items-center cursor-pointer px-6 py-3 bg-white m-3`}>
      <div className=''>
        <input
          id="radio"
          name='options'
          value={value}
          type="radio"
          className="hidden"
          checked={checked}
          onChange={onChange}
        />
        <span className={`w-9 h-9 mr-3 flex justify-center items-center rounded-full border-2 transition duration-150 ease-in-out ${checked ? 'bg-primary border-primary' : 'border-lightGray2 bg-white'}`}>
          {checked && (
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </span>
      </div>

      <div className='text-lg font-[400] text-textSecondary py-4 text-center'>{label1}</div>
      <div className='font-[300] text-textSecondary text-center'>{label2}</div>
      <div className='font-[300] text-textSecondary text-center'>{label3}</div>


    </label>
  )
}

export default RadioButton