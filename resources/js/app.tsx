import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import ErrorBoundary from './components/ErrorBoundary';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
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
