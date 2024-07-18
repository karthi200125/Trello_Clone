'use client'

import { Separator } from "@/components/ui/separator"
import { Info } from "../_components/Info"
import ActivityList from "./ActivityList"
import { Suspense } from "react"

const ActivityPage = () => {
    return (
        <div className="w-full">
            <Info />
            <Separator className="my-2" />
            {/* <Suspense fallback={<ActivityList.Skeleton />}> */}
            <ActivityList />
            {/* </Suspense> */}
        </div>
    )
}

export default ActivityPage