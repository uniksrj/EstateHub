// import { StrictMode } from 'react'
import { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
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
          <Suspense fallback={<div className="app-loading" role="status"><span aria-hidden="true" />Loading EstateHub</div>}>
            <RouterProvider router={router} />
          </Suspense>
        </OfferProvider>
      </AuthProvider>
    </ThemeProvider>
  // </StrictMode>,
)
