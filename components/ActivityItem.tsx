import { GenerateLogMessage } from "@/lib/GenerateLogMessage"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { format } from 'date-fns'
import { Skeleton } from "./ui/skeleton"

interface ActivityItemProps {
    data: any
}

const ActivityItem = ({ data }: ActivityItemProps) => {
    return (
        <li className="flex items-center gap-x-2">
            <Avatar className="h-8 w-8 gap-x-2">
                <AvatarImage src={data?.userImage} />
                <AvatarFallback>
                    <Skeleton className="w-8 h-8 rounded-full bg-neutral-200" />
                </AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-0.5">
                <p className="text-sm text-muted-foreground">
                    <span className="font-semibold lowercase text-neutral-700 mr-1">
                        {data?.userName}
                    </span>{GenerateLogMessage(data)}
                </p>
                <p className="text-xs text-muted-foreground">
                    {format(new Date(data?.createdAt), "MMM d, yyyy 'at' h:mm a")}
                </p>
            </div>
        </li>
    )
}

export default ActivityItem