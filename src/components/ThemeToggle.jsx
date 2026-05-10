"use client"

import { Moon, Sun } from "lucide-react"
import { Button } from "./ui/button"
import { useTheme } from "../hooks/useTheme"

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button variant="ghost" size="sm" onClick={toggleTheme} className="w-9 h-9 p-0 cursor-pointer">
      {theme === "dark" ? <Sun className="h-4 w-4 cursor-pointer" /> : <Moon className="h-4 w-4 cursor-pointer" />}
      <span className="sr-only cursor-pointer">Toggle theme</span>
    </Button>
  )
}

export default ThemeToggle
