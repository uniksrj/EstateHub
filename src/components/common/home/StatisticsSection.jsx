import { stats } from "@/data/demoData";


const StatisticsSection = ({ scrollY }) => {
  // Calculate safe parallax values that don't cause layout issues
  const getSafeParallax = (base, multiplier = 0.5) => {
    return base * multiplier;
  };

  return (
    <section className="relative py-16 px-4 bg-card overflow-hidden">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center transform transition-transform duration-300"
              style={{
                transform: `translateY(${getSafeParallax(scrollY, -0.02)}px)`,
              }}
            >
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">{stat.number}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatisticsSection