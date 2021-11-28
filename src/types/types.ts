export interface ITodo {
  id: string;
  value: string;
  checked: boolean;
  priority: number
}

export interface IState {
  isLoading: boolean;
  todos: ITodo[];
}
