<?php

namespace Tests\Feature\Http\Controllers\TodoList;

use App\Models\Todo;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class TodoControllerTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function it_can_display_the_todos_page()
    {
        Todo::factory()->count(3)->create();

        $this->get(route('todos.index'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('TodoList/Index', false)
                ->has('todos', 3)
            );
    }

    #[Test]
    public function it_can_create_a_new_todo()
    {
        $attributes = ['title' => 'New Todo', 'description' => 'A description'];

        $response = $this->post(route('todos.store'), $attributes);

        $response->assertRedirect(route('todos.index'));
        $this->assertDatabaseHas('todos', $attributes);
    }

    #[Test]
    public function it_requires_a_title_to_create_a_todo()
    {
        $response = $this->post(route('todos.store'), ['title' => '']);

        $response->assertSessionHasErrors('title');
        $this->assertDatabaseCount('todos', 0);
    }

    #[Test]
    public function it_can_update_a_todo_as_completed()
    {
        $todo = Todo::factory()->create(['completed' => false]);

        $this->patch(route('todos.update', $todo), ['completed' => true])
            ->assertRedirect(route('todos.index'));

        $this->assertDatabaseHas('todos', [
            'id' => $todo->id,
            'completed' => true,
        ]);
    }

    #[Test]
    public function it_can_delete_a_todo()
    {
        $todo = Todo::factory()->create();

        $this->delete(route('todos.destroy', $todo))
            ->assertRedirect(route('todos.index'));

        $this->assertDatabaseMissing('todos', ['id' => $todo->id]);
    }
}
