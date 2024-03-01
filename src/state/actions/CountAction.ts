import { CountActionType } from "../action-types";

interface CountAction {
  type: CountActionType.ADD_COUNT;
  payload: {
    count: number,
  };
}

interface ClearCountAction {
  type: CountActionType.CLEAR_COUNT;
}

export type CountActionAll = CountAction | ClearCountAction;