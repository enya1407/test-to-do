import { IState } from "../types/types";

export const commonSelector = (state: IState) => state;
export const loadingSelector = (state: IState): boolean => state.isLoading;
