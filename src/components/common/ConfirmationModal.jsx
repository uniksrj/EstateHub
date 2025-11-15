// components/ConfirmationModal.jsx
"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { getVariantStyles } from "@/utils/userHelpers"

export function ConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    title = "Are you sure?",
    description = "This action cannot be undone.",
    confirmText = "Confirm",
    cancelText = "Cancel",
    variant = "default",
    isLoading = false
}) {

    const styles = getVariantStyles(variant)

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader className="flex flex-row items-center gap-3">
                    <div className={`p-2 rounded-full ${styles.iconBg}`}>
                        {styles.icon}
                    </div>
                    <div className="flex-1">
                        <DialogTitle className="text-lg">{title}</DialogTitle>
                        <DialogDescription className="mt-1">
                            {description}
                        </DialogDescription>
                    </div>
                </DialogHeader>

                <div className="flex gap-3 justify-end mt-6">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        disabled={isLoading}
                        className="flex-1"
                    >
                        {cancelText}
                    </Button>
                    <Button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className={`flex-1 ${styles.confirmButton}`}
                    >
                        {isLoading ? (
                            <div className="flex items-center gap-2">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                                Processing...
                            </div>
                        ) : (
                            confirmText
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}