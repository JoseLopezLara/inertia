import React from 'react';
// BreadcrumbItem es el tipo para los elementos de la barra de navegación (breadcrumbs)
import { type BreadcrumbItem } from '@/types';
//E s el tipo que representa cada tarea individual
import { type Todo } from '@/types/TodoList';
import { AddTodoForm } from '@/components/TodoList/AddTodoForm';
import { TodoList } from '@/components/TodoList/TodoList';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

// IndexProps define los props que recibe este componente desde el backend (PHP Controller).
// En este caso, espera un arreglo de todos (tareas) que viene del controlador PHP a través de Inertia.js.
interface IndexProps {
    todos: Todo[]; // Lista de tareas recibidas como prop
}

// breadcrumbs es un arreglo de objetos que representan la barra de navegación superior.
// Se utiliza para mostrar la ruta de navegación actual en la interfaz.
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Todo List',
        href: route('todos.index'), // ruta generada por Laravel para la lista de tareas
    },
];

// El componente principal de la página de la lista de tareas.
// Recibe los props definidos en IndexProps, en particular el arreglo de todos.
// 'todos' es enviado por el backend (PHP Controller) y recibido aquí como prop.
const Index: React.FC<IndexProps> = ({ todos }) => {
    return (
        // AppLayout recibe los breadcrumbs para mostrar la barra de navegación.
        <AppLayout breadcrumbs={breadcrumbs}>
            {/* Head define el título de la pestaña del navegador */}
            <Head title="Todo List" />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Todo List</h1>
                {/* Formulario para agregar una nueva tarea */}
                <AddTodoForm />
                {/* Componente que muestra la lista de tareas, usando los todos recibidos como prop */}
                <TodoList todos={todos} />
            </div>
        </AppLayout>
    );
};

export default Index;
