import { CountActionType } from "../action-types";
import { CountActionAll } from "../actions/CountAction";

interface CountState {
  count: number | null,

}

const initialState = {
  count: null
};

const CountReducer = (state: CountState = initialState, action: CountActionAll): CountState => {
  switch (action.type) {
    case CountActionType.ADD_COUNT:
      return {
        count: action.payload.count,

      };

    case CountActionType.CLEAR_COUNT:
      return {
        count: 1,
      };

    default:
      return state;
  }
};

export default CountReducer;