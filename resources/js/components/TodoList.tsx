import React from 'react';
import { type Todo } from '@/types';
import { TodoItem } from './TodoItem';

interface TodoListProps {
    todos: Todo[];
}

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
    return (
        <ul className="list-disc pl-5 mt-4">
            {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </ul>
    );
};
