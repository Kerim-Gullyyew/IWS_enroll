import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPerson, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';


interface CountProps {

}

const Count: React.FC<CountProps> = () => {
  const navigate = useNavigate();
  const { addCount, clearStudent } = useActions();
  const completed = useTypedSelector((state: any) => state.parent2.completed)
  useEffect(() => {
    if (completed === false) {
      navigate('/parent');
    }
  }, [completed, navigate])
  const [count, setCount] = useState<number>(useTypedSelector((state: any) => state.count.count));
  const [min, setMin] = useState<boolean>(false);
  const [max, setMax] = useState<boolean>(false);
  console.log(count);

  useEffect(() => {
    if (count === null) {
      setCount(1);
    }
    if (count === 10) {
      setMax(true)
    } else {
      setMax(false)
    }
    if (count === 1) {
      setMin(true)
    } else {
      setMin(false)
    }
  }, [count])

  const handleIncrement: React.MouseEventHandler<HTMLDivElement> = async (event) => {
    event.preventDefault();
    if (count === 10) {
      setMax(true)
    } else {
      setCount(count + 1);
    }
  }

  const handleDecrement: React.MouseEventHandler<HTMLDivElement> = async (event) => {
    event.preventDefault();
    if (count === 1) {
      setMin(true)
    } else {
      setCount(count - 1);
    }
  }

  const handlePrevious: React.MouseEventHandler<HTMLDivElement> = async (event) => {
    event.preventDefault();
    navigate(-1);

  };

  const handleNext: React.MouseEventHandler<HTMLDivElement> = async (event) => {
    event.preventDefault();
    if (count >= 1 && count <= 10) {
      const json = {
        count: count
      }
      addCount(json);
      clearStudent();
      navigate('/student/1');
    }
  };

  return (
    <div className='py-2'>
      <h2 className=' flex justify-center items-center text-textPrimary text-[28px] text-center font-semibold font-roboto'>
        How many students would you like to enrol?
      </h2>

      <div className='flex justify-center items-center'>

        <div className='px-2 py-5 space-y-6 max-w-[500px] min-w-[500px] w-[500px] flex flex-col justify-center items-center'>
          <div className='flex justify-center items-center py-6'>
            {
              count === 1 && (
                <FontAwesomeIcon size='7x' color='#2192FF' icon={faPerson} />
              )
            }
            {
              count === 2 && (
                <>
                  <FontAwesomeIcon size='7x' color='#2192FF' icon={faPerson} />
                  <FontAwesomeIcon size='7x' color='#2192FF' icon={faPerson} />
                </>
              )
            }
            {
              count === 3 && (
                <>
                  <FontAwesomeIcon size='7x' color='#2192FF' icon={faPerson} />
                  <FontAwesomeIcon size='7x' color='#2192FF' icon={faPerson} />
                  <FontAwesomeIcon size='7x' color='#2192FF' icon={faPerson} />
                </>
              )
            }
            {
              count > 3 && (
                <>
                  <FontAwesomeIcon size='7x' color='#2192FF' icon={faPerson} />
                  <FontAwesomeIcon size='7x' color='#2192FF' icon={faPerson} />
                  <FontAwesomeIcon size='7x' color='#2192FF' icon={faPerson} />
                  <FontAwesomeIcon size='2x' color='#2192FF' icon={faPlus} />
                </>
              )
            }

          </div>

          <div className='flex justify-between items-center pb-10'>
            <div onClick={handleDecrement} className={`w-[50px] min-w-[50px] h-[50px] min-h-[50px] rounded-lg ${min ? 'bg-lightBlue' : 'bg-primary'} flex justify-center items-center`}>
              <FontAwesomeIcon size='sm' color='white' icon={faMinus} />
            </div>
            <div className=' px-[48px] text-2xl'>{count}</div>
            <div onClick={handleIncrement} className={`w-[50px] min-w-[50px] h-[50px] min-h-[50px] rounded-lg ${max ? 'bg-lightBlue' : 'bg-primary'} flex justify-center items-center`}>
              <FontAwesomeIcon size='sm' color='white' icon={faPlus} />
            </div>
          </div>


          <div className='flex max-w-[500px] w-[350px]'>
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

export default Count