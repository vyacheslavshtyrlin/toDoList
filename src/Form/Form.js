import { useState, useRef, useEffect } from "react";
import dayjs from "dayjs";
import { uploadFile } from "../utils/storage";
import { addTodo, editTodo } from "../utils/firestore";
import "./form.css";

import { BsXOctagon } from "react-icons/bs";

export const Form = ({ edit, isOpen, setOpen, setEdit }) => {
  const today = dayjs().format("YYYY-MM-DDTHH:mm");
  const defaultValues = {
    description: "",
    title: "",
    date: today,
    completed: false,
    fileName: "",
    file: false,
  };
  const fileRef = useRef();
  const isEdit = Object.keys(edit).length > 0;
  const [formData, setFormData] = useState(isEdit ? edit : defaultValues);
  const [isSubmiting, setSubmiting] = useState(false);
  const styleButton = {
    cursor: "pointer",
    width: "20px",
    height: "20px",
    position: "absolute",
    top: "3%",
    right: "2%",
  };
  const updateFormField = (e, field) => {
    setFormData((prevState) => ({ ...prevState, [field]: e.target.value }));
  };

  useEffect(() => {
    if (isEdit) {
      setFormData(edit);
    }
  }, [isOpen, edit]);

  const setFileData = (target) => {
    console.log(target);
    const file = target.files[0];
    setFormData((prevState) => ({ ...prevState, fileName: file.name }));
    setFormData((prevState) => ({ ...prevState, file }));
  };

  const cleanForm = () => {
    setFormData(defaultValues);
    fileRef.current.value = null;
    setOpen(false);
    setSubmiting(false);
    setEdit({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmiting(true);
    try {
      if (formData.file === false) {
        await addTodo(
          formData.title,
          formData.description,
          formData.date,
          formData.completed,
          formData.fileName,
          (formData.file = false)
        );
      } else {
        const bucket = await uploadFile(formData.file);
        await addTodo(
          formData.title,
          formData.description,
          formData.date,
          formData.completed,
          formData.fileName,
          bucket
        );
      }
    } catch (e) {
      console.log(e);
    }
    cleanForm();
  };

  const disableButton = () => {
    if (
      formData.title.trim().length > 0 &&
      formData.description.trim().length > 0
    ) {
      return false;
    } else {
      return true;
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    setSubmiting(true);
    try {
      if (formData.file === false) {
        await editTodo(
          edit.id,
          formData.title,
          formData.description,
          formData.date,
          formData.completed,
          formData.fileName,
          (formData.file = false)
        );
      } else {
        const bucket = await uploadFile(formData.file);
        await editTodo(
          edit.id,
          formData.title,
          formData.description,
          formData.date,
          formData.completed,
          formData.fileName,
          bucket
        );
      }
    } catch (e) {
      console.log(e);
    }
    cleanForm();
  };

  return (
    <div className={`popup ${isOpen && "popup_opened"}`}>
      <form
        className="form"
        noValidate
        onSubmit={isEdit ? handleEdit : handleSubmit}
      >
        <input
          className="form-input"
          placeholder="Заголовок"
          value={formData.title}
          onChange={(e) => updateFormField(e, "title")}
          type="text"
        ></input>
        <input
          className="form-input"
          placeholder="Описание"
          value={formData.description}
          onChange={(e) => updateFormField(e, "description")}
          type="text"
        ></input>
        <input
          value={formData.date}
          min={today}
          onChange={(e) => updateFormField(e, "date")}
          type="datetime-local"
        ></input>
        <input
          onInput={(e) => {
            setFileData(e.target);
          }}
          ref={fileRef}
          type="file"
        ></input>
        {isEdit && (
          <div>
            {formData.fileName ? (
              <p>Прикрепленный файл: {formData.fileName}</p>
            ) : (
              <p>Нет прикрепленных файлов</p>
            )}
          </div>
        )}
        {isSubmiting ? (
          <button className="button" disabled={true} type="submit">
            Отправка..
          </button>
        ) : (
          <button disabled={disableButton()} className={disableButton() ? 'button button_disabled' : 'button'} type="submit">
            {isEdit ? "Изменить" : "Добавить"}
          </button>
        )}
        <BsXOctagon
          onClick={() => cleanForm()}
          style={styleButton}
        ></BsXOctagon>
      </form>
    </div>
  );
};
