import {StateType} from "../types/types";
import {changeLoadingAction} from "../actions/actions";
import {createRootReducer} from "../utils/createRootReducer";

const initialState: StateType = {
  isLoading: true,
}

const changeLoadingReducer = (
  state: StateType,
  action: ReturnType<typeof changeLoadingAction>
) => ({
  ...state,
  isLoading: action.payload.isLoading,
});

export const rootReducer = createRootReducer(initialState)([[changeLoadingReducer, changeLoadingAction],])