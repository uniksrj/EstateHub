import { useEffect, useState } from "react"
import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const STORAGE_KEY = "estatehub_beta_notice_seen"

const BetaNotice = () => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (window.localStorage.getItem(STORAGE_KEY) !== "true") {
      setOpen(true)
    }
  }, [])

  const closeNotice = () => {
    window.localStorage.setItem(STORAGE_KEY, "true")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={(nextOpen) => {
      if (!nextOpen) {
        closeNotice()
      }
    }}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="mb-2 flex size-11 items-center justify-center rounded-full bg-amber-100 text-amber-700">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <DialogTitle>Beta Testing Notice</DialogTitle>
          <DialogDescription>
            This web app is currently in beta for testing. We are checking known problems and fixes are in progress.
            If you find any issue, please send us a message with details so the developer team can review it.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={closeNotice}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default BetaNotice
