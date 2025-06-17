import React, { useState } from 'react';
// BreadcrumbItem es el tipo para los elementos de la barra de navegación (breadcrumbs)
import { type BreadcrumbItem } from '@/types';
//E s el tipo que representa cada tarea individual
import { type Todo } from '@/types/TodoList';
import { AddSimpleTodoForm } from '@/components/TodoList/AddSimpleTodoForm';
import { TodoList } from '@/components/TodoList/TodoList';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { AddRichTodoForm } from '@/components/TodoList/AddRichTodoForm';
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Bar, BarChart } from "recharts"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"



// IndexProps define los props que recibe este componente desde el backend (PHP Controller).
// En este caso, espera un arreglo de todos (tareas) que viene del controlador PHP a través de Inertia.js.
interface IndexProps {
    todos: Todo[]; // Lista de tareas recibidas como prop
}

const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
]
const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#2563eb",
    },
    mobile: {
      label: "Mobile",
      color: "#60a5fa",
    },
  } satisfies ChartConfig

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
    const [isSimpleTodoSelected, setSimpleTodoSelected ] = useState(false);
    

    const handleToggle = () => {
        setSimpleTodoSelected(!isSimpleTodoSelected);
    };

    return (
        // AppLayout recibe los breadcrumbs para mostrar la barra de navegación.
        <AppLayout breadcrumbs={breadcrumbs}>
            {/* Head define el título de la pestaña del navegador */}
            <Head title="Todo List" />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Todo Listtt</h1>

                
                <div className="flex items-center space-x-2">
                    <Switch id="airplane-mode" />
                    <Label htmlFor="airplane-mode">Airplane Mode</Label>
                </div>




                {isSimpleTodoSelected ? <AddSimpleTodoForm /> : <AddRichTodoForm />}

                <TodoList todos={todos} />
            </div>
        </AppLayout>
    );
};

export default Index;
