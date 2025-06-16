<?php

use App\Http\Controllers\TodoList\TodoController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::group(['prefix' => 'todos', 'as' => 'todos.'], function () {
    Route::get('/', [TodoController::class, 'index'])->name('index');
    Route::post('/', [TodoController::class, 'store'])->name('store');
    Route::patch('/{todo}', [TodoController::class, 'update'])->name('update');
    Route::delete('/{todo}', [TodoController::class, 'destroy'])->name('destroy');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
