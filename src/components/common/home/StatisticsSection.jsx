import { stats } from "@/data/demoData";


const StatisticsSection = ({ scrollY }) => {
  // Calculate safe parallax values that don't cause layout issues
  const getSafeParallax = (base, multiplier = 0.5) => {
    return base * multiplier;
  };

  return (
    <section className="relative overflow-hidden border-y border-border bg-card px-4 py-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="rounded-3xl border border-border bg-background p-5 text-center shadow-sm transition-transform duration-300 md:p-7"
              style={{
                transform: `translateY(${getSafeParallax(scrollY, -0.02)}px)`,
              }}
            >
              <div className="mb-2 text-3xl font-black tracking-tight text-foreground lg:text-4xl">{stat.number}</div>
              <div className="text-sm font-semibold text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatisticsSection
