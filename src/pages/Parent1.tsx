import React, { useRef, useState } from 'react';
import { Family, Title } from '../constants/title';
import useOutsideClick from '../utils/useOutsideClick';
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import BaseInput from '../components/form/BaseInput';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useLocation } from 'react-router-dom';
import * as Yup from 'yup';

interface Parent1Props {

}

interface ValidationErrors {
  title?: string,
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  family?: string
}

const Parent1: React.FC<Parent1Props> = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const changeValue = queryParams.get('change');

  const navigate = useNavigate();
  const { addParent1 } = useActions();

  const [isTitleOpen, setIsTitleOpen] = useState<boolean>(false);
  const [isFamilyOpen, setIsFamilyOpen] = useState<boolean>(false);
  const dropdowntitleRef = useRef<HTMLDivElement>(null);
  const dropdownfamilyRef = useRef<HTMLDivElement>(null);


  const [checked, setChecked] = useState<boolean>(useTypedSelector((state: any) => state.parent1.update));
  const [selectedTitle, setSelectedTitle] = useState<string>(useTypedSelector((state: any) => state.parent1.title));
  const [selectedfamily, setSelectedFamily] = useState<string>(useTypedSelector((state: any) => state.parent1.family));
  const [phoneNumber, setPhoneNumber] = useState<string | null>(useTypedSelector((state: any) => state.parent1.phone_number));
  const [firstName, setFirstName] = useState<string>(useTypedSelector((state: any) => state.parent1.firstName));
  const [lastName, setLastName] = useState<string>(useTypedSelector((state: any) => state.parent1.lastName));
  const [email, setEmail] = useState<string>(useTypedSelector((state: any) => state.parent1.email));



  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title name is required'),
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    family: Yup.string().required('Family is required'),
  });

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});


  const handleFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValidationErrors(prevErrors => ({
      ...prevErrors,
      firstName: ""
    }));
    setFirstName(event.target.value);
  };

  const handleLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValidationErrors(prevErrors => ({
      ...prevErrors,
      lastName: ""
    }));
    setLastName(event.target.value);
  };

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValidationErrors(prevErrors => ({
      ...prevErrors,
      email: ""
    }));
    setEmail(event.target.value);
  };

  const handleSelectTitle = (label: string): void => {
    setValidationErrors(prevErrors => ({
      ...prevErrors,
      title: ""
    }));
    setSelectedTitle(label);
    toggleDropdown();
  };
  const toggleDropdown = (): void => {
    setIsTitleOpen(!isTitleOpen);
  };
  useOutsideClick(dropdowntitleRef, () => {
    if (isTitleOpen) setIsTitleOpen(false);
  });
  const handleSelectFamily = (label: string): void => {
    setValidationErrors(prevErrors => ({
      ...prevErrors,
      family: ""
    }));
    setSelectedFamily(label);
    toggleDropdownFamily();
  };
  const toggleDropdownFamily = (): void => {
    setIsFamilyOpen(!isFamilyOpen);
  };
  useOutsideClick(dropdownfamilyRef, () => {
    if (isFamilyOpen) setIsFamilyOpen(false);
  });

  const handleNext: React.MouseEventHandler<HTMLDivElement> = async (event) => {
    event.preventDefault();

    try {
      await validationSchema.validate({
        title: selectedTitle, firstName, lastName, phoneNumber, email, family: selectedfamily
      }, { abortEarly: false });
      // If validation passes
      const json = {
        title: selectedTitle,
        firstName: firstName,
        lastName: lastName,
        phone_number: phoneNumber,
        email: email,
        family: selectedfamily,
        update: checked,
      }
      addParent1(json);
      if (changeValue) {
        navigate('/parent/?change=true');
      } else {
        navigate('/parent');
      }
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = err.inner.reduce((acc, error) => {
          if (typeof error.path === 'string') {
            return {
              ...acc,
              [error.path]: error.message
            };
          }
          return acc;
        }, {});
        setValidationErrors(errors);
      }
    }
  };
  return (
    <div className='py-2'>
      <h2 className=' flex justify-center items-center text-textPrimary text-[28px] text-center font-semibold font-roboto'>
        Tell us more about the primary parent / guardian
      </h2>
      <div className='flex justify-center'>

        <div className='px-2 py-6 space-y-8 max-w-[500px] min-w-[300px] w-[500px]'>

          <div className='sm:grid sm:grid-cols-12 '>
            <div className="relative  group sm:col-span-3" ref={dropdowntitleRef}>
              <span className={`${validationErrors.title ? 'text-red-600' : 'text-textPrimary'} text-[18px] font-[100]`}>Title</span>
              <button
                id="dropdown-button"
                className={`w-full flex bg-white justify-between items-center h-12 border-2 ${validationErrors.title ? 'border-red-600' : 'border-inputLigthGray'} px-5 py-3 border-darkGray rounded text-lg leading-tight focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                onClick={toggleDropdown}
              >
                <span className={"mr-2" + selectedTitle === null ? 'text-darkGray' : 'text-textPrimary'}>{selectedTitle === null ? "" : selectedTitle}</span>

                <div className='flex justify-center items-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2 -mr-1 " viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </button>
              {isTitleOpen && (
                <div id="dropdown-menu" className="absolute z-10 w-full flex flex-col overflow-auto left-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1">
                  {Title.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => handleSelectTitle(item.title)}
                      className={`block px-4 py-2 text-gray-700 hover:bg-lightGray cursor-pointer rounded-md ${item.title === selectedTitle && 'bg-lightGray2'}`}
                    >
                      {item.title}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className='pt-8 sm:pt-0 sm:ml-3 sm:col-span-9'>
              <BaseInput value={firstName} error={validationErrors.firstName} onChange={handleFirstName} name={'fullName'} type={'text'} placeholder='First Name' label='First Name' />
            </div>
          </div>

          <div>
            <BaseInput value={lastName} error={validationErrors.lastName} onChange={handleLastName} name={'lastName'} type={'text'} placeholder='Last Name' label='Last Name' />
          </div>
          <div className=''>
            <p className='font-semibold py-2'>Phone number</p>
            <div className="flex flex-col focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <PhoneInput
                country={'gb'}
                value={phoneNumber}
                onChange={(phone) => setPhoneNumber(phone)}
                placeholder={'Phone number'}
                dropdownStyle={{
                  fontSize: '1rem'
                }}
                inputStyle={{
                  width: '100%',
                  height: '3rem',
                  border: '2px solid #dedbdd',
                  boxShadow: 'none',
                  fontSize: '1rem'
                }}
                inputProps={{
                  name: 'phone',
                  required: true,
                  autoFocus: true,
                }}
              />
              {validationErrors.phoneNumber && <p className="text-red-500">{validationErrors.phoneNumber}</p>}
            </div>
          </div>
          <div>
            <BaseInput value={email} error={validationErrors.email} onChange={handleEmail} name={'email'} type={'email'} placeholder='Email' label='Email Address' />
          </div>
          <div className="">
            <div className="relative group" ref={dropdownfamilyRef}>
              <span className={`text-[18px] ${validationErrors.family ? 'text-red-600' : 'text-textPrimary'} font-[100]`}>Title</span>
              <button
                id="dropdown-button-family"
                className={`w-full flex bg-white justify-between items-center h-12 border-2 ${validationErrors.family ? 'text-red-600' : 'border-inputLigthGray'} px-5 py-3 border-darkGray rounded text-lg leading-tight focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                onClick={toggleDropdownFamily}
              >
                <span className={"mr-2" + selectedfamily === null ? 'text-darkGray' : 'text-textPrimary'}>{selectedfamily === null ? "" : selectedfamily}</span>

                <div className='flex justify-center items-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2 -mr-1 " viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </button>
              {isFamilyOpen && (
                <div id="dropdown-menu-family" className="absolute w-full flex flex-col overflow-auto left-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1">
                  {Family.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => handleSelectFamily(item.title)}
                      className={`block px-4 py-2 text-gray-700 hover:bg-lightGray cursor-pointer rounded-md ${item.title === selectedfamily && 'bg-inputLigthGray'}`}
                    >
                      {item.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className='flex justify-between items-center pb-3'>
            <input
              id="checkbox"
              type="checkbox"
              className="hidden"
              checked={checked}
              onChange={() => setChecked(!checked)}
            />
            <label htmlFor="checkbox" className="flex items-center text-[14px] cursor-pointer">
              <span className={`w-9 h-9 min-w-9 max-w-9 min-h-9 max-h-9 mr-3 flex justify-center items-center rounded border-2 transition duration-150 ease-in-out ${checked ? 'bg-darkGreen border-darkGreen' : 'border-lightGray2 bg-white'}`}>
                {checked && (
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </span>
              Please keep me updated on news, events and offers from IWS
            </label>
          </div>
          <div onClick={handleNext} className=' bg-primary w-[300px] max-w-[500px] flex justify-center items-center h-14 rounded cursor-pointer'>
            <div className='text-white font-bold'>Continue</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Parent1