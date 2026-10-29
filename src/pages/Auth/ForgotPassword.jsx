"use client"

import { useState } from "react"
import { Link } from "react-router"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Alert, AlertDescription } from "../../components/ui/alert"
import {
  Building2,
  Mail,
  Loader2,
  ArrowLeft,
  CheckCircle2,
  KeyRound,
  AlertCircle,
} from "lucide-react"
import { authAPI } from "../../services/api"
import AuthBrandPanel from "./AuthBrandPanel"

const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      await authAPI.forgotPassword(email.trim())
      setSuccess(true)
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to process password reset request. Please check your email or try again later."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-secondary/50">
      <div className="w-full max-w-5xl rounded-2xl sm:rounded-3xl shadow-2xl bg-card border border-border/80 overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        {/* Left Side: Brand & App Overview Panel */}
        <AuthBrandPanel
          badge="Secure Account Recovery"
          title="Seamless Real Estate Experience, Protected Access"
          description="EstateHub India gives you instant access to thousands of verified residential and commercial properties. Recover your account swiftly to manage your property listings, inquiries, and saved favorites."
        />

        {/* Right Side: Form or Success Card */}
        <div className="flex flex-col justify-between p-6 sm:p-10 lg:p-12 bg-card">
          {/* Mobile Top Brand Header (visible on < lg) */}
          <div className="lg:hidden flex items-center space-x-2.5 mb-6 pb-4 border-b border-border/60">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <span className="font-bold text-lg leading-none block text-foreground">
                EstateHub India
              </span>
              <span className="text-[11px] text-muted-foreground">
                Real Estate Platform
              </span>
            </div>
          </div>

          <div className="my-auto">
            {success ? (
              /* Success View */
              <div className="text-center py-4 space-y-6">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 rounded-2xl flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400 shadow-sm animate-in zoom-in-95 duration-200">
                  <CheckCircle2 className="h-9 w-9" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-bold tracking-tight text-foreground">
                    Check Your Inbox
                  </h2>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                    We have dispatched a password reset link to:
                  </p>
                  <div className="inline-block px-3.5 py-1.5 rounded-lg bg-secondary text-foreground font-semibold text-sm border border-border">
                    {email}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-muted/40 border border-border/60 text-xs text-muted-foreground text-left space-y-1.5">
                  <p className="font-medium text-foreground">Next steps:</p>
                  <ul className="list-disc list-inside space-y-1 pl-1">
                    <li>Click the link inside the email to choose your new password.</li>
                    <li>The secure reset link is valid for <strong>60 minutes</strong>.</li>
                    <li>If you don&apos;t see the email, please check your Spam or Junk folder.</li>
                  </ul>
                </div>

                <div className="space-y-3 pt-2">
                  <Button
                    onClick={() => {
                      setSuccess(false)
                      setError("")
                    }}
                    variant="outline"
                    className="w-full h-11"
                  >
                    Try Another Email
                  </Button>

                  <Link to="/auth/login" className="block w-full">
                    <Button className="w-full h-11 gap-2">
                      <ArrowLeft className="h-4 w-4" />
                      Back to Login
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              /* Forgot Password Form */
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3">
                    <KeyRound className="h-5 w-5" />
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                    Forgot Password?
                  </h1>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    No worries! Enter your registered account email and we&apos;ll send you a secure verification link to reset your password.
                  </p>
                </div>

                {error && (
                  <Alert variant="destructive" className="border-destructive/30">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <AlertDescription className="text-xs sm:text-sm">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs font-semibold text-foreground uppercase tracking-wider">
                      Registered Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="e.g. name@example.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                          if (error) setError("")
                        }}
                        className="pl-10 h-11 bg-background"
                        required
                        disabled={loading}
                        autoFocus
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-11 text-sm font-semibold shadow-md transition-all gap-2"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending Reset Link...
                      </>
                    ) : (
                      "Send Reset Link"
                    )}
                  </Button>
                </form>

                <div className="pt-2 text-center border-t border-border/60">
                  <Link
                    to="/auth/login"
                    className="inline-flex items-center text-sm font-medium text-primary hover:underline gap-1.5 transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Remember your password? Back to Login
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Bottom security microcopy */}
          <div className="mt-8 text-center text-xs text-muted-foreground">
            Having trouble? Contact{" "}
            <a href="mailto:support@estatehub.business" className="underline hover:text-foreground">
              EstateHub Support
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
