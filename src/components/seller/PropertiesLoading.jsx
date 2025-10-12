// components/seller/PropertiesLoading.jsx
const PropertiesLoading = () => {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-12 bg-muted rounded"></div>
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-20 bg-muted rounded"></div>
      ))}
    </div>
  )
}

export default PropertiesLoading