import "./TodoItem.css";

import dayjs from "dayjs";
import { BsFillArrowDownCircleFill } from "react-icons/bs";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { BsFillPencilFill } from "react-icons/bs";
import { BsClockFill } from "react-icons/bs";
import { BsTrash2 } from "react-icons/bs";
import { useEffect, useState } from "react";

export const TodoItem = ({
  item,
  onUpdate,
  onComplete,
  onDownload,
  onDelete,
  isSubmiting
}) => {
  const [delay, setDelay] = useState(false);
  const formatDate = dayjs(item.date).format("DD-MM-YYYY HH:mm:ss");
console.log(isSubmiting)
  useEffect(() => {
    const isDelay = dayjs().isBefore(item.date);
    setDelay(!isDelay);
  }, []);

  return (
    <div className="todo-card">
      <div className="todo-description">
        <h1 className="todo-title">{item.title}</h1>
        <p className="todo-text">{item.description}</p>
        <p className="todo-subtext">
          <BsClockFill></BsClockFill>
          Завершить до: <span className="date">{formatDate}</span>
        </p>
        {item.fileName && (
          <div className="button-download">
            <button disabled={isSubmiting}  className="button" onClick={onDownload}>
              <BsFillArrowDownCircleFill></BsFillArrowDownCircleFill>
              Прикрепленные файлы
            </button>
          </div>
        )}
      </div>
      <div className="todo-control">
        {delay ? (
          <p className="todo-delay">Просрочено</p>
        ) : (
          <>
            {item.completed ? (
              <div className="todo-completed">Выполнено</div>
            ) : (
              <>
                <button onClick={onComplete} className="button">
                  <BsFillCheckCircleFill></BsFillCheckCircleFill>
                  {"Отметить как выполненное"}
                </button>
                <button disabled={isSubmiting} className="button" onClick={onUpdate}>
                  <BsFillPencilFill></BsFillPencilFill>
                  Изменить
                </button>
              </>
            )}
          </>
        )}
        <button disabled={isSubmiting} onClick={onDelete} className="button">
          <BsTrash2></BsTrash2>
          Удалить
        </button>
      </div>
    </div>
  );
};
