'use client';

import { createCard } from "@/actions/CreateCard/intex";
import { FormTextArea } from "@/components/form/FormTextArea";
import { FormSubmit } from "@/components/form/FromSubmit";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/useActions";
import { Plus, X } from "lucide-react";
import { useParams } from "next/navigation";
import { ElementRef, forwardRef, KeyboardEventHandler, useRef } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

interface CardFormProps {
    listId: string;
    isEditing: boolean;
    enableEditing: () => void;
    disableEditing: () => void;
}

const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(({ listId, isEditing, enableEditing, disableEditing }, ref) => {

    const params = useParams();
    const formRef = useRef<ElementRef<'form'>>(null);

    const { execute, fieldErrors } = useAction(createCard, {
        onSuccess: (data) => {
            toast.success(`${data?.title} created`);
            formRef.current?.reset();
        },
        onError: (error) => {
            toast.error(error);
        }
    });

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            disableEditing();
        }
    };

    useOnClickOutside(formRef, disableEditing);
    useEventListener('keydown', onKeyDown);

    const onTextAreaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            formRef.current?.requestSubmit();
        }
    };

    const onSubmit = (formData: FormData) => {
        const title = formData.get('title') as string;
        const listId = formData.get('listId') as string;
        const boardId = params.boardId as string;

        console.log(title, listId, boardId);
        execute({ title, listId, boardId });
    };

    if (isEditing) {
        return (
            <form
                ref={formRef}
                onSubmit={(e) => { e.preventDefault(); onSubmit(new FormData(e.currentTarget)); }}
                className="m-1 py-0 px-1 space-y-4"
            >
                <FormTextArea
                    id="title"
                    name="title"
                    onKeyDown={onTextAreaKeyDown}
                    ref={ref}
                    placeholder="Enter a title for this card.."
                    errors={fieldErrors}
                />
                <input
                    hidden
                    id="listId"
                    name='listId'
                    value={listId}
                    readOnly
                />
                <FormSubmit>
                    Add card
                </FormSubmit>
                <Button size='sm' variant='ghost'>
                    <X className="h-5 w-5" onClick={disableEditing} />
                </Button>
            </form>
        );
    }

    return (
        <div className="pt-2 px-2">
            <Button
                onClick={enableEditing}
                className="h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm"
                size='sm'
                variant='ghost'
            >
                <Plus className="h-4 w-4 mr-2" />
                Add a card
            </Button>
        </div>
    );
});

CardForm.displayName = 'CardForm';

export default CardForm;
