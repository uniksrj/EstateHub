
"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { DollarSign, MessageSquare, Calculator } from "lucide-react"

export function CounterOfferModal({
  isOpen,
  onClose,
  onConfirm,
  offer,
  isLoading = false
}) {
  const [formData, setFormData] = useState({
    counterAmount: "",
    message: ""
  })
  
  useEffect(() => {
    if (isOpen && offer) {
      const currentAmount = offer.counter_offer_amount || offer.offer_amount;
      setFormData({
        counterAmount: currentAmount,
        message: offer.counter_offer_message || `I'd like to counter your offer of $${offer.offer_amount?.toLocaleString()} with $${currentAmount?.toLocaleString()}.`
      })
    }
  }, [isOpen, offer])

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.counterAmount || parseFloat(formData.counterAmount) <= 0) {
      return
    }
    
    onConfirm({
      counterAmount: parseFloat(formData.counterAmount),
      message: formData.message
    })
  }

  const calculateDifference = () => {
    if (!formData.counterAmount || !offer?.offer_amount) return 0
    return ((parseFloat(formData.counterAmount) - offer.offer_amount) / offer.offer_amount * 100).toFixed(1)
  }

  const difference = calculateDifference()
  const isHigher = parseFloat(difference) > 0

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Make Counter Offer
          </DialogTitle>
          <DialogDescription>
            Negotiate the price and terms with the buyer
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Original Offer */}
          {offer && (
            <div className="bg-muted/30 rounded-lg p-3">
              <Label className="text-sm font-medium">Original Offer</Label>
              <div className="text-lg font-bold text-foreground">
                ${offer.offer_amount?.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">
                from {offer.buyer?.name}
              </div>
            </div>
          )}

          {/* Counter Offer Amount */}
          <div className="space-y-2">
            <Label htmlFor="counterAmount" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Your Counter Offer Amount *
            </Label>
            <Input
              id="counterAmount"
              type="number"
              placeholder="Enter counter offer amount"
              value={formData.counterAmount}
              onChange={(e) => handleChange('counterAmount', e.target.value)}
              className="text-lg font-medium"
              required
              min="1"
              step="1000"
            />
            
            {/* Price Difference Indicator */}
            {offer && formData.counterAmount && (
              <div className={`text-sm ${isHigher ? 'text-green-600' : 'text-orange-600'}`}>
                {isHigher ? '↑' : '↓'} {Math.abs(difference)}% {isHigher ? 'above' : 'below'} original offer
              </div>
            )}
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Message to Buyer (Optional)
            </Label>
            <Textarea
              id="message"
              placeholder="Explain your counter offer and any terms..."
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              rows={4}
              className="resize-none"
            />
            <div className="text-xs text-muted-foreground">
              This message will be sent to the buyer along with your counter offer.
            </div>
          </div>

          {/* Quick Amount Buttons */}
          <div className="space-y-2">
            <Label className="text-sm">Quick Adjustments</Label>
            <div className="flex gap-2 flex-wrap">
              {[5000, 10000, 25000].map((amount) => (
                <Button
                  key={amount}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newAmount = offer ? (offer.offer_amount + amount) : amount
                    handleChange('counterAmount', newAmount)
                  }}
                >
                  +${amount.toLocaleString()}
                </Button>
              ))}
              {[5000, 10000, 25000].map((amount) => (
                <Button
                  key={-amount}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newAmount = offer ? Math.max(1, offer.offer_amount - amount) : amount
                    handleChange('counterAmount', newAmount)
                  }}
                >
                  -${amount.toLocaleString()}
                </Button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={isLoading || !formData.counterAmount}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                  Sending...
                </div>
              ) : (
                `Send Counter Offer`
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}