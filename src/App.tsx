import React, { useState, useEffect } from "react";
import { ITodo } from "./model/todo";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  query,
  onSnapshot
} from "firebase/firestore";
import Todo from "./components/Todo";
import Create from "./components/Create";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState<ITodo[]>([] as ITodo[]);

  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsub = onSnapshot(q, querySnapshot => {
      let todos = [] as ITodo[];
      querySnapshot.forEach(elem => {
        todos.push({ ...(elem.data() as ITodo), id: elem.id });
      });
      setTodos(todos);
    });
    return () => unsub();
  }, []);

  const addTodo = async (todo: ITodo) => {
    await addDoc(collection(db, "todos"), todo);
  };

  const removeTodo = async (id: string) => {
    await deleteDoc(doc(db, 'todos', id));
  };

  const editTodo = async (todo: ITodo) => {
    await updateDoc(doc(db, 'todos', todo.id), todo);
  };

  return (
    <>
      <header className="app_header">
        <h1>Список задач</h1>
        <h3>
          Создание, редактирование, удаление задач. <br /> Отслеживание срока
          завершения задачи.
        </h3>
        <p>
          Задачи доступны всем участникам команды и обновляются в режиме
          реального времени на всех устройствах.
        </p>
      </header>
      <Create addTodo={addTodo} id={todos.length + 1} />
      <section className="todo_created">
        {todos.filter((todo: ITodo) => !todo.completed).length ? (
          <>
            <header>
              <h3>
                Текущие задачи{" "}
                <span className="todo_tip">
                  (Красным помечены задачи с истекшим сроком выполнения)
                </span>
              </h3>{" "}
            </header>
            <article className="todo_list">
              {todos
                .filter((todo: ITodo) => !todo.completed)
                .map((todo: ITodo) => (
                  <Todo
                    todoElem={todo}
                    removeTodo={removeTodo}
                    editTodo={editTodo}
                    key={todo.id}
                  />
                ))}
            </article>
          </>
        ) : (
          <p>Нет открытых задач</p>
        )}
      </section>
      {todos.filter((todo: ITodo) => todo.completed).length ? (
        <section className="todo_completed">
          <header>
            <h3>
              Выполненные задачи{" "}
              <span className="todo_tip">
                (Вы можете открыть задачу заново)
              </span>
            </h3>
          </header>
          <article className="todo_list">
            {todos
              .filter((todo: ITodo) => todo.completed)
              .map((todo: ITodo) => (
                <Todo
                  todoElem={todo}
                  removeTodo={removeTodo}
                  editTodo={editTodo}
                  key={todo.id}
                />
              ))}
          </article>
        </section>
      ) : null}
    </>
  );
};

export default App;
