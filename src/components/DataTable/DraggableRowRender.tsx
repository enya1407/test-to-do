import React, { createContext } from "react";
import {
  Draggable,
  DraggableProvidedDragHandleProps,
} from "react-beautiful-dnd";
import { ITodo } from "../../types/types";

const DragHandleContext =
  createContext<DraggableProvidedDragHandleProps | null>(null);

const DraggableRowRender = (rowData: ITodo[]) => (props: any) => {
  const currentRow = rowData.find((row) => row.id === props["data-row-key"]);

  if (!currentRow) {
    return <tr>{props.children}</tr>;
  }

  const index = rowData.indexOf(currentRow);

  return (
    <Draggable
      draggableId={currentRow.id}
      index={Number(index)}
      // className={classes.draggable} // todo check
    >
      {(provided, snapshot) => (
        <tr
          ref={provided.innerRef}
          {...provided.draggableProps}
          id={currentRow.id}
        >
          <DragHandleContext.Provider value={provided.dragHandleProps ?? null}>
            {props.children}
          </DragHandleContext.Provider>
        </tr>
      )}
    </Draggable>
  );
};
DraggableRowRender.displayName = "DraggableRowRender";

export { DragHandleContext, DraggableRowRender };
