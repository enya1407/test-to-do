import { ITodo } from "../types/types";
import { editPriorityAction } from "../store/actions";

const getUpdatedPriorities = (
  todos: ITodo[],
  payload: ReturnType<typeof editPriorityAction>["payload"]
) => {
  const todosWithoutDragged = todos.filter(
    ({ id }) => id !== payload.draggableId
  );

  const leftIndex = todos.findIndex((el) => el.id === payload.leftId);

  const draggedIndex = todos.findIndex((el) => el.id === payload.draggableId);

  const isMoveRight = draggedIndex > leftIndex;

  const slicedCount = isMoveRight ? leftIndex + 1 : leftIndex;

  const beforeArray = payload.leftId
    ? todosWithoutDragged.slice(0, slicedCount)
    : [];

  const afterArray = payload.rightId
    ? todosWithoutDragged.slice(slicedCount, todos.length)
    : [];

  const draggedEl = todos.find((el) => el.id === payload.draggableId) as ITodo;

  return [...beforeArray, draggedEl, ...afterArray].map((el, index) => {
    return { ...el, priority: todos.length - index };
  });
};
export default getUpdatedPriorities;
