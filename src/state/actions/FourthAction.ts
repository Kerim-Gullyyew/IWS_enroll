import { FourthActionType } from "../action-types";

interface FourthAction {
  type: FourthActionType.ADD_FOURTH;
  payload: {
    programm_name: string,
    custom_description: string | null,
    curriculum: string | null,
    weeks: { label: string, price: number }[],

  };
}

interface ClearFourthAction {
  type: FourthActionType.CLEAR_FOURTH;
}

export type FourthActionAll = FourthAction | ClearFourthAction;