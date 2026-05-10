"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { propertiesAPI } from "@/services/api"
import { toast } from "sonner"
import { Rocket } from "lucide-react"

const BoostPropertyDialog = ({ open, onOpenChange, property, onBoosted }) => {
  const [plans, setPlans] = useState([])
  const [selectedPlan, setSelectedPlan] = useState("")
  const [loadingPlans, setLoadingPlans] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!open) {
      setSelectedPlan("")
      return
    }

    const loadPlans = async () => {
      try {
        setLoadingPlans(true)
        const response = await propertiesAPI.getBoostPlans()
        const nextPlans = Array.isArray(response.data?.plans) ? response.data.plans : []
        setPlans(nextPlans)
        setSelectedPlan(nextPlans[0]?.type || "")
      } catch (error) {
        toast.error("Unable to load boost plans right now.")
        setPlans([])
      } finally {
        setLoadingPlans(false)
      }
    }

    loadPlans()
  }, [open])

  const handleBoost = async () => {
    if (!property?.id || !selectedPlan) {
      return
    }

    try {
      setSubmitting(true)
      const response = await propertiesAPI.boostProperty({
        property_id: property.id,
        boost_type: selectedPlan,
      })
      toast.success(response.data?.message || "Your property is now boosted.")
      onBoosted?.(response.data?.property)
      onOpenChange(false)
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not boost your property right now.")
    } finally {
      setSubmitting(false)
    }
  }

  const formatPlanPrice = (price, currency) => {
    if (currency === "INR") {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(Number(price || 0))
    }

    return `${price}`
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Boost Property</DialogTitle>
          <DialogDescription>
            Choose a visibility plan to get more buyer enquiries for {property?.title || "your property"}.
          </DialogDescription>
        </DialogHeader>

        {loadingPlans ? (
          <div className="space-y-3 py-2">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-28 animate-pulse rounded-2xl bg-muted" />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-3">
            {plans.map((plan) => {
              const isSelected = selectedPlan === plan.type
              const isHomepage = plan.type === "homepage"

              return (
                <Card
                  key={plan.type}
                  className={cn(
                    "cursor-pointer rounded-2xl border transition-all",
                    isSelected ? "border-primary shadow-lg shadow-primary/10" : "border-border",
                    isHomepage && "ring-1 ring-gold/60"
                  )}
                  onClick={() => setSelectedPlan(plan.type)}
                >
                  <CardContent className="space-y-4 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-lg font-semibold">{plan.name}</div>
                        <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
                      </div>
                      {isHomepage && (
                        <Badge className="bg-gold text-accent-foreground">Featured</Badge>
                      )}
                    </div>

                    <div className="space-y-1">
                      <div className="text-2xl font-bold">{formatPlanPrice(plan.price, plan.currency)}</div>
                      <div className="text-sm text-muted-foreground">{plan.duration_days} days</div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Rocket className="h-4 w-4 text-primary" />
                      Boosted listings stay on priority display until the plan expires.
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleBoost} disabled={!selectedPlan || submitting || loadingPlans}>
            {submitting ? "Activating..." : "Boost Your Property"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default BoostPropertyDialog
