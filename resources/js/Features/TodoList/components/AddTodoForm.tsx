import React from 'react';
import { useForm } from '@inertiajs/react';

export const AddTodoForm: React.FC = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('todos.store'), {
            onSuccess: () => reset('title'),
            preserveScroll: true,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <input
                type="text"
                value={data.title}
                onChange={(e) => setData('title', e.target.value)}
                className="border rounded w-full p-2"
                placeholder="What needs to be done?"
                aria-label="New todo title"
            />
            {errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}
            <button type="submit" disabled={processing} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
                {processing ? 'Adding...' : 'Add Todo'}
            </button>
        </form>
    );
};
