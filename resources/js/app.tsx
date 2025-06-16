import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import ErrorBoundary from './components/ErrorBoundary';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    /**
     * Título que se mostrará en la pestaña del navegador.
     * Si una página específica tiene un título, se usará ese; de lo contrario, se usará el nombre de la aplicación.
     */
    title: (title) => (title ? `${title} - ${appName}` : appName),

    /**
     * Este es el "resolver" de páginas de Inertia. Su función es crucial para la arquitectura modular.
     * Cuando el backend de Laravel solicita un componente (ej. 'TodoList/Index'), esta función
     * traduce ese nombre a una ruta de archivo real en el frontend para que Vite pueda importarlo.
     *
     * @param name - El nombre del componente enviado desde el backend de Laravel.
     * @returns Una promesa que resuelve el módulo del componente de React.
     */
    resolve: (name) => {
        // Comprueba si el nombre del componente contiene un '/', lo que indica que podría ser parte de un 'Feature'.
        if (name.includes('/')) {
            // Si es así, asume que sigue la estructura: `Features/{FeatureName}/pages/{PageName}.tsx`.
            // Esto permite que 'TodoList/Index' se resuelva a './Features/TodoList/pages/Index.tsx'.
            const parts = name.split('/');
            const feature = parts.shift(); // Extrae 'TodoList'
            const pageName = parts.join('/'); // Extrae 'Index'

            return resolvePageComponent(
                `./Features/${feature}/pages/${pageName}.tsx`,
                import.meta.glob<Page>('./Features/**/*.tsx'),
            );
        }

        // Si no es un 'Feature', busca en la carpeta de páginas estándar.
        const pages = import.meta.glob(['./pages/**/*.tsx', './Features/**/pages/**/*.tsx']);
        let path = '';

        if (name.includes('/')) {
            const [feature, ...pageParts] = name.split('/');
            const page = pageParts.join('/');
            path = `./Features/${feature}/pages/${page}.tsx`;
        } else {
            path = `./pages/${name}.tsx`;
        }

        const pageResolver = pages[path] as any;

        if (typeof pageResolver === 'undefined') {
            throw new Error(`Page not found: ${name}. Looking for path: ${path}`);
        }

        return pageResolver();
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <ErrorBoundary>
                <App {...props} />
            </ErrorBoundary>
        );
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
