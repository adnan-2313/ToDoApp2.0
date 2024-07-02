import { configureStore } from "@reduxjs/toolkit";
import ToDoReducer from "./ToDoSlice";
const AppStore = configureStore({
  reducer: {
    ToDo: ToDoReducer,
  },
});

export default AppStore;
