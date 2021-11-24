export interface dataType{
  id:string,
  name:string,
  checked:boolean
}
export interface StateType {
  isLoading: boolean;
  data:dataType[]
}