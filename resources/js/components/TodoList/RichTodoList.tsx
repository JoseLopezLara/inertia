import React from 'react';
// Importa el tipo Todo que representa una tarea individual
import { type Todo } from '@/types/TodoList';
import { RichTodoItem } from './RichTodoItem';

// Props que recibe este componente: un arreglo de tareas
interface RichTodoListProps {
    richTodos: Todo[]; // Lista de tareas a mostrar
}

// Componente que renderiza la lista de tareas
export const RichTodoList: React.FC<RichTodoListProps> = ({ richTodos }) => {
    return (
        // Renderiza cada tarea usando el componente TodoItem
        <ul className="list-disc pl-5 mt-4">
            {richTodos.map((todo) => (
                <RichTodoItem key={todo.id} todo={todo} />
            ))}
        </ul>
    );
};
