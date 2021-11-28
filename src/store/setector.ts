import { IState } from "../types/types";

export const loadingSelector = (state: IState) => state.isLoading;
export const todosSelector = (state: IState) => state.todos;
