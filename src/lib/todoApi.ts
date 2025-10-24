import axios from "axios";
import type { Todo } from "./todotypes";

const TODO_API_URL = "https://jsonplaceholder.typicode.com/todos";

export async function fetchTodos(): Promise<Todo[]> {
  try {
    const response = await axios.get<Todo[]>(TODO_API_URL);
    console.log("Fetched todos:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching all todos:", error);
    throw error;
  }
}

export async function fetchTodoById(id: number): Promise<Todo> {
  try {
    const response = await axios.get<Todo>(`${TODO_API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching todo with id ${id}:`, error);
    throw error;
  }
}
