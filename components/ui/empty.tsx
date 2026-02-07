import { Search } from 'lucide-react'

interface EmptyProps {
  title: string
  description?: string
}

export function Empty({ title, description }: EmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="rounded-full bg-muted p-3 sm:p-4 mb-4">
        <Search className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">{title}</h3>
      {description && (
        <p className="text-sm sm:text-base text-muted-foreground">{description}</p>
      )}
    </div>
  )
}
