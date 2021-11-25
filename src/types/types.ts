export interface IData {
  id: string;
  value: string;
  checked: boolean;
}
export interface IState {
  isLoading: boolean;
  data: IData[];
}
