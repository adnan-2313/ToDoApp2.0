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
      
    }
    setItem("");
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
      <div className="pb-[20px] flex flex-col items-center bg-[#121212] h-[100vh]  text-white   w-full">
        <div>
          <h1 className="font-bold text-[#03dac6] max-md:text-[25px] max-lg:text-[30px] text-[40px]">ToDo App</h1>
        </div>
        <div className="max-lg:w-[80%] mb-[20px] max-md:w-[95%] flex justify-between w-[60%] bg-[#1e1e1e] border-black  mt-5 shadow-[0px_-2px_10px_rgba(0,0,0,0.5)]">
          <input
            onChange={handleChange}
            type="text"
             placeholder="Enter your task"
            value={item}
            className="w-[90%] text-white p-[5px_20px] bg-transparent outline-none"
          />
          <button
            className="h-[50px] flex bg-[#03dac6] outline-none border-none justify-center  items-center text-[40px] max-md:text-[25px] max-md:w-[20%] max-lg:w-[15%] w-[10%] rounded-r-md border-blue-900"
            onClick={handleClick}
            onKeyDown={handleClick}
          >
            {editMode ? <TiTick /> : <span className="max-md:text-[12px] text-[15px] text-white ">Add ToDo</span>}
          </button>
        </div>
        <div className="max-lg:w-[80%] max-md:w-[90%] w-[60%]">
          
        </div>
        <div className="mt-5 w-full flex justify-center items-center ">
          <div className="max-lg:w-[80%] min-h-[50vh] bg-[#1e1e1e] max-md:w-[95%] flex shadow-[0px_-2px_10px_rgba(0,0,0,0.5)]  p-[20px]  items-center flex-col w-[60%]">
            {itemList.length === 0 && <span className="my-auto">No data to display</span>}
            {itemList.map((value) => (
              <div key={value.id} className="flex flex-row w-full">
                <div className="flex justify-center">
                  
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
