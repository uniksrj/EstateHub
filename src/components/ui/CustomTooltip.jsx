// CustomTooltip.jsx
import React from "react";

const formatNumber = (n) =>
  Number.isFinite(n) ? n.toLocaleString() : "-";

export default function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;

  // Normalize values to numbers and keep dataKey/name/color
  const entries = payload.map((e) => ({
    dataKey: e.dataKey,
    name: e.name,
    value: Number(e.value),
    color: e.color,
  }));

  // Helper to find an entry by dataKey or fallback to name
  const findVal = (key) => {
    const byKey = entries.find((e) => e.dataKey === key);
    if (byKey) return byKey.value;
    const byName = entries.find(
      (e) => e.name && e.name.toLowerCase().includes(key.toLowerCase())
    );
    return byName ? byName.value : undefined;
  };

  const listings = findVal("listings");
  const sales = findVal("sales");
  const revenue = findVal("revenue");

  // Safe conversion: sales / listings * 100, only if listings > 0
  const conversion =
    Number.isFinite(sales) && Number.isFinite(listings) && listings > 0
      ? (sales / listings) * 100
      : null;

  return (
    <div className="bg-card border border-border p-3 rounded-lg shadow-lg">
      <p className="font-semibold text-foreground mb-2">{label}</p>

      {/* render all payload entries (keeps original order) */}
      {entries.map((entry, i) => (
        <p key={i} style={{ color: entry.color }} className="text-sm">
          {entry.name}: {formatNumber(entry.value)}
        </p>
      ))}

      {/* explicit fields (optional but clearer) */}
      <div className="mt-1 text-sm text-muted-foreground">
        <div>Listings: {formatNumber(listings)}</div>
        <div>Sales: {formatNumber(sales)}</div>
        <div>Revenue: {formatNumber(revenue)}</div>
      </div>

      {/* conversion display with guard */}
      <div className="text-sm text-muted-foreground mt-1">
        Conversion:{" "}
        {conversion !== null ? `${conversion.toFixed(1)}%` : "N/A"}
      </div>
    </div>
  );
}
