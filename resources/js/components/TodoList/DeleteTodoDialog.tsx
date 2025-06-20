import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface DeleteTodoDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    todoTitle: string;
}

export const DeleteTodoDialog: React.FC<DeleteTodoDialogProps> = ({ open, onOpenChange, onConfirm, todoTitle }) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <button
                    aria-label={`Delete todo: ${todoTitle}`}
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
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={onConfirm}>
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
