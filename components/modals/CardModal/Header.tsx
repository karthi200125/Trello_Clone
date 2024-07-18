'use client'

import { updateCard } from "@/actions/UpdateCard/intex";
import { FormInput } from "@/components/form/formInput";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/useActions";
import { CardsWithLists } from "@/types"
import { useQueryClient } from "@tanstack/react-query";
import { Layout } from "lucide-react";
import { useParams } from "next/navigation";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";

interface HeadreProps {
    data: any;
}

const Header = ({ data }: HeadreProps) => {

    const queryClient = useQueryClient()
    const params = useParams()
    const inputRef = useRef<ElementRef<'input'>>(null)
    const [title, setTitle] = useState(data.title)


    const { execute } = useAction(updateCard, {
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ['card', data?.id]
            })
            queryClient.invalidateQueries({
                queryKey: ['cardlog', data?.id]
            })
            toast.success(`ReNamed ${data?.title}`)
            setTitle(data?.title)
        },
        onError: (error) => {
            toast.error(error)
        }
    })

    const onBlur = () => {
        inputRef.current?.form?.requestSubmit()
    }

    const OnSubmit = (formData: FormData) => {
        const title = formData.get('title') as string;
        const boardId = params.boardId as string

        if (title === data.title) {
            return
        }

        execute({
            title,
            boardId,
            id: data?.id
        })
    }

    return (
        <div className="flex items-start gap-x-3 mb-6 w-full">
            <Layout className="h-5 w-5 mt-1 text-neutral-700" />
            <div className="w-full">
                <form
                    action={OnSubmit}
                >
                    <FormInput
                        onBlur={onBlur}
                        ref={inputRef}
                        id="title"
                        defaultValue={title}
                        className="font-semibold text-xl px-1 text-neutral-700 bg-transparent border-transparent relative -left-1.5 w-[95%] focus-visible:bg-white focus-visible:border-input mb-0.5 truncate"
                    />

                </form>
                <p className="text-sm text-muted-foreground">
                    in List <span className="underline">{data?.list?.title}</span>
                </p>
            </div>
        </div>
    )
}

export default Header

Header.Skeleton = function HeaderSkeleton() {
    return (
        <div className="flex items-start gap-x-3 mb-6">
            <Skeleton className="h-6 w-6 mt-1 bg-neutral-200" />
            <div>
                <Skeleton className="h-24 w-24 mb-1 bg-neutral-200" />
                <Skeleton className="h-4 w-12 mb-1 bg-neutral-200" />
            </div>
        </div>
    )
}