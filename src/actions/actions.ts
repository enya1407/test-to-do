import { dataType } from "../types/types";

export const changeLoadingAction = (isLoading: boolean) => ({
  type: "CHANGE_LOADING",
  payload: { isLoading },
});
export const addDataAction = (newData: dataType) => ({
  type: "ADD_DATA",
  payload: { newData },
});
export const deleteDataAction = (id: string) => ({
  type: "DELETE_DATA",
  payload: { id },
});
