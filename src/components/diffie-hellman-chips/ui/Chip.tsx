import type { PropsWithChildren } from "react"

interface ChipProps {
    value: string
    active?: boolean
    onChange?: (value: string) => void
}

export const Chip = ({children, value, active = false, onChange}: PropsWithChildren & ChipProps) => {
    return (
        <div 
            className={`py-2 px-3 rounded-full ${active ? 'bg-primary text-primary-foreground' : 'bg-accent text-foreground'} text-sm mb-2 w-fit whitespace-nowrap`}
            onClick={() => onChange && onChange(value)}
        >
            {children}
        </div>
    )
}