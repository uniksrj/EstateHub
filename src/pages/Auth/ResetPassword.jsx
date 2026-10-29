"use client"

import { useState } from "react"
import { useSearchParams, useNavigate, Link } from "react-router"
import { toast, Toaster } from "sonner"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Alert, AlertDescription } from "../../components/ui/alert"
import {
  Building2,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  ArrowLeft,
  Check,
  AlertCircle,
  KeyRound,
} from "lucide-react"
import { authAPI } from "../../services/api"
import AuthBrandPanel from "./AuthBrandPanel"

export default function ResetPassword() {
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const [params] = useSearchParams()
  const token = params.get("token")
  const email = params.get("email")

  const isLinkMissingParams = !token || !email

  const isLengthValid = password.length >= 8
  const isMatchValid = password.length > 0 && password === passwordConfirmation

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (isLinkMissingParams) {
      setError("This password reset link is invalid or has expired. Please request a new reset link.")
      return
    }

    if (!isLengthValid) {
      setError("Password must contain at least 8 characters.")
      return
    }

    if (!isMatchValid) {
      setError("The password confirmation does not match.")
      return
    }

    setLoading(true)
    try {
      const data = {
        token,
        email: email?.trim(),
        password,
        password_confirmation: passwordConfirmation,
      }
      const response = await authAPI.resetPassword(data)
      toast.success(response?.data?.message || "Password updated successfully!")

      setTimeout(() => {
        navigate("/auth/login", { replace: true })
      }, 1500)
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Failed to reset password. Please try again."
      setError(errorMsg)
      toast.error(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#F7F6F0]">
      <Toaster position="top-right" richColors />

      <div className="w-full max-w-5xl rounded-2xl sm:rounded-3xl shadow-2xl bg-white border border-[#E1E5DE] overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        {/* Left Side: Brand & App Overview Panel */}
        <AuthBrandPanel
          badge="Account Security"
          title="Protecting Your Property Investments & Portfolio"
          description="Update your password to ensure uninterrupted, secure access to your EstateHub dashboard, verified listings, active inquiries, and confidential client leads."
        />

        {/* Right Side: Reset Password Form */}
        <div className="flex flex-col justify-between p-6 sm:p-10 lg:p-12 bg-white text-[#202A24]">
          {/* Mobile Top Brand Header */}
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

          <div className="my-auto space-y-6">
            <div className="space-y-2">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-3"
                style={{ backgroundColor: "#E4EDE7", color: "#234C3D" }}
              >
                <Lock className="h-5 w-5" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#202A24]">
                Set New Password
              </h1>
              <p className="text-sm text-[#556059] leading-relaxed">
                Choose a strong password with at least 8 characters to secure your account.
              </p>
            </div>

            {email && (
              <div className="px-3.5 py-2 rounded-lg bg-[#F7F6F0] border border-[#E1E5DE] flex items-center justify-between text-xs">
                <span className="text-[#68736C] font-medium">Account:</span>
                <span className="font-bold text-[#202A24] truncate max-w-[220px]">
                  {email}
                </span>
              </div>
            )}

            {isLinkMissingParams && (
              <Alert variant="destructive" className="border-amber-200 bg-amber-50 text-amber-900">
                <AlertCircle className="h-4 w-4 shrink-0 text-amber-700" />
                <AlertDescription className="text-xs sm:text-sm text-amber-900 font-medium">
                  This reset link is missing required verification parameters. Please request a new link.
                </AlertDescription>
              </Alert>
            )}

            {error && (
              <Alert variant="destructive" className="border-red-200 bg-red-50 text-red-800">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
                <AlertDescription className="text-xs sm:text-sm text-red-800 font-medium">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* New Password */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="password"
                  className="text-xs font-bold text-[#202A24] uppercase tracking-wider block"
                >
                  New Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter at least 8 characters"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      if (error) setError("")
                    }}
                    className="pr-10 h-11 bg-white text-[#202A24] border-[#D0D7D2] placeholder:text-[#68736C] focus:border-[#234C3D]"
                    required
                    minLength={8}
                    disabled={loading || isLinkMissingParams}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#68736C] hover:text-[#202A24] p-1 transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="password_confirmation"
                  className="text-xs font-bold text-[#202A24] uppercase tracking-wider block"
                >
                  Confirm New Password
                </Label>
                <div className="relative">
                  <Input
                    id="password_confirmation"
                    name="password_confirmation"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-enter your new password"
                    value={passwordConfirmation}
                    onChange={(e) => {
                      setPasswordConfirmation(e.target.value)
                      if (error) setError("")
                    }}
                    className="pr-10 h-11 bg-white text-[#202A24] border-[#D0D7D2] placeholder:text-[#68736C] focus:border-[#234C3D]"
                    required
                    minLength={8}
                    disabled={loading || isLinkMissingParams}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    tabIndex={-1}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#68736C] hover:text-[#202A24] p-1 transition-colors cursor-pointer"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Password Requirements Checklist */}
              <div className="p-3.5 rounded-xl bg-[#F7F6F0] border border-[#E1E5DE] text-xs space-y-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-colors"
                    style={{
                      backgroundColor: isLengthValid ? "#234C3D" : "#E1E5DE",
                      color: isLengthValid ? "#FFFFFF" : "#68736C",
                    }}
                  >
                    <Check className="h-2.5 w-2.5" />
                  </div>
                  <span
                    className={
                      isLengthValid ? "text-[#17382D] font-semibold" : "text-[#68736C]"
                    }
                  >
                    At least 8 characters long
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-colors"
                    style={{
                      backgroundColor: isMatchValid ? "#234C3D" : "#E1E5DE",
                      color: isMatchValid ? "#FFFFFF" : "#68736C",
                    }}
                  >
                    <Check className="h-2.5 w-2.5" />
                  </div>
                  <span
                    className={
                      isMatchValid ? "text-[#17382D] font-semibold" : "text-[#68736C]"
                    }
                  >
                    Passwords match
                  </span>
                </div>
              </div>

              {isLinkMissingParams ? (
                <Link to="/auth/forgot-password" className="block w-full">
                  <Button
                    variant="outline"
                    type="button"
                    className="w-full h-11 gap-2 border-[#D0D7D2] text-[#202A24]"
                  >
                    <KeyRound className="h-4 w-4" />
                    Request a New Reset Link
                  </Button>
                </Link>
              ) : (
                <button
                  type="submit"
                  className="w-full h-11 rounded-md text-sm font-semibold shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                  style={{ backgroundColor: "#234C3D", color: "#FFFFFF" }}
                  disabled={loading || !isLengthValid || !isMatchValid}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin text-white" />
                      Updating Password...
                    </>
                  ) : (
                    "Reset Password"
                  )}
                </button>
              )}
            </form>

            <div className="pt-2 text-center border-t border-[#E1E5DE]">
              <Link
                to="/auth/login"
                className="inline-flex items-center text-sm font-semibold text-[#234C3D] hover:underline gap-1.5 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Login
              </Link>
            </div>
          </div>

          {/* Bottom security microcopy */}
          <div className="mt-8 text-center text-xs text-[#68736C]">
            Protected by EstateHub Security Protocol
          </div>
        </div>
      </div>
    </div>
  )
}
