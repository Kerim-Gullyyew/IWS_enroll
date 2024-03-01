import React from 'react'
import { useNavigate } from 'react-router-dom';
import Checkbox from '../components/form/Checkbox';

interface SubjectOptionProps {

}

const SubjectOption: React.FC<SubjectOptionProps> = ({ }) => {
  const navigate = useNavigate();


  const handleCheckboxChange = (checked: boolean) => {
    console.log('Checkbox is now:', checked);
  };
  const handleNext: React.MouseEventHandler<HTMLDivElement> = async (event) => {
    event.preventDefault();
    navigate('/qualification');
  }
  return (
    <div className='py-2'>
      <h2 className=' flex justify-center items-center text-textPrimary text-[28px] text-center font-[100] font-roboto pb-5'>
        Which year group will fdsf be joining?
      </h2>
      <h2 className=' flex justify-center items-center text-textPrimary text-[28px] text-center font-[100] font-roboto pb-5'>
        You can currently reserve your place only for Sixth Form A Level and IBDP years for September 2024.
      </h2>
      <div className='flex justify-center items-center'>
        <div className='px-2 py-5 space-y-6 max-w-[768px] w-[768px] min-w-0 flex flex-col'>

          <div className=' border-b border-buttonGray pb-6'>
            <div className=' flex items-center pb-3'><div className=' font-bold text-lg text-textPrimary pr-3'>Primary</div><div className='font-[100] text-lg text-textPrimary pr-3'>7-11 years old  |  Key Stage 2</div></div>

            <div className='grid grid-cols-2 sm:grid-cols-3'>
              <Checkbox
                label="Computer Game Development"
                id="termsCheckbox"
                onChange={handleCheckboxChange}
                checked={true}
              />

              <Checkbox
                label="Computer Game Development"
                id="termsCheckbox"
                onChange={handleCheckboxChange}
                checked={false}
              />

              <Checkbox
                label="Computer Game Development"
                id="termsCheckbox"
                onChange={handleCheckboxChange}
                checked={false}
              />
               <Checkbox
                label="Computer Game Development"
                id="termsCheckbox"
                onChange={handleCheckboxChange}
                checked={false}
              />


            </div>

          </div>



          <div onClick={handleNext} className=' bg-primary w-[500px] max-[500px] flex justify-center items-center h-14 rounded cursor-pointer'>
            <div className='text-white font-bold'>Continue</div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default SubjectOption