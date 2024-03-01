import React, { useEffect, useRef, useState } from 'react'
import { YearStages } from '../constants/year';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import RadioButton from '../components/form/RadioButton';
import RadioButton2 from '../components/form/RadioButton2';
import Checkbox from '../components/form/Checkbox';

interface PackageProps {

}

const Package: React.FC<PackageProps> = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const changeValue = queryParams.get('change');
  const { id } = useParams();
  const studentId = id ? +id : 0;
  const student = useTypedSelector((state: any) =>
    state.student.students.find((student: any) => student.id === studentId)
  );

  const [count, setCount] = useState<any>(useTypedSelector((state: any) => state.count.count));


  useEffect(() => {
    if (student && student.year && student.package) {
      YearStages.forEach((year) => {
        if (year.name === student.year.title) {
          year.package.forEach((pac) => {
            if (pac.title === student.package.title) {
              setSelectedPackage(pac);
            }
          });
        }
      });
    }
  }, [student]);
  const navigate = useNavigate();
  const { addPackage } = useActions();
  const [selectedPackage, setSelectedPackage] = useState<any>('');
  const [selectedOptionalSubject, setSelectedOptionalSubject] = useState<{ name: string, icon: string }[]>(student?.package?.optional_subjects);
  const [selectedlevelSubject, setSelectedlevelSubject] = useState<{ name: string, icon: string }[]>(student?.package?.level_subjects);
  const [selectedHumanitySubject, setSelectedHumanitySubject] = useState<{ name: string, icon: string }[]>(student?.package?.humanities_subjects);
  const [selectedScienceSubject, setSelectedScienceSubject] = useState<{ name: string, icon: string }[]>(student?.package?.science_subjects);
  const [selectedOtherSubject, setSelectedOtherSubject] = useState<{ name: string, icon: string }[]>(student?.package?.other_subjects);
  const [error, setError] = useState<string | null>(null)
  const handleOptionalSubjectChange = (subject: { name: string, icon: string }, isChecked: boolean) => {
    setSelectedOptionalSubject(prevSelected => {
      const isAlreadySelected = prevSelected.some(item => item.name === subject.name);

      if (isChecked && !isAlreadySelected) {
        if (student.year.title !== 'KS 4 Cambridge I/GCSE (Ages 14-16)' && prevSelected.length < 3 || student.year.title === 'KS 4 Cambridge I/GCSE (Ages 14-16)' && prevSelected.length < 4) {
          return [...prevSelected, subject];
        } else {

          return prevSelected;
        }
      } else if (!isChecked && isAlreadySelected) {
        return prevSelected.filter(item => item.name !== subject.name);
      }
      return prevSelected;
    });
  };

  const handleHumanitySubjectChange = (subject: { name: string, icon: string }, isChecked: boolean) => {
    setSelectedHumanitySubject(prevSelected => {
      if (isChecked) {
        // If the checkbox is checked, replace the current selection with the new subject
        return [subject];
      } else {
        // If the checkbox is unchecked, clear the selection if it matches the subject being unchecked
        return prevSelected.filter(item => item.name !== subject.name);
      }
    });
  };

  const handleScienceSubjectChange = (subject: { name: string, icon: string }, isChecked: boolean) => {
    setSelectedScienceSubject(prevSelected => {
      if (isChecked) {
        // If the checkbox is checked, replace the current selection with the new subject
        return [subject];
      } else {
        // If the checkbox is unchecked, clear the selection if it matches the subject being unchecked
        return prevSelected.filter(item => item.name !== subject.name);
      }
    });
  };

  const handleOtherSubjectChange = (subject: { name: string, icon: string }, isChecked: boolean) => {
    setSelectedOtherSubject(prevSelected => {
      if (isChecked) {
        // If the checkbox is checked, replace the current selection with the new subject
        return [subject];
      } else {
        // If the checkbox is unchecked, clear the selection if it matches the subject being unchecked
        return prevSelected.filter(item => item.name !== subject.name);
      }
    });
  };


  const handleSelectedlevelSubjectChange = (subject: { name: string, icon: string }, isChecked: boolean) => {
    console.log(selectedPackage.can_select);
    const can_select = selectedPackage.can_select; // Maximum number of selectable subjects

    setSelectedlevelSubject(prevSelected => {
      // If the checkbox is checked and we haven't reached the limit, add the new subject
      if (isChecked && prevSelected.length < can_select) {
        // Check if the subject is already selected to prevent duplicates
        const isSubjectAlreadySelected = prevSelected.some(item => item.name === subject.name);
        if (!isSubjectAlreadySelected) {
          return [...prevSelected, subject];
        }
        return prevSelected; // Return the current selection if the subject is already selected
      } else if (!isChecked) {
        // If the checkbox is unchecked, remove the subject from the selection
        return prevSelected.filter(item => item.name !== subject.name);
      }
      return prevSelected; // Return the current selection if no changes are made
    });
  };



  const handlePackage = (selectedPkg: any) => {
    if (student?.package?.title !== selectedPkg?.title) {
      setSelectedOptionalSubject([]);
      setSelectedHumanitySubject([]);
      setSelectedScienceSubject([]);
      setSelectedOtherSubject([]);
      setSelectedlevelSubject([]);
      setSelectedPackage(selectedPkg);
    } else {
      setSelectedOptionalSubject(student.package.optional_subjects);
      setSelectedHumanitySubject(student.package.humanities_subjects);
      setSelectedScienceSubject(student.package.science_subjects);
      setSelectedOtherSubject(student.package.other_subjects);
      setSelectedlevelSubject(student.package.level_subjects);
      setSelectedPackage(selectedPkg);
    }
  };

  const handlePrevious: React.MouseEventHandler<HTMLDivElement> = async (event) => {
    event.preventDefault();
    navigate(-1);
  };

  const handleNext: React.MouseEventHandler<HTMLDivElement> = async (event) => {
    event.preventDefault();
    if (selectedPackage) {
      if (
        (selectedPackage.humanities_subjects && selectedHumanitySubject.length === 0) ||
        (selectedPackage.other_subjects && selectedOtherSubject.length === 0) ||
        (selectedPackage.science_subjects && selectedScienceSubject.length === 0) ||
        (selectedPackage.optional_subjects && student.year.title === 'KS 4 Cambridge I/GCSE (Ages 14-16)' && selectedOptionalSubject.length !== 4) ||
        (selectedPackage.optional_subjects && student.year.title !== 'KS 4 Cambridge I/GCSE (Ages 14-16)' && selectedOptionalSubject.length !== 3) ||
        (selectedPackage.level_subjects && selectedlevelSubject.length === selectedPackage.can_select)
      ) {
        setError("Please choose")
      } else {
        const json = {
          id: studentId,
          package: {
            title: selectedPackage.title,
            description: selectedPackage.description,
            price: selectedPackage.price,
            addition: selectedPackage.addition,
            annual: selectedPackage.annual,
            half_term: selectedPackage.half_term,
            subjects: selectedPackage.subjects,
            optional_subjects: selectedOptionalSubject,
            science_subjects: selectedScienceSubject,
            humanities_subjects: selectedHumanitySubject,
            other_subjects: selectedOtherSubject,
            level_subjects: selectedlevelSubject,
          }
        }
        addPackage(json);
        if (studentId < count) {
          let nextId = studentId + 1
          if (changeValue) {
            navigate('/checkout')
          } else {
            navigate('/student/' + nextId)
          }
        } else {
          navigate('/checkout')
        }
      }
    } else {
      setError('Please choose')
    }
  };
  return (
    <div className='py-2 text-textPrimary'>
      <h2 className=' flex justify-center items-center text-textPrimary text-[28px] text-center font-semibold font-roboto'>
        Please select the package
      </h2>
      <div className="p-8">
        <div className="mx-auto max-w-[1300px]">

          <p className='text-red-600 text-lg'>{error}</p>
          <div className='py-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>

            {YearStages.map((year, yearIndex) => (
              <React.Fragment key={yearIndex}>
                {
                  year.name === student.year.title && (
                    year.package.map((pac, packageIndex) => (

                      <div key={packageIndex} className=' shadow-md flex-1 bg-lightGreen mx-2 my-2 flex justify-between flex-col rounded p-6'>
                        <div>
                          <div className='pb-6 font-bold'>{pac.title}</div>
                          <div className='pb-14'>{pac.description}</div>
                        </div>
                        <div>
                          <div className='text-2xl font-bold text-textPrimary pb-1'>£{pac.annual}</div>
                          <div className='pb-5'>{pac.addition}</div>
                          <div onClick={() => handlePackage(pac)} className={`border ${selectedPackage !== null && selectedPackage.title === pac.title && 'bg-primary text-white'} rounded flex text-lg font-bold text-primary justify-center items-center py-2 border-primary hover:bg-primary cursor-pointer hover:text-white hover:transition-all hover:duration-100 hover:text-xl`}>
                            Select
                          </div>
                        </div>
                      </div>
                    ))
                  )
                }
              </React.Fragment>
            ))}
          </div>
          {selectedPackage && selectedPackage.subjects && selectedPackage.subjects.length > 0 && (
            <div>
              <div className='py-2'>
                <div className='flex'>
                  <div className=' pb-6'>
                    <div className='text-2xl ml-3 text-textPrimary font-semibold'>Subjects</div>
                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
                      {
                        selectedPackage !== null && selectedPackage.subjects !== null && selectedPackage.subjects.map((sub: any, subIndex: any) => (
                          <Checkbox
                            key={subIndex}
                            label={sub.name}
                            id="subjectsCheckbox"
                            checked={true}
                          />
                        ))
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {selectedPackage && selectedPackage.optional_subjects && selectedPackage.optional_subjects.length > 0 && (
            <div>
              <div className='py-2'>
                <div className='flex'>
                  <div className=' pb-6'>
                    <div className='text-2xl ml-3 text-textPrimary font-semibold'>Optional Subjects</div>
                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
                      {
                        selectedPackage !== null && selectedPackage.optional_subjects !== null && selectedPackage.optional_subjects.map((sub: any, subIndex: any) => (
                          <Checkbox
                            key={subIndex}
                            label={sub.name}
                            id={`optional-subject-${subIndex}`}
                            checked={selectedOptionalSubject.some(item => item.name === sub.name)}
                            onChange={(isChecked) => handleOptionalSubjectChange(sub, isChecked)}
                          />
                        ))
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedPackage && selectedPackage.humanities_subjects && selectedPackage.humanities_subjects.length > 0 && (
            <div>
              <div className='py-2'>
                <div className='flex'>
                  <div className=' pb-6'>
                    <div className='text-2xl ml-3 text-textPrimary font-semibold'>Humanity Subjects</div>
                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
                      {
                        selectedPackage !== null && selectedPackage.humanities_subjects !== null && selectedPackage.humanities_subjects.map((subhum: any, subhumIndex: any) => (
                          <Checkbox
                            key={subhumIndex}
                            label={subhum.name}
                            id={`humanity-subject-${subhumIndex}`}
                            checked={selectedHumanitySubject.some(item => item.name === subhum.name)}
                            onChange={(isChecked) => handleHumanitySubjectChange(subhum, isChecked)}
                          />
                        ))
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}


          {selectedPackage && selectedPackage.science_subjects && selectedPackage.science_subjects.length > 0 && (
            <div>
              <div className='py-2'>
                <div className='flex'>
                  <div className=' pb-6'>
                    <div className='text-2xl ml-3 text-textPrimary font-semibold'>Science Subjects</div>
                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
                      {
                        selectedPackage !== null && selectedPackage.science_subjects !== null && selectedPackage.science_subjects.map((subsci: any, subsciIndex: any) => (
                          <Checkbox
                            key={subsciIndex}
                            label={subsci.name}
                            id={`science-subject-${subsciIndex}`}
                            checked={selectedScienceSubject.some(item => item.name === subsci.name)}
                            onChange={(isChecked) => handleScienceSubjectChange(subsci, isChecked)}
                          />
                        ))
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}


          {selectedPackage && selectedPackage.other_subjects && selectedPackage.other_subjects.length > 0 && (
            <div>
              <div className='py-2'>
                <div className='flex'>
                  <div className=' pb-6'>
                    <div className='text-2xl ml-3 text-textPrimary font-semibold'>Other Subjects</div>
                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
                      {
                        selectedPackage !== null && selectedPackage.other_subjects !== null && selectedPackage.other_subjects.map((suboth: any, subothIndex: any) => (
                          <Checkbox
                            key={subothIndex}
                            label={suboth.name}
                            id={`other-subject-${subothIndex}`}
                            checked={selectedOtherSubject.some(item => item.name === suboth.name)}
                            onChange={(isChecked) => handleOtherSubjectChange(suboth, isChecked)}
                          />
                        ))
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}


          {selectedPackage && selectedPackage.level_subjects && selectedPackage.level_subjects.length > 0 && (
            <div>
              <div className='py-2'>
                <div className='flex'>
                  <div className=' pb-6'>
                    <div className='text-2xl ml-3 text-textPrimary font-semibold'>Level Subjects</div>
                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
                      {
                        selectedPackage !== null && selectedPackage.level_subjects !== null && selectedPackage.level_subjects.map((sublev: any, sublevIndex: any) => (
                          <Checkbox
                            key={sublevIndex}
                            label={sublev.name}
                            id={`lever-subject-${sublevIndex}`}
                            checked={selectedlevelSubject.some(item => item.name === sublev.name)}
                            onChange={(isChecked) => handleSelectedlevelSubjectChange(sublev, isChecked)}
                          />
                        ))
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}


          <div className='flex max-w-[500px] pt-5'>
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

export default Package