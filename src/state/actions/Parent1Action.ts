import { Parent1ActionType } from "../action-types";

interface Parent1Action {
  type: Parent1ActionType.ADD_Parent1;
  payload: {
    title: string,
    firstName: string, lastName: string, email: string,
    phone_number: string | null,
    family: string,
    update: boolean,
  };
}
interface ClearParent1Action {
  type: Parent1ActionType.CLEAR_PARENT1;
}


export type Parent1ActionAll = Parent1Action | ClearParent1Action;