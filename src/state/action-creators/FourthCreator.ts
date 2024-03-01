import { FourthActionType } from "../action-types";
import { FourthActionAll } from "../actions/FourthAction";
import { Dispatch } from "redux";

export const addFourth = (json: {
    programm_name: string, 
    custom_description: string | null,
    curriculum: string | null,
    weeks: {label: string, price: number}[],
}) => {
    return (dispatch: Dispatch<FourthActionAll>) => {
        dispatch({
            type: FourthActionType.ADD_FOURTH,
            payload: json
        })
    };
};

export const clearFourth = () => {
    return (dispatch: Dispatch<FourthActionAll>) => {
        dispatch({
            type: FourthActionType.CLEAR_FOURTH,
        })
    };
};