'use client'

import { updateCard } from "@/actions/UpdateCard/intex"
import { FormTextArea } from "@/components/form/FormTextArea"
import { FormSubmit } from "@/components/form/FromSubmit"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useAction } from "@/hooks/useActions"
import { CardsWithLists } from "@/types"
import { useQueryClient } from "@tanstack/react-query"
import { AlignLeft } from "lucide-react"
import { useParams } from "next/navigation"
import { useState, useRef, ElementRef } from 'react'
import { toast } from "sonner"
import { useEventListener, useOnClickOutside } from "usehooks-ts"

interface DescriptionProps {
    data: any
}

const Description = ({ data }: DescriptionProps) => {
    const [isEditing, setIsEditing] = useState(false)
    const textAreaRef = useRef<ElementRef<'textarea'>>(null)
    const formRef = useRef<ElementRef<'form'>>(null)

    const queryClient = useQueryClient()
    const params = useParams()

    const { execute, fieldErrors } = useAction(updateCard, {
        onSuccess: (data) => {
            toast.success(`Card "${data?.title}" Updated`)
            queryClient.invalidateQueries({
                queryKey: ['card', data?.id]
            })
            queryClient.invalidateQueries({
                queryKey: ['cardlog', data?.id]
            })
            disableEditing()
        },
        onError: (error) => {
            toast.error(error)
        }
    })

    const enableEditing = () => {
        setIsEditing(true)
        setTimeout(() => {
            textAreaRef.current?.focus()
        })
    }

    const disableEditing = () => {
        setIsEditing(false)
        setTimeout(() => {
            textAreaRef.current?.blur()
        })
    }

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            disableEditing()
        }
    }

    useEventListener("keydown", onKeyDown)
    useOnClickOutside(formRef, disableEditing)

    const onSubmit = (formData: FormData) => {
        const description = formData.get('description') as string
        const boardId = params.boardId as string

        execute({ id: data?.id, description, boardId })
    }

    return (
        <div className="flex items-start gap-x-3 w-full">
            <AlignLeft className="w-5 h-5 mt-0.5 text-neutral-700" />
            <div className="w-full">
                <p className="font-semibold text-neutral-700 mb-2">
                    Description
                </p>
                {isEditing ?
                    <form
                        action={onSubmit}
                        ref={formRef}
                        className='space-y-2'
                    >
                        <FormTextArea
                            errors={fieldErrors}
                            id="description"
                            name="description"
                            placeholder="Add a more detailed description"
                            defaultValue={data?.description || undefined}
                            ref={textAreaRef}
                        />
                        <div className="flex items-center gap-x-2">
                            <FormSubmit>Save</FormSubmit>
                            <Button
                                type="button"
                                onClick={disableEditing}
                                size='sm'
                                variant='ghost'
                            >Cancel</Button>
                        </div>
                    </form>
                    :
                    <div
                        onClick={enableEditing}
                        role="button"
                        className="min-h-[78px] bg-neutral-200 text-sm font-medium py-3 px-3.5 rounded-md"
                    >
                        {data?.description || "Add a more detailed description..."}
                    </div>
                }
            </div>
        </div>
    )
}

export default Description

Description.Skeleton = function DescriptionSkeleton() {
    return (
        <div className="flex items-start gap-x-3 w-full">
            <Skeleton className="h-6 w-6 bg-neutral-200" />
            <div className="w-full">
                <Skeleton className="h-6 w-24 mb-2 bg-neutral-200" />
                <Skeleton className="h-[78px] w-full bg-neutral-200" />
            </div>
        </div>
    )
}
