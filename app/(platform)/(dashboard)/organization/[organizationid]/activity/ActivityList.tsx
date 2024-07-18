import ActivityItem from "@/components/ActivityItem"
import { Skeleton } from "@/components/ui/skeleton"
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"


const ActivityList = async () => {

    const { orgId } = auth()

    if (!orgId) {
        redirect('/selectorg')
    }

    const auditLogs = await db.auditLog.findMany({
        where: {
            orgId
        }
    })

    return (
        <ol className="space-y-4 mt-4">
            <p className="hidden last:block text-sm text-center text-muted-foreground">No Activity found inside this organization</p>
            {auditLogs.map((log) => (
                <ActivityItem
                    key={log?.id}
                    data={log}
                />
            ))}
        </ol>
    )
}

export default ActivityList

ActivityList.Skeleton = function ActivityListSkeleton() {
    return (
        <ol className="space-y-4 mt-4">
            <Skeleton className="w-[80%] h-14" />
            <Skeleton className="w-[80%] h-14" />
            <Skeleton className="w-[80%] h-14" />
            <Skeleton className="w-[80%] h-14" />
            <Skeleton className="w-[80%] h-14" />
            <Skeleton className="w-[80%] h-14" />
            <Skeleton className="w-[80%] h-14" />
            <Skeleton className="w-[80%] h-14" />
            <Skeleton className="w-[80%] h-14" />
        </ol>
    )
}