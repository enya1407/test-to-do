import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { rootReducer } from "./reducers";
import {todosMiddleware} from "./firebase";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, todosMiddleware))
);

export default store;
