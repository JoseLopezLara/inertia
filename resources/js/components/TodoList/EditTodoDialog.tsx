import React from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import {SquarePen} from "lucide-react";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea";

interface EditTodoDialogProps {
    openEditDiaog: boolean;
    onOpenEditDiaogChange: (openEditDiaog: boolean) => void;
    onConfirm: () => void;
    todoTitle: string;
    todoDescription: string;
    onTitleChange: (title: string) => void;
    onDescriptionChange: (description: string) => void;
}

export const EditTodoDialog: React.FC<EditTodoDialogProps> = ({
    openEditDiaog, onOpenEditDiaogChange, onConfirm, todoTitle, todoDescription, onTitleChange, onDescriptionChange}) => {
    return (
        <Dialog
            open={openEditDiaog} onOpenChange={onOpenEditDiaogChange}
        >
            <form className="flex">
                <DialogTrigger asChild>
                    <button
                        aria-label={`Delete todo: ${todoTitle}`}
                        className="ml-4 text-gray-400 hover:text-blue-500 shrink-0"
                    >
                        <SquarePen className="h-4 w-4" />
                    </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Task</DialogTitle>
                    {/* <DialogDescription>
                    Make changes to your profile here. Click save when you&apos;re
                    done.
                    </DialogDescription> */}
                </DialogHeader>
                <div className="grid gap-4">
                    <div className="grid gap-3">
                    <Label htmlFor="name-1">Title</Label>
                    <Input 
                        id="title" name="name" defaultValue={todoTitle}
                        onChange={(e) => onTitleChange(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-3">
                    <Label htmlFor="username-1">Description</Label>
                    <Textarea 
                        id="description" name="username" defaultValue={todoDescription} 
                        onChange={(e) => onDescriptionChange(e.target.value)}
                    />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" onClick={onConfirm}>Save changes</Button>
                </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
};


