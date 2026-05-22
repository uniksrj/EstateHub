import { stats } from "@/data/demoData";


const StatisticsSection = () => {
  return (
    <section className="border-b border-border bg-background px-4 py-12 md:py-14">
      <div className="container mx-auto">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.6fr] lg:items-end">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Platform Snapshot
            </p>
            <h2 className="mt-3 max-w-sm text-[24px] font-semibold leading-tight tracking-tight md:text-[28px]">
              A marketplace built around verified activity, not noise.
            </h2>
          </div>

          <dl className="grid grid-cols-2 border-t border-border md:grid-cols-4 md:border-l md:border-t-0">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="border-b border-border py-5 md:border-b-0 md:border-r md:px-6 md:py-2 last:md:border-r-0"
              >
                <dt className="text-[13px] font-medium text-muted-foreground">{stat.label}</dt>
                <dd className="mt-2 text-[28px] font-semibold tracking-tight text-foreground md:text-[32px]">
                  {stat.number}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

export default StatisticsSection
