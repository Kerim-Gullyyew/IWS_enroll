import { CountActionType } from "../action-types";
import { CountActionAll } from "../actions/CountAction";
import { Dispatch } from "redux";

export const addCount = (json: {
    count: number
}) => {
    return (dispatch: Dispatch<CountActionAll>) => {
        dispatch({
            type: CountActionType.ADD_COUNT,
            payload: json
        })
    };
};

export const clearCount = () => {
    return (dispatch: Dispatch<CountActionAll>) => {
        dispatch({
            type: CountActionType.CLEAR_COUNT,
        })
    };
};