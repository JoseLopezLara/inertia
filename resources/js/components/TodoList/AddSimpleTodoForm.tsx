import React from 'react';
import { useForm } from '@inertiajs/react';
import { Label } from "@/components/ui/label"

// Componente para el formulario de agregar una nueva tarea
export const AddSimpleTodoForm: React.FC = () => {
    // useForm es un hook de Inertia.js para manejar formularios
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '', // Campo para el título de la nueva tarea
    });

    // Envía una petición POST al backend para agregar una nueva tarea
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('todos.store'), {
            onSuccess: () => reset('title'), 
            preserveScroll: true,
        });
    };

    return (
        // Formulario para ingresar el título de la nueva tarea
        <form onSubmit={handleSubmit} className="mb-4">
            <div className="grid w-full gap-3 mt-2">
                <Label htmlFor="message">Your Taks</Label>
                <input
                    type="text"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    className="border rounded w-full p-2"
                    placeholder="What needs to be done?"
                    aria-label="New todo title"
                    maxLength={50000}
                />
            </div>
            {/* Muestra errores de validación si existen */}
            {errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}
            <button type="submit" disabled={processing} className="bg-blue-500 text-white px-4 py-2 rounded mt-2 text-xs">
                {processing ? 'Adding...' : 'Add Simple Todo'}
            </button>
        </form>
    );
};