"use client"

import { Card } from "../../components/ui/card"
import { Building2 } from "lucide-react"
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"
import { useLocation, useNavigate } from "react-router"

const AuthPage = () => { 
  const navigate = useNavigate();
  const location = useLocation();
  // const [isLogin, setIsLogin] = useState(() => location.pathname.endsWith("/login"))
  const isLogin = location.pathname.endsWith("/login")

  // useEffect(() =>{
  //    setIsLogin(location.pathname.endsWith("/login"))
  // },[location.pathname]);
    
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-6 sm:py-10 bg-gradient-to-br from-background to-muted/20">
      <div className="w-full max-w-6xl">
        
        <div className="flex items-center justify-center space-x-2 mb-8">
          <Building2 className="h-8 w-8 text-accent" />
          <span className="font-bold text-2xl">EstateHub India</span>
        </div>

        <Card className="overflow-hidden">
          <div className="w-full grid lg:grid-cols-2">
            <div className="p-4 sm:p-6 lg:p-8 order-2 lg:order-1">
              {isLogin ? <LoginForm /> : <RegisterForm />}
            </div>

            <div className="hidden lg:flex bg-gradient-to-r from-accent to-accent/80 text-white items-center justify-center p-8">
              <div className="text-center max-w-md">
                {isLogin ? (
                  <div>
                    <h2 className="text-3xl font-bold mb-4">New Here?</h2>
                    <p className="mb-6 opacity-90">
                      Join EstateHub India today and discover your dream property with our expert agents
                    </p>
                    <button
                      onClick={() => navigate("/auth/register")}
                      className="px-8 py-3 border-2 border-white rounded-lg hover:bg-white hover:text-accent transition-colors"
                    >
                      Sign Up
                    </button>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
                    <p className="mb-6 opacity-90">Sign in to access your account and continue your property journey</p>
                    <button
                      onClick={() => navigate("/auth/login")}
                      className="px-8 py-3 border-2 border-white rounded-lg hover:bg-white hover:text-accent transition-colors"
                    >
                      Sign In
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:hidden bg-gradient-to-r from-accent to-accent/80 text-white p-5 sm:p-6 order-1">
              <div className="text-center">
                {isLogin ? (
                  <div>
                    <h2 className="text-2xl font-bold mb-2">New Here?</h2>
                    <p className="mb-4 opacity-90 text-sm sm:text-base">
                      Join EstateHub India today and discover your dream property.
                    </p>
                    <button
                      onClick={() => navigate("/auth/register")}
                      className="px-6 py-2.5 border-2 border-white rounded-lg hover:bg-white hover:text-accent transition-colors"
                    >
                      Sign Up
                    </button>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Welcome Back!</h2>
                    <p className="mb-4 opacity-90 text-sm sm:text-base">Sign in to access your account.</p>
                    <button
                      onClick={() => navigate("/auth/login")}
                      className="px-6 py-2.5 border-2 border-white rounded-lg hover:bg-white hover:text-accent transition-colors"
                    >
                      Sign In
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default AuthPage
