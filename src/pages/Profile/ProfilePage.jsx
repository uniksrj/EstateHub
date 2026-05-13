import { useEffect, useState } from "react"
import { LoaderCircle } from "lucide-react"
import { toast } from "sonner"
import { Card, CardContent } from "@/components/ui/card"
import { useAuth } from "@/hooks/useAuth"
import { toBackendAssetUrl } from "@/config/env"
import { userAPI } from "@/services/api"
import ProfileHeroCard from "./components/ProfileHeroCard"
import {
  NotificationSettingsForm,
  ProfileDetailsForm,
  RoleDetailsForm,
  SecurityForm,
} from "./components/ProfileForms"
import ProfileTabNav from "./components/ProfileTabNav"
import {
  TIMEZONE_OPTIONS,
  getDashboardPath,
  getNotificationGroups,
  getProfileTabs,
  getRoleMeta,
  getRoleSectionConfig,
} from "./profile-config"
import {
  buildProfilePayload,
  calculateProfileCompletion,
  formatMemberSince,
  getNotificationState,
  getProfileFormState,
  getRoleFormState,
  mergeSavedUser,
  readFileAsDataUrl,
} from "./profile-utils"

export default function ProfilePage() {
  const { user, loading, updateUser } = useAuth()
  const [activeTab, setActiveTab] = useState("profile")
  const [profileForm, setProfileForm] = useState(getProfileFormState(user))
  const [roleForm, setRoleForm] = useState(getRoleFormState(user, user?.role_id))
  const [notificationForm, setNotificationForm] = useState(getNotificationState(user, user?.role_id))
  const [securityForm, setSecurityForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [savingSection, setSavingSection] = useState("")

  useEffect(() => {
    if (!user) {
      return
    }

    setProfileForm(getProfileFormState(user))
    setRoleForm(getRoleFormState(user, user.role_id))
    setNotificationForm(getNotificationState(user, user.role_id))
  }, [user])

  useEffect(() => {
    const tabs = getProfileTabs(user?.role_id)

    if (!tabs.some((tab) => tab.id === activeTab)) {
      setActiveTab(tabs[0]?.id || "profile")
    }
  }, [activeTab, user?.role_id])

  if (loading) {
    return (
      <div className="bg-background px-4 py-10 sm:px-6 lg:px-8">
        <Card className="mx-auto max-w-6xl">
          <CardContent className="flex min-h-[320px] items-center justify-center">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <LoaderCircle className="size-4 animate-spin" />
              Loading your profile workspace...
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="bg-background px-4 py-10 sm:px-6 lg:px-8">
        <Card className="mx-auto max-w-3xl">
          <CardContent className="py-16 text-center">
            <h2 className="text-xl font-semibold">Profile unavailable</h2>
            <p className="mt-2 text-sm text-muted-foreground">Sign in again to manage your account details.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const roleMeta = getRoleMeta(user.role_id)
  const roleSection = getRoleSectionConfig(user.role_id)
  const tabs = getProfileTabs(user.role_id)
  const notificationGroups = getNotificationGroups(user.role_id)
  const dashboardPath = getDashboardPath(user.role_id)
  const previewUser = {
    ...user,
    name: profileForm.name,
    phone: profileForm.phone,
    bio: profileForm.bio,
    timezone: profileForm.timezone,
    settings: {
      ...(user.settings || {}),
      profile: {
        ...(user.settings?.profile || {}),
        location: profileForm.location,
        website: profileForm.website,
        linkedin: profileForm.linkedin,
        twitter: profileForm.twitter,
      },
      notifications: notificationForm,
      role_profile: roleForm,
    },
  }
  const completion = calculateProfileCompletion(profileForm, roleForm)
  const memberSince = formatMemberSince(user)

  const persistProfile = async (sectionName) => {
    setSavingSection(sectionName)

    try {
      const payload = buildProfilePayload({
        profileForm,
        roleForm,
        notificationForm,
      })

      const response = await userAPI.updateProfile(payload)
      const nextUser = mergeSavedUser(response.data?.user || user, profileForm, roleForm, notificationForm)

      updateUser(nextUser)
      setProfileForm((currentState) => ({
        ...currentState,
        avatarFile: null,
        avatarPreview: nextUser.avatar ? toBackendAssetUrl(nextUser.avatar) : currentState.avatarPreview,
      }))
      toast.success("Profile updated successfully.")
    } catch (error) {
      console.error("Profile update failed:", error)
      toast.error(error.response?.data?.message || "We could not save your profile right now.")
    } finally {
      setSavingSection("")
    }
  }

  const handleProfileChange = (field, value) => {
    setProfileForm((currentState) => ({
      ...currentState,
      [field]: value,
    }))
  }

  const handleRoleChange = (field, value) => {
    setRoleForm((currentState) => ({
      ...currentState,
      [field]: value,
    }))
  }

  const handleNotificationToggle = (key) => {
    setNotificationForm((currentState) => ({
      ...currentState,
      [key]: !currentState[key],
    }))
  }

  const handleAvatarChange = async (file) => {
    try {
      const preview = await readFileAsDataUrl(file)

      setProfileForm((currentState) => ({
        ...currentState,
        avatarFile: file,
        avatarPreview: preview,
      }))
    } catch (error) {
      toast.error(error.message || "Unable to preview the selected image.")
    }
  }

  const handleSecurityChange = (field, value) => {
    setSecurityForm((currentState) => ({
      ...currentState,
      [field]: value,
    }))
  }

  const handleSecuritySave = (event) => {
    event.preventDefault()

    if (!securityForm.currentPassword || !securityForm.newPassword || !securityForm.confirmPassword) {
      toast.error("Please complete all password fields.")
      return
    }

    if (securityForm.newPassword !== securityForm.confirmPassword) {
      toast.error("The new password and confirmation do not match.")
      return
    }

    if (securityForm.newPassword.length < 8) {
      toast.error("Use at least 8 characters for the new password.")
      return
    }

    toast.info("Security form is validated. Connect the change-password endpoint when it is available.")
  }

  const renderActiveTab = () => {
    if (activeTab === "profile") {
      return (
        <ProfileDetailsForm
          form={profileForm}
          onChange={handleProfileChange}
          onAvatarChange={handleAvatarChange}
          onSave={(event) => {
            event.preventDefault()
            persistProfile("profile")
          }}
          isSaving={savingSection === "profile"}
          timezones={TIMEZONE_OPTIONS}
        />
      )
    }

    if (activeTab === "role") {
      return (
        <RoleDetailsForm
          config={roleSection}
          values={roleForm}
          onChange={handleRoleChange}
          onSave={(event) => {
            event.preventDefault()
            persistProfile("role")
          }}
          isSaving={savingSection === "role"}
        />
      )
    }

    if (activeTab === "notifications") {
      return (
        <NotificationSettingsForm
          groups={notificationGroups}
          values={notificationForm}
          onToggle={handleNotificationToggle}
          onSave={(event) => {
            event.preventDefault()
            persistProfile("notifications")
          }}
          isSaving={savingSection === "notifications"}
        />
      )
    }

    return <SecurityForm form={securityForm} onChange={handleSecurityChange} onSave={handleSecuritySave} />
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(120,119,198,0.08),transparent_30%),var(--background)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <ProfileHeroCard
          user={previewUser}
          roleMeta={roleMeta}
          roleSection={roleSection}
          completion={completion}
          memberSince={memberSince}
          avatarSrc={profileForm.avatarPreview}
          dashboardPath={dashboardPath}
        />

        <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
          <ProfileTabNav tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} dashboardPath={dashboardPath} />
          <div>{renderActiveTab()}</div>
        </div>
      </div>
    </div>
  )
}
