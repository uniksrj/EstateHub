"use client"

import { AlertCircle, Home, ArrowLeft } from 'lucide-react'
import { Link, useNavigate } from 'react-router'

export default function Unauthorized() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center max-w-md">
        {/* Using your destructive color for the alert */}
        <div className="w-16 h-16 bg-destructive/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="h-8 w-8 text-destructive" />
        </div>
        
        <h1 className="text-2xl font-bold text-foreground mb-2">Access Denied</h1>
        
        <p className="text-muted-foreground mb-6">
          You don't have permission to access this page.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/80 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </button>
          
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}