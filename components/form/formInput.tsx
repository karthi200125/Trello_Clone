"use client"

import { forwardRef } from "react";
import { useFormStatus } from "react-dom";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

interface FromInputsprops {
    id: string;
    label?: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
    errors?: Record<string, string[] | undefined>
    classname?: string
    defaultvalue?: string;
    onBlur?: () => void;
}

export const FormInput = forwardRef<HTMLInputElement, FromInputsprops>(({ id, label, type, placehoder, required, errors, classname, defaultValue ="", onBlur }, ref)) => {
    const { pending } = useFormStatus()
    return (
        <div className="space-y-2">
            <div className="space-y-1">
                {label ? (
                    <Label htmlFor={id} className="text-xs font-semibold text-neutral-700 ">
                        lable
                    </Label>
                ) : null}
                <Input onBlur={onblur} defaultValue={defaultVa}/>
            </div>
        </div>
    )
}

FormInput.displayName = "FromInput"

