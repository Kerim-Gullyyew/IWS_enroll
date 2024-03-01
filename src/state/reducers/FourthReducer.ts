import { FourthActionType } from "../action-types";
import { FourthActionAll } from "../actions/FourthAction";

interface FourthState {
  programm_name: string | null,
  custom_description: string | null,
  curriculum: string | null,
  weeks: { label: string, price: number }[] | null
}

const initialState = {
  programm_name: null,
  custom_description: null,
  curriculum: null,
  weeks: null
};

const FourthReducer = (state: FourthState = initialState, action: FourthActionAll): FourthState => {
  switch (action.type) {
    case FourthActionType.ADD_FOURTH:
      return {
        programm_name: action.payload.programm_name,
        custom_description: action.payload.custom_description,
        curriculum: action.payload.curriculum,
        weeks: action.payload.weeks
      };

    case FourthActionType.CLEAR_FOURTH:
      return {
        programm_name: null,
        custom_description: null,
        curriculum: null,
        weeks: []
      };

    default:
      return state;
  }
};

export default FourthReducer;