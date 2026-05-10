// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import router from './routes/AppRoutes'
import { RouterProvider } from 'react-router'
import { OfferProvider } from './context/OfferContext'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <OfferProvider>
        {/* <App /> */}
      <RouterProvider router={router} />
        </OfferProvider>
      </AuthProvider>
    </ThemeProvider>
  // </StrictMode>,
)
