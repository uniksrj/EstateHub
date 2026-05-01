import { getNotificationGroups, getRoleSectionConfig } from "./profile-config"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000"

function getSettings(user) {
  return user?.settings && typeof user.settings === "object" ? user.settings : {}
}

export function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")
}

export function getAvatarUrl(avatar) {
  if (!avatar) {
    return ""
  }

  if (
    avatar.startsWith("http://") ||
    avatar.startsWith("https://") ||
    avatar.startsWith("data:") ||
    avatar.startsWith("blob:")
  ) {
    return avatar
  }
  return `${API_URL}/storage/${avatar}`
}

export function getProfileFormState(user) {
  const settings = getSettings(user)
  const profileSettings = settings.profile || {}

  return {
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    bio: user?.bio || "",
    location: profileSettings.location || "",
    website: profileSettings.website || "",
    linkedin: profileSettings.linkedin || "",
    twitter: profileSettings.twitter || "",
    timezone: user?.timezone || "UTC",
    avatarFile: null,
    avatarPreview: getAvatarUrl(user?.avatar),
  }
}

export function getRoleFormState(user, roleId) {
  const settings = getSettings(user)
  const roleProfile = settings.role_profile || {}
  const roleSection = getRoleSectionConfig(roleId)

  return roleSection.fields.reduce((accumulator, field) => {
    accumulator[field.name] = roleProfile[field.name] || ""
    return accumulator
  }, {})
}

export function getNotificationState(user, roleId) {
  const settings = getSettings(user)
  const savedNotifications = settings.notifications || {}
  const defaults = {}

  getNotificationGroups(roleId).forEach((group) => {
    group.items.forEach((item) => {
      defaults[item.key] = savedNotifications[item.key] ?? true
    })
  })

  return defaults
}

export function formatMemberSince(user) {
  const source = user?.created_at || user?.updated_at

  if (!source) {
    return "Recently joined"
  }

  const parsedDate = new Date(source)

  if (Number.isNaN(parsedDate.getTime())) {
    return "Recently joined"
  }

  return parsedDate.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  })
}

export function calculateProfileCompletion(profileForm, roleForm) {
  const profileFields = [
    profileForm.name,
    profileForm.phone,
    profileForm.bio,
    profileForm.location,
    profileForm.website,
    profileForm.linkedin,
    profileForm.twitter,
  ]
  const roleFields = Object.values(roleForm || {})
  const allFields = [...profileFields, ...roleFields]

  if (allFields.length === 0) {
    return 0
  }

  const completedFields = allFields.filter((value) => String(value || "").trim().length > 0).length

  return Math.round((completedFields / allFields.length) * 100)
}

export function buildProfilePayload({ profileForm, roleForm, notificationForm }) {
  const payload = new FormData()

  payload.append("name", profileForm.name || "")
  payload.append("phone", profileForm.phone || "")
  payload.append("bio", profileForm.bio || "")
  payload.append("timezone", profileForm.timezone || "UTC")
  payload.append("location", profileForm.location || "")
  payload.append("website", profileForm.website || "")
  payload.append("linkedin", profileForm.linkedin || "")
  payload.append("twitter", profileForm.twitter || "")
  payload.append("notification_preferences", JSON.stringify(notificationForm || {}))
  payload.append("role_profile", JSON.stringify(roleForm || {}))

  if (profileForm.avatarFile) {
    payload.append("avatar", profileForm.avatarFile)
  }

  return payload
}

export function mergeSavedUser(savedUser, profileForm, roleForm, notificationForm) {
  const settings = savedUser?.settings && typeof savedUser.settings === "object" ? savedUser.settings : {}

  return {
    ...savedUser,
    timezone: profileForm.timezone || savedUser?.timezone || "UTC",
    settings: {
      ...settings,
      profile: {
        ...(settings.profile || {}),
        location: profileForm.location || "",
        website: profileForm.website || "",
        linkedin: profileForm.linkedin || "",
        twitter: profileForm.twitter || "",
      },
      notifications: notificationForm || {},
      role_profile: roleForm || {},
    },
  }
}

export function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(new Error("Failed to read the selected file."))
    reader.readAsDataURL(file)
  })
}
