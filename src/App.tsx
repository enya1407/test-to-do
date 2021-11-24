import React,{useEffect} from 'react';
import './App.css';
import ToDoWrapper from "./component/ToDoWrapper/ToDoWraper";
import {useDispatch} from "react-redux";
import {changeLoadingAction} from "./actions/actions";
import 'antd/dist/antd.css'

function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(changeLoadingAction(false))
  },[])

  return (
    <div className="App">
      <ToDoWrapper/>
    </div>
  );
}

export default App;
