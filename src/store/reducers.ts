import { IState } from "../types/types";
import {
  addDataAction,
  changeLoadingAction,
  dataFetchedAction,
  deleteDataAction,
  editDataAction,
  editPriorityAction,
  fetchDataAction,
} from "./actions";
import { createRootReducer } from "../utils/createRootReducer";
import { v4 as uuidV4 } from "uuid";

const initialState: IState = {
  isLoading: true,
  todos: [],
};

const changeLoadingReducer = (
  state: IState,
  action: ReturnType<typeof changeLoadingAction>
): IState => ({
  ...state,
  isLoading: action.payload.isLoading,
});

const editPriorityReducer = (state: IState): IState => ({
  ...state,
  isLoading: true,
});

const fetchDataReducer = (state: IState): IState => ({
  ...state,
  isLoading: true,
});

const dataFetchedReducer = (
  state: IState,
  action: ReturnType<typeof dataFetchedAction>
): IState => ({
  ...state,
  todos: action.payload.todos,
  isLoading: false,
});

export const rootReducer = createRootReducer(initialState)([
  [changeLoadingReducer, changeLoadingAction],
  [fetchDataReducer, fetchDataAction],
  [dataFetchedReducer, dataFetchedAction],
  [editPriorityReducer, editPriorityAction],
]);
