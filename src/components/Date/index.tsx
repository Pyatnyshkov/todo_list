import React from "react";
import dayjs from "dayjs";
import { ITodo } from "../../model/todo";

type Props = {
  todo: ITodo;
  handleDate: (data: { name: string; value: string }) => void;
};
const DateInput = ({ todo, handleDate }: Props) => {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let { name, value } = e.target;
    if (name === "exp_date") {
      value = dayjs(todo.expired)
        .set("D", dayjs(value).date())
        .set("M", dayjs(value).month())
        .set("y", dayjs(value).year())
        .toISOString();
      name = "expired";
    }
    if (name === "exp_time") {
      value = dayjs(todo.expired)
        .set("h", +value.split(":")[0])
        .set("m", +value.split(":")[1])
        .toISOString();
      name = "expired";
    }
    handleDate({ name, value });
  };
  return (
    <>
      <input
        type="date"
        name="exp_date"
        min={dayjs(todo.expired).format("YYYY-MM-DD")}
        onChange={handleInput}
        defaultValue={dayjs(todo.expired).format("YYYY-MM-DD")}
      />
      <input
        type="time"
        name="exp_time"
        onChange={handleInput}
        defaultValue={dayjs(todo.expired).format("HH:mm")}
      />
    </>
  );
};

export default DateInput;
