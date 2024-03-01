import { ThirdActionType } from "../action-types";

interface ThirdAction {
  type: ThirdActionType.ADD_THIRD;
  payload: {
    full_name: string,
    email: string,
    number: string | null
  };
}

interface ClearThirdAction {
  type: ThirdActionType.CLEAR_THIRD;
}

export type ThirdActionAll = ThirdAction | ClearThirdAction;