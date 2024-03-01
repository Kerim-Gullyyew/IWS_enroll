import React, { useEffect, useMemo, useRef, useState } from 'react';
import countryList from 'react-select-country-list'
import useOutsideClick from '../utils/useOutsideClick';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import BaseInput from '../components/form/BaseInput';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';


interface Parent2Props {

}

interface ValidationErrors {
  residence?: string,
  address1?: string;
  address2?: string;
  city?: string;
  postal?: string
}


interface CountryData {
  label: string;
  value: string
}

const Parent2: React.FC<Parent2Props> = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const changeValue = queryParams.get('change');
  const navigate = useNavigate();
  const completed = useTypedSelector((state: any) => state.parent1.completed)
  useEffect(() => {
    if (completed === false) {
      navigate('/')
    }
  }, [completed, navigate])
  const { addParent2 } = useActions();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<string | null>(useTypedSelector((state: any) => state.parent2.residence));
  const [address1, setAddress1] = useState<string>(useTypedSelector((state: any) => state.parent2.address1));
  const [address2, setAddress2] = useState<string>(useTypedSelector((state: any) => state.parent2.address2));
  const [city, setCity] = useState<string>(useTypedSelector((state: any) => state.parent2.city));
  const [postal, setPostal] = useState<string>(useTypedSelector((state: any) => state.parent2.postal));

  const validationSchema = Yup.object().shape({
    residence: Yup.string().required('Country is required'),
    address1: Yup.string().required('Address is required'),
    address2: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    postal: Yup.string().required('Postal is required'),
  });

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  const handleAddress1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValidationErrors(prevErrors => ({
      ...prevErrors,
      address1: ""
    }));
    setAddress1(event.target.value);
  };

  const handleAddress2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValidationErrors(prevErrors => ({
      ...prevErrors,
      address2: ""
    }));
    setAddress2(event.target.value);
  };

  const handleCity = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValidationErrors(prevErrors => ({
      ...prevErrors,
      city: ""
    }));
    setCity(event.target.value);
  };

  const handlePostal = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValidationErrors(prevErrors => ({
      ...prevErrors,
      postal: ""
    }));
    setPostal(event.target.value);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value.toLowerCase());
  };
  const dropdownRef = useRef<HTMLDivElement>(null);
  const options = useMemo(() => countryList().getData(), []);
  const filteredItems: CountryData[] = options.filter(item =>
    item.label.toLowerCase().includes(searchTerm)
  );

  const handleSelectCountry = (label: string): void => {
    setValidationErrors(prevErrors => ({
      ...prevErrors,
      residence: ""
    }));
    setSelectedCountry(label);
    toggleDropdown();
  };
  const toggleDropdown = (): void => {
    setIsOpen(!isOpen);
  };
  useOutsideClick(dropdownRef, () => {
    if (isOpen) setIsOpen(false);
  });
  const handlePrevious: React.MouseEventHandler<HTMLDivElement> = async (event) => {
    event.preventDefault();
    navigate(-1);
  };
  const handleNext: React.MouseEventHandler<HTMLDivElement> = async (event) => {
    event.preventDefault();

    try {
      await validationSchema.validate({
        residence: selectedCountry, address1, address2, city, postal
      }, { abortEarly: false });
      // If validation passes
      if (selectedCountry !== null) {
        const json = {
          residence: selectedCountry,
          address1: address1,
          address2: address2,
          city: city,
          postal: postal
        }
        addParent2(json);
        if (changeValue) {
          navigate('/checkout');
        } else {
          navigate('/count');
        }
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

        <div className='px-2 py-5 space-y-6 max-w-[500px] min-w-[300px] w-[500px]'>
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
                  {
                    selectedCountry !== null && (
                      <svg xmlns="http://www.w3.org/2000/svg" onClick={() => setSelectedCountry(null)} className="w-4 h-4 text-darkGray hover:text-red-600" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <line x1="3" y1="3" x2="17" y2="17" />
                        <line x1="3" y1="17" x2="17" y2="3" />
                      </svg>

                    )
                  }
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
                    onChange={handleSearch}
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

          <div>
            <BaseInput value={address1} error={validationErrors.address1} onChange={handleAddress1} name={'address1'} type={'text'} placeholder='Address Line 1' label='Address Line 1' />
          </div>

          <div>
            <BaseInput value={address2} error={validationErrors.address2} onChange={handleAddress2} name={'address2'} type={'text'} placeholder='Address Line 2' label='Address Line 2' />
          </div>



          <div>
            <BaseInput value={city} error={validationErrors.city} onChange={handleCity} name={'city'} type={'text'} placeholder='City' label='City' />
          </div>

          <div className='pb-5'>
            <BaseInput value={postal} error={validationErrors.postal} onChange={handlePostal} name={'postal'} type={'text'} placeholder='Postal' label='Postal' />
          </div>

          <div className='flex'>
            <div onClick={handlePrevious} className=' bg-lightGray group hover:bg-buttonGray mr-3 w-[400px] max-[400px] flex justify-center items-center h-14 rounded cursor-pointer'>
              <div className=' text-textPrimary group-hover:text-white font-bold'>Previous</div>
            </div>
            <div onClick={handleNext} className=' bg-primary w-[500px] max-[500px] flex justify-center items-center h-14 rounded cursor-pointer'>
              <div className='text-white font-bold'>Continue</div>
            </div>

          </div>

          <div>

          </div>
        </div>
      </div>

    </div>
  )
}

export default Parent2