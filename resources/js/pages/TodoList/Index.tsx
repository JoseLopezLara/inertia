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
import { RichTodoList } from '@/components/TodoList/RichTodoList';

interface IndexProps {
    todos: Todo[];
    richTodos: Todo[];
    currentTime?: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Todo List',
        href: route('todos.index'),
    },
];

const Index: React.FC<IndexProps> = ({todos, richTodos}) => {
    //Es null en una primer instancia
    const [dynamicTime, setDynamicTime ] = useState<string | null>(null);
    const [isSimpleTodoSelected, setIsSimpleTodoSelected ] = useState(false);

    // Handler para el switch que cambia entre el modo simple y el modo rica
    const handleToggle = (checked: boolean) => {
        setIsSimpleTodoSelected(checked);
        if (checked){
            router.reload({
                only: ['current_time'],
                onSuccess: (page) => {
                    const props = page.props.current_time as Partial<IndexProps>;
                    setDynamicTime(props as string || null);
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

                {/* Switch para cambiar entre el modo simple y el modo rica */}
                <div className="flex items-center space-x-2 mb-2">
                    <Switch id="simple-todo-mode"
                        checked={isSimpleTodoSelected}
                        onCheckedChange={handleToggle}
                    />
                    <Label htmlFor="simple-todo-mode">Rich Todo</Label>
                </div>

                {isSimpleTodoSelected ? <AddRichTodoForm currentTime={dynamicTime as string || 'Loading...'} /> : <AddSimpleTodoForm />}

                <h2 className="text-xl font-bold my-4">Simple Todo List</h2>
                <TodoList todos={todos} />
                <h2 className="text-xl font-bold my-4">Rich Todo List</h2>
                <RichTodoList richTodos={richTodos} />
            </div>
        </AppLayout>
    );
};

export default Index;
