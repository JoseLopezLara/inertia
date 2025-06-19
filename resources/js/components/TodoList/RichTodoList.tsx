import React from 'react';
// Importa el tipo Todo que representa una tarea individual
import { type Todo } from '@/types/TodoList';
import { TodoItem } from './TodoItem';

// Props que recibe este componente: un arreglo de tareas
interface TodoListProps {
    rich_todos: Todo[]; // Lista de tareas a mostrar
}

// Componente que renderiza la lista de tareas
export const RichTodoList: React.FC<TodoListProps> = ({ rich_todos }) => {
    return (
        // Renderiza cada tarea usando el componente TodoItem
        <ul className="list-disc pl-5 mt-4">
            {rich_todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </ul>
    );
};