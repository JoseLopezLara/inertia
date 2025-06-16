<?php

namespace App\Http\Controllers\TodoList;

use App\Http\Controllers\Controller;
use App\Models\Todo;
use Illuminate\Http\Request;
use Inertia\Inertia;

/**
 * Controlador para gestionar la funcionalidad de la Lista de Tareas (TodoList).
 * Este controlador maneja las peticiones HTTP que llegan desde el frontend (React/Inertia)
 * para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre las tareas.
 */
class TodoController extends Controller
{
    /**
     * Muestra la página principal de la lista de tareas.
     *
     * Este método es invocado por la ruta GET '/todos'.
     * 1. Obtiene todas las tareas de la base de datos.
     * 2. Utiliza Inertia::render para devolver el componente de React `TodoList/Index`.
     * 3. Pasa los datos de las tareas ('todos') como 'props' al componente de React,
     *    permitiendo que el frontend los muestre.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        return Inertia::render('TodoList/Index', [
            'todos' => Todo::all(),
        ]);
    }

    /**
     * Almacena una nueva tarea en la base de datos.
     *
     * Este método es invocado por la ruta POST '/todos' cuando el usuario envía el formulario para crear una tarea.
     * 1. Valida los datos de la petición (el título es obligatorio).
     * 2. Crea un nuevo registro 'Todo' en la base de datos.
     * 3. Redirige al usuario de vuelta a la página principal (la ruta 'todos.index').
     *    Inertia intercepta esta redirección y actualiza la página sin una recarga completa.
     *
     * @param  \Illuminate\Http\Request  $request
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:50000',
            'description' => 'nullable|string',
        ]);

        Todo::create($validated);

        //return redirect()->route('todos.index');
        return Inertia::render('TodoList/Index', [
            'todos' => Todo::all(),
        ]);
    }

    /**
     * Actualiza una tarea existente en la base de datos.
     *
     * Este método es invocado por la ruta PATCH '/todos/{todo}'.
     * Se utiliza principalmente para marcar una tarea como completada o no completada.
     * 1. Valida que el campo 'completed' sea un booleano.
     * 2. Actualiza el registro 'Todo' correspondiente.
     * 3. Redirige al usuario de vuelta a la página principal.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Todo  $todo
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, Todo $todo)
    {
        $request->validate([
            'completed' => 'required|boolean',
        ]);

        $todo->update($request->only('completed'));

        //Opción 1:
        //return redirect()->route('todos.index');

        //Opción 2:
        return Inertia::render('TodoList/Index', [
            'todos' => Todo::all(),
        ]);
    }

    /**
     * Elimina una tarea de la base de datos.
     *
     * Este método es invocado por la ruta DELETE '/todos/{todo}'.
     * 1. Elimina el registro 'Todo' de la base de datos.
     * 2. Redirige al usuario de vuelta a la página principal.
     *
     * @param  \App\Models\Todo  $todo
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Todo $todo)
    {
        $todo->delete();

        return redirect()->route('todos.index');
    }
}
