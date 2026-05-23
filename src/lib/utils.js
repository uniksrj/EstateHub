import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function deleteP(id) {
  if (!id) {
    console.error("Invalid ID");
    return;
  }


}

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-IN', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

export const formatDateTime = (dateString) => {
  return new Date(dateString).toLocaleString('en-IN', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatFeaturesForInput = (features) => {
  if (Array.isArray(features)) {
    return features.join(", ")
  }

  if (typeof features !== "string") {
    return features ?? ""
  }

  try {
    const parsedFeatures = JSON.parse(features)

    if (Array.isArray(parsedFeatures)) {
      return parsedFeatures.join(", ")
    }
  } catch {
    return features
  }

  return features
}

export const getImageName = (image, index) => {
  if (image.file?.name) return image.file.name
  if (image.name) return image.name
  if (image.caption) return image.caption
  if (image.cloudinary_public_id) return image.cloudinary_public_id.split("/").pop()

  const imageUrl = image.image_path || image.optimized_url || image.thumbnail_url || image.cloudinary_secure_url

  if (imageUrl) {
    return decodeURIComponent(imageUrl.split("/").pop()?.split("?")[0] || `Property image ${index + 1}`)
  }

  return `Property image ${index + 1}`
}