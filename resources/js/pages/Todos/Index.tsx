import React from 'react';
import { type Todo } from '@/types';
import { AddTodoForm } from '@/components/AddTodoForm';
import { TodoList } from '@/components/TodoList';

interface IndexProps {
    todos: Todo[];
}

const Index: React.FC<IndexProps> = ({ todos }) => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Todo List</h1>
            <AddTodoForm />
            <TodoList todos={todos} />
        </div>
    );
};

export default Index;
