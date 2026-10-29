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
    <div className="relative hidden lg:flex flex-col justify-between bg-gradient-to-br from-[#17382D] via-[#234C3D] to-[#122A22] text-white p-10 xl:p-12 overflow-hidden">
      {/* Decorative background blurs & patterns */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-teal-300/10 rounded-full blur-3xl pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* Top: Logo & Platform Badge */}
      <div className="relative z-10 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-emerald-300 shadow-inner">
            <Building2 className="h-6 w-6" />
          </div>
          <div>
            <span className="font-bold text-2xl tracking-tight text-white block">
              EstateHub India
            </span>
            <span className="text-[11px] uppercase tracking-wider text-emerald-200/80 font-semibold">
              Real Estate CMS & Marketplace
            </span>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-xs text-emerald-200 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {badge}
        </div>
      </div>

      {/* Middle: Headline & App Overview */}
      <div className="relative z-10 my-8 space-y-6">
        <div className="space-y-3">
          <h2 className="text-3xl xl:text-4xl font-extrabold tracking-tight leading-tight text-white">
            {title}
          </h2>
          <p className="text-sm xl:text-base text-emerald-100/85 leading-relaxed">
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
                className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm"
              >
                <div className="p-2 rounded-md bg-white/10 text-emerald-300 shrink-0 mt-0.5">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">
                    {item.title}
                  </h4>
                  <p className="text-xs text-emerald-200/70 mt-0.5 leading-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Bottom: Trust & Security Note */}
      <div className="relative z-10 pt-4 border-t border-white/15 flex items-center justify-between text-xs text-emerald-200/75">
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
          Bank-grade TLS encryption
        </span>
        <span>Trusted across 20+ cities</span>
      </div>
    </div>
  )
}
