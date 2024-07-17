'use client';

import { forwardRef, KeyboardEventHandler } from "react";
import { Label } from "../ui/label";
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils";
import FormErros from "./FormErros";
import { useFormStatus } from "react-dom";


interface FormTextAreaProps {
    id: string;
    name: string;
    label?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    errors?: Record<string, string[] | undefined>;
    className?: string;
    onBlur?: () => void;
    onClick?: () => void;
    onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement>;
    defaultValue?: string;
}

export const FormTextArea = forwardRef<HTMLTextAreaElement, FormTextAreaProps>(
    ({ id, label, placeholder, required, disabled, errors, className, name, onBlur, onClick, onKeyDown, defaultValue }, ref) => {

        const { pending } = useFormStatus()

        return (
            <div className={className}>
                {label && <Label htmlFor={id} className="text-xs font-bold text-neutral-700">{label}</Label>}
                <Textarea
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    required={required}
                    disabled={disabled || pending}
                    onBlur={onBlur}
                    onClick={onClick}
                    onKeyDown={onKeyDown}
                    defaultValue={defaultValue}
                    ref={ref}
                    className={cn(
                        "resize-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 outline-none shadow-sm",
                        className
                    )}
                    area-describedly={`${id}-error`}
                />
                <FormErros id={id} errors={errors} />
            </div>
        );
    }
);

FormTextArea.displayName = "FormTextArea";
