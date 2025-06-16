import React, { useState } from 'react';
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

interface TodoItemProps {
    todo: Todo;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleToggle = () => {
        router.patch(
            route('todos.update', todo.id),
            { completed: !todo.completed },
            { preserveScroll: true },
        );
    };

    const handleDeleteConfirm = () => {
        router.delete(route('todos.destroy', todo.id), {
            preserveScroll: true,
            onSuccess: () => setIsDialogOpen(false),
        });
    };

    return (
        <li className="mb-2 flex items-center">
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={handleToggle}
                className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 shrink-0"
            />
            <span className={`flex-grow ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                {todo.title}
            </span>

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