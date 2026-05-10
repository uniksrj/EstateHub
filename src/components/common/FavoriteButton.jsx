"use client"

import { useState, useEffect } from "react"
import { Heart } from "lucide-react"
import { Button } from "../ui/button"
import { favoritesAPI } from "../../services/api"
import { useAuth } from "../../hooks/useAuth"
import { toast } from "../../hooks/use-toast"

const FavoriteButton = ({ propertyId, className = "" }) => {
  const [isFavorite, setIsFavorite] = useState(false)
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    if (user && propertyId) {
      checkFavoriteStatus()
    }
  }, [user, propertyId])

  const checkFavoriteStatus = async () => {
    try {
      const response = await favoritesAPI.checkIsFavorite(propertyId)
      setIsFavorite(response.data.isFavorite)
    } catch (error) {
      console.error("Error checking favorite status:", error)
    }
  }

  const toggleFavorite = async () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to add properties to favorites",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      if (isFavorite) {
        await favoritesAPI.removeFromFavorites(propertyId)
        setIsFavorite(false)
        toast({
          title: "Removed from Favorites",
          description: "Property removed from your favorites",
        })
      } else {
        await favoritesAPI.addToFavorites(propertyId)
        setIsFavorite(true)
        toast({
          title: "Added to Favorites",
          description: "Property added to your favorites",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update favorites. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleFavorite}
      disabled={loading}
      className={`${className} ${isFavorite ? "text-red-500 border-red-500" : ""}`}
    >
      <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
      {isFavorite ? "Favorited" : "Add to Favorites"}
    </Button>
  )
}

export default FavoriteButton
