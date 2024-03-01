import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import countryList from 'react-select-country-list'
import useOutsideClick from '../utils/useOutsideClick';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'
import BaseInput from '../components/form/BaseInput';
import { useTypedSelector } from '../hooks/useTypedSelector';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../utils/custom-datepicker-styles.css";
import * as Yup from 'yup';
import { Students } from '../constants/title';
import { useActions } from '../hooks/useActions';
import { useParams } from 'react-router-dom';
interface StudentProps {
}
interface ValidationErrors {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  phoneNumber?: string;
  dateOfBirth?: string,
  email?: string;
  residence?: string;
  dateOfDesired?: string;
}
interface CountryData {
  label: string;
  value: string
}

const Student: React.FC<StudentProps> = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const changeValue = queryParams.get('change');
  const { id } = useParams();
  const studentId = id ? +id : 0;
  const navigate = useNavigate();
  const [count] = useState<number>(useTypedSelector((state: any) => state.count.count));
  console.log(count);

  useEffect(() => {
    if (!count || count === null || studentId > count) {
      navigate('/count');
    }
  }, [count, navigate, studentId])
  // useEffect(() => {
  //   if (id === undefined) {
  //     navigate('/');
  //   }
  // }, [id])


  const { addStudent } = useActions();
  const student = useTypedSelector((state: any) =>
    state.student.students.find((student: any) => student.id === studentId)
  );

  const students = useTypedSelector((state: any) => state.student.students)

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    middleName: Yup.string().required('Middle name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    residence: Yup.string().required('Country is required'),

    dateOfBirth: Yup.date()
      .max(new Date(), "Date of birth cannot be in the future")
      .test(
        "DOB",
        "Must be at least 8 years old",
        value => {
          return (
            value &&
            new Date(value).getFullYear() <= new Date().getFullYear() - 8
          );
        }
      )
      .required('Date of birth is required'),

    dateOfDesired: Yup.date()
      .min(
        new Date(new Date().setHours(0, 0, 0, 0)),
        "Date of desired cannot be in the past"
      )
      .required('Date of desired is required'),
  });
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  const [selectedCountry, setSelectedCountry] = useState<string | null>(student?.studentData?.residence || '');
  const [firstName, setFirstName] = useState<string>(student?.studentData?.firstName || '');
  const [middleName, setMiddleName] = useState<string>(student?.studentData?.middleName || '');
  const [lastName, setLastName] = useState<string>(student?.studentData?.lastName || '');
  const [email, setEmail] = useState<string>(student?.studentData?.email || '');
  const [phoneNumber, setPhoneNumber] = useState<string>(student?.studentData?.phoneNumber || '');
  const dateBirth = student?.studentData?.dateOfBirth;
  const initialDate = dateBirth ? new Date(dateBirth) : null;
  const validInitialDate = initialDate && !isNaN(initialDate.getTime()) ? initialDate : null;
  const [startDate, setStartDate] = useState<Date | null>(validInitialDate || new Date());
  const [error, setError] = useState<string | null>(null)

  const dateDesired = student?.studentData?.desiredDate;
  const initialDateDesired = dateDesired ? new Date(dateDesired) : null;
  const validInitialDateDesired = initialDateDesired && !isNaN(initialDateDesired.getTime()) ? initialDateDesired : null;
  const [startDateDesired, setStartDateDesired] = useState<Date | null>(validInitialDateDesired || new Date());

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const options = useMemo(() => countryList().getData(), []);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const filteredItems: CountryData[] = options.filter(item =>
    item.label.toLowerCase().includes(searchTerm)
  );



  const handleSelectCountry = (label: string): void => {
    setSelectedCountry(label);
    toggleDropdown();
    setSearchTerm('');
    setValidationErrors(prevErrors => ({
      ...prevErrors,
      residence: ""
    }));
  };
  const handleSearchCountry = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value.toLowerCase());
  };
  const toggleDropdown = (): void => {
    setIsOpen(!isOpen);
  };
  useOutsideClick(dropdownRef, () => {
    if (isOpen) setIsOpen(false);
  });



  const handleFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValidationErrors(prevErrors => ({
      ...prevErrors,
      firstName: ""
    }));
    setFirstName(event.target.value);
  };

  const handleMiddleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValidationErrors(prevErrors => ({
      ...prevErrors,
      middleName: ""
    }));
    setMiddleName(event.target.value);
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

  const handlePrevious: React.MouseEventHandler<HTMLDivElement> = async (event) => {
    event.preventDefault();
    navigate(-1);
  };
  const handleNext: React.MouseEventHandler<HTMLDivElement> = async (event) => {
    event.preventDefault();
 
    try {
      const emailExists = students.some((student: { studentData: { email: string; }; id: number; }) => student.studentData.email === email && student.id !== studentId);
      console.log(emailExists);
      
      if (emailExists) {
        // Set an error state or display an error message indicating the email is already used
        setError("Email already in use. Please use a different email.");
        return; // Exit the function to prevent further processing
      }

      await validationSchema.validate({
        firstName,
        middleName,
        lastName,
        phoneNumber,
        dateOfBirth: startDate,
        email,
        residence: selectedCountry,
        dateOfDesired: startDateDesired
      }, { abortEarly: false });
      // If validation passes
      const studentData = {
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber !== null ? phoneNumber : '',
        dateOfBirth: startDate ? startDate.toISOString() : '',
        residence: selectedCountry !== null ? selectedCountry : '',
        desiredDate: startDateDesired ? startDateDesired.toISOString() : '',
      };

      const student = {
        id: studentId,
        studentData: studentData,
      };

      addStudent(student);
      if (changeValue) {
        navigate('/checkout');
      } else {
        navigate(`/student/${studentId}/year`);
      }


    } catch (err) {
      console.log(err);

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
        Tell us more about the student
      </h2>
      <div className="p-8">
        <div className="mx-auto max-w-[900px]">

          <div className='py-2'>

            <div className='flex justify-center'>
              <div className='px-2 py-6 space-y-8 lg:space-y-0 max-w-[500px] min-w-[300px] w-[500px] lg:w-full lg:min-w-full lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-8 lg:px-10 lg:pt-10'>
                <div>
                  <BaseInput value={firstName} error={validationErrors.firstName} onChange={handleFirstName} name={'firstName'} type={'text'} placeholder='Student First Name' label='Student First Name' />
                </div>

                <div>
                  <BaseInput value={middleName} error={validationErrors.middleName} onChange={handleMiddleName} name={'middleName'} type={'text'} placeholder='Student Middle Name' label='Student Middle Name' />
                </div>

                <div>
                  <BaseInput value={lastName} error={validationErrors.lastName} onChange={handleLastName} name={'lastName'} type={'text'} placeholder='Student Last Name' label='Student Last Name' />
                </div>

                <div>
                  <BaseInput value={email} error={validationErrors.email} onChange={handleEmail} name={'email'} type={'email'} placeholder='Student Email' label='Student Email' />
                </div>

                <div className=''>
                  <span className=' text-textPrimary text-[18px] font-[100]'>Phone number</span>
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
                        enablesearch: 'true',
                        name: 'phone',
                        required: true,
                        autoFocus: true,
                      }}
                    />
                    {validationErrors.phoneNumber && <p className="text-red-500">{validationErrors.phoneNumber}</p>}
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className=' text-textPrimary text-[18px] font-[100]'>Date of Birth</span>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="MM/dd/yyyy"
                    dropdownMode="select"
                    showYearDropdown
                    showMonthDropdown
                    maxDate={new Date()}
                    scrollableYearDropdown
                    className=" w-full h-12 border-2 border-inputLigthGray px-5 py-3 border-darkGray rounded text-lg leading-tight focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    wrapperClassName="w-full"
                    id="dateOfBirth"
                    popperClassName="react-datepicker-right"
                  />
                  {validationErrors.dateOfBirth && <p className="text-red-500">{validationErrors.dateOfBirth}</p>}
                </div>


                <div className="">
                  <div className="relative group" ref={dropdownRef}>
                    <span className={`${validationErrors.residence ? 'text-red-600' : 'text-textPrimary'} text-[18px] font-[100]`}>Country of Residence</span>

                    <button
                      id="dropdown-button"
                      className={`w-full flex bg-white justify-between items-center h-12 border-2 ${validationErrors.residence ? 'text-red-600' : 'border-inputLigthGray'} px-5 py-3 border-darkGray rounded text-lg leading-tight focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                      onClick={toggleDropdown}
                    >
                      <span className={"mr-2" + selectedCountry === null ? 'text-darkGray' : 'text-textPrimary'}>{selectedCountry === null ? "Select Country" : selectedCountry}</span>

                      <div className='flex justify-center items-center'>
                        {selectedCountry !== null && (
                          <svg xmlns="http://www.w3.org/2000/svg" onClick={() => setSelectedCountry(null)} className="w-4 h-4 text-darkGray hover:text-red-600" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <line x1="3" y1="3" x2="17" y2="17" />
                            <line x1="3" y1="17" x2="17" y2="3" />
                          </svg>
                        )}
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2 -mr-1 " viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </button>
                    {isOpen && (
                      <div id="dropdown-menu" className="absolute z-10 w-full flex flex-col h-60 overflow-auto left-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1">
                        <input
                          id="search-input"
                          className="block w-full px-4 py-2 text-gray-800 border rounded-md  border-inputLigthGray focus:outline-none"
                          type="text"
                          placeholder="Search items"
                          autoComplete="off"
                          onChange={handleSearchCountry}
                        />

                        {filteredItems.map((item, index) => (
                          <div
                            key={index}
                            onClick={() => handleSelectCountry(item.label)}
                            className={`block px-4 py-2 text-gray-700 hover:bg-lightGray cursor-pointer rounded-md ${item.label === selectedCountry && 'bg-lightGray2'}`}
                          >
                            {item.label}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>


                <div className="flex flex-col">
                  <span className=' text-textPrimary text-[18px] font-[100]'>Desired Date</span>
                  <DatePicker
                    selected={startDateDesired}
                    onChange={(date) => setStartDateDesired(date)}
                    dateFormat="MM/dd/yyyy"
                    dropdownMode="select"
                    showYearDropdown
                    showMonthDropdown
                    minDate={new Date()}
                    scrollableYearDropdown
                    className=" w-full h-12 border-2 border-inputLigthGray px-5 py-3 border-darkGray rounded text-lg leading-tight focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    wrapperClassName="w-full"
                    id="dateOfDesired"
                    popperClassName="react-datepicker-right"
                  />
                  {validationErrors.dateOfDesired && <p className="text-red-500">{validationErrors.dateOfDesired}</p>}
                </div>

                
                <div className='text-red-600'>{error}</div>
                <div className='flex'>
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

        </div>
      </div>

    </div>


  )
}

export default Student