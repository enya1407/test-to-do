import { IData } from "../types/types";

export const changeLoadingAction = (isLoading: boolean) => ({
  type: "CHANGE_LOADING",
  payload: { isLoading },
});
export const addDataAction = (newData: IData) => ({
  type: "ADD_DATA",
  payload: { newData },
});
export const deleteDataAction = (id: string) => ({
  type: "DELETE_DATA",
  payload: { id },
});
export const editDataAction = (data: IData) => ({
  type: "EDIT_DATA",
  payload: { data },
});
