import { Parent1ActionType } from "../action-types";
import { Parent1ActionAll } from "../actions/Parent1Action";

interface Parent1State {
  title: string | null,
  firstName: string | null,
  lastName: string | null,
  email: string | null,
  phone_number: string | null,
  family: string | null,
  update: boolean,
  completed: boolean,
}

const initialState = {
  title: null,
  firstName: null,
  lastName: null,
  email: null,
  phone_number: null,
  family: null,
  update: false,
  completed: false
};

const Parent1Reducer = (state: Parent1State = initialState, action: Parent1ActionAll): Parent1State => {
  switch (action.type) {
    case Parent1ActionType.ADD_Parent1:
      return {
        title: action.payload.title,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        phone_number: action.payload.phone_number,
        family: action.payload.family,
        update: action.payload.update,
        completed: true
      };

    case Parent1ActionType.CLEAR_PARENT1:
      return {
        title: null,
        firstName: null,
        lastName: null,
        email: null,
        phone_number: null,
        family: null,
        update: false,
        completed: false
      };

    default:
      return state;
  }
};

export default Parent1Reducer;