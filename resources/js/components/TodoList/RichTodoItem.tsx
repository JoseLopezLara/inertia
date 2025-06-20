import React, { useState } from 'react';
// Importa el tipo Todo que representa una tarea individual
import { type Todo } from '@/types/TodoList';
import { router } from '@inertiajs/react';
import {Trash2 } from 'lucide-react';
import { Badge } from "@/components/ui/badge"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

// Props que recibe este componente: una tarea (todo) individual
interface RichTodoItemProps {
    todo: Todo; // Tarea individual a mostrar
}

// Componente que representa un ítem/tarea en la lista de tareas
export const RichTodoItem: React.FC<RichTodoItemProps> = ({ todo }) => {
    // Estado local para controlar si el diálogo de confirmación de borrado está abierto
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Cambia el estado de completado de la tarea (checkbox)
    // Hace una petición PATCH al backend usando Inertia.js
    const handleToggle = () => {
        router.post(
            route('todos.update', todo.id),
            { completed: !todo.completed },
            { preserveScroll: true },
        );
    };

    // Confirma y ejecuta el borrado de la tarea
    // Hace una petición DELETE al backend usando Inertia.js
    const handleDeleteConfirm = () => {
        router.delete(route('todos.destroy', todo.id), {
            preserveScroll: true,
            onSuccess: () => setIsDialogOpen(false), // Cierra el diálogo al borrar
        });
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

                    {/* Botón para abrir el diálogo de confirmación de borrado */}
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <button
                                aria-label={`Delete todo: ${todo.title}`}
                                className="ml-4 text-gray-400 hover:text-red-500 shrink-0"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Delete Todo</DialogTitle>
                                <DialogDescription>
                                    Are you sure you want to delete this todo?
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                                    Cancel
                                </Button>
                                <Button variant="destructive" onClick={handleDeleteConfirm}>
                                    Delete
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Descripción de la tarea */}
                <span className={`flex-grow pl-6 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                    {/* {todo.title} */}
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </span>

                <div className='flex w-full justify-end pr-6 -mt-2.5 mb-2'>
                    <Badge><span className='text-xs'>19/06/2025 21:57hrs</span></Badge>
                </div>

            </div>


        </li>
    );
};
