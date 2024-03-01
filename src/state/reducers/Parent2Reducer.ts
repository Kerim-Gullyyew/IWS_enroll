import { Parent2ActionType } from "../action-types";
import { Parent2ActionAll } from "../actions/Parent2Action";

interface Parent2State {
  residence: string | null,
  address1: string | null,
  address2: string | null,
  city: string | null,
  postal: string | null,
  completed: boolean
}

const initialState = {
  residence: null,
  address1: null,
  address2: null,
  city: null,
  postal: null,
  completed: false
};

const Parent2Reducer = (state: Parent2State = initialState, action: Parent2ActionAll): Parent2State => {
  switch (action.type) {
    case Parent2ActionType.ADD_Parent2:
      return {
        residence: action.payload.residence,
        address1: action.payload.address1,
        address2: action.payload.address2,
        city: action.payload.city,
        postal: action.payload.postal,
        completed: true
      };
    case Parent2ActionType.CLEAR_PARENT2:
      return {
        residence: null,
        address1: null,
        address2: null,
        city: null,
        postal: null,
        completed: false
      };

    default:
      return state;
  }
};

export default Parent2Reducer;