import React, { useState } from 'react'

interface RadioButton2Props {
  label: string;
  value?: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioButton2: React.FC<RadioButton2Props> = ({ label, disabled, value, checked, onChange }) => {

  if (!disabled) {
    return (
      <label className={`border-2 ${checked ? 'border-primary' : 'border-none shadow-md'} rounded-lg px-4 justify-center items-center flex flex-col mx-2 my-2 cursor-pointer min-w-[255px] max-w-[255px] py-14`}>
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
          <span className={`w-8 h-8 mr-3 flex justify-center items-center rounded-full border-2 transition duration-150 ease-in-out ${checked ? 'bg-primary border-primary' : 'border-lightGray2 bg-white'}`}>
            {checked && (
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </span>
        </div>
        <div className='font-[700] text-textSecondary pt-3 text-center'>{label}</div>
      </label>
    )
  } else {
    return (
      <label className={`border-2 rounded-lg py-3 justify-center items-center flex flex-col mx-2 my-2 px-4 cursor-not-allowed bg-lightGray border-lightGray2 borrder-2`}>
        <div className=''>
          <input
            id="radio"
            name='options'
            type="radio"
            className="hidden"
          />
          <span className={`w-8 h-8 mr-3 flex justify-center items-center rounded-full border-2 transition duration-150 ease-in-out border-lightGray2 bg-white`}>
          </span>
        </div>
        <div className='text-lg font-[700] text-textSecondary pt-3 text-center'>{label}</div>
      </label>
    )
  }
}

export default RadioButton2