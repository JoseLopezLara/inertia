import React, { useEffect, useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { time } from 'console';
//import { clearInterval } from 'timers';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - - Interfaces - - - - - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
interface AddRichTodoFormProps{
    // Puede recibir un string ISO 8601 o "Loading..."
    currentTime: string;
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - - - Helpers - - - - - - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const formatDisplayTime = (date: Date): string => {
    const pad = (n: number) => n.toString().padStart(2, '0');
    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1);
    const year = date.getFullYear();
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    return `${day}/${month}/${year} ${hours}:${minutes}hrs`;
};


// Componente para el formulario de agregar una nueva tarea
export const AddRichTodoForm: React.FC<AddRichTodoFormProps> = ({currentTime}) => {
    const [displayTime, setDisplayTime] = useState(currentTime);
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '', 
        description: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('todos.store'), {
            onSuccess: () => reset('title', 'description'),
            preserveScroll: true,
        });
    };

    useEffect(() => {
        if (currentTime == 'Loading...'){
            setDisplayTime('Loading...');
            return;
        }

        const serverDate = new Date(currentTime);
        setDisplayTime(formatDisplayTime(serverDate));

        // Subcripción a un intervalo
        const intervalId = setInterval(() => {
            setDisplayTime(formatDisplayTime(new Date()));
        }, 1000);

        // Limpieza del intervalo
        return () => {
            clearInterval(intervalId);
        }
    }, [currentTime]);

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <div className='flex flex-col  space-y-2 mb-3'>
                <Label htmlFor="title">Date:</Label>
                <Badge>{displayTime}</Badge>
            </div>
            
            <div className="grid w-full gap-3">
                <Label htmlFor="title">Title</Label>
                
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

            <div className="grid w-full gap-3 mt-2">
                <Label htmlFor="message">Description</Label>
                <Textarea placeholder="Type your message here." id="message"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    className="border rounded w-full p-2"
                    aria-label="New todo title"
                    maxLength={50000} 
                />
            </div>
            
            {/* Muestra errores de validación si existen */}
            {errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}
            <button type="submit" disabled={processing} className="bg-blue-500 text-white px-4 py-2 rounded mt-2 text-xs">
                {processing ? 'Adding...' : 'Add Rich Todo'}
            </button>
        </form>
    );
};