import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { commonSelector } from "../../selector/setector";
import { Button, Checkbox, Input, Table } from "antd";
import { dataType } from "../../types/types";
import style from "./DataTable.module.css";
import { deleteDataAction } from "../../actions/actions";

const DataTable = () => {
  const { data } = useSelector(commonSelector);
  const dispatch = useDispatch();

  const deleteHandler = (id: string) => {
    dispatch(deleteDataAction(id));
  };
  const [edit, setEdit] = useState<string>("");

  const columns = [
    {
      title: "checked",
      dataIndex: "checked",
      width: 50,
      render: (_: any, record: dataType) => (
        <Checkbox checked={record.checked}></Checkbox>
      ),
    },
    {
      title: "name",
      dataIndex: "name",
      render: (_: any, record: dataType) =>
        edit === record.id ? <Input></Input> : <span>{record.name}</span>,
    },
    {
      title: "action",
      dataIndex: "action",
      width: 170,
      render: (_: any, record: dataType) =>
        edit === record.id ? (
          <>
            <Button>Save</Button> <Button>cancel</Button>
          </>
        ) : (
          <>
            <Button onClick={() => setEdit(record.id)}>Edit</Button>{" "}
            <Button onClick={() => deleteHandler(record.id)}>Delete</Button>
          </>
        ),
    },
  ];
  //
  // const renderEditableCell = (dataIndex: string, record: any) => {
  //   switch (dataIndex) {
  //     case "name":
  //       return (
  //         <Form.Item
  //           rules={[
  //             {
  //               required: true,
  //               validateTrigger: "onSubmit",
  //               validator: (rules, value) => {
  //                 const newRow = data.filter((el: any) => el?.name === "");
  //                 const repeat = data.filter((el: any) => el?.name === value);
  //
  //                 if (!value.trim()) {
  //                   return Promise.reject(new Error("Введите номер площади"));
  //                 } else if (
  //                   (newRow.length > 0 && repeat.length > 0) ||
  //                   repeat.length > 1
  //                 ) {
  //                   return Promise.reject(
  //                     new Error(`Площадь ${value} существует`)
  //                   );
  //                 } else {
  //                   return Promise.resolve();
  //                 }
  //               },
  //             },
  //           ]}
  //           style={{ margin: 0 }}
  //           name={dataIndex}
  //         >
  //           <Input />
  //         </Form.Item>
  //       );
  //   }
  // };
  // const EditableCell = ({
  //   editing,
  //   dataIndex,
  //   title,
  //   inputType,
  //   record,
  //   index,
  //   children,
  //   ...restProps
  // }) => {
  //   const cell = editing ? renderEditableCell(dataIndex, record) : children;
  //   return <td {...restProps}>{cell}</td>;
  // };
  return (
    <Table
      columns={columns}
      dataSource={data}
      className={style.table}
      pagination={false}
      // components={{
      //   body: {
      //     cell: EditableCell,
      //   },
      // }}
    />
  );
};
export default DataTable;
