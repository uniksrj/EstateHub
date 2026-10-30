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
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#F7F6F0]">
      <div className="w-full max-w-5xl rounded-2xl sm:rounded-3xl shadow-2xl bg-white border border-[#E1E5DE] overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        {/* Left Side: Brand & App Overview Panel */}
        <AuthBrandPanel
          badge="Secure Account Recovery"
          title="Seamless Real Estate Experience, Protected Access"
          description="EstateHub India gives you instant access to thousands of verified residential and commercial properties. Recover your account swiftly to manage your property listings, inquiries, and saved favorites."
        />

        {/* Right Side: Form or Success Card */}
        <div className="flex flex-col justify-between p-6 sm:p-10 lg:p-12 bg-white text-[#202A24]">
          {/* Mobile Top Brand Header (visible on < lg) */}
          <div className="lg:hidden flex items-center space-x-2.5 mb-6 pb-4 border-b border-[#E1E5DE]">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "#E4EDE7", color: "#234C3D" }}
            >
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <span className="font-bold text-lg leading-none block text-[#202A24]">
                EstateHub India
              </span>
              <span className="text-[11px] text-[#68736C]">
                Real Estate Platform
              </span>
            </div>
          </div>

          <div className="my-auto">
            {success ? (
              /* Success View */
              <div className="text-center py-4 space-y-6">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto border shadow-sm"
                  style={{
                    backgroundColor: "#E4EDE7",
                    borderColor: "#C5D8CC",
                    color: "#17382D",
                  }}
                >
                  <CheckCircle2 className="h-9 w-9" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-bold tracking-tight text-[#202A24]">
                    Check Your Inbox
                  </h2>
                  <p className="text-sm text-[#556059] max-w-md mx-auto leading-relaxed">
                    We have dispatched a password reset link to:
                  </p>
                  <div className="inline-block px-3.5 py-1.5 rounded-lg bg-[#F7F6F0] text-[#202A24] font-semibold text-sm border border-[#E1E5DE]">
                    {email}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#F7F6F0] border border-[#E1E5DE] text-xs text-[#556059] text-left space-y-1.5">
                  <p className="font-semibold text-[#202A24]">Next steps:</p>
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
                    className="w-full h-11 border-[#D0D7D2] text-[#202A24] hover:bg-[#F7F6F0]"
                  >
                    Try Another Email
                  </Button>

                  <Link
                    to="/auth/login"
                    className="w-full h-11 rounded-md font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    style={{ backgroundColor: "#234C3D", color: "#FFFFFF" }}
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Login
                  </Link>
                </div>
              </div>
            ) : (
              /* Forgot Password Form */
              <div className="space-y-6">
                <div className="space-y-2">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-3"
                    style={{ backgroundColor: "#E4EDE7", color: "#234C3D" }}
                  >
                    <KeyRound className="h-5 w-5" />
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#202A24]">
                    Forgot Password?
                  </h1>
                  <p className="text-sm text-[#556059] leading-relaxed">
                    No worries! Enter your registered account email and we&apos;ll send you a secure verification link to reset your password.
                  </p>
                </div>

                {error && (
                  <Alert variant="destructive" className="border-red-200 bg-red-50 text-red-800">
                    <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
                    <AlertDescription className="text-xs sm:text-sm text-red-800 font-medium">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-xs font-bold text-[#202A24] uppercase tracking-wider block"
                    >
                      Registered Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#68736C] pointer-events-none" />
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
                        className="pl-10 h-11 bg-white text-[#202A24] border-[#D0D7D2] placeholder:text-[#68736C] focus:border-[#234C3D]"
                        required
                        disabled={loading}
                        autoFocus
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full h-11 rounded-md text-sm font-semibold shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                    style={{ backgroundColor: "#234C3D", color: "#FFFFFF" }}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin text-white" />
                        Sending Reset Link...
                      </>
                    ) : (
                      "Send Reset Link"
                    )}
                  </button>
                </form>

                <div className="pt-2 text-center border-t border-[#E1E5DE]">
                  <Link
                    to="/auth/login"
                    className="inline-flex items-center text-sm font-semibold text-[#234C3D] hover:underline gap-1.5 transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Remember your password? Back to Login
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Bottom security microcopy */}
          <div className="mt-8 text-center text-xs text-[#68736C]">
            Having trouble? Contact{" "}
            <a
              href="mailto:support@estatehub.business"
              className="underline text-[#202A24] hover:text-[#234C3D] font-medium"
            >
              EstateHub Support
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
