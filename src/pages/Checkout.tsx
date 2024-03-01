import React, { useEffect, useState } from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { Students } from '../constants/title';
import { useActions } from '../hooks/useActions';
interface CheckoutProps {

}


const CustomCardForm = () => {
  const { clearParent1, clearParent2, clearStudent } = useActions();
  // const { clearFirst, clearSecond, clearThird, clearFourth } = useActions();


  // const array = useTypedSelector((state: any) => state.fourth.weeks)
  // let convertedObject = array.reduce((obj: any, item: any) => {
  //   obj[item.label] = { price: item.price, selected: true };
  //   return obj;
  // }, {});
  // const [selectedWeeks] = useState<Record<string, { price: number, selected: boolean }>>(convertedObject);
  // const calculateTotalPrice = () => {
  //   return Object.values(selectedWeeks)
  //     .filter(week => week.selected)
  //     .reduce((total, week) => total + week.price, 0);
  // };
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState<boolean>(false);
  // useEffect(() => {
  //   if (programm_name === null || programm_name === "" || weeks.length === 0) {
  //     if (programm_name === 'Academic Excellence' && curriculum === '' || curriculum === null) {
  //       navigate('/fourth');
  //     }
  //   }
  // }, [navigate, programm_name, weeks])
  const [checkTerm, setCheckTerm] = useState<boolean>(false);
  const [parent1] = useState(useTypedSelector((state: any) => state.parent1));
  const [parent2] = useState(useTypedSelector((state: any) => state.parent2));
  const [student] = useState(useTypedSelector((state: any) => state.student));
  const [totalPrice, setTotalPrice] = useState<number | null>(null);
  const [selectedContract, setSelectedContract] = useState<'annual' | 'half_term' | null>(null)
  const sumOfAnnual = student.students.reduce((accumulator: number, currentStudent: { package: { annual: number } }) => {
    return accumulator + currentStudent.package.annual;
  }, 0);
  const sumOfHalfterm = student.students.reduce((accumulator: number, currentStudent: { package: { half_term: number } }) => {
    return accumulator + currentStudent.package.half_term;
  }, 0);

  const totalToPay = () => student.students.length * 200;
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedValue = value || '';
    const focusedValue: Focused = (name === 'number' || name === 'name' || name === 'expiry' || name === 'cvc') ? name : undefined;
    if (focusedValue !== undefined) {
      setCardInfo({ ...cardInfo, [name]: updatedValue, focused: focusedValue });
    }
  };
  useEffect(() => {
    if (selectedContract === 'annual') {
      setTotalPrice(sumOfAnnual)
    } else {
      setTotalPrice(sumOfHalfterm)
    }
  }, [selectedContract, sumOfAnnual, sumOfHalfterm])
  const metadata = {
    parent_title: parent1.title,
    parent_firstname: parent1.firstName,
    parent_lastname: parent1.lastName,
    parent_email: parent1.email,
    parent_phonenumber: parent1.phone_number,
    parent_family: parent1.family,
    parent_update: parent1.update,

    parent_residence: parent2.residence,
    parent_address1: parent2.address1,
    parent_address2: parent2.address2,
    parent_city: parent2.city,
    parent_postal: parent2.postal,

    contract: selectedContract,
    totalPrice: totalPrice,
    // student: student.students,
  };

  type Focused = 'number' | 'name' | 'expiry' | 'cvc' | undefined;
  const [cardInfo, setCardInfo] = useState({
    name: '',
    number: '',
    expiry: '',
    cvc: '',
    focused: undefined as Focused,
  });

  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const handlePrevious = () => {
    navigate(-1);
  };

  const handleFocus = (field: Focused) => {
    setCardInfo({ ...cardInfo, focused: field });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedContract && checkTerm) {
      if (!stripe || !elements) {
        // Stripe.js has not yet loaded.
        return;
      }
      setLoading(true)
      const cardNumberElement = elements.getElement(CardNumberElement);
      const cardExpiryElement = elements.getElement(CardExpiryElement);
      const cardCvcElement = elements.getElement(CardCvcElement);
      if (cardNumberElement && cardExpiryElement && cardCvcElement) {
        const payload = await stripe.createToken(cardNumberElement);
        if (payload.error) {
          setError('Complete form please');
          setLoading(false);
          console.log('[error]', payload.error);
        } else {
          console.log('[PaymentMethod]', payload.token);
          try {
            setError(null);

            const response = await axios.post('https://api.summer-enrol.iwsonlineschool.co.uk/payment/iwsregistration', {
              token: payload.token.id,
              amount: totalToPay(),
              metadata: metadata,
              studentdata: student.students
            });
            // clearParent1();
            // clearParent2()
            // clearFirst();
            // clearSecond();
            // clearThird();
            // clearFourth();
            // setSuccess(true)
            const paymentDetails = {
              mobile: parent1.phone_number,
              email: parent1.email,
              amount: totalToPay(),
            };
            setLoading(false)
            navigate('/success', { state: paymentDetails });
            // Handle successful payment here, perhaps navigate to a success page or display a success message
          } catch (error) {
            console.error('Payment Error:', error);
            setLoading(false)

            // Handle payment error here, perhaps setting an error state and displaying it to the user
          }
          // Send the token to your server for payment processing
        }
      } else {
        setError('Complete form please');
        setLoading(false)
      }

    } else {
      setError('Please choose a contract and agree with terms')
    }
  };

  const CARD_EXPIRY_OPTIONS = {
    style: {
      base: {
        // Add your base input styles here
      },
      invalid: {
        // Add styles for when the input is invalid
      },
    },
    placeholder: 'MM/YY', // Custom placeholder text
  };

  const handleTerm = () => {
    window.open('https://www.iwsonlineschool.co.uk/terms-and-conditions/', '_blank');
    // window.location.href = ;
  }
  return (
    <>
      {
        stripe && elements && !success &&
        <div className='sm:px-10 px-3'>

          <div className='flex justify-center items-center flex-col'>

            <div className='grid grid-cols-1 sm:grid-cols-2 mt-3'>

              <div onClick={() => setSelectedContract('annual')} className=' w-[200px] shadow-xl m-3 cursor-pointer'>
                {
                  selectedContract === 'annual' ? (
                    <>
                      <div className='flex justify-between items-center border-b-2 rounded bg-green-100 border-green-600 h-24 p-3'>
                        <div className='text-xl mr-2'>Annual Contract</div>
                        <div className='w-8 h-8 min-w-8 min-h-8 bg-green-600 rounded-full flex justify-center items-center'>
                          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      <div className='flex flex-col justify-center items-center py-6'>

                        {/* <div className='text-4xl pt-5'>
                      £2,650
                    </div>
                    <div className='pt-2 pb-1'>
                      Left to pay this school year
                    </div>
                    <div className=' text-sm'>
                      £100 to pay now
                    </div> */}

                        <div className='text-lg px-3 text-center'>
                          Price Per Full School Year
                        </div>
                        <div className='text-3xl pt-3'>
                          £{sumOfAnnual}
                        </div>

                      </div>
                    </>

                  ) : (
                    <>
                      <div className='flex justify-between items-center border-b-2 rounded bg-white border-gray h-24 p-3'>
                        <div className='text-xl mr-2'>Annual Contract</div>
                        <div className='w-8 h-8 min-w-8 min-h-8 border border-gray rounded-full flex justify-center items-center'>

                        </div>
                      </div>
                      <div className='flex flex-col justify-center items-center py-6'>

                        <div className='text-lg px-3 text-center'>
                          Price Per Full School Year
                        </div>
                        <div className='text-3xl pt-3'>
                          £{sumOfAnnual}
                        </div>

                      </div>
                    </>
                  )
                }

              </div>


              <div onClick={() => setSelectedContract('half_term')} className=' w-[200px] shadow-xl m-3 cursor-pointer'>
                {selectedContract === 'half_term' ? (
                  <>
                    <div className='flex justify-between items-center border-b-2 rounded bg-green-100 border-green-600 h-24 p-3'>
                      <div className='text-xl mr-2'>Half Term Contract</div>
                      <div className='w-8 h-8 min-w-8 min-h-8 bg-green-600 rounded-full flex justify-center items-center'>
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <div className='flex flex-col justify-center items-center py-6'>
                      <div className='text-lg px-3 text-center'>
                        Price Per Full School Year
                      </div>
                      <div className='text-3xl pt-3'>
                        £{sumOfHalfterm}
                      </div>

                    </div>
                  </>
                ) : (
                  <>
                    <div className='flex justify-between items-center border-b-2 rounded bg-white border-gray h-24 p-3'>
                      <div className='text-xl mr-2'>Half Term Contract</div>
                      <div className='w-8 h-8 min-w-8 min-h-8 border border-gray rounded-full flex justify-center items-center'>

                      </div>
                    </div>
                    <div className='flex flex-col justify-center items-center py-6'>
              
                      <div className='text-lg px-3 text-center'>
                        Price Per Full School Year
                      </div>
                      <div className='text-3xl pt-3'>
                        £{sumOfHalfterm}
                      </div>

                    </div>
                  </>

                )}

              </div>


            </div>
            <div className='flex justify-center items-center'>
              <div className='min-w-[400px] min-h-[200px] max-w-[500px] max-h-[250px] shadow-xl flex flex-col justify-center items-center'>
                <div className='py-1 text-2xl'>Enrolment registration fee</div>
                <div className='py-1 text-lg'>Total to pay now</div>
                <div className='py-1 text-3xl'>£{totalToPay()}</div>
                <div className='py-1 flex justify-center items-center'>
                  <input
                    checked={checkTerm} // Use checked attribute for checkboxes
                    onChange={() => setCheckTerm(!checkTerm)} // Toggle the checkTerm state
                    id='check'
                    type="checkbox"
                    className='w-5 h-5 cursor-pointer'
                  />
                  <label htmlFor='check' className='text-lg ml-3 cursor-pointer flex'>
                    I agree to the
                  </label>
                  <div onClick={handleTerm} className='ml-2 text-lg cursor-pointer hover:underline text-blue-600'>Terms and Conditions</div>
                </div>
              </div>

            </div>

            <div className='text-textPrimary pt-2 w-full max-w-[600px] py-2'>
              <div className='pt-3'>
                <form onSubmit={handleSubmit}>
                  <div className='px-2 py-6 text-textPrimary sm:py-10'>
                    <div className='pb-2 sm:pb-6'>
                      <div className=' sm:grid sm:grid-cols-12'>
                        <div className='pb-2 sm:col-span-6 sm:gri sm:pb-6'>
                          <CardNumberElement className="w-full h-12 border-2 border-inputLigthGray px-5 py-3 border-darkGray rounded text-lg leading-tight focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" onChange={(e) => setCardInfo({ ...cardInfo, number: e.complete ? '#### #### #### ####' : '' })} onFocus={() => handleFocus('number')} />
                        </div>
                        <div className='pb-2 sm:col-span-3 sm:px-3 sm:pb-6'>
                          <CardExpiryElement options={CARD_EXPIRY_OPTIONS} className=" w-full h-12 border-2 border-inputLigthGray px-5 py-3 border-darkGray rounded text-lg leading-tight focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" onChange={(e) => setCardInfo({ ...cardInfo, expiry: e.complete ? '##/##' : '' })} onFocus={() => handleFocus('expiry')} />
                        </div>
                        <div className='pb-2 sm:col-span-3 sm:pb-6'>
                          <CardCvcElement className="w-full h-12 border-2 border-inputLigthGray px-5 py-3 border-darkGray rounded text-lg leading-tight focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" onChange={(e) => setCardInfo({ ...cardInfo, cvc: e.complete ? '###' : '' })} onFocus={() => handleFocus('cvc')} />
                        </div>
                      </div>
                      <input
                        className="w-full h-12 border-2 border-inputLigthGray px-5 py-3 border-darkGray rounded text-lg leading-tight focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={cardInfo.name}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus('name')}
                      />
                    </div>
                    {error && (
                      <div className='text-red-600 text-lg'>{error}</div>
                    )}
                    <div className=' my-6 flex justify-between'>
                      <div className='text-black font-normal text-[18px]'>Total to pay:  £{totalToPay()}</div>

                      {
                        loading ? (
                          <button className='px-8 py-2 rounded-full bg-primary'>
                            <div className='text-white font-semibold text-[18px]'>Loading...</div>
                          </button>
                        ) : (
                          <button type="submit" className='px-8 py-2 rounded-full bg-primary'>
                            <div className='text-white font-semibold text-[18px]'>Submit</div>
                          </button>
                        )
                      }
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

      }

    </>
  );
};

const Checkout: React.FC<CheckoutProps> = () => {
  const [parent1] = useState(useTypedSelector((state: any) => state.parent1));
  const [parent2] = useState(useTypedSelector((state: any) => state.parent2));
  const [student] = useState(useTypedSelector((state: any) => state.student));
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', options); // Converts to "14/01/2010" format
  };
  const [count] = useState<number>(useTypedSelector((state: any) => state.count.count));
  const [students] = useState(useTypedSelector((state: any) => state.student.students));
  const navigate = useNavigate();
  useEffect(() => {
    if (students.length !== count || students.length > count) {
      navigate('/count');
    }
  })


  const handlePrevious: React.MouseEventHandler<HTMLDivElement> = async (event) => {
    event.preventDefault();
    navigate(-1);
  };
  const stripePromise = loadStripe('pk_live_51N1o54Kyf7NboMui5to7mPMo1RKhHaU1yBzXbgxiNfUgsmXXerfUAlxZgnGhYTd9JUpvqPqiSCgWlXPeSr2HNNkI00Agc5vZl3');
  return (
    <div className=' text-textPrimary mt-10 container'>

      <div className=' items-center flex flex-col'>
        <div className='px-4 grid grid-cols-1 lg:grid-cols-2'>
          <div className='lg:pr-6'>
            <div className='text-5xl text-textPrimary pb-3 font-semibold'>Confirmation</div>
            <p className=' text-[18px]'>Please check that all information is correct before submitting. There will be a non-refundable £200 registration fee to pay in order to submit your enrolment.</p>
            <div className='flex justify-between pt-10'>
              <div className='text-[18px] font-semibold'>Parent/Guardian Information</div>
              <div onClick={() => navigate('/?change=true')} className='text-[18px] underline text-blue-600 cursor-pointer'>Edit</div>
            </div>
            {
              parent1 && parent2 && (
                <>
                  <div className='py-5 text-3xl'>
                    {parent1.title + '    ' + parent1.firstName + '   ' + parent1.lastName}
                  </div>
                  <div className='text-lg'>
                    <div className='grid'>
                      <div className='pb-3'>{parent2.address1}</div>
                      <div className='pb-3'>{parent1.email}</div>

                    </div>

                    <div className='pb-3'>{parent2.city + '    ' + parent2.postal}</div>
                    <div className='pb-3'>{parent1.phone_number}</div>
                  </div>
                </>
              )
            }

            {
              students.map((student: any, studentIndex: number) => (
                <React.Fragment key={studentIndex}>
                  <div className='border-b py-3 text-buttonGray'></div>
                  <div className='flex justify-between pt-10'>
                    <div className='text-[18px] font-semibold'>{Students[studentIndex].name}</div>
                    <div onClick={() => navigate(`/student/${student.id}/?change=true`)} className='text-[18px] underline text-blue-600 cursor-pointer'>Edit</div>
                  </div>
                  <div className='py-3 text-3xl'>
                    {student.studentData.firstName + '   ' + student.studentData.lastName}
                  </div>
                  <div className='text-xl'>
                    {formatDate(student.studentData.dateOfBirth)}
                  </div>
                  <div className='flex justify-between pt-10'>
                    <div className='text-[18px] font-semibold'>{student.year.title}:{"  " + student.year.data}</div>
                    <div onClick={() => navigate(`/student/${student.id}/year/?change=true`)} className='text-[18px] underline text-blue-600 cursor-pointer'>Edit</div>
                  </div>
                  <div className='border-b py-3 text-buttonGray'></div>
                  <div className='flex justify-between pt-6'>
                    <div className='text-[18px] font-semibold'>{student?.package?.subjects?.length + student.package.optional_subjects.length + student.package.science_subjects.length + student.package.humanities_subjects.length + student.package.other_subjects.length + student.package.level_subjects.length} Subject Package</div>
                    <div onClick={() => navigate(`/student/${student.id}/package/?change=true`)} className='text-[18px] underline text-blue-600 cursor-pointer'>Edit</div>
                  </div>
                  {student.package && (
                    <div className='grid grid-cols-1 sm:grid-cols-2 pt-4'>
                      {student?.package?.subjects?.map((pac: { name: string, icon: string }, pacIndex: number) => (
                        <div key={pacIndex} className='text-xl py-2'>{pac.name}</div>
                      ))}
                      {student?.package?.optional_subjects?.map((pac: { name: string, icon: string }, pacIndex: number) => (
                        <div key={pacIndex} className='text-xl py-2'>{pac.name}</div>
                      ))}
                      {student.package.science_subjects.map((pac: { name: string, icon: string }, pacIndex: number) => (
                        <div key={pacIndex} className='text-xl py-2'>{pac.name}</div>
                      ))}
                      {student.package.humanities_subjects.map((pac: { name: string, icon: string }, pacIndex: number) => (
                        <div key={pacIndex} className='text-xl py-2'>{pac.name}</div>
                      ))}
                      {student.package.other_subjects.map((pac: { name: string, icon: string }, pacIndex: number) => (
                        <div key={pacIndex} className='text-xl py-2'>{pac.name}</div>
                      ))}
                      {student.package.level_subjects.map((pac: { name: string, icon: string }, pacIndex: number) => (
                        <div key={pacIndex} className='text-xl py-2'>{pac.name}</div>
                      ))}
                    </div>
                  )}
                </React.Fragment>
              ))
            }

          </div>
          <div>
            <Elements stripe={stripePromise}>
              <CustomCardForm />
            </Elements>
          </div>


        </div>

      </div>
      <div className='flex max-w-[500px] pt-10'>
        <div onClick={handlePrevious} className=' bg-lightGray group hover:bg-buttonGray mr-3 w-[400px] max-[400px] flex justify-center items-center h-14 rounded cursor-pointer'>
          <div className=' text-textPrimary group-hover:text-white font-bold'>Previous</div>
        </div>

      </div>
    </div>
  )
}

export default Checkout