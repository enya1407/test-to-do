import { IState } from "../types/types";
import {
  addDataAction,
  changeLoadingAction,
  deleteDataAction,
  editDataAction,
} from "../actions/actions";
import { createRootReducer } from "../utils/createRootReducer";
import { v4 as uuidV4 } from "uuid";

const initialState: IState = {
  isLoading: true,
  data: [
    { id: uuidV4(), value: "не забыть 1", checked: true },
    { id: uuidV4(), value: "не забыть 2", checked: false },
  ],
};

const changeLoadingReducer = (
  state: IState,
  action: ReturnType<typeof changeLoadingAction>
) => ({
  ...state,
  isLoading: action.payload.isLoading,
});

const addDataReducer = (
  state: IState,
  action: ReturnType<typeof addDataAction>
) => {
  console.log(state, action);
  return {
    ...state,
    data: [...state.data, action.payload.newData],
  };
};

const deleteDataReducer = (
  state: IState,
  action: ReturnType<typeof deleteDataAction>
) => {
  const newData = state.data.filter((el) => el.id !== action.payload.id);
  return {
    ...state,
    data: newData,
  };
};
const editDataReducer = (
  state: IState,
  action: ReturnType<typeof editDataAction>
) => {
  const newData = state.data.map((el) =>
    el.id === action.payload.data.id ? action.payload.data : el
  );
  return {
    ...state,
    data: newData,
  };
};

export const rootReducer = createRootReducer(initialState)([
  [changeLoadingReducer, changeLoadingAction],
  [addDataReducer, addDataAction],
  [deleteDataReducer, deleteDataAction],
  [editDataReducer, editDataAction],
]);
