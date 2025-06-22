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

interface EditTodoDialogProps {
    openEditDiaog: boolean;
    onOpenEditDiaogChange: (openEditDiaog: boolean) => void;
    onConfirm: () => void;
    todoTitle: string;
    todoDescription: string;
}

export const EditTodoDialog: React.FC<EditTodoDialogProps> = ({
    openEditDiaog, onOpenEditDiaogChange, onConfirm, todoTitle, todoDescription}) => {
    return (
        <Dialog>
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
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                    Make changes to your profile here. Click save when you&apos;re
                    done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                    <div className="grid gap-3">
                    <Label htmlFor="name-1">Name</Label>
                    <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
                    </div>
                    <div className="grid gap-3">
                    <Label htmlFor="username-1">Username</Label>
                    <Input id="username-1" name="username" defaultValue="@peduarte" />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>

    );
};


