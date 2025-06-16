import React from 'react';
import { type BreadcrumbItem } from '@/types';
import { type Todo } from '@/types/TodoList';
import { AddTodoForm } from '@/components/TodoList/AddTodoForm';
import { TodoList } from '@/components/TodoList/TodoList';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

interface IndexProps {
    todos: Todo[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Todo List',
        href: route('todos.index'),
    },
];

const Index: React.FC<IndexProps> = ({ todos }) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Todo List" />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Todo List</h1>
                <AddTodoForm />
                <TodoList todos={todos} />
            </div>
        </AppLayout>
    );
};

export default Index;
