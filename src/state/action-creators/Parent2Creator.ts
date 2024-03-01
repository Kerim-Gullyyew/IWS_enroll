import { Parent2ActionType } from "../action-types";
import { Parent2ActionAll } from "../actions/Parent2Action";
import { Dispatch } from "redux";

export const addParent2 = (json: {
    residence: string, 
    address1: string,
    address2: string,
    city: string,
    postal: string,
}) => {
    return (dispatch: Dispatch<Parent2ActionAll>) => {
        dispatch({
            type: Parent2ActionType.ADD_Parent2,
            payload: json
        })
    };
};

export const clearParent2 = () => {
    return (dispatch: Dispatch<Parent2ActionAll>) => {
        dispatch({
            type: Parent2ActionType.CLEAR_PARENT2,
        })
    };
};