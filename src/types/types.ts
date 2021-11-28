export interface ITodo {
  id: string;
  value: string;
  checked: boolean;
}

export interface IState {
  isLoading: boolean;
  todos: ITodo[];
}
