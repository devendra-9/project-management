import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import Contectfileprovider from './context/contectfile.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Contectfileprovider>
    <BrowserRouter>
      {/* <React.StrictMode> */}
        <App />
      {/* </React.StrictMode> */}
    </BrowserRouter>
  </Contectfileprovider>
)
