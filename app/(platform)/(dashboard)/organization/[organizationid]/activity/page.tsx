import { Separator } from "@/components/ui/separator"
import { Info } from "../_components/Info"
import ActivityList from "./ActivityList"

const ActivityPage = () => {
    // const isPro = await checkSubscription()
    const isPro = false

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