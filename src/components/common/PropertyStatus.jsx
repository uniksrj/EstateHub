export function PropertyStatusLegend({ data }) {
  return (
    <div className="flex flex-wrap gap-2 mt-2 justify-center align-middle">
      {data.map((entry) => (
        <div key={entry.status} className="flex items-center gap-2 justify-center ">
          <span
            className="w-4 h-4 rounded"
            style={{ backgroundColor: entry.fill }}
          />
          <span className="text-sm font-medium">{entry.status}</span>
        </div>
      ))}
    </div>
  )
}
