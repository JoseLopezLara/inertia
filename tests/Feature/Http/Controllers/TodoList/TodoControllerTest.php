<?php

namespace Tests\Feature\Http\Controllers\TodoList;

use App\Models\Todo;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

/**
 * Clase de prueba para el TodoController.
 * Su propósito es simular peticiones HTTP a los endpoints de la API de TodoList
 * y verificar que el controlador responde de manera correcta y predecible.
 * Utiliza una base de datos en memoria (SQLite) que se refresca con cada prueba.
 */
class TodoControllerTest extends TestCase
{
    // Este 'trait' asegura que la base de datos se migre y se reinicie antes de cada prueba.
    // Esto garantiza que cada prueba se ejecute en un estado limpio y aislado.
    use RefreshDatabase;

    /**
     * Prueba que la página principal de tareas se pueda mostrar correctamente.
     * Simula una petición GET a /todos.
     */
    #[Test]
    public function it_can_display_the_todos_page()
    {
        // 1. Arrange: Prepara el estado inicial. Crea 3 tareas falsas en la base de datos.
        Todo::factory()->count(3)->create();

        // 2. Act & Assert: Realiza la petición y verifica la respuesta.
        $this->get(route('todos.index')) // Llama a la ruta 'todos.index' (GET /todos)
            ->assertOk() // Verifica que la respuesta HTTP sea 200 OK.
            ->assertInertia(fn (Assert $page) => $page
                // Verifica que el backend haya solicitado el componente de React 'TodoList/Index'.
                // El segundo argumento `false` desactiva la validación de existencia del archivo, necesaria por nuestra estructura modular.
                ->component('TodoList/Index', false)
                // Verifica que la 'prop' `todos` se haya pasado al componente y que contenga 3 elementos.
                ->has('todos', 3)
            );
    }

    /**
     * Prueba que se pueda crear una nueva tarea.
     * Simula una petición POST a /todos con datos válidos.
     */
    #[Test]
    public function it_can_create_a_new_todo()
    {
        $attributes = ['title' => 'New Todo', 'description' => 'A description'];

        $response = $this->post(route('todos.store'), $attributes);

        // Verifica que el controlador redirija de vuelta a la página principal después de crear la tarea.
        $response->assertRedirect(route('todos.index'));
        // Verifica que la tarea se haya guardado correctamente en la base de datos.
        $this->assertDatabaseHas('todos', $attributes);
    }

    /**
     * Prueba que el campo 'título' sea obligatorio para crear una tarea.
     * Simula una petición POST a /todos con un título vacío.
     */
    #[Test]
    public function it_requires_a_title_to_create_a_todo()
    {
        $response = $this->post(route('todos.store'), ['title' => '']);

        // Verifica que la respuesta contenga un error de validación para el campo 'title'.
        $response->assertSessionHasErrors('title');
        // Verifica que no se haya guardado nada en la base de datos.
        $this->assertDatabaseCount('todos', 0);
    }

    /**
     * Prueba que se pueda actualizar una tarea (marcarla como completada).
     * Simula una petición PATCH a /todos/{todo}.
     */
    #[Test]
    public function it_can_update_a_todo_as_completed()
    {
        $todo = Todo::factory()->create(['completed' => false]);

        $this->patch(route('todos.update', $todo), ['completed' => true])
            ->assertRedirect(route('todos.index'));

        // Verifica que el estado 'completed' de la tarea se haya actualizado a 'true' en la base de datos.
        $this->assertDatabaseHas('todos', [
            'id' => $todo->id,
            'completed' => true,
        ]);
    }

    /**
     * Prueba que se pueda eliminar una tarea.
     * Simula una petición DELETE a /todos/{todo}.
     */
    #[Test]
    public function it_can_delete_a_todo()
    {
        $todo = Todo::factory()->create();

        $this->delete(route('todos.destroy', $todo))
            ->assertRedirect(route('todos.index'));

        // Verifica que la tarea haya sido eliminada de la base de datos.
        $this->assertDatabaseMissing('todos', ['id' => $todo->id]);
    }
}
