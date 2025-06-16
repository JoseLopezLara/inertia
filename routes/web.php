<?php

use App\Http\Controllers\TodoList\TodoController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// --- Rutas para la Funcionalidad de la Lista de Tareas (TodoList) ---
// Este grupo de rutas define todos los endpoints relacionados con la gestión de tareas.
// 'prefix' => 'todos': Todas las URLs dentro de este grupo comenzarán con '/todos' (ej. /todos, /todos/1).
// 'as' => 'todos.': Nombra las rutas para poder referenciarlas fácilmente en el código (ej. route('todos.index')).
// Esto centraliza la lógica de ruteo para el módulo de TodoList, mejorando la organización.
Route::group(['prefix' => 'todos', 'as' => 'todos.'], function () {
    // GET /todos -> Muestra la página principal de la lista de tareas.
    // Conectado al método `index` del TodoController, que renderiza el componente de React `TodoList/Index`.
    Route::get('/', [TodoController::class, 'index'])->name('index');

    // POST /todos -> Crea una nueva tarea.
    // Conectado al método `store` del TodoController, que valida los datos y los guarda en la base de datos.
    Route::post('/', [TodoController::class, 'store'])->name('store');

    // PATCH /todos/{todo} -> Actualiza una tarea existente (ej. marcarla como completada).
    // Conectado al método `update` del TodoController.
    Route::patch('/{todo}', [TodoController::class, 'update'])->name('update');

    // DELETE /todos/{todo} -> Elimina una tarea.
    // Conectado al método `destroy` del TodoController.
    Route::delete('/{todo}', [TodoController::class, 'destroy'])->name('destroy');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
