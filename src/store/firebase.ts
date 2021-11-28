import {initializeApp} from "firebase/app";
import {collection, getDocs, getFirestore} from "firebase/firestore";
import {changeLoadingAction, dataFetchedAction, fetchDataAction} from "./actions";
import {ITodo} from "../types/types";
import {QueryDocumentSnapshot} from "@firebase/firestore";
import {Middleware} from "redux";
import {message} from "antd";

const firebaseConfig = {
  apiKey: "AIzaSyCzze7ompdDAQI0RQSQaEopDB8itPqtn0o",
  authDomain: "to-do-list-e2ca9.firebaseapp.com",
  databaseURL:
    "https://to-do-list-e2ca9-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "to-do-list-e2ca9",
  storageBucket: "to-do-list-e2ca9.appspot.com",
  messagingSenderId: "205229194553",
  appId: "1:205229194553:web:1d12427b028b2b285e3ce8",
  measurementId: "G-MQ3KTWJHV1",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getTodos() {
  const todosCol = collection(db, "todos");
  const todosSnapshot = await getDocs(todosCol);

  return todosSnapshot.docs.map<ITodo>((doc: QueryDocumentSnapshot<any>) => doc.data());
}

export const todosMiddleware: Middleware = ({dispatch}) => {
  return function (next) {
    return async function (action) {
      if (action.type === fetchDataAction().type) {
        try {
          const todos = await getTodos();

          return dispatch(dataFetchedAction(todos))
        } catch (error) {
          void message.error("loading error");

          console.log("Error", error);

          return dispatch(changeLoadingAction(false))
        }
      }
      // if (action.type === DELETE_SELECTED_ROWS) {
      //   const { persons, selectedRows } = getState();
      //   const newPersons = persons.filter((el: PersonType) => {
      //     if (selectedRows.includes(el.id)) return false;
      //     return true;
      //   });
      //   return dispatch(endLoading(newPersons));
      // }
      // if (action.type === DELETE_CURRENT_ROW) {
      //   const { persons } = getState();
      //   const newPersons = persons.filter((el: PersonType) => {
      //     if (el.id === action.payload) return false;
      //     return true;
      //   });
      //   return dispatch(endLoading(newPersons));
      // }
      return next(action);
    };
  };
}
