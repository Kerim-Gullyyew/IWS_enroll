import { combineReducers } from "redux";
import Parent1Reducer from "./Parent1Reducers";
import Parent2Reducer from "./Parent2Reducer";
import CountReducer from "./CountReducer";
import StudentReducer from "./StudentReducer";

const reducers = combineReducers({
  parent1: Parent1Reducer,
  parent2: Parent2Reducer,
  count: CountReducer,
  student: StudentReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;