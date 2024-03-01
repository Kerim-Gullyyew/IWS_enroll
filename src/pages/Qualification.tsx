import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import RadioButton from '../components/form/RadioButton';

interface QualificationProps {

}

const Qualification: React.FC<QualificationProps> = ({ }) => {

  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSelectedValue(event.target.value);
  };

  const handleNext: React.MouseEventHandler<HTMLDivElement> = async (event) => {
    event.preventDefault();
    navigate('/subjectoption');
  }

  return (
    <div className='py-2'>
      <h2 className=' flex justify-center items-center text-textPrimary text-[28px] text-center font-semibold font-roboto'>
        Thanks sdf, let’s start with the basics.
      </h2>

      <h3 className=' text-center pt-14 pb-3 text-[26px] font-[300]'>Confirm your timetable</h3>
      <div className='flex flex-col justify-center items-center'>

        <div className='px-2 py-5 flex flex-wrap justify-center items-center'>

          <RadioButton label1={'A Level - Core Package'} value={'ukt'} checked={selectedValue === 'ukt'} onChange={handleRadioChange} />

          <RadioButton label1={'IB Diploma'} value={'met'} checked={selectedValue === 'met'} onChange={handleRadioChange} />

        </div>
          <div className=' text-center text-textPrimary py-4'>Please note the International Baccalaureate (IB) is only available to students who select the UK timetable</div>


          <div onClick={handleNext} className=' bg-primary w-[500px] max-[500px] flex justify-center items-center h-14 rounded cursor-pointer'>
            <div className='text-white font-bold'>Continue</div>
          </div>
      </div>

    </div>
  )
}

export default Qualification