'use client'

import { Separator } from "@/components/ui/separator"
import { Info } from "../_components/Info"
import ActivityList from "./ActivityList"
import { Suspense } from "react"
import { checkSubscription } from "@/lib/subscription"

const ActivityPage = async () => {
    const isPro = await checkSubscription()

    return (
        <div className="w-full">
            <Info isPro={isPro} />
            <Separator className="my-2" />
            {/* <Suspense fallback={<ActivityList.Skeleton />}> */}
            <ActivityList />
            {/* </Suspense> */}
        </div>
    )
}

export default ActivityPage