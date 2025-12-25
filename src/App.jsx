import { RouterProvider } from "react-router"
import { router } from "./routes/AppRoutes"

function App() {
  return (
    <div className="min-h-screen dark bg-background text-foreground">
       <RouterProvider router={router} />
    </div>
  )
}

export default App
