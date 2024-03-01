import { Parent1ActionType } from "../action-types";
import { Parent1ActionAll } from "../actions/Parent1Action";
import { Dispatch } from "redux";

export const addParent1 = (json: {
    title: string,
    firstName: string, lastName: string, email: string,
    phone_number: string | null,
    family: string,
    update: boolean,
}) => {
    return (dispatch: Dispatch<Parent1ActionAll>) => {
        dispatch({
            type: Parent1ActionType.ADD_Parent1,
            payload: json
        })
    };
};

export const clearParent1 = () => {
    return (dispatch: Dispatch<Parent1ActionAll>) => {
        dispatch({
            type: Parent1ActionType.CLEAR_PARENT1,
        })
    };
};