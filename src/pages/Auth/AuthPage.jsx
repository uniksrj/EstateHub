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
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-background to-muted/20">
      <div className="w-full max-w-6xl">
        
        <div className="flex items-center justify-center space-x-2 mb-8">
          <Building2 className="h-8 w-8 text-accent" />
          <span className="font-bold text-2xl">EstateHub</span>
        </div>

        <Card className="overflow-hidden">
          <div className="relative h-[990px] w-full ">
            {/* Sliding Container */}
            <div
              className={`absolute inset-0 flex transition-transform duration-200 ease-in-out ${
                isLogin ? "translate-x-0" : "-translate-x-0"
              }`}
            >
              {/* Login Panel */}
              <div className="w-1/2 flex-shrink-0 p-8">
                <LoginForm  />
              </div>

              {/* Register Panel */}
              <div className="w-1/2 flex-shrink-0 p-8">
                <RegisterForm  />
              </div>
            </div>

            {/* Overlay Panel */}
            <div
              className={`absolute top-0 right-0 w-1/2 h-full bg-gradient-to-r from-accent to-accent/80 text-white flex items-center justify-center transition-transform duration-500 ease-in-out ${
                isLogin ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <div className="text-center px-8">
                {isLogin ? (
                  <div>
                    <h2 className="text-3xl font-bold mb-4">New Here?</h2>
                    <p className="mb-6 opacity-90">
                      Join EstateHub today and discover your dream property with our expert agents
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
          </div>
        </Card>
      </div>
    </div>
  )
}

export default AuthPage
