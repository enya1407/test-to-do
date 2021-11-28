import React from "react";
import style from "./ToDoWrapper.module.css";
import { loadingSelector, todosSelector } from "../../store/setector";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, Row, Spin } from "antd";
import DataTable from "../DataTable/DataTable";
import { v4 as uuidV4 } from "uuid";
import { addDataAction, changeLoadingAction } from "../../store/actions";

const ToDoWrapper = () => {
  const [form] = Form.useForm();

  const todos = useSelector(todosSelector);

  const dispatch = useDispatch();

  const submitHandler = async () => {
    try {
      dispatch(changeLoadingAction(true));
      await form.validateFields();
      const newToDo = form.getFieldValue(["input"]);

      dispatch(
        addDataAction({
          id: uuidV4(),
          value: newToDo,
          checked: false,
          priority: todos.length > 0 ? todos[0].priority + 1 : 1,
        })
      );
      form.resetFields(["input"]);
    } catch (errorInfo) {
      console.log("errorInfo:", errorInfo);
    }
  };
  return (
    <div className={style.wrapper}>
      <Form form={form} className={style.form} onFinish={() => submitHandler()}>
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
