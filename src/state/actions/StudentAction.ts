import { StudentActionType } from "../action-types";

// Define the structure of the student data
interface StudentData {
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string;
    residence: string;
    desiredDate: string;
}

// Define the structure of the year and package data
interface YearData {
    title: string;
    data: string;
}

interface PackageData {
    title: string;
    description: string;
    price: string;
    addition: string;
    annual: number,
    half_term: number,
    subjects: {}[],
    optional_subjects: {}[],
    science_subjects: {}[],
    humanities_subjects: {}[],
    other_subjects: {}[],
    level_subjects: {}[],

}

// Define the structure of the student object
export interface Student {
    id: number;
    studentData: StudentData;
    // year: YearData;
    // package: PackageData;
}
export interface StudentYear {
    id: number;
    year: YearData;
}

export interface StudentPackage {
    id: number;
    package: PackageData;
}

// Action interfaces
interface AddStudentAction {
    type: StudentActionType.ADD_STUDENT;
    payload: Student;
}

interface AddYearAction {
    type: StudentActionType.ADD_YEAR;
    payload: StudentYear;
}

interface AddPackageAction {
    type: StudentActionType.ADD_PACKAGE;
    payload: StudentPackage;
}

interface ClearStudentAction {
    type: StudentActionType.CLEAR_STUDENT;
}

// Export the action types
export type StudentActionAll = AddStudentAction | ClearStudentAction | AddYearAction | AddPackageAction;
