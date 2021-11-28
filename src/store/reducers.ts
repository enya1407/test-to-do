import { IState } from "../types/types";
import {
  addDataAction,
  changeLoadingAction, dataFetchedAction,
  deleteDataAction,
  editDataAction,
  fetchDataAction,
} from "./actions";
import { createRootReducer } from "../utils/createRootReducer";
import { v4 as uuidV4 } from "uuid";

const initialState: IState = {
  isLoading: true,
  todos: [
    { id: uuidV4(), value: "не забыть 1", checked: true },
    { id: uuidV4(), value: "не забыть 2", checked: false },
  ],
};

const changeLoadingReducer = (
  state: IState,
  action: ReturnType<typeof changeLoadingAction>
): IState => ({
  ...state,
  isLoading: action.payload.isLoading,
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

const addDataReducer = (
  state: IState,
  action: ReturnType<typeof addDataAction>
): IState => ({
  ...state,
  todos: [...state.todos, action.payload.todo],
});

const deleteDataReducer = (
  state: IState,
  action: ReturnType<typeof deleteDataAction>
): IState => {
  const newData = state.todos.filter((el) => el.id !== action.payload.id);
  return {
    ...state,
    todos: newData,
  };
};
const editDataReducer = (
  state: IState,
  action: ReturnType<typeof editDataAction>
): IState => {
  const newTodos = state.todos.map((el) =>
    el.id === action.payload.todo.id ? action.payload.todo : el
  );
  return {
    ...state,
    todos: newTodos,
  };
};

export const rootReducer = createRootReducer(initialState)([
  [changeLoadingReducer, changeLoadingAction],
  [fetchDataReducer, fetchDataAction],
  [dataFetchedReducer, dataFetchedAction],
  [addDataReducer, addDataAction],
  [deleteDataReducer, deleteDataAction],
  [editDataReducer, editDataAction],
]);
