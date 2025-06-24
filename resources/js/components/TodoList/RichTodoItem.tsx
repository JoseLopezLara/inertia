import React, { useState } from 'react';
// Importa el tipo Todo que representa una tarea individual
import { type Todo } from '@/types/TodoList';
import { router } from '@inertiajs/react';
import { Badge } from "@/components/ui/badge"
import {formatTimeToHhMm} from "@/utils/formaTimeToHhMm"
import { DeleteTodoDialog } from '@/components/TodoList/DeleteTodoDialog';
import { EditTodoDialog } from '@/components/TodoList/EditTodoDialog';


interface RichTodoItemProps {
    todo: Todo;
}

// Componente que representa un ítem/tarea en la lista de tareas
export const RichTodoItem: React.FC<RichTodoItemProps> = ({ todo }) => {
    // Estado local para controlar si el diálogo de confirmación de borrado está abierto
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const displayTime = formatTimeToHhMm(todo.date + ' ' + todo.time);

    // Cambia el estado de completado de la tarea (checkbox)
    // Hace una petición PATCH al backend usando Inertia.js
    const handleToggle = () => {
        router.patch(
            route('todos.update', todo.id),
            { completed: !todo.completed },
            { preserveScroll: true },
        );
    };

    // Confirma y ejecuta el borrado de la tarea
    const handleDeleteConfirm = () => {
        router.delete(route('todos.update', todo.id), {
            preserveScroll: true,
            onSuccess: () => setIsDialogOpen(false), // Cierra el diálogo al borrar
        });
    };

    // Confirma y ejecuta la edición de la tarea
    const handleEditConfirm = (title:string, description:string) => {
        console.log("Editando tarea: " + title + " " + description);

        router.patch(
            route('todos.update', todo.id),
            {
                title: title,
                description: description,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    console.log("Se edito");
                    setIsEditDialogOpen(false);
                }
            }
        );
    };

    return (
        // Renderiza la tarea individual con checkbox y botón de borrar
        <li className="mb-2 flex items-center">
            <div className='flex flex-col space-y-2 w-full'>

                {/* Botones de acciones, checkbox y botón de borrar */}
                <div className='flex justify-evenly w-full items-center'>
                    {/* Checkbox para marcar como completada */}
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={handleToggle}
                        className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 shrink-0"
                    />

                    {/* Título de la tarea*/}
                    <span className={`flex-grow ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                        {todo.title}
                    </span>

                    {/* Componentes para abrir el diálogo de confirmación de borrado y edición */}
                    <div className='flex justify-center items-center'>
                        <DeleteTodoDialog
                            open={isDialogOpen}
                            onOpenChange={setIsDialogOpen}
                            onConfirm={handleDeleteConfirm}
                            todoTitle={todo.title}
                        />

                        <EditTodoDialog
                            openEditDiaog={isEditDialogOpen}
                            onOpenEditDiaogChange={setIsEditDialogOpen}
                            onConfirm={handleEditConfirm}
                            todoTitle={todo.title}
                            todoDescription={todo.description!}
                        />
                    </div>
                </div>

                {/* Descripción de la tarea */}
                <span className={`flex-grow pl-6 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                    {todo.description}
                </span>

                <div className='flex w-full justify-end pr-6 -mt-2.5 mb-2'>
                    <Badge><span className='text-xs'>{displayTime}</span></Badge>
                </div>

            </div>


        </li>
    );
};
