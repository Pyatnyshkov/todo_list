import React, { FC, useState } from "react";
import dayjs from "dayjs";
import { ITodo } from "../../model/todo";
import "./index.css";
import Attachment from "../Attachment";
import DateInput from "../Date";
import AddFiles from "../AddFiles";

type Props = {
  todoElem: ITodo;
  removeTodo: (id: string) => void;
  editTodo: (todo: ITodo) => void;
};

const Todo: FC<Props> = ({ todoElem, removeTodo, editTodo }) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [todo, setTodo] = useState<ITodo>(todoElem);

  const handleEdit = ({
    name,
    value
  }: {
    name: string;
    value: string;
  }): void => {
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
    editTodo({ ...todo, completed: !todo.completed });
  };

  const removeFile = (file: string) => {
    const files = todo.files.filter(f => f !== file);
    setTodo(prevState => ({
      ...prevState,
      files
    }));
  };

  const getFiles = () =>
    todo.files.map((file: string, i) => (
      <Attachment
        key={i}
        editing={editing}
        data={file}
        removeFile={removeFile}
      />
    ));

  return (
    <div
      className={`todo ${
        !todo.completed && dayjs(todo.expired) < dayjs(new Date()) ? "expired" : ""
      }`}
    >
      <div className="todo_header">
        {editing ? (
          <input
            type="text"
            name="title"
            onChange={({
              target: { name, value }
            }: React.ChangeEvent<HTMLInputElement>) =>
              handleEdit({ name, value })
            }
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
      <div className="todo_cont">
        {editing ? (
          <div className="todo_desc">
            <input
              name="description"
              type="text"
              onChange={({
                target: { name, value }
              }: React.ChangeEvent<HTMLInputElement>) =>
                handleEdit({ name, value })
              }
              defaultValue={todoElem.description}
              placeholder="Описание"
            />
          </div>
        ) : todoElem.description ? (
          <div className="todo_desc">{`Описание: ${todoElem.description}`}</div>
        ) : null}
        <div className="todo_expire">
          {editing ? (
            <DateInput handleDate={handleEdit} todo={todo} />
          ) : (
            `Срок выполнения: ${dayjs(todoElem.expired).format(
              "DD.MM.YYYY HH:mm"
            )}`
          )}
        </div>
        {todo.files.length ? (
          <div className="todo_files">
            <span className="todo_files-title">Прикрепленные файлы:</span>
            <div className="todo_files-files">{getFiles()}</div>
          </div>
        ) : null}
        {editing ? <AddFiles setTodo={setTodo} todo={todo} /> : null}
      </div>
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
