import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { commonSelector } from "../../selector/setector";
import { Button, Checkbox, Input, Table } from "antd";
import { IData } from "../../types/types";
import style from "./DataTable.module.css";
import {
  addDataAction,
  deleteDataAction,
  editDataAction,
} from "../../actions/actions";

const DataTable = () => {
  const { data } = useSelector(commonSelector);
  const dispatch = useDispatch();

  const [edit, setEdit] = useState<IData>({
    id: "",
    value: "",
    checked: false,
  });

  const saveHandler = () => {
    dispatch(
      editDataAction({ id: edit.id, value: edit.value, checked: edit.checked })
    );
    setEdit({ id: "", value: "", checked: false });
  };

  const cancelHandler = () => {
    setEdit({ id: "", value: "", checked: false });
  };
  const editHandler = (record: IData) => {
    setEdit(record);
  };
  const deleteHandler = (id: string) => {
    dispatch(deleteDataAction(id));
  };

  const checkedHandler = (record: IData) => {
    if (record.id === edit.id) {
      setEdit({ id: "", value: "", checked: false });
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
      render: (_: any, record: IData) => (
        <Checkbox
          checked={record.checked}
          onChange={() => checkedHandler(record)}
        ></Checkbox>
      ),
    },
    {
      title: "value",
      dataIndex: "value",
      render: (_: any, record: IData) =>
        edit.id === record.id ? (
          <Input
            value={edit.value}
            onChange={(e) => setEdit({ ...edit, value: e.target.value })}
          ></Input>
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
      render: (_: any, record: IData) =>
        edit.id === record.id ? (
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
      dataSource={data}
      className={style.table}
      pagination={false}
    />
  );
};
export default DataTable;
