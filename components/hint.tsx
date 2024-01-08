import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface HintProps {
    children: React.ReactNode;
    description?: string;
    side?: "left" | "right" | "top" | "bottom";
    sideOffset?: number;
}

export const Hint = ({ description, sideOffset = 0, side = "bottom", children }: HintProps) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={0}>
                <TooltipTrigger>
                    {children}
                </TooltipTrigger>
                <TooltipContent sideOffset={sideOffset} side={side} className="text-xs max-[220px] break-words">
                    {description}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}