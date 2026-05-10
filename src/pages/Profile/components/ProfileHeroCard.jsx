import { Link } from "react-router"
import { ArrowRight, CheckCircle2, Mail, MapPin, Phone, ShieldCheck } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getInitials } from "../profile-utils"

export default function ProfileHeroCard({
  user,
  roleMeta,
  roleSection,
  completion,
  memberSince,
  avatarSrc,
  dashboardPath,
}) {
  const RoleIcon = roleMeta.icon

  const highlights = [
    {
      label: "Profile completion",
      value: `${completion}%`,
      helper: "Keep the essentials filled for a stronger profile.",
    },
    {
      label: "Verification",
      value: user?.is_verified ? "Verified" : "Pending",
      helper: user?.is_verified ? "Your account details are trusted across the platform." : "Complete verification to build more trust.",
    },
    {
      label: "Workspace focus",
      value: roleSection.title,
      helper: "Role-aware settings help the page stay relevant to your workflow.",
    },
  ]

  const contactFacts = [
    { icon: Mail, value: user?.email || "No email added" },
    { icon: Phone, value: user?.phone || "Add a phone number" },
    { icon: MapPin, value: user?.settings?.profile?.location || "Add your location" },
  ]

  return (
    <Card className="overflow-hidden border-border/70 shadow-xl shadow-black/5">
      <div className={`relative bg-gradient-to-br ${roleMeta.accentClassName} px-6 py-8 text-white sm:px-8`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_25%)]" />
        <CardContent className="relative space-y-8 px-0">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <Avatar className="size-24 border-4 border-white/15 shadow-lg shadow-black/15">
                <AvatarImage src={avatarSrc} alt={user?.name || "Profile avatar"} className="object-cover" />
                <AvatarFallback className="bg-white/10 text-2xl font-semibold text-white">
                  {getInitials(user?.name)}
                </AvatarFallback>
              </Avatar>

              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="secondary" className={`rounded-full border ${roleMeta.badgeClassName}`}>
                    <RoleIcon className="size-3.5" />
                    {roleMeta.label}
                  </Badge>
                  <span className="text-sm text-white/70">Member since {memberSince}</span>
                  {user?.is_verified ? (
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm text-white/85">
                      <CheckCircle2 className="size-4 text-emerald-300" />
                      Verified account
                    </span>
                  ) : null}
                </div>

                <div>
                  <h1 className="text-3xl font-semibold tracking-tight">{user?.name || "Profile"}</h1>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-white/72">
                    {user?.bio?.trim() || "Complete your profile, role setup, and notification preferences from one clean workspace."}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 text-sm text-white/80">
                  {contactFacts.map((fact) => {
                    const FactIcon = fact.icon

                    return (
                      <span key={fact.value} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5">
                        <FactIcon className="size-4 text-white/70" />
                        <span>{fact.value}</span>
                      </span>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="secondary" className="bg-white text-slate-900 hover:bg-white/90">
                <Link to={dashboardPath}>
                  Back to dashboard
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {highlights.map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/12 bg-white/8 p-4 backdrop-blur-sm">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/60">{item.label}</p>
                <div className="mt-3 flex items-start gap-3">
                  <div className="rounded-full bg-white/10 p-2">
                    <ShieldCheck className="size-4 text-white/80" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-lg font-semibold text-white">{item.value}</p>
                    <p className="text-sm leading-5 text-white/65">{item.helper}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </div>
    </Card>
  )
}
