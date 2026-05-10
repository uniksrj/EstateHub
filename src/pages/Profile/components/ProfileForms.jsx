import { useRef, useState } from "react"
import { Camera, CheckCircle2, Eye, EyeOff, Info, ShieldAlert, UploadCloud } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { getInitials } from "../profile-utils"

const selectClassName =
  "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50"

function SectionCard({ title, description, children }) {
  return (
    <Card className="border-border/70 shadow-sm">
      <CardHeader className="border-b pb-5">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription className="max-w-2xl leading-6">{description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">{children}</CardContent>
    </Card>
  )
}

function Field({ label, hint, className = "", children }) {
  return (
    <div className={`space-y-2 ${className}`}>
      <Label>{label}</Label>
      {children}
      {hint ? <p className="text-xs leading-5 text-muted-foreground">{hint}</p> : null}
    </div>
  )
}

function AvatarUploader({ name, avatarSrc, onAvatarChange }) {
  const fileRef = useRef(null)

  const handleFileSelection = async (event) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    await onAvatarChange(file)
  }

  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-dashed border-border bg-muted/40 p-5 sm:flex-row sm:items-center">
      <div className="flex size-20 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 text-lg font-semibold text-primary">
        {avatarSrc ? (
          <img src={avatarSrc} alt={`${name || "Profile"} avatar`} className="size-full object-cover" />
        ) : (
          getInitials(name)
        )}
      </div>

      <div className="flex-1 space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm font-medium text-foreground">Profile photo</p>
          <Badge variant="outline" className="rounded-full">
            Square image recommended
          </Badge>
        </div>
        <p className="text-sm leading-6 text-muted-foreground">
          Add a clear headshot or brand mark to make the profile feel complete and trustworthy.
        </p>
      </div>

      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileSelection} />
      <Button type="button" variant="outline" onClick={() => fileRef.current?.click()}>
        <Camera className="size-4" />
        Change photo
      </Button>
    </div>
  )
}

export function ProfileDetailsForm({ form, onChange, onAvatarChange, onSave, isSaving, timezones }) {
  return (
    <SectionCard
      title="Personal Information"
      description="Keep your public-facing profile clean and current so clients and teammates get the right first impression."
    >
      <form className="space-y-6" onSubmit={onSave}>
        <AvatarUploader name={form.name} avatarSrc={form.avatarPreview} onAvatarChange={onAvatarChange} />

        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Full name">
            <Input value={form.name} onChange={(event) => onChange("name", event.target.value)} placeholder="Your full name" />
          </Field>
          <Field label="Email address" hint="Email is controlled by your authenticated account and shown here for reference.">
            <Input value={form.email} disabled />
          </Field>
          <Field label="Phone number">
            <Input value={form.phone} onChange={(event) => onChange("phone", event.target.value)} placeholder="+91 98765 43210" />
          </Field>
          <Field label="Time zone">
            <select
              value={form.timezone}
              onChange={(event) => onChange("timezone", event.target.value)}
              className={selectClassName}
            >
              {timezones.map((timezone) => (
                <option key={timezone} value={timezone}>
                  {timezone}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Location">
            <Input value={form.location} onChange={(event) => onChange("location", event.target.value)} placeholder="Ludhiana, Punjab" />
          </Field>
          <Field label="Website">
            <Input value={form.website} onChange={(event) => onChange("website", event.target.value)} placeholder="https://your-site.com" />
          </Field>
          <Field label="LinkedIn">
            <Input value={form.linkedin} onChange={(event) => onChange("linkedin", event.target.value)} placeholder="linkedin.com/in/username" />
          </Field>
          <Field label="Twitter or X">
            <Input value={form.twitter} onChange={(event) => onChange("twitter", event.target.value)} placeholder="@handle" />
          </Field>
          <Field label="Professional bio" className="md:col-span-2">
            <Textarea
              value={form.bio}
              onChange={(event) => onChange("bio", event.target.value)}
              placeholder="Tell people what you do best, where you work, and why they should trust you."
              rows={5}
            />
          </Field>
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSaving}>
            {isSaving ? (
              <>
                <UploadCloud className="size-4 animate-pulse" />
                Saving profile...
              </>
            ) : (
              <>
                <CheckCircle2 className="size-4" />
                Save profile
              </>
            )}
          </Button>
        </div>
      </form>
    </SectionCard>
  )
}

export function RoleDetailsForm({ config, values, onChange, onSave, isSaving }) {
  return (
    <SectionCard title={config.title} description={config.description}>
      <form className="space-y-6" onSubmit={onSave}>
        <div className="grid gap-4 md:grid-cols-2">
          {config.fields.map((field) => {
            const value = values[field.name] || ""

            if (field.type === "textarea") {
              return (
                <Field key={field.name} label={field.label} className={field.colSpan === 2 ? "md:col-span-2" : ""}>
                  <Textarea
                    value={value}
                    rows={4}
                    onChange={(event) => onChange(field.name, event.target.value)}
                    placeholder={field.placeholder}
                  />
                </Field>
              )
            }

            if (field.type === "select") {
              return (
                <Field key={field.name} label={field.label} className={field.colSpan === 2 ? "md:col-span-2" : ""}>
                  <select
                    value={value}
                    onChange={(event) => onChange(field.name, event.target.value)}
                    className={selectClassName}
                  >
                    <option value="">Select {field.label.toLowerCase()}</option>
                    {field.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </Field>
              )
            }

            return (
              <Field key={field.name} label={field.label} className={field.colSpan === 2 ? "md:col-span-2" : ""}>
                <Input
                  type={field.type || "text"}
                  value={value}
                  onChange={(event) => onChange(field.name, event.target.value)}
                  placeholder={field.placeholder}
                />
              </Field>
            )
          })}
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSaving}>
            {isSaving ? "Saving settings..." : "Save role settings"}
          </Button>
        </div>
      </form>
    </SectionCard>
  )
}

export function NotificationSettingsForm({ groups, values, onToggle, onSave, isSaving }) {
  return (
    <SectionCard
      title="Notification Preferences"
      description="Keep the signal strong. These preferences help you focus on the alerts that matter for your role."
    >
      <form className="space-y-6" onSubmit={onSave}>
        {groups.map((group, index) => (
          <div key={group.title} className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold">{group.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">Choose which updates should actively interrupt your day.</p>
            </div>

            <div className="space-y-3">
              {group.items.map((item) => (
                <label
                  key={item.key}
                  className="flex cursor-pointer items-start gap-3 rounded-xl border border-border/70 bg-background px-4 py-4 transition-colors hover:bg-muted/30"
                >
                  <Checkbox checked={Boolean(values[item.key])} onCheckedChange={() => onToggle(item.key)} className="mt-1" />
                  <div className="space-y-1">
                    <span className="block text-sm font-medium text-foreground">{item.label}</span>
                    <span className="block text-sm leading-6 text-muted-foreground">{item.description}</span>
                  </div>
                </label>
              ))}
            </div>

            {index < groups.length - 1 ? <Separator /> : null}
          </div>
        ))}

        <div className="flex justify-end">
          <Button type="submit" disabled={isSaving}>
            {isSaving ? "Saving preferences..." : "Save notifications"}
          </Button>
        </div>
      </form>
    </SectionCard>
  )
}

export function SecurityForm({ form, onChange, onSave }) {
  const [visibleFields, setVisibleFields] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  })

  const checks = [
    {
      label: "At least 8 characters",
      isValid: form.newPassword.length >= 8,
    },
    {
      label: "Contains an uppercase letter",
      isValid: /[A-Z]/.test(form.newPassword),
    },
    {
      label: "Contains a number",
      isValid: /\d/.test(form.newPassword),
    },
    {
      label: "Matches confirmation",
      isValid: form.newPassword.length > 0 && form.newPassword === form.confirmPassword,
    },
  ]

  const toggleVisibility = (fieldName) => {
    setVisibleFields((currentState) => ({
      ...currentState,
      [fieldName]: !currentState[fieldName],
    }))
  }

  const renderPasswordField = (label, fieldName, placeholder) => (
    <Field label={label}>
      <div className="relative">
        <Input
          type={visibleFields[fieldName] ? "text" : "password"}
          value={form[fieldName]}
          onChange={(event) => onChange(fieldName, event.target.value)}
          placeholder={placeholder}
          className="pr-10"
        />
        <button
          type="button"
          onClick={() => toggleVisibility(fieldName)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
        >
          {visibleFields[fieldName] ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
    </Field>
  )

  return (
    <SectionCard
      title="Security"
      description="Strengthen sign-in hygiene now. This form includes validation, while the actual password-change API can be wired in when available."
    >
      <form className="space-y-6" onSubmit={onSave}>
        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm leading-6 text-amber-900 dark:text-amber-200">
          <div className="flex items-start gap-3">
            <ShieldAlert className="mt-0.5 size-4 flex-shrink-0" />
            <div>
              Use a strong password with a mix of upper-case letters, numbers, and enough length to avoid easy guesses.
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {renderPasswordField("Current password", "currentPassword", "Enter your current password")}
          {renderPasswordField("New password", "newPassword", "Create a stronger password")}
          <div className="md:col-span-2">{renderPasswordField("Confirm new password", "confirmPassword", "Repeat the new password")}</div>
        </div>

        <div className="rounded-2xl border border-border/70 bg-muted/30 p-4">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Info className="size-4 text-primary" />
            Password checklist
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {checks.map((check) => (
              <div
                key={check.label}
                className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm ${
                  check.isValid ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" : "bg-background text-muted-foreground"
                }`}
              >
                <CheckCircle2 className="size-4" />
                <span>{check.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit">Review security update</Button>
        </div>
      </form>
    </SectionCard>
  )
}
