import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';

// Get root element
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error('Failed to find the root element');

// Create root
const root = createRoot(rootElement);

// Render app
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Temporarily disable service worker for debugging
serviceWorker.unregister();
