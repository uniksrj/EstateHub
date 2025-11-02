"use client"

import { useState } from "react"
import { useNavigate, useLocation, Link } from "react-router"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Alert, AlertDescription } from "../../components/ui/alert"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { useAuth } from "../../hooks/useAuth"
import { toast, Toaster } from "sonner"

const LoginForm = () => { 
    
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const { login } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    console.log("location inside data :", location);
    

    // const from = location.state?.from?.pathname || "/"

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
        if (error) setError("")
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        // setError("")

        try {
            const result = await login(formData)
            if (result.success) {
                navigate('/', { replace: true })
            } else {
                setError(result.error || "Invalid email or password")
                toast.error(result.error || "Invalid credentials")
            }
        } catch (err) {
            console.error(err);
            setError("An unexpected error occurred. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="h-full flex flex-col justify-center p-4">
            <Toaster position="top-left" />
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold">Welcome Back</h2>
                <p className="text-muted-foreground">Sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                    <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={loading}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                        <Input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            disabled={loading}
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            onClick={() => setShowPassword(!showPassword)}
                            disabled={loading}
                        >
                            {showPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <input id="remember" type="checkbox" className="rounded border-border" disabled={loading} />
                        <Label htmlFor="remember" className="text-sm">
                            Remember me
                        </Label>
                    </div>
                    <Link to="/auth/forgot-password" className="text-sm text-accent hover:underline">
                        Forgot password?
                    </Link>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Signing in...
                        </>
                    ) : (
                        "Sign In"
                    )}
                </Button>
            </form>
        </div>
    )
}

export default LoginForm
