export interface Todo {
  userId?: number;
  id: number;
  title: string;
  completed: boolean;
}

export type TodoFormProps = {
  onAddTodo: (todo: Omit<Todo, "id">) => void;
};
