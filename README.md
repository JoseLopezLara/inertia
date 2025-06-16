# Laravel & React/Inertia.js Todo List Application.

This is a full-stack Todo List application built with a modern technology stack, featuring a modular backend architecture and a reactive frontend. The project serves as a powerful demonstration of how to structure a scalable and maintainable application using Laravel 12 for the backend and React (with TypeScript) for the frontend, seamlessly connected by Inertia.js.

## Key Features

- **Full CRUD Functionality:** Create, Read, Update, and Delete todos.
- **Reactive UI:** A fluid and responsive user interface built with React and Tailwind CSS.
- **Modular Architecture:** Backend logic is organized into feature-based modules for improved scalability and maintainability.
- **Type-Safe Frontend:** TypeScript ensures a robust and error-free frontend codebase.
- **Automated Testing:** A suite of PHPUnit tests to ensure backend reliability.

## Tech Stack

- **Backend:** Laravel 12, PHP 8.2
- **Frontend:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS
- **Full-stack Glue:** Inertia.js
- **Database:** SQLite (configurable)
- **Testing:** PHPUnit

---

## Project Structure: A Modular Approach

This project was refactored from a standard Laravel structure to a more scalable, modular architecture. This change isolates features into their own domains, making the codebase cleaner, easier to navigate, and simpler to maintain.

### Before Refactoring (Standard Structure)

```
app
└── Http
    └── Controllers
        └── TodoController.php

resources
└── js
    └── Pages
        └── Todos
            └── Index.tsx

routes
└── web.php (all routes in one file)

tests
└── Feature
    └── TodoControllerTest.php
```

### After Refactoring (Modular Structure)

In the new structure, all code related to the "TodoList" feature (controllers, components, pages, tests) is grouped together.

```
app
└── Http
    └── Controllers
        └── TodoList                <-- Feature Module
            └── TodoController.php

resources
└── js
    └── Features
        └── TodoList                <-- Feature Module
            ├── components
            │   ├── AddTodoForm.tsx
            │   └── TodoItem.tsx
            └── pages
                └── Index.tsx

routes
└── web.php (routes point to the modular controller)

tests
└── Feature
    └── Http
        └── Controllers
            └── TodoList            <-- Feature Module
                └── TodoControllerTest.php
```

---

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### 1. Prerequisites

- PHP >= 8.2
- Composer
- Node.js & npm

### 2. Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/laravel-react-inertia.git
    cd laravel-react-inertia
    ```

2.  **Install PHP dependencies:**
    ```bash
    composer install
    ```

3.  **Install JavaScript dependencies:**
    ```bash
    npm install
    ```

4.  **Set up your environment file:**
    -   Copy the example environment file:
        ```bash
        cp .env.example .env
        ```
    -   The project is pre-configured to use SQLite. Ensure the `database.sqlite` file exists:
        ```bash
        touch database/database.sqlite
        ```

5.  **Generate an application key:**
    ```bash
    php artisan key:generate
    ```

6.  **Run database migrations:**
    This will create the `todos` table.
    ```bash
    php artisan migrate
    ```

### 3. Running the Application

To run the application, you need to start both the Laravel backend server and the Vite frontend development server.

1.  **Start the Laravel server:**
    ```bash
    php artisan serve
    ```

2.  **Start the Vite server (in a new terminal):**
    ```bash
    npm run dev
    ```

Now, you can access the application in your browser at `http://127.0.0.1:8000`.

---

## Running Tests

To run the backend test suite, use the following command:

```bash
php artisan test
```

Or, to run the tests using the PHPUnit binary directly:

```bash
./vendor/bin/phpunit
```
