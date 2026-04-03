import { Link } from "react-router"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ProfileTabNav({ tabs, activeTab, onTabChange, dashboardPath }) {
  return (
    <Card className="border-border/70 shadow-sm">
      <CardHeader className="border-b pb-4">
        <CardTitle className="text-base">Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 pt-6">
        <div className="flex gap-2 overflow-x-auto pb-1 lg:flex-col">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={`group flex min-w-[220px] flex-1 items-start gap-3 rounded-xl border px-4 py-3 text-left transition-colors lg:min-w-0 ${
                  isActive
                    ? "border-primary/30 bg-primary/10 text-foreground"
                    : "border-transparent bg-muted/40 text-muted-foreground hover:border-border hover:bg-muted/70 hover:text-foreground"
                }`}
              >
                <span className={`mt-0.5 rounded-lg p-2 ${isActive ? "bg-primary/15 text-primary" : "bg-background text-muted-foreground group-hover:text-foreground"}`}>
                  <Icon className="size-4" />
                </span>
                <span className="space-y-1">
                  <span className="block text-sm font-medium">{tab.label}</span>
                  <span className="block text-xs leading-5">{tab.description}</span>
                </span>
              </button>
            )
          })}
        </div>

        <div className="pt-4">
          <Button asChild variant="outline" className="w-full justify-between">
            <Link to={dashboardPath}>
              Return to dashboard
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
