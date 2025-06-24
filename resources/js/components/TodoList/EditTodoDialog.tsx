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
    onConfirm: (title:string, description:string) => void;
    todoTitle: string;
    todoDescription: string;
}

export const EditTodoDialog: React.FC<EditTodoDialogProps> = ({
    openEditDiaog, onOpenEditDiaogChange, onConfirm, todoTitle, todoDescription}) => {
    const [title, setTitle] = React.useState(todoTitle);
    const [description, setDescription] = React.useState(todoDescription);

    // Sincroniza el estado interno con las props cuando el diálogo se abre.
    // Esto asegura que si editas otro TODO, el contenido del formulario sea el correcto.
    React.useEffect(() => {
        if (openEditDiaog) {
            setTitle(todoTitle);
            setDescription(todoDescription);
        }
    }, [openEditDiaog, todoTitle, todoDescription]);

    const handleSubmit = (e: React.FormEvent) => {
        // Previene el comportamiento por defecto del formulario (recargar la página)
        e.preventDefault();
        onConfirm(title, description);
    };

    return (
        <Dialog
            open={openEditDiaog} onOpenChange={onOpenEditDiaogChange}
        >
            <DialogTrigger asChild>
                <button
                    aria-label={`Edit todo: ${todoTitle}`}
                    className="ml-4 text-gray-400 hover:text-blue-500 shrink-0"
                >
                    <SquarePen className="h-4 w-4" />
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                {/* El <form> debe ir DENTRO de DialogContent */}
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Edit Task</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-3">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={title} // Usar `value` para componentes controlados
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={description} // Usar `value` para componentes controlados
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            {/* Es buena práctica definir el tipo para botones que no son de submit */}
                            <Button type="button" variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
