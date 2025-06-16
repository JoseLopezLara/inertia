import React from 'react';
import { type Todo } from '@/types';
import { router } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';

interface TodoItemProps {
    todo: Todo;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
    const handleToggle = () => {
        router.patch(`/todos/${todo.id}`, {
            completed: !todo.completed,
        }, {
            preserveScroll: true, // Prevents the page from scrolling to the top
        });
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            router.delete(`/todos/${todo.id}`, {
                preserveScroll: true,
            });
        }
    };

    return (
        <li className={`mb-2 flex items-center ${todo.completed ? 'line-through text-gray-500' : ''}`}>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={handleToggle}
                className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="flex-grow">{todo.title}</span>
            <button onClick={handleDelete} className="text-gray-400 hover:text-red-500 ml-4">
                <Trash2 className="h-4 w-4" />
            </button>
        </li>
    );
};
