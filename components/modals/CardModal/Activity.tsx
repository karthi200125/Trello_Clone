'use client'

import ActivityItem from "@/components/ActivityItem"
import { Skeleton } from "@/components/ui/skeleton"
import { ActivityIcon } from "lucide-react"

interface ItemsProps {
    items: any
}

const Activity = ({ items }: ItemsProps) => {

    console.log("activities gets all", items)

    return (
        <div className="flex items-start gap-x-3 w-full">
            <ActivityIcon className="w-5 h-5 mt-0.5 text-neutral-700" />
            <div className="w-full">
                <p className="font-semibold text-neutral-700 mb-2">
                    Activity
                </p>
                <ol className="mt-2 space-y-4">
                    {items?.map((item: any) => (
                        <ActivityItem
                            key={item?.id}
                            data={item}
                        />
                    ))}
                </ol>
            </div>
        </div>
    )
}

export default Activity

Activity.Skeleton = function ActivitySkeleton() {
    return (
        <div className="flex items-start gap-x-3 w-full">
            <Skeleton className="h-6 w-6 bg-neutral-200" />
            <div className="w-full">
                <Skeleton className="h-6 w-24 mb-2 bg-neutral-200" />
                <Skeleton className="h-10 w-full bg-neutral-200" />
            </div>
        </div>
    )
}