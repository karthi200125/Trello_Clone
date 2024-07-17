'use client'

import { deleteList } from '@/actions/DeleteList/intex';
import { FormSubmit } from '@/components/form/FromSubmit';
import { Button } from '@/components/ui/button';
import { Popover } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { useAction } from '@/hooks/useActions';
import { List } from '@prisma/client';
import { PopoverClose, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { MoreHorizontal, X } from 'lucide-react';
import { ElementRef, useRef } from 'react';
import { toast } from 'sonner';

interface ListOptionsProps {
    data: List;
    onAddCard: () => void;
}

const ListOptions = ({ data, onAddCard }: ListOptionsProps) => {

    const closeRef = useRef<ElementRef<'button'>>(null)

    const { execute: executeDelete } = useAction(deleteList, {
        onSuccess: (data) => {
            toast.success(`List "${data?.title}" Deleted`)
            closeRef.current?.click()
        },
        onError: (error) => {
            toast.error(error)
        }
    })

    const onDelete = (formData: FormData) => {
        const id = formData.get('id') as string
        const boardId = formData.get('boardId') as string

        executeDelete({ id, boardId })
    }


    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className='h-auto w-auto p-2' variant='ghost'>
                    <MoreHorizontal className='h-4 w-4' />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className='px-0 pt-3 pb-3 bg-white w-[250px]'
                side='bottom'
                align='start'
            >
                <div className='text-sm font-medium text-center text-neutral-600 pb-4'>
                    List actions
                </div>
                <PopoverClose ref={closeRef} asChild>
                    <Button className='h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600' variant='ghost'>
                        <X className="h-4 w-4" />
                    </Button>
                </PopoverClose>
                <Button
                    onClick={onAddCard}
                    className='rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm'
                    variant='ghost'
                >
                    Add Card...
                </Button>
                <form
                    action=""
                >
                    <input hidden name='id' value={data?.id} />
                    <input hidden name='boardId' value={data?.boardId} />
                    <FormSubmit
                        variant='ghost'
                        classname='rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm'
                    >
                        copy list ...
                    </FormSubmit>
                </form>
                <Separator />
                <form
                    action={onDelete}
                >
                    <input hidden name='id' value={data?.id} />
                    <input hidden name='boardId' value={data?.boardId} />
                    <FormSubmit
                        variant='ghost'
                        classname='rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm'
                    >
                        Delet this list
                    </FormSubmit>
                </form>
            </PopoverContent>
        </Popover>
    )
}

export default ListOptions 