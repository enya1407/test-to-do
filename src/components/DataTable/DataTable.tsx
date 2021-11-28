import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {todosSelector} from "../../store/setector";
import {Button, Checkbox, Input, Table} from "antd";
import {ITodo} from "../../types/types";
import style from "./DataTable.module.css";
import {deleteDataAction, editDataAction} from "../../store/actions";

const DataTable = () => {
  const todos = useSelector(todosSelector);
  const dispatch = useDispatch();

  const [edit, setEdit] = useState<ITodo | null>(null);

  const saveHandler = () => {
    dispatch(
      editDataAction(edit as ITodo)
    );
    setEdit(null);
  };

  const cancelHandler = () => {
    setEdit(null);
  };
  const editHandler = (record: ITodo) => {
    setEdit(record);
  };
  const deleteHandler = (id: string) => {
    dispatch(deleteDataAction(id));
  };

  const checkedHandler = (record: ITodo) => {
    if (edit && record.id === edit.id) {
      setEdit(null);
    }
    dispatch(
      editDataAction({
        id: record.id,
        value: record.value,
        checked: !record.checked,
      })
    );
  };
  const columns = [
    {
      title: "checked",
      dataIndex: "checked",
      width: 50,
      render: (_: boolean, record: ITodo) => (
        <Checkbox
          checked={record.checked}
          onChange={() => checkedHandler(record)}
        ></Checkbox>
      ),
    },
    {
      title: "value",
      dataIndex: "value",
      render: (_: string, record: ITodo) =>
        edit && edit.id === record.id ? (
          <Input
            value={edit.value}
            onChange={(e) => setEdit({...edit, value: e.target.value})}
          ></Input>
        ) : (
          <span
            style={{textDecoration: record.checked ? "line-through" : "none"}}
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
      dataSource={todos}
      className={style.table}
      pagination={false}
      rowKey={({id}) => id}
    />
  );
};
export default DataTable;
