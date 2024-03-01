import { ThirdActionType } from "../action-types";
import { ThirdActionAll } from "../actions/ThirdAction";
import { Dispatch } from "redux";

export const addThird = (json: {
    full_name: string, email: string,
    number: string | null
}) => {
    return (dispatch: Dispatch<ThirdActionAll>) => {
        dispatch({
            type: ThirdActionType.ADD_THIRD,
            payload: json
        })
    };
};

export const clearThird = () => {
    return (dispatch: Dispatch<ThirdActionAll>) => {
        dispatch({
            type: ThirdActionType.CLEAR_THIRD,
        })
    };
};