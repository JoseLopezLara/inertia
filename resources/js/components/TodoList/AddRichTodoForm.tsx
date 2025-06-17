import React from 'react';
import { useForm } from '@inertiajs/react';

// Componente para el formulario de agregar una nueva tarea
export const AddRichTodoForm: React.FC = () => {
    // useForm es un hook de Inertia.js para manejar formularios
    // data: estado del formulario; setData: función para actualizar campos
    // post: función para enviar datos al backend; processing: estado de envío
    // errors: errores de validación; reset: para limpiar el formulario
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '', // Campo para el título de la nueva tarea
    });

    // Maneja el envío del formulario
    // Envía una petición POST al backend para agregar una nueva tarea
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('todos.store'), {
            onSuccess: () => reset('title'), // Limpia el campo al agregar
            preserveScroll: true,
        });
    };

    return (
        // Formulario para ingresar el título de la nueva tarea
        <form onSubmit={handleSubmit} className="mb-4">
            <input
                type="text"
                value={data.title}
                onChange={(e) => setData('title', e.target.value)}
                className="border rounded w-full p-2"
                placeholder="What needs to be done?"
                aria-label="New todo title"
                maxLength={50000}
            />
            {/* Muestra errores de validación si existen */}
            {errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}
            <button type="submit" disabled={processing} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
                {processing ? 'Adding...' : 'Add Todo'}
            </button>
        </form>
    );
};