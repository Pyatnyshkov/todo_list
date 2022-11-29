import React, { FC, useState } from "react";
import { ITodo } from "../../model/todo";
import dayjs from "dayjs";

import Attachment from "../Attachment";
import DateInput from "../Date";
import AddFiles from "../AddFiles";
import "./index.css";

type Props = {
  addTodo: (todo: ITodo) => void;
};
const Create: FC<Props> = ({ addTodo }) => {
  const [todo, setTodo] = useState<ITodo>(({
    expired: dayjs(new Date()).toISOString(),
    files: []
  } as unknown) as ITodo);
  const [newTodo, setNewTodo] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const handleInput = ({
    name,
    value
  }: {
    name: string;
    value: string;
  }): void => {
    if (name === "title") {
      setError(false);
    }
    setTodo(prevTodo => ({ ...prevTodo, [name]: value }));
  };

  const handleAdd = () => {
    if (todo.title) {
      addTodo({ ...todo, completed: false });
      setNewTodo(false);
      setTodo(({
        title: "",
        description: "",
        expired: dayjs(new Date()).toISOString(),
        files: []
      } as unknown) as ITodo);
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
              onChange={({
                target: { name, value }
              }: React.ChangeEvent<HTMLInputElement>) =>
                handleInput({ name, value })
              }
              defaultValue={todo.title}
            />
            {error && <span className="error">Введите название</span>}
          </label>
          <label>
            <span>Дата завершения</span>
            <div className="expired">
              <DateInput handleDate={handleInput} todo={todo} />
            </div>
          </label>
          <label>
            <span>Описание</span>
            <input
              type="text"
              name="description"
              onChange={({
                target: { name, value }
              }: React.ChangeEvent<HTMLInputElement>) =>
                handleInput({ name, value })
              }
              defaultValue={todo.description}
            />
          </label>
          <AddFiles todo={todo} setTodo={setTodo} />
          <div className="todo_create-control">
            <button
              className="todo_create-button"
              onClick={() => setNewTodo(false)}
            >
              Отменить
            </button>
            <button className="todo_create-button" onClick={handleAdd}>
              Добавить
            </button>
          </div>
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

    </section>
  );
};

export default Create;
