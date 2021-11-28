import React, { useEffect } from "react";
import "./App.css";
import ToDoWrapper from "./components/ToDoWrapper/ToDoWraper";
import { useDispatch } from "react-redux";
import "antd/dist/antd.css";
import { fetchDataAction } from "./store/actions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataAction());
  }, []);

  return (
    <div className="App">
      <ToDoWrapper />
    </div>
  );
}

export default App;
