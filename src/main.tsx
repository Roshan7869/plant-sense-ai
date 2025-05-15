
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add a console log to confirm the app is running with the latest changes
console.log("Kisan Mitra app started with Plant Diagnosis feature");

createRoot(document.getElementById("root")!).render(<App />);
