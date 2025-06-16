import React, { useState } from 'react';
import { type Todo } from '@/types';
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
            `/todos/${todo.id}`,
            { completed: !todo.completed },
            { preserveScroll: true },
        );
    };

    const handleDeleteConfirm = () => {
        router.delete(`/todos/${todo.id}`, {
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
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete the todo item:
                            <strong className="block mt-2">{todo.title}</strong>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button variant="destructive" onClick={handleDeleteConfirm}>
                            Confirm Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </li>
    );
};
