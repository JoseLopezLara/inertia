<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: oklch(1 0 0);
            }

            html.dark {
                background-color: oklch(0.145 0 0);
            }
        </style>

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="icon" href="/favicon.svg" type="image/svg+xml">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

        @routes
        @viteReactRefresh
        {{-- Lógica Dinámica para la Carga de Componentes con Vite --}}
        {{-- Este bloque de PHP es crucial para que la aplicación funcione con nuestra arquitectura modular. --}}
        {{-- Su propósito es construir la ruta correcta al archivo del componente de página de React, --}}
        {{-- permitiendo que Vite lo cargue correctamente, especialmente en recargas de página directas. --}}
        @php
            // Obtiene el nombre del componente de la página actual, proporcionado por Inertia. (ej. 'TodoList/Index')
            $component = $page['component'];
            
            // Define la ruta por defecto, asumiendo que el componente está en la carpeta 'pages'.
            $path = "resources/js/pages/{$component}.tsx";

            // Si el nombre del componente contiene un '/', podría ser un componente de un módulo 'Feature'.
            if (str_contains($component, '/')) {
                // Extrae el nombre del 'Feature' (la primera parte del nombre, ej. 'TodoList').
                $feature = explode('/', $component, 2)[0];
                
                // Comprueba si existe un directorio con ese nombre dentro de 'resources/js/Features'.
                if (is_dir(resource_path("js/Features/{$feature}"))) {
                    // Si existe, reconstruye la ruta para que apunte a la carpeta 'pages' dentro del 'Feature'.
                    // ej. 'TodoList/Index' se convierte en 'resources/js/Features/TodoList/pages/Index.tsx'.
                    $parts = explode('/', $component);
                    array_shift($parts); // Elimina el nombre del 'Feature'
                    $pageName = implode('/', $parts); // Recompone el resto de la ruta
                    $path = "resources/js/Features/{$feature}/pages/{$pageName}.tsx";
                }
            }
        @endphp
        {{-- La directiva @vite ahora usa la ruta dinámica ($path) que hemos calculado. --}}
        {{-- Esto asegura que tanto el 'app.tsx' principal como el componente de la página actual se carguen. --}}
        @vite(['resources/js/app.tsx', $path])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
