import { createSlice } from "@reduxjs/toolkit";

// Function to load initial state from local storage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("todos");
    if (serializedState === null) {
      return { data: [] };
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn("Could not load state from local storage", e);
    return { data: [] };
  }
};

// Function to save state to local storage
const saveState = (state) => {
  const serializedState = JSON.stringify(state);
  localStorage.setItem("todos", serializedState);
};

const ToDoSlice = createSlice({
  name: "ToDo",
  initialState: loadState,
  reducers: {
    addToDo: (state, action) => {
      state.data.push(action.payload);
      saveState(state); // Save state after adding
    },
    removeItem: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
      saveState(state); // Save state after removing
    },
    updateTodo: (state, action) => {
      const { id, text } = action.payload;
      const item = state.data.find((item) => item.id === id);
      if (item) {
        item.text = text;
        saveState(state); // Save state after updating
      }
    },
  },
});

export const { addToDo, removeItem, updateTodo } = ToDoSlice.actions;
export default ToDoSlice.reducer;
