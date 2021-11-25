import React from "react";
import style from "./ToDoWrapper.module.css";
import { commonSelector } from "../../selector/setector";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, InputNumber, Row, Spin } from "antd";
import DataTable from "../DataTable/DataTable";
import { addDataAction } from "../../actions/actions";
import { v4 as uuidV4 } from "uuid";

const ToDoWrapper = () => {
  const [form] = Form.useForm();
  const { isLoading } = useSelector(commonSelector);
  const dispatch = useDispatch();

  if (isLoading) {
    return (
      <div className={style.wrapper}>
        <Spin size="large" />
      </div>
    );
  }

  const submitHandler = async () => {
    try {
      await form.validateFields();
      const newToDo = form.getFieldValue(["input"]);

      dispatch(addDataAction({ id: uuidV4(), value: newToDo, checked: false }));
      form.resetFields(["input"]);
    } catch (errorInfo) {
      console.log("errorInfo:", errorInfo);
    }
  };
  return (
    <div className={style.wrapper}>
      <Form
        form={form}
        className={style.form}
        onValuesChange={(value) => console.log(value)}
        onFinish={() => submitHandler()}
      >
        <Row justify={"space-between"}>
          {" "}
          <Form.Item
            name={"input"}
            className={style.input}
            rules={[
              {
                required: true,
                validator: (rules, value) => {
                  if (!value.trim()) {
                    return Promise.reject(new Error("Please input item"));
                  } else {
                    return Promise.resolve();
                  }
                },
              },
            ]}
          >
            <Input placeholder="input new item" />
          </Form.Item>
          <Form.Item>
            <Button type={"primary"} onClick={submitHandler}>
              Add
            </Button>
          </Form.Item>
        </Row>
      </Form>

      <DataTable />
    </div>
  );
};

export default ToDoWrapper;
