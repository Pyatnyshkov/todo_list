import React, { FC, useState } from "react";
import dayjs from "dayjs";
import { ITodo } from "../../model/todo";
import "./index.css";
import Attachment from "../Attachment";

type Props = {
  todoElem: ITodo;
  removeTodo: (id: string) => void;
  editTodo: (todo: ITodo) => void;
};

const Todo: FC<Props> = ({ todoElem, removeTodo, editTodo }) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [todo, setTodo] = useState<ITodo>(todoElem);

  const handleEdit = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setTodo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleComplete = (): void => {
    setTodo(prevState => ({
      ...prevState,
      completed: !prevState.completed
    }));
  };

  const removeFile = (file: string) => {
    const files = todoElem.files.filter(f => f !== file);
    setTodo(prevState => ({
      ...prevState,
      files
    }));
  };

  const getFiles = () =>
    todoElem.files.map((file: string, i) => (
      <Attachment
        key={i}
        editing={editing}
        data={file}
        removeFile={removeFile}
      />
    ));

  return (
    <div className={`todo`}>
      <div className="todo_header">
        {editing ? (
          <input
            type="text"
            name="title"
            onChange={handleEdit}
            defaultValue={todoElem.title}
            className="todo_input"
            placeholder="Заголовок"
          />
        ) : (
          <div className="todo_title">{todoElem.title}</div>
        )}
        <button
          onClick={() => removeTodo(todoElem.id)}
          className="todo_delete"
        />
      </div>
      {editing ? (
        <div className="todo_desc">
          <input
            name="description"
            type="text"
            onChange={handleEdit}
            defaultValue={todoElem.description}
            placeholder="Описание"
          />
        </div>
      ) : todoElem.description ? (
        <div className="todo_desc">{`Описание: ${todoElem.description}`}</div>
      ) : null}
      <div className="todo_expire">
        {editing ? (
          <>
            <input
              type="text"
              className="expire_date"
              placeholder="Дата"
              defaultValue={dayjs(new Date()).format("DD-MM-YYYY")}
            />
            <input
              type="text"
              className="expire_time"
              placeholder="Время"
              defaultValue={dayjs(new Date()).format("HH-mm")}
            />
          </>
        ) : (
          `Срок выполнения: ${dayjs(todoElem.expired).format(
            "DD-MM-YYYY HH-mm"
          )}`
        )}
      </div>
      {todoElem.files ? (
        <>
          <span className="todo_files-title">Прикрепленные файлы:</span>
          <div className="todo_files-files">{getFiles()}</div>
        </>
      ) : null}
      <div className="todo_control">
        {editing ? (
          <button
            className="todo_control-button"
            onClick={() => {
              setEditing(false);
              editTodo(todo);
            }}
          >
            Сохранить
          </button>
        ) : (
          <>
            {!todoElem.completed && (
              <button
                className="todo_control-button todo_control-button_edit"
                onClick={() => setEditing(true)}
              >
                Редактировать
              </button>
            )}
            <button className="todo_control-button" onClick={handleComplete}>
              {todoElem.completed ? "Открыть" : "Выполнено"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Todo;
