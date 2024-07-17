'use client';

import { upadteList } from '@/actions/UpdateList/intex';
import { FormInput } from '@/components/form/formInput';
import { useAction } from '@/hooks/useActions';
import { List } from '@prisma/client';
import { useRef, useState, ElementRef } from 'react';
import { toast } from 'sonner';
import { useEventListener } from 'usehooks-ts';
import ListOptions from './ListOptions ';

interface ListHeaderProps {
    data: List;
}

const ListHeader = ({ data }: ListHeaderProps) => {
    const [title, setTitle] = useState(data.title);
    const [isEditing, setIsEditing] = useState(false);

    const formRef = useRef<ElementRef<'form'>>(null);
    const inputRef = useRef<ElementRef<'input'>>(null);

    const enableEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
            inputRef.current?.focus();
            inputRef.current?.select();
        });
    };

    const disableEditing = () => {
        setIsEditing(false);
    };

    const { execute } = useAction(upadteList, {
        onSuccess: (data) => {
            toast.success(`Renamed to "${data?.title}"`)
            setTitle(data?.title)
            disableEditing()
        },
        onError: (error) => {
            toast.error(error)
        }
    })

    const handleSubmit = (formData: FormData) => {
        const title = formData.get('title') as string;
        const id = formData.get('id') as string;
        const boardId = formData.get('boardId') as string;

        if (title === data?.title) {
            return disableEditing()
        }

        execute({ title, id, boardId })
    }

    const onBlur = () => {
        formRef.current?.requestSubmit()
    }

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            disableEditing();
        }
    };

    useEventListener('keydown', onKeyDown);

    return (
        <div className="pt-2 px-2 text-sm font-semibold flex justify-between items-start gap-x-2">
            {isEditing ? (
                <form
                    ref={formRef}
                    className='flex-1 px-[2px]'
                    action={handleSubmit}
                >
                    <input
                        hidden
                        id="id"
                        name="id"
                        type="text"
                        value={data?.id}
                        className="border rounded px-2 py-1"

                    />
                    <input
                        hidden
                        id="boardId"
                        name="boardId"
                        value={data?.boardId}
                    />
                    <FormInput
                        ref={inputRef}
                        onBlur={onBlur}
                        id='title'
                        placeholder='Enter the list...'
                        defaultValue={title}
                        className='text-sm px-[7px] py-1 font-medium border-transparent hover:border-input transition truncate bg-transparent focus:bg-white'
                    />
                    <button type='submit' hidden></button>
                </form>
            ) : (
                <div
                    className="w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent cursor-pointer"
                    onClick={enableEditing}
                >
                    {title}
                </div>
            )}
            <ListOptions
                data={data}
                onAddCard={() => { }}
            />
        </div>
    );
};

export default ListHeader;
