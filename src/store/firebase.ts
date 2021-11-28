import { initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import {
  addDataAction,
  changeLoadingAction,
  dataFetchedAction,
  deleteDataAction,
  editDataAction,
  editPriorityAction,
  fetchDataAction,
} from "./actions";
import { ITodo } from "../types/types";
import {
  deleteDoc,
  addDoc,
  setDoc,
  getDoc,
  QueryDocumentSnapshot,
} from "@firebase/firestore";
import { AnyAction, Dispatch, Middleware } from "redux";
import { message } from "antd";
import { getType } from "../utils/createRootReducer";
import { todosSelector } from "./setector";
import getUpdatedPriorities from "../utils/getUpdatedPriorities";

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
  const q = query(todosCol, orderBy("priority", "desc"));
  const todosSnapshot = await getDocs(q);

  return todosSnapshot.docs.map<ITodo>((doc: QueryDocumentSnapshot<any>) =>
    doc.data()
  );
}

async function deleteTodo(id: string) {
  const todosCol = collection(db, "todos");
  const q = query(todosCol, where("id", "==", id));
  const todos = await getDocs(q);

  for (const doc of todos.docs) {
    await deleteDoc(doc.ref);
  }
}

async function addTodo(newToDo: ITodo) {
  const todosCol = collection(db, "todos");
  await addDoc(todosCol, newToDo);
}

async function editTodo(newToDo: ITodo) {
  const todosCol = collection(db, "todos");
  const q = query(todosCol, where("id", "==", newToDo.id));
  const todos = await getDocs(q);

  for (const doc of todos.docs) {
    await setDoc(doc.ref, newToDo);
  }
}

async function editTodos(newToDos: ITodo[]) {
  const todosCol = collection(db, "todos");
  const todos = await getDocs(todosCol);

  for (const doc of todos.docs) {
    const newDoc = newToDos.find(({ id }) => id === doc.data().id);
    await setDoc(doc.ref, newDoc);
  }
}

const isDeleteAction = (
  action: AnyAction
): action is ReturnType<typeof deleteDataAction> => {
  return action.type === getType(deleteDataAction);
};
const isAddAction = (
  action: AnyAction
): action is ReturnType<typeof addDataAction> => {
  return action.type === getType(addDataAction);
};
const isEditAction = (
  action: AnyAction
): action is ReturnType<typeof editDataAction> => {
  return action.type === getType(editDataAction);
};
const isEditPriorityAction = (
  action: AnyAction
): action is ReturnType<typeof editPriorityAction> => {
  return action.type === getType(editPriorityAction);
};

export const todosMiddleware: Middleware = ({ dispatch, getState }) => {
  return function (next) {
    return async function (action: AnyAction) {
      if (action.type === getType(fetchDataAction)) {
        try {
          const todos = await getTodos();

          return dispatch(dataFetchedAction(todos));
        } catch (error) {
          void message.error("loading error");

          console.log("Error", error);

          return dispatch(changeLoadingAction(false));
        }
      }
      if (isDeleteAction(action)) {
        try {
          const deleteId = action.payload.id;
          await deleteTodo(deleteId);

          const todos = await getTodos();

          return dispatch(dataFetchedAction(todos));
        } catch (error) {
          void message.error("loading error");

          console.log("Error", error);

          return dispatch(changeLoadingAction(false));
        }
      }
      if (isAddAction(action)) {
        try {
          const newToDo = action.payload.todo;
          await addTodo(newToDo);

          const todos = await getTodos();

          return dispatch(dataFetchedAction(todos));
        } catch (error) {
          void message.error("loading error");

          console.log("Error", error);

          return dispatch(changeLoadingAction(false));
        }
      }
      if (isEditAction(action)) {
        try {
          const modifiedToDo = action.payload.todo;
          await editTodo(modifiedToDo);

          const todos = await getTodos();

          return dispatch(dataFetchedAction(todos));
        } catch (error) {
          void message.error("loading error");

          console.log("Error", error);

          return dispatch(changeLoadingAction(false));
        }
      }
      if (isEditPriorityAction(action)) {
        const state = getState();
        const todos = todosSelector(state);

        const newTodos = getUpdatedPriorities(todos, action.payload);
        try {
          await editTodos(newTodos);

          const todos = await getTodos();

          return dispatch(dataFetchedAction(todos));
        } catch (error) {
          void message.error("loading error");

          console.log("Error", error);

          return dispatch(changeLoadingAction(false));
        }
      }

      return next(action);
    };
  };
};
