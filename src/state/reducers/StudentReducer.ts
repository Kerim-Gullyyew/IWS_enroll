import { StudentActionType } from "../action-types";
import { StudentActionAll, Student } from "../actions/StudentAction";

// Define the initial state type
interface StudentState {
  students: Student[];
}

// Initial state
const initialState: StudentState = {
  students: [],
};

// The reducer function
const studentReducer = (state = initialState, action: StudentActionAll): StudentState => {
  switch (action.type) {
    case StudentActionType.ADD_STUDENT:
      // Add the new student to the list
      const existingStudentIndex = state.students.findIndex(student => student.id === action.payload.id);
      if (existingStudentIndex !== -1) {
        // Student exists, so update the existing student's data
        return {
          ...state,
          students: state.students.map((student, index) => {
            if (index === existingStudentIndex) {
              return {...student, studentData: action.payload.studentData}; // Return the updated student data
            }
            return student; // Return the existing student data
          }),
        };
      } else {
        // Student does not exist, add as a new student
        return {
          ...state,
          students: [...state.students, action.payload],
        };
      }

    case StudentActionType.ADD_YEAR: {
      const updatedStudents = state.students.map(student => {
        if (student.id === action.payload.id) {
          // Assuming action.payload.yearData is of type YearData
          return { ...student, year: action.payload.year };
        }
        return student;
      }
      );
      return { ...state, students: updatedStudents }
    }


    case StudentActionType.ADD_PACKAGE: {
      const updatedStudents = state.students.map(student => {
        if (student.id === action.payload.id) {
          // Assuming action.payload.yearData is of type YearData
          return { ...student, package: action.payload.package };
        }
        return student;
      }
      );
      return { ...state, students: updatedStudents }
    }


    case StudentActionType.CLEAR_STUDENT:
      // Clear the student list
      return {
        ...state,
        students: [],
      };

    default:
      return state;
  }
};

export default studentReducer;
