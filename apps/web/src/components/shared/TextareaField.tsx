import { useId } from "react";

import { Label } from "@/components/ui/label";

import { Textarea } from "../ui/textarea";

type TextareaFieldProps = {
  label: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  autoComplete?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
};

export function TextareaField({
  label,
  placeholder,
  autoComplete,
  error,
  disabled,
  required,
  ...props
}: TextareaFieldProps) {
  const id = useId();

  return (
    <div className="space-y-1">
      <div className="space-y-0.5">
        <Label htmlFor={id}>{label}</Label>

        <Textarea
          id={id}
          required={required}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          disabled={disabled}
          className="h-20 resize-none"
          {...props}
        />
      </div>

      {error && (
        <span id={`${id}-error`} className="text-sm text-destructive">
          {error}
        </span>
      )}
    </div>
  );
}
