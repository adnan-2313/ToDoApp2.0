import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete, MdEdit } from "react-icons/md";
import { addToDo, removeItem, updateTodo } from "../../Utils/ToDoSlice";
import { v4 as uuidv4 } from "uuid";
import { TiTick } from "react-icons/ti";
import { IoMdAdd } from "react-icons/io";
const TodoApp = () => {
  const [item, setItem] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setItem(e.target.value);
  };

  const handleClick = () => {
    if (item.trim()) {
      if (editMode) {
        dispatch(updateTodo({ id: editId, text: item }));
        setEditMode(false);
        setEditId(null);
      } else {
        const newItem = { id: uuidv4(), text: item };
        dispatch(addToDo(newItem));
      }
      // Clear input after adding/updating
    }
  };

  const handleDelete = (id) => {
    dispatch(removeItem(id));
  };

  const handleEdit = (id, text) => {
    setItem(text);
    setEditMode(true);
    setEditId(id);
  };

  const itemList = useSelector((state) => state.ToDo.data);

  return (
    <>
      <div className="mb-[20px] flex flex-col items-center text-blue-950 justify-center w-full">
        <div>
          <h1 className="font-bold text-[40px]">ToDo App</h1>
        </div>
        <div className="max-lg:w-[80%] mb-[20px] max-md:w-[95%] flex justify-between w-[60%] bg-purple-300 rounded-md mt-5 shadow-lg">
          <input
            onChange={handleChange}
            type="text"
            value={item}
            className="w-[90%] p-[5px_20px] bg-transparent outline-none"
          />
          <button
            className="h-[50px] flex justify-center items-center text-[40px] max-md:text-[25px] max-md:w-[15%] w-[10%] border-l-2 border-blue-900"
            onClick={handleClick}
          >
            {editMode ? <TiTick /> : <IoMdAdd />}
          </button>
        </div>
        <div className="max-lg:w-[80%] max-md:w-[90%] w-[60%]">
          <h1 className="font-bold text-[22px]">
            <u>Todo List</u>
          </h1>
        </div>
        <div className="mt-5 w-full flex justify-center items-center">
          <div className="max-lg:w-[80%] max-md:w-[95%] flex bg-purple-300 shadow-lg rounded-md p-[20px] justify-center items-center flex-col w-[60%]">
            {itemList.map((value) => (
              <div key={value.id} className="flex flex-row w-full">
                <div className="flex justify-center">
                  <input
                    className="max-md:w-[16px] w-[20px] text-blue-950 "
                    type="checkbox"
                  />
                </div>
                <p
                  className={`flex  flex-row justify-between m-[10px] max-md:text-[15px] text-[18px] border-b-2 w-[100%]`}
                >
                  {value.text}
                  <span className="flex justify-between">
                    <MdEdit
                      className="cursor-pointer max-md:text-[20px] text-[25px] mr-2"
                      onClick={() => handleEdit(value.id, value.text)}
                    />
                    <MdDelete
                      className="cursor-pointer max-md:text-[20px] text-[25px]"
                      onClick={() => handleDelete(value.id)}
                    />
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoApp;
