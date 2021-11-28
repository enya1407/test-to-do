import { ITodo } from "../types/types";

export const changeLoadingAction = (isLoading: boolean) => ({
  type: "CHANGE_LOADING",
  payload: { isLoading },
});
export const fetchDataAction = () => ({
  type: "FETCH_DATA",
});
export const dataFetchedAction = (todos: ITodo[]) => ({
  type: "DATA_FETCHED",
  payload: { todos },
});
export const addDataAction = (todo: ITodo) => ({
  type: "ADD_DATA",
  payload: { todo },
});
export const deleteDataAction = (id: string) => ({
  type: "DELETE_DATA",
  payload: { id },
});
export const editDataAction = (todo: ITodo) => ({
  type: "EDIT_DATA",
  payload: { todo },
});
