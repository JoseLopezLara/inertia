import React from 'react';
// Importa el tipo Todo que representa una tarea individual
import { type Todo } from '@/types/TodoList';
import { TodoItem } from './TodoItem';

// Props que recibe este componente: un arreglo de tareas
interface TodoListProps {
    todos: Todo[]; // Lista de tareas a mostrar
}

// Componente que renderiza la lista de tareas
export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
    return (
        // Renderiza cada tarea usando el componente TodoItem
        <ul className="list-disc pl-5 mt-4">
            {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </ul>
    );
};