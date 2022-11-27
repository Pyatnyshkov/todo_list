import React, { FC, useState, useEffect } from "react";
import { ITodo } from "../../model/todo";

import "./index.css";
import dayjs from "dayjs";
import Attachment from "../Attachment";

type Props = {
  addTodo: (todo: ITodo) => void;
  id: number;
};
const Create: FC<Props> = ({ addTodo, id }) => {
  const [todo, setTodo] = useState<ITodo>(({
    id,
    expired: new Date(),
    files: []
  } as unknown) as ITodo);
  const [newTodo, setNewTodo] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    if (name === "title") {
      setError(false);
    }
    setTodo(prevTodo => ({ ...prevTodo, [name]: value }));
  };
  const handleDate = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(e.target.value);
    // setTodo(prevTodo => ({ ...prevTodo, expired: date }));
  };
  const handleFile = (e: React.FormEvent<HTMLInputElement>): void => {
    if (e.currentTarget.files) {
      let newFiles: string[] = todo.files;
      const files = e.currentTarget.files;
      const reader = new FileReader();
      const readFile = (index: number) => {
        if (index < files.length) {
          const file = files[index];
          reader.readAsDataURL(file);
          reader.onload = event => {
            if (event.target) {
              const dataURL = event.target.result;
              if (typeof dataURL === "string") {
                newFiles.push(dataURL);
              }
            }
            setTodo(prevTodo => ({
              ...prevTodo,
              files: newFiles
            }));
            readFile(index + 1);
          };
        }
      };
      readFile(0);
    }
  };

  useEffect(() => {
    return () =>
      setTodo((({
        id,
        expired: new Date(),
        files: []
      } as unknown) as ITodo) as ITodo);
  }, [id]);

  const handleAdd = () => {
    if (todo.title) {
      addTodo(todo);
      setNewTodo(false);
    } else {
      setError(true);
    }
  };

  const removeFile = (file: string) => {
    const newFiles = todo.files.filter(f => f !== file);
    setTodo(prevTodo => ({
      ...prevTodo,
      files: newFiles
    }));
  };

  const getFiles = () =>
    todo.files.map((file: string, i) => (
      <Attachment key={i} data={file} removeFile={removeFile} />
    ));

  return !newTodo ? (
    <section className="todo_add">
      <header>
        Создайте задачу и укажите срок ее выполнения. Вы таже можете прикрепить
        к задаче необходимые файлы.
      </header>
      <button onClick={() => setNewTodo(true)}>Создать</button>
    </section>
  ) : (
    <section className="todo_create">
      <div className="todo_create-blocks">
        <div className="todo_create-inputs">
          <label>
            <span>Заголовок</span>
            <input
              type="text"
              name="title"
              onChange={handleInput}
              defaultValue={todo.title}
            />
            {error && <span className="error">Введите название</span>}
          </label>
          <label>
            <span>Дата завершения</span>
            <div className="expired">
              <input
                type="text"
                name="exp_date"
                onChange={handleDate}
                defaultValue={dayjs(todo.expired).format("DD-MM-YYYY")}
              />
              <input
                type="text"
                name="exp_time"
                onChange={handleDate}
                defaultValue={dayjs(todo.expired).format("HH-mm")}
              />
            </div>
          </label>
          <label>
            <span>Описание</span>
            <input
              type="text"
              name="description"
              onChange={handleInput}
              defaultValue={todo.description}
            />
          </label>
          <label>
            <input
              className="todo_file-input"
              type="file"
              onInput={handleFile}
              multiple
              accept=".jpg,.png"
            />
            <span>Выберите файл (.jpg,.png)</span>
          </label>
        </div>
        <div className="todo_create-files">
          {todo.files.length ? (
            <>
              <span>Выбранные файлы</span>
              <div className="todo_create-files_files">{getFiles()}</div>
            </>
          ) : null}
        </div>
      </div>
      <button className="todo_create-button" onClick={handleAdd}>
        Добавить
      </button>
    </section>
  );
};

export default Create;
