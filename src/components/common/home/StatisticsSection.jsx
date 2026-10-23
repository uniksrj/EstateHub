const StatisticsSection = () => {
  const capabilities = [
    ["Discover", "Browse property listings and refine your search by the details that matter."],
    ["Connect", "Save homes, send inquiries, and arrange conversations around a property."],
    ["Manage", "Keep listings, offers, schedules, and deal activity in one workspace."],
  ]

  return (
    <section className="home-capabilities border-b border-border bg-background px-4 py-16 md:py-20">
      <div className="container mx-auto">
        <div className="grid gap-10 lg:grid-cols-[.8fr_1.5fr] lg:items-end">
          <div className="max-w-md">
            <p className="eyebrow">One connected experience</p>
            <h2 className="mt-3 text-3xl font-medium leading-tight tracking-tight md:text-4xl">
              From first search to next steps.
            </h2>
          </div>

          <div className="grid gap-7 border-t border-border pt-6 sm:grid-cols-3 sm:gap-5">
            {capabilities.map(([title, description], index) => (
              <article key={title} className="home-capability">
                <span className="home-capability__index">0{index + 1}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default StatisticsSection
