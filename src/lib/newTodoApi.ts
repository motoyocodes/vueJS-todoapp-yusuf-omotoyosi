import axios from "axios";
import type { Todo } from "./todotypes";

const TODO_API_URL = "https://jsonplaceholder.typicode.com/todos";

export async function updateATodo(
  id: number,
  updatedTodo: Partial<Todo>
): Promise<Todo> {
  const res = await axios.put<Todo>(`${TODO_API_URL}/${id}`, updatedTodo);
  return res.data;
}
