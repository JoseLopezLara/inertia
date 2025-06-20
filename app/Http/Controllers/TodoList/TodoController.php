<?php

namespace App\Http\Controllers\TodoList;

use App\Http\Controllers\Controller;
use App\Models\Todo;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

/**
 * Controlador para gestionar la funcionalidad de la Lista de Tareas (TodoList).
 */
class TodoController extends Controller
{
    /**
     * Muestra la página principal de la lista de tareas.
     */
    public function index()
    {
        return Inertia::render('TodoList/Index', [
            'todos' =>  Todo::whereNull('description')->get(),
            'richTodos' =>  Todo::whereNotNull('description')->get(),
            'current_time' => Inertia::optional(callback: fn () => Carbon::now()->toIso8601String())
        ]);
    }

    /**
     * Almacena una nueva tarea en la base de datos.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:50000',
            'description' => 'nullable|string',
        ]);


        if (!$request->has('description')) {
            Todo::create($validated);
        }else{
            Todo::create([
                'title'=> $validated['title'],
                'description'=> $validated['description'],
                'time' => Carbon::now()->format('H:i:s'),
                'date'=> Carbon::now()->format('Y-m-d'),
            ]);
        }


        return redirect()->route('todos.index');
        // return Inertia::render('TodoList/Index', [
        //     'todos' => Todo::all(),
        // ]);
    }

    /**
     * Actualiza una tarea existente en la base de datos.
     */
    public function update(Request $request, Todo $todo)
    {
        $request->validate([
            'completed' => 'required|boolean',
        ]);

        $todo->update($request->only('completed'));

        //Opción 1:
        return redirect()->route('todos.index');

        //Opción 2:
        // return Inertia::render('TodoList/Index', [
        //     'todos' => Todo::all(),
        // ]);
    }

    /**
     * Elimina una tarea de la base de datos.
     */
    public function destroy(Todo $todo)
    {
        $todo->delete();

        return redirect()->route('todos.index');
        //Opción 2:
        // return Inertia::render('TodoList/Index', [
        //     'todos' => Todo::all(),
        // ]);
    }
}
