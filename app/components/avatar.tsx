import { User } from "lucide-react"

interface AvatarProps {
  index: number
}

export function Avatar({ index }: AvatarProps) {
  const colors = [
    "bg-blue-600", // First avatar
    "bg-blue-500", // Second avatar
    "bg-blue-400", // Third avatar
  ]

  return (
    <div
      className={`w-10 h-10 rounded-full border border-white/20 ${colors[index]} flex items-center justify-center text-white`}
    >
      <User className="h-5 w-5" />
    </div>
  )
}

