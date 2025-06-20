import React, { useState } from 'react';
// Importa el tipo Todo que representa una tarea individual
import { type Todo } from '@/types/TodoList';
import { router } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
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
interface TodoItemProps {
    todo: Todo; // Tarea individual a mostrar
}

// Componente que representa un ítem/tarea en la lista de tareas
export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
    // Estado local para controlar si el diálogo de confirmación de borrado está abierto
    const [isDialogOpen, setIsDialogOpen] = useState(false);

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
            {/* Checkbox para marcar como completada */}
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={handleToggle}
                className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 shrink-0"
            />
            {/* Título de la tarea, tachado si está completada */}
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
        </li>
    );
};
