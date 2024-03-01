import React from 'react'

interface BaseInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
  name: string;
  error: string | undefined;
  type: 'text' | 'email';
}

const BaseInput: React.FC<BaseInputProps> = ({ value, name, onChange, placeholder, error, label }) => {
  return (
    <>
      <span className=' text-textPrimary text-[18px] font-[100]'>{label}</span>
      <input value={value} onChange={onChange} aria-required="true" aria-invalid="false" name={name} placeholder={placeholder} className=' w-full h-12 border-2 border-inputLigthGray px-5 py-3 border-darkGray rounded text-lg leading-tight focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent' type="text" />
      {error !== undefined && (
        <p className='text-red-600'>{error}</p>
      )}
    </>
  )
}

export default BaseInput