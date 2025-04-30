import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import * as serviceWorker from './serviceWorker';

createRoot(document.getElementById("root")!).render(<App />);

// Temporarily disable service worker for debugging
serviceWorker.unregister();
