import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.jsx';
import CheckDbStatus from './dbcheck.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <CheckDbStatus />
  </StrictMode>
)
