"use client"

import { forwardRef } from "react";
import { useFormStatus } from "react-dom";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

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
    const { pending, disabled } = useFormStatus();

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
            disabled={pending || disabled}
            className={cn('text-sm px-2 py-1 h-7', className)}
            aria-describedby={`${id}-error`}
          />
        </div>
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
