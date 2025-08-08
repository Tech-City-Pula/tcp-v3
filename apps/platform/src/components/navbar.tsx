import { useEffect, useState } from "react"
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button"
import { Moon, Sun } from 'lucide-react'

function useThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    const root = document.documentElement
    // initial from prefers or existing
    const saved = localStorage.getItem("theme") as "light" | "dark" | null
    const initial =
      saved ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
    setTheme(initial)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (theme === "dark") root.classList.add("dark")
    else root.classList.remove("dark")
    localStorage.setItem("theme", theme)
  }, [theme])

  const toggle = () => setTheme((t) => (t === "light" ? "dark" : "light"))

  return { theme, toggle }
}

export function Navbar() {
  const { theme, toggle } = useThemeToggle()

  return (
    <header className="sticky top-0 z-10 border-b bg-background/70 backdrop-blur">
      <div className="container mx-auto px-4 h-14 flex items-center">
        <div className="flex-1">
          <Link to="/" className="font-semibold text-lg">
            My Blog
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={toggle}
            className="rounded-xl"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <>
                <Sun className="h-4 w-4 mr-2" />
                Light
              </>
            ) : (
              <>
                <Moon className="h-4 w-4 mr-2" />
                Dark
              </>
            )}
          </Button>
        </div>
      </div>
    </header>
  )
}
