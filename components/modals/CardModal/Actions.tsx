'use client'

import { copyCard } from "@/actions/CopyCard/intex"
import { deleteCard } from "@/actions/DeleteCard/intex"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useAction } from "@/hooks/useActions"
import useCardModal from "@/hooks/useCardModel"
import { Copy, Trash } from "lucide-react"
import { useParams } from "next/navigation"
import { toast } from "sonner"

interface ActionsProps {
    data: any
}

const Actions = ({ data }: ActionsProps) => {

    const params = useParams()
    const cardModal = useCardModal()

    const { execute: copyExecute, isLoading: copyLoading } = useAction(copyCard, {
        onSuccess: (data) => {
            toast.success(`${data?.title} copied`)
            cardModal.onClose()
        },
        onError: (error) => {
            toast.error(error)
        }
    })

    const { execute: deleteExecute, isLoading: deleteLoading } = useAction(deleteCard, {
        onSuccess: (data) => {
            toast.success(`${data?.title} Deleted`)
            cardModal.onClose()
        },
        onError: (error) => {
            toast.error(error)
        }
    })

    const onCopy = () => {
        const boardId = params.boardId as string;
        copyExecute({ boardId, id: data?.id })
    }

    const onDelete = () => {
        const boardId = params.boardId as string;
        deleteExecute({ boardId, id: data?.id })
    }

    return (
        <div className="space-y-2 mt-2">
            <p className="text-xs font-semibold">
                Actions
            </p>
            <Button
                onClick={onCopy}
                disabled={copyLoading}
                variant="gray"
                className="w-full flex justify-start"
                size='inline'
            >
                <Copy className="h-4 w-4 mr-2" />
                Copy
            </Button>
            <Button
                onClick={onDelete}
                disabled={deleteLoading}
                variant="gray"
                className="w-full flex justify-start"
                size='inline'
            >
                <Trash className="h-4 w-4 mr-2" />
                Delete
            </Button>

        </div>
    )
}

export default Actions

Actions.Skeleton = function ActionsSkeleton() {
    return (
        <div className="space-y-2 mt-2">
            <Skeleton className="w-20 h-4 bg-neutral-200" />
            <Skeleton className="w-full h-8 bg-neutral-200" />
            <Skeleton className="w-full h-8 bg-neutral-200" />
        </div>
    )
}