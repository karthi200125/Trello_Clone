'use client'

import { Skeleton } from "@/components/ui/skeleton"
import { CardsWithLists } from "@/types"
import { AlignLeft } from "lucide-react"

interface DescriptionProps {
    data: any
}

const Description = ({ data }: DescriptionProps) => {
    return (
        <div className="flex items-start gap-x-3 w-full">
            <AlignLeft className="w-5 h-5 mt-0.5 text-neutral-700" />
            <div className="w-full">
                <p className="font-semibold text-neutral-700 mb-2">
                    Description
                </p>
                <div
                    role="button"
                    className="min-h-[78px] bg-neutral-200 text-sm font-medium py-3 px-3.5 rounded-md"
                >
                    {data?.description || "Add a more detailed description..."}
                </div>
            </div>
            {data?.description}
        </div>
    )
}

export default Description

Description.Skeleton = function DescriptionSkelton() {
    return (
        <div className="flex items-start gap-x-3 w-full">
            <Skeleton className="h-6 w-6 bg-neutral-200" />
            <div className="w-full">
                <Skeleton className="h-6 w-24 mb-2 bg-neutral-200" />
                <Skeleton className="h-[78px] w-full  bg-neutral-200" />
            </div>
        </div>
    )
}