import { StudentActionType } from "../action-types";
import { StudentActionAll } from "../actions/StudentAction";
import { Dispatch } from "redux";



export const addStudent = (student: {
    id: number,
    studentData: {
        firstName: string,
        middleName: string,
        lastName: string,
        email: string,
        phoneNumber: string,
        dateOfBirth: string,
        residence: string,
        desiredDate: string
    }
}) => {
    return (dispatch: Dispatch<StudentActionAll>) => {
        dispatch({
            type: StudentActionType.ADD_STUDENT,
            payload: student
        })
    };
};

export const addYear = (year: {
    id: number,
    year: {
        title: string,
        data: string
    }
}) => {
    return (dispatch: Dispatch<StudentActionAll>) => {
        dispatch({
            type: StudentActionType.ADD_YEAR,
            payload: year
        })
    };
};

export const addPackage = (packageData: {
    id: number,
    package: {
        title: string,
        description: string,
        price: string,
        addition: string,
        annual: number,
        half_term: number,
        subjects: {}[],
        optional_subjects: {}[],
        science_subjects: {}[],
        humanities_subjects: {}[],
        other_subjects: {}[],
        level_subjects: {}[],
    }
}) => {
    return (dispatch: Dispatch<StudentActionAll>) => {
        dispatch({
            type: StudentActionType.ADD_PACKAGE,
            payload: packageData
        })
    };
};

export const clearStudent = () => {
    return (dispatch: Dispatch<StudentActionAll>) => {
        dispatch({
            type: StudentActionType.CLEAR_STUDENT,
        })
    };
};