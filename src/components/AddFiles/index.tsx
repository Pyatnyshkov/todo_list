// @flow
import React, { Dispatch, SetStateAction } from "react";
import { ITodo } from "../../model/todo";

import "./index.css"

type Props = {
  setTodo: Dispatch<SetStateAction<ITodo>>;
  todo: ITodo;
};
const AddFiles = ({ setTodo, todo }: Props) => {
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
            setTodo((prevTodo: ITodo) => ({
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
  return (
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
  );
};

export default AddFiles;
