import React from "react"
import { Building2, ShieldCheck, Home, Users, CheckCircle2 } from "lucide-react"

export default function AuthBrandPanel({
  badge = "India's Premier Real Estate Platform",
  title = "Find Your Dream Property with Complete Confidence",
  description = "EstateHub India connects serious buyers, reputable sellers, and certified agents. Explore verified residential and commercial properties with transparent listings and secure account management.",
  features = [
    {
      icon: ShieldCheck,
      title: "100% Verified Properties",
      desc: "Every listing is vetted with direct ownership and certified documentation.",
    },
    {
      icon: Users,
      title: "Trusted Agents & Direct Sellers",
      desc: "Connect seamlessly with verified agents across top metropolitan cities.",
    },
    {
      icon: Home,
      title: "End-to-End Property Search",
      desc: "Compare amenities, price trends, and locality insights in real time.",
    },
  ],
}) {
  return (
    <div className="auth-brand-panel relative hidden lg:flex flex-col justify-between bg-gradient-to-br from-[#17382D] via-[#234C3D] to-[#122A22] text-white p-10 xl:p-12 overflow-hidden select-none">
      {/* Decorative background blurs & patterns */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* Top: Logo & Platform Badge */}
      <div className="relative z-10 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center shadow-inner">
            <Building2 className="h-6 w-6" style={{ color: "#A7F3D0" }} />
          </div>
          <div>
            <span
              className="font-bold text-2xl tracking-tight block"
              style={{ color: "#FFFFFF" }}
            >
              EstateHub India
            </span>
            <span
              className="auth-panel-meta text-[11px] uppercase tracking-wider font-semibold block"
              style={{ color: "rgba(255, 255, 255, 0.78)" }}
            >
              Real Estate CMS & Marketplace
            </span>
          </div>
        </div>

        <div
          className="auth-panel-badge inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.14)",
            border: "1px solid rgba(255, 255, 255, 0.25)",
            color: "#D1FAE5",
          }}
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: "#34D399" }}
          />
          {badge}
        </div>
      </div>

      {/* Middle: Headline & App Overview */}
      <div className="relative z-10 my-8 space-y-6">
        <div className="space-y-3">
          <h2
            className="text-3xl xl:text-4xl font-extrabold tracking-tight leading-tight"
            style={{ color: "#FFFFFF" }}
          >
            {title}
          </h2>
          <p
            className="text-sm xl:text-base leading-relaxed"
            style={{ color: "rgba(255, 255, 255, 0.90)" }}
          >
            {description}
          </p>
        </div>

        {/* Feature bullets */}
        <div className="space-y-3.5 pt-2">
          {features.map((item, index) => {
            const Icon = item.icon
            return (
              <div
                key={index}
                className="flex items-start gap-3 p-3.5 rounded-xl border backdrop-blur-sm"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  borderColor: "rgba(255, 255, 255, 0.16)",
                }}
              >
                <div
                  className="p-2 rounded-lg shrink-0 mt-0.5"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.14)",
                    color: "#A7F3D0",
                  }}
                >
                  <Icon className="h-4 w-4" style={{ color: "#A7F3D0" }} />
                </div>
                <div>
                  <h4
                    className="text-sm font-semibold"
                    style={{ color: "#FFFFFF" }}
                  >
                    {item.title}
                  </h4>
                  <p
                    className="text-xs mt-0.5 leading-normal"
                    style={{ color: "rgba(255, 255, 255, 0.82)" }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Bottom: Trust & Security Note */}
      <div
        className="relative z-10 pt-4 flex items-center justify-between text-xs"
        style={{
          borderTop: "1px solid rgba(255, 255, 255, 0.18)",
          color: "rgba(255, 255, 255, 0.80)",
        }}
      >
        <span className="flex items-center gap-1.5 font-medium">
          <CheckCircle2
            className="h-3.5 w-3.5"
            style={{ color: "#34D399" }}
          />
          Bank-grade TLS encryption
        </span>
        <span className="font-medium">Trusted across 20+ cities</span>
      </div>
    </div>
  )
}
