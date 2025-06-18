import React, { useState } from 'react';
// BreadcrumbItem es el tipo para los elementos de la barra de navegación (breadcrumbs)
import { type BreadcrumbItem } from '@/types';
//E s el tipo que representa cada tarea individual
import { type Todo } from '@/types/TodoList';
import { AddSimpleTodoForm } from '@/components/TodoList/AddSimpleTodoForm';
import { TodoList } from '@/components/TodoList/TodoList';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { AddRichTodoForm } from '@/components/TodoList/AddRichTodoForm';
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Bar, BarChart } from "recharts"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import { on } from 'events';

interface IndexProps {
    todos: Todo[];
    currentTime?: string; 
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Todo List',
        href: route('todos.index'), 
    },
];

const Index: React.FC<IndexProps> = ({ todos, currentTime }) => {
    //Es null en una primer instancia
    const [dynamicTime, setDynamicTime ] = useState<string | null>(null);
    const [isSimpleTodoSelected, setSimpleTodoSelected ] = useState(false);

    const handleToggle = (checked: boolean) => {
        setSimpleTodoSelected(checked);

        if (checked){
            router.reload({
                only: ['current_time'],
                onSuccess: (page) => {
                    const props = page.props as Partial<IndexProps>;
                    setDynamicTime(props.currentTime ?? null);
                    console.log(props.currentTime);
                }, onError: (error) => {
                    console.error(error);
                }
            });
        } else {
            setDynamicTime(null);
        }
    };

    return (
        // AppLayout recibe los breadcrumbs para mostrar la barra de navegación.
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Todo List" />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-2">Todo List</h1>
                <div className="flex items-center space-x-2 mb-2">
                    <Switch id="simple-todo-mode" 
                        checked={isSimpleTodoSelected}
                        onCheckedChange={handleToggle}
                    />
                    <Label htmlFor="simple-todo-mode">Rich Todo</Label>
                </div>
                
                {isSimpleTodoSelected ? <AddRichTodoForm currentTime={dynamicTime || 'Loading...'} /> : <AddSimpleTodoForm />}

                <TodoList todos={todos} />
            </div>
        </AppLayout>
    );
};

export default Index;
