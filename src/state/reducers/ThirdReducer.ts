import { ThirdActionType } from "../action-types";
import { ThirdActionAll } from "../actions/ThirdAction";

interface ThirdState {
  full_name: string | null,
  email: string | null,
  number: string | null
}

const initialState = {
  full_name: null,
  email: null,
  number: null
};

const ThirdReducer = (state: ThirdState = initialState, action: ThirdActionAll): ThirdState => {
  switch (action.type) {
    case ThirdActionType.ADD_THIRD:
      return {
        full_name: action.payload.full_name,
        email: action.payload.email,
        number: action.payload.number
      };

    case ThirdActionType.CLEAR_THIRD:
      return {
        full_name: null,
        email: null,
        number: null
      };

    default:
      return state;
  }
};

export default ThirdReducer;