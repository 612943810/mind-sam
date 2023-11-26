import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import Navigation from './navigation/Navigation'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <div className='grid website'>
 <App />   
    </div>

  </React.StrictMode>,
)
