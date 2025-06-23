<?php

namespace App\Http\Controllers\TodoList;

use App\Http\Controllers\Controller;
use App\Models\Todo;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use DB;

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
        logger("Update");

        

        logger($todo);
        $validated = $request->validate([
            'completed' => 'boolean|nullable',
            'title' => 'nullable|string|max:50000',
            'description' => 'nullable|string|max:50000',
        ]);

        try {
            DB::beginTransaction();

            // Si está presente el campo 'completed', actualiza solo ese campo.
            if ($request->has('completed')) {
                $todo->completed = $validated['completed'];
            }

            // Si viene algún dato de 'title' o 'description', actualízalos.
            if ($request->has('title') || $request->has('description')) {
                // Solo sobreescribe si realmente vienen datos nuevos
                if ($request->filled('title')) {
                    $todo->title = $validated['title'];
                }
                if ($request->has('description')) { // Puede ser null, así que usar has
                    $todo->description = $validated['description'];
                }
            }

            $todo->save();

            DB::commit();
            logger("Update success");
            return redirect()->route('todos.index');
        } catch (\Exception $e) {
            DB::rollBack();
            logger("Update failed: " . $e->getMessage());
            return redirect()->route('todos.index');
        }
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
