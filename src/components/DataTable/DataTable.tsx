import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadingSelector, todosSelector } from "../../store/setector";
import { Button, Checkbox, Input, Row, Table } from "antd";
import { ITodo } from "../../types/types";
import style from "./DataTable.module.css";
import {
  changeLoadingAction,
  deleteDataAction,
  editDataAction,
  editPriorityAction,
} from "../../store/actions";
import { DroppableBodyRender, TOnDragEnd } from "./DroppableBodyRender";
import { DraggableRowRender, DragHandleContext } from "./DraggableRowRender";

const PriorityRenderer = () => {
  const dragHandleProps = useContext(DragHandleContext);

  return (
    <Row justify={"center"}>
      <div {...dragHandleProps} style={{ margin: "0 6px" }}>
        :::
      </div>
    </Row>
  );
};

const DataTable = () => {
  const todos = useSelector(todosSelector);
  const isLoading = useSelector(loadingSelector);

  const inputRef = useRef<Input>(null);

  const dispatch = useDispatch();

  const [edit, setEdit] = useState<ITodo | null>(null);

  useEffect(() => {
    if (edit) {
      inputRef.current?.focus();
    }
  }, [edit]);

  const saveHandler = () => {
    dispatch(changeLoadingAction(true));
    dispatch(editDataAction(edit as ITodo));
    setEdit(null);
  };

  const cancelHandler = () => {
    setEdit(null);
  };
  const editHandler = (record: ITodo) => {
    setEdit(record);
  };
  const deleteHandler = (id: string) => {
    dispatch(changeLoadingAction(true));
    dispatch(deleteDataAction(id));
  };

  const checkedHandler = (record: ITodo) => {
    dispatch(changeLoadingAction(true));
    if (edit && record.id === edit.id) {
      setEdit(null);
    }
    dispatch(
      editDataAction({
        id: record.id,
        value: record.value,
        checked: !record.checked,
        priority: record.priority,
      })
    );
  };

  const onDragEnd: TOnDragEnd = ({ draggableId, destination, source }) => {
    const destinationIndex = destination?.index;
    const sourceIndex = source?.index;

    if (
      typeof destinationIndex !== "number" ||
      destinationIndex === sourceIndex
    ) {
      return;
    }

    let leftIndex: number | undefined;
    let rightIndex: number | undefined;

    if (destinationIndex > sourceIndex) {
      leftIndex = destinationIndex === 0 ? undefined : destinationIndex;
      rightIndex =
        destinationIndex === todos.length - 1
          ? undefined
          : Number(destinationIndex) + 1;
    } else {
      leftIndex = destinationIndex === 0 ? undefined : destinationIndex - 1;
      rightIndex =
        destinationIndex === todos.length - 1 ? undefined : destinationIndex;
    }

    const leftId = leftIndex !== undefined ? todos[leftIndex].id : undefined;
    const rightId = rightIndex !== undefined ? todos[rightIndex].id : undefined;
    dispatch(changeLoadingAction(true));
    dispatch(editPriorityAction(draggableId, leftId, rightId));
  };

  const columns = [
    {
      title: "",
      dataIndex: "priority",
      width: 20,
      className: "dragVisible",
      render: PriorityRenderer,
    },

    {
      title: "checked",
      dataIndex: "checked",
      width: 50,
      render: (_: boolean, record: ITodo) => (
        <Checkbox
          checked={record.checked}
          onChange={() => checkedHandler(record)}
        />
      ),
    },
    {
      title: "value",
      dataIndex: "value",
      render: (_: string, record: ITodo) =>
        edit && edit.id === record.id ? (
          <Input
            ref={inputRef}
            value={edit.value}
            onChange={(e) => setEdit({ ...edit, value: e.target.value })}
          />
        ) : (
          <span
            style={{ textDecoration: record.checked ? "line-through" : "none" }}
          >
            {record.value}
          </span>
        ),
    },
    {
      title: "action",
      dataIndex: "action",
      width: 170,
      render: (_: undefined, record: ITodo) =>
        edit && edit.id === record.id ? (
          <>
            <Button onClick={saveHandler}>Save</Button>{" "}
            <Button onClick={cancelHandler}>cancel</Button>
          </>
        ) : (
          <>
            <Button
              disabled={record.checked}
              onClick={() => editHandler(record)}
            >
              Edit
            </Button>{" "}
            <Button
              disabled={record.checked}
              onClick={() => deleteHandler(record.id)}
            >
              Delete
            </Button>
          </>
        ),
    },
  ];

  return (
    <Table
      columns={columns}
      loading={isLoading}
      dataSource={todos}
      className={style.table}
      pagination={false}
      rowKey={({ id }) => id}
      components={{
        body: {
          wrapper: DroppableBodyRender(onDragEnd),
          row: DraggableRowRender(todos),
        },
      }}
    />
  );
};
export default DataTable;
