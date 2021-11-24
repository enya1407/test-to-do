import {StateType} from "../types/types";

export const commonSelector = (state: StateType) => state;
export const loadingSelector = (state: StateType): boolean => state.isLoading;