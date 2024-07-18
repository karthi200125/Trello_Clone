'use client'

import { upadteBoard } from "@/actions/UpdateBoard/intex"
import { FormInput } from "@/components/form/formInput"
import { Button } from "@/components/ui/button"
import { useAction } from "@/hooks/useActions"
import { Board } from "@prisma/client"
import { ElementRef, useRef, useState } from "react"
import { toast } from "sonner"

interface BoardTitleFormProps {
    data: Board
}

const BoardTitleForm = ({ data }: BoardTitleFormProps) => {

    const { execute } = useAction(upadteBoard, {
        onSuccess: (data) => {
            toast.success(`Board  title updated as ${data.title}`)
            disabledEditing()
        }, onError: (error) => {
            toast.error(error)
        }
    })

    const [editing, setEditing] = useState(false)
    const fomrRef = useRef<ElementRef<"form">>(null)
    const inputRef = useRef<ElementRef<"input">>(null)
    const [title, setTitle] = useState(data.title)

    const enableEditing = () => {
        setEditing(true)
        setTimeout(() => {
            inputRef.current?.focus();
            inputRef.current?.select();
        })
    }

    const disabledEditing = () => {
        setEditing(false)
    }

    const onSubmit = (forData: FormData) => {
        const title = forData.get("title") as string
        setTitle(data.title);
        execute({ title, id: data.id })
    }

    const onBlur = () => {
        fomrRef.current?.requestSubmit();
    }

    if (editing) {
        return (
            <form className="flex items-center gap-x-2" ref={fomrRef} action={onSubmit}>
                <FormInput id="title" onBlur={onBlur} defaultValue={title} className="text-lg font-bold px-[7px] h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none" ref={inputRef} />
            </form>
        )
    }

    return (
        <Button className="font-bold text-lg h-auto w-auto p-1 px-2" variant="transparent" onClick={enableEditing}>
            {title}
        </Button>
    )
}

export default BoardTitleForm