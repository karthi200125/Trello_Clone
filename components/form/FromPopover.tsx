'use client'

import { X } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "../ui/popover";
import { FormInput } from "./formInput";
import { FormSubmit } from "./FromSubmit";
import { useAction } from "@/hooks/useActions";
import { createBoard } from "@/actions/CreateBoard";
import { toast } from "sonner";

interface PopoverProps {
    children: React.ReactNode;
    side?: "left" | "right" | "bottom" | "top";
    align?: "start" | "end" | "center";
    sideOffset?: number;
}

export const FormPopover = ({ children, side = "bottom", align, sideOffset = 0 }: PopoverProps) => {


    const { execute, fieldErrors } = useAction(createBoard, {
        onSuccess: (data) => {
            console.log(data)
            toast.success("Board Created!")
        },
        onError: (error) => {
            console.log(error)
            toast.error(error)
        },
    })


    const onSubmit = (fromData: FormData) => {
        const title = fromData.get('title') as string;

        execute({ title })
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent align={align} className="w-80 pt-3" side={side} sideOffset={sideOffset} >
                <div className="text-sm font-medium text-center text-neutral-600 pb-4">
                    Create Board
                </div>
                <PopoverClose asChild>
                    <Button className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600 " variant='ghost'>
                        <X className="h-4 w-4" />
                    </Button>
                </PopoverClose>
                <form className="space-y-4" action={onSubmit}>
                    <div className="space-y-4">
                        <FormInput id="title" label="Board Title" type="text" errors={fieldErrors} />
                    </div>
                    <FormSubmit classname="w-full">
                        Create
                    </FormSubmit>
                </form>
            </PopoverContent>
        </Popover>
    )
}