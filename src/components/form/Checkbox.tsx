import React, { useState } from 'react';

interface CheckboxProps {
  label: string;
  id: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, id, checked, onChange }) => {

  return (
    <label htmlFor={id} className={`cursor-pointer min-w-[150px] m-3 border-2 flex flex-col p-4 justify-center items-center ${checked ? 'border-primary' : 'border-none shadow-md'} rounded-md`}>
      <input
        id={id}
        type="checkbox"
        className="hidden"
        checked={checked}
        onChange={e => onChange?.(e.target.checked)}
      />
      <span className={`w-9 h-9 flex justify-center items-center rounded-full border-2 transition duration-150 ease-in-out ${checked ? 'bg-primary border-primary' : 'border-lightGray2 bg-white'}`}>
        {checked && (
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </span>
      <div className='pt-3 font-bold text-textPrimary text-[18px] text-center'>{label}</div>
    </label>
  );
};

export default Checkbox;
