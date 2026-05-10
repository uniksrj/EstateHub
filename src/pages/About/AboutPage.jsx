import { Link } from "react-router"
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Building2,
  FileSignature,
  Heart,
  Home,
  KeyRound,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react"
import Seo from "@/components/common/Seo"
import { organizationSchema } from "@/utils/seo"
import { Button } from "@/components/ui/button"

const audienceCards = [
  {
    icon: Home,
    title: "For buyers and renters",
    description:
      "Search active listings, save favorites, schedule tours, send inquiries, compare offers, and keep documents organized from one account.",
  },
  {
    icon: Building2,
    title: "For sellers",
    description:
      "List properties with rich details, manage buyer interest, review offers, boost visibility, and track performance from a focused seller workspace.",
  },
  {
    icon: Users,
    title: "For agents",
    description:
      "Coordinate clients, inquiries, listings, offers, pipeline progress, deal recovery, schedules, and documents without losing the thread.",
  },
]

const platformHighlights = [
  {
    icon: BarChart3,
    title: "Smarter property decisions",
    description:
      "Estate Hub combines listings with market insight, property activity, mortgage tools, and clear comparison flows so every next step is easier to judge.",
  },
  {
    icon: MessageSquareText,
    title: "Clear communication",
    description:
      "Built-in inquiries, responses, schedules, and offer updates help buyers, sellers, and agents keep important conversations tied to the right property.",
  },
  {
    icon: FileSignature,
    title: "Deal-ready workflow",
    description:
      "Offers, loan applications, documents, deadlines, signatures, and deal progress tools support the path after someone finds the right home.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted account control",
    description:
      "Role-based dashboards, protected routes, secure login, profile management, and clear permissions keep each user focused on what matters to them.",
  },
]

const values = [
  "Transparent property information",
  "Practical tools for every real estate role",
  "Responsive support throughout the journey",
  "Secure workflows for serious decisions",
]

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Seo
        title="About Us"
        description="Learn how Estate Hub helps buyers, renters, sellers, agents, and investors move through real estate search, offers, loans, tours, and deals with confidence."
        canonicalPath="/about"
        schema={{
          ...organizationSchema,
          description:
            "Estate Hub is a real estate platform for property discovery, listing management, buyer and seller communication, offers, mortgage tools, scheduling, and deal workflows.",
        }}
      />

      <section className="relative overflow-hidden border-b border-border bg-card px-4 py-16 md:py-20">
        <div className="container mx-auto grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="mb-4 inline-flex items-center rounded-full border border-border bg-background px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              <Sparkles className="mr-2 h-4 w-4 text-primary" />
              About Estate Hub
            </p>
            <h1 className="max-w-4xl text-4xl font-black tracking-tight md:text-5xl lg:text-6xl">
              A clearer way to search, list, and close real estate.
            </h1>
            <p className="mt-6 max-w-2xl text-[17px] leading-8 text-muted-foreground md:text-lg">
              Estate Hub brings buyers, renters, sellers, agents, and investors into one connected platform. From discovering the right property to managing inquiries, offers, tours, loans, and documents, we help every user move with more confidence and less guesswork.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/properties">
                <Button size="lg" className="rounded-full px-7">
                  Explore properties
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="rounded-full px-7">
                  Talk to our team
                </Button>
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-border bg-background p-5 shadow-xl shadow-primary/5">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["2020", "Helping clients since"],
                ["3", "User-focused dashboards"],
                ["24/7", "Online property access"],
                ["1", "Connected deal workspace"],
              ].map(([number, label]) => (
                <div key={label} className="rounded-3xl border border-border bg-card p-6">
                  <p className="text-3xl font-black tracking-tight text-primary">{number}</p>
                  <p className="mt-2 text-sm font-medium text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-3xl bg-primary p-6 text-primary-foreground">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-foreground/15">
                <KeyRound className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-semibold">Our promise</h2>
              <p className="mt-3 text-sm leading-6 text-primary-foreground/85">
                Make real estate feel organized, understandable, and actionable, whether someone is browsing their first apartment or managing a full pipeline of client deals.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="container mx-auto">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Built around the people in every transaction</h2>
            <p className="mt-4 text-muted-foreground">
              Estate Hub is not only a listing website. It is a shared workspace for the real tasks that happen before, during, and after a property decision.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {audienceCards.map((card) => {
              const Icon = card.icon
              return (
                <article key={card.title} className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold">{card.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{card.description}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card px-4 py-16">
        <div className="container mx-auto grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-primary">What we focus on</p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Real estate tools that stay useful after the search begins.</h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              A good property platform should support the whole journey: search, shortlisting, communication, financing, scheduling, offers, and closing work. Estate Hub keeps those pieces close together so users can move from interest to action.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {platformHighlights.map((highlight) => {
              const Icon = highlight.icon
              return (
                <article key={highlight.title} className="rounded-3xl border border-border bg-background p-6">
                  <Icon className="mb-4 h-7 w-7 text-primary" />
                  <h3 className="font-semibold">{highlight.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{highlight.description}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="container mx-auto grid items-center gap-10 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-border bg-card p-6 shadow-sm md:p-8">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Heart className="h-6 w-6" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight">Why people choose Estate Hub</h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              We care about making the real estate process feel less fragmented. The platform is designed to help users compare options, protect important information, and stay aligned with the people helping them move forward.
            </p>
          </div>

          <div className="space-y-4">
            {values.map((value) => (
              <div key={value} className="flex items-center gap-4 rounded-3xl border border-border bg-card p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <BadgeCheck className="h-5 w-5" />
                </span>
                <p className="font-medium">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background px-4 pb-20">
        <div className="container mx-auto overflow-hidden rounded-[2rem] bg-primary px-6 py-14 text-center text-primary-foreground shadow-2xl shadow-primary/10 md:px-10">
          <h2 className="mx-auto max-w-3xl text-3xl font-black tracking-tight md:text-4xl">
            Ready to make your next property move?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/85">
            Browse listings, create your account, or connect with the Estate Hub team for guidance tailored to your goals.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link to="/auth/register">
              <Button size="lg" variant="secondary" className="rounded-full px-7 font-bold">
                Create account
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="rounded-full border-primary-foreground/30 bg-primary-foreground/10 px-7 font-bold text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Contact Estate Hub
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default AboutPage
