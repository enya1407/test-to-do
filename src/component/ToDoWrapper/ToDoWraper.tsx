import React from 'react'
import style from "./ToDoWrapper.module.css"
import {commonSelector} from "../../selector/setector";
import {useSelector} from "react-redux";
import {Spin} from "antd";

const ToDoWrapper=()=>{
  const { isLoading } = useSelector(
    commonSelector
  );

  if (isLoading) {
    return (
      <div>
        <Spin size="large" />
      </div>
    );
  }
  return (<div className={style.wrapper}>
    <input/>
    <ul><li>1</li><li>2</li></ul>
  </div>)
}
export default ToDoWrapper
