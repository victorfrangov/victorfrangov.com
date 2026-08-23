import React from "react"

export function SwissCross({
  className = "w-6 h-6 inline-block align-middle",
}: {
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      aria-label="Swiss Cross"
    >
      {/* Red square background */}
      <rect x="0" y="0" width="32" height="32" rx="2" fill="#FF0000" />
      {/* White cross */}
      <rect x="13" y="6" width="6" height="20" rx="1" fill="#FFFFFF" />
      <rect x="6" y="13" width="20" height="6" rx="1" fill="#FFFFFF" />
    </svg>
  )
}
