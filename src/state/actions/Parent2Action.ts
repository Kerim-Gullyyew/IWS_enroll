import { Parent2ActionType } from "../action-types";

interface Parent2Action {
  type: Parent2ActionType.ADD_Parent2;
  payload: {
    residence: string, 
    address1: string,
    address2: string,
    city: string,
    postal: string,

  };
}

interface ClearParent2Action {
  type: Parent2ActionType.CLEAR_PARENT2;
}

export type Parent2ActionAll = Parent2Action | ClearParent2Action;