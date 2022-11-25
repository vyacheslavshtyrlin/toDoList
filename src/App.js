import "./App.css";
import { IconContext } from "react-icons";
import { Form } from "./Form/Form";
import { useEffect, useState } from "react";
import { getAllTodos, deleteTodo, editTodo } from "./utils/firestore";
import { deleteFile } from "./utils/storage";
import { TodoItem } from "./TodoItem/TodoItem";
import { BsFillPlusSquareFill } from "react-icons/bs";
function App() {
  const [todos, setTodo] = useState([]);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState({});

  console.log(todos);

  useEffect(() => {
    async function fetchData() {
      const unsubscribe = await getAllTodos(setTodo);
      return () => unsubscribe();
    }
    fetchData();
  }, []);

  const handleUpdate = (i) => {
    setOpen(true);
    setEdit(i);
  };

  const handleDownload = (item) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "blob";
    xhr.onload = (event) => {
      const blob = xhr.response;
    };
    xhr.open("GET", item.link);
    xhr.send();
  };

  const handleDelete = async (item) => {
    try {
      deleteTodo(item.id);
      if (item.file) {
        deleteFile(item.fileBucket);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const toggleComplete = async (item) => {
    try {
      editTodo(
        item.id,
        item.title,
        item.description,
        item.date,
        (item.completed = !item.completed),
        item.fileName,
        item.fileBucket
      );
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <IconContext.Provider
      value={{ color: "black", className: "icon", size: "12px" }}
    >
      <div className="App">
        <button
          className="button-add"
          type="button"
          onClick={() => setOpen(true)}
        >
          <BsFillPlusSquareFill></BsFillPlusSquareFill>
          Добавить задачу
        </button>
        <Form
          setEdit={setEdit}
          setOpen={setOpen}
          isOpen={open}
          edit={edit}
        ></Form>
        {todos.length > 0 ? (
          <div className="todo">
            {todos.map((i) => (
              <>
                <TodoItem
                  onUpdate={() => handleUpdate(i)}
                  onDownload={() => handleDownload(i)}
                  onDelete={() => handleDelete(i)}
                  item={i}
                  key={i.id}
                  onComplete={() => toggleComplete(i)}
                ></TodoItem>
              </>
            ))}
          </div>
        ) : (
          <h1>Нет записей</h1>
        )}
      </div>
    </IconContext.Provider>
  );
}

export default App;
