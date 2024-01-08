"use client"

import { forwardRef } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useFormStatus } from "react-dom";
import FormErros from "./FormErros";

interface FormInputsProps {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  errors?: Record<string, string[] | undefined>;
  className?: string;
  defaultValue?: string;
  onBlur?: () => void;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputsProps>(
  ({ id, label, type, placeholder, required, errors, className, defaultValue = "", onBlur }, ref) => {
    const { pending } = useFormStatus();

    return (
      <div className="space-y-2">
        <div className="space-y-1">
          {label ? (
            <Label htmlFor={id} className="text-xs font-semibold text-neutral-700">
              {label}
            </Label>
          ) : null}
          <Input
            onBlur={onBlur}
            defaultValue={defaultValue}
            ref={ref}
            name={id}
            id={id}
            placeholder={placeholder}
            type={type}
            disabled={pending}
            className={cn('text-sm px-2 py-1 h-7', className)}
            aria-describedby={`${id}-error`}
          />
        </div>
        <FormErros id={id} errors={errors} />
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
