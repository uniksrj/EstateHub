import { RouterProvider } from "react-router"
import AppRoutes, { router } from "./routes/AppRoutes"
// import { Toaster } from "./components/ui/toaster"

function App() {
  return (
    <div className="min-h-screen dark bg-background text-foreground">
    <RouterProvider router={router} />      
    </div>
  )
}

export default App
