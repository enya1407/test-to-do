import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

interface IDragItem {
  droppableId: string;
  index: number;
}

interface IDragEndInfo {
  draggableId: string;
  destination: IDragItem;
  source: IDragItem;
}

export type TOnDragEnd = (info: IDragEndInfo) => void;

export const DroppableBodyRender = (onDragEnd: TOnDragEnd) => (props: any) =>
  (
    <DragDropContext onDragEnd={onDragEnd} {...props}>
      <Droppable droppableId={"list"}>
        {(provided: any) => (
          <tbody ref={provided.innerRef} {...provided.droppableProps}>
            {props.children}

            {provided.placeholder}
          </tbody>
        )}
      </Droppable>
    </DragDropContext>
  );
DroppableBodyRender.displayName = "DroppableBodyRender";
