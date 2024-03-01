import React, { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import RadioButton2 from '../components/form/RadioButton2';
import { YearStages } from '../constants/year';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
interface YearProps {
}

const Year: React.FC<YearProps> = ({ }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const changeValue = queryParams.get('change');
  const { id } = useParams();
  const studentId = id ? +id : 0;
  const navigate = useNavigate();
  const { addYear, addPackage } = useActions();
  const student = useTypedSelector((state: any) =>
    state.student.students.find((student: any) => student.id === studentId)
  );
  const [option, setOption] = useState<string | null>(student?.year?.title);
  const [optionSelected, setOptionSelected] = useState<string | null>(student?.year?.data);
  const [error, setError] = useState<string | null>(null);
  const handleOption = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setOptionSelected(null);

    setOption(event.target.value);
  };

  const handleYear = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setOptionSelected(event.target.value);
  };

  const handlePrevious: React.MouseEventHandler<HTMLDivElement> = async (event) => {
    event.preventDefault();
    navigate(-1);
  };

  const handleNext: React.MouseEventHandler<HTMLDivElement> = async (event) => {
    event.preventDefault();
    if (option !== null && optionSelected !== null) {
      const json = {
        id: studentId,
        year: {
          title: option,
          data: optionSelected
        }
      }
      addYear(json);
      addPackage({
        id: studentId,
        package: {
          title: '',
          description: '',
          price: '',
          addition: '',
          annual: 0,
          half_term: 0,
          subjects: [],
          optional_subjects: [],
          science_subjects: [],
          humanities_subjects: [],
          other_subjects: [],
          level_subjects: []
        }
      });
      if (changeValue) {
        navigate(`/student/${studentId}/package/?change=true`);
      } else {
        navigate(`/student/${studentId}/package`);
      }
    } else {
      setError('Please choose')
    }
  }

  return (
    <div className='py-2'>
      <h2 className=' flex justify-center items-center text-textPrimary text-[28px] text-center font-[100] font-roboto pb-5'>
        Which year group will the student be joining?
      </h2>
      <div className='flex justify-center items-center'>
        <div className='px-2 py-5 space-y-6 max-w-[1220px] w-[1220px] min-w-0 flex flex-col'>
          <div className=' border-b border-buttonGray pb-6'>
            <div className=' flex items-center pb-3 font-bold text-xl text-textPrimary pl-5'>Key Stages</div>
            {
              error && (
                <div className='text-red-600 text-xl mr-10'>
                  {error}
                </div>

              )
            }
            <div className='flex flex-wrap justify-center items-center py-3'>
              {
                YearStages.map((year, index) => (
                  <RadioButton2 key={index} label={year.name} value={year.name} checked={option === year.name} onChange={handleOption} />
                ))
              }
            </div>
          </div>
          <div className={`pb-6`}>
            <div className=' flex items-center pb-3 font-bold text-xl text-textPrimary pr-3'>{option}</div>
            <div className='flex flex-wrap justify-center items-center p-3'>
              {
                YearStages.map((year, index) => (

                  option === year.name && (
                    year.options.map((option, index) => (
                      <RadioButton2 key={index} label={option.title} value={option.title} checked={option.title === optionSelected} onChange={handleYear} />
                    ))
                  )
                ))
              }
            </div>
          </div>
          <div className='flex max-w-[500px]'>
            <div onClick={handlePrevious} className=' bg-lightGray group hover:bg-buttonGray mr-3 w-[400px] max-[400px] flex justify-center items-center h-14 rounded cursor-pointer'>
              <div className=' text-textPrimary group-hover:text-white font-bold'>Previous</div>
            </div>
            <div onClick={handleNext} className=' bg-primary w-[500px] max-[500px] flex justify-center items-center h-14 rounded cursor-pointer'>
              <div className='text-white font-bold'>Continue</div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Year