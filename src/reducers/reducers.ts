import { StateType } from "../types/types";
import {
  addDataAction,
  changeLoadingAction,
  deleteDataAction,
} from "../actions/actions";
import { createRootReducer } from "../utils/createRootReducer";
import { v4 as uuidV4 } from "uuid";

const initialState: StateType = {
  isLoading: true,
  data: [
    { id: uuidV4(), name: "не забыть 1", checked: true },
    { id: uuidV4(), name: "не забыть 2", checked: false },
  ],
};

const changeLoadingReducer = (
  state: StateType,
  action: ReturnType<typeof changeLoadingAction>
) => ({
  ...state,
  isLoading: action.payload.isLoading,
});

const addDataReducer = (
  state: StateType,
  action: ReturnType<typeof addDataAction>
) => {
  console.log(state, action);
  return {
    ...state,
    data: [...state.data, action.payload.newData],
  };
};

const deleteDataReducer = (
  state: StateType,
  action: ReturnType<typeof deleteDataAction>
) => {
  const newData = state.data.filter((el) => el.id !== action.payload.id);
  return {
    ...state,
    data: newData,
  };
};

export const rootReducer = createRootReducer(initialState)([
  [changeLoadingReducer, changeLoadingAction],
  [addDataReducer, addDataAction],
  [deleteDataReducer, deleteDataAction],
]);
