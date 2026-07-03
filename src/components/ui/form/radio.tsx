import {
    Controller,
    type ControllerProps,
    type FieldPath,
    type FieldValues,
} from "react-hook-form";

import {
    Field,
    FieldError,
    FieldLabel,
} from "@/components/shadcn-ui/field";

import {
    RadioGroup,
    RadioGroupItem,
} from "@/components/shadcn-ui/radio-group";
import {cn} from "@/lib/utils";
import { dzeragir } from "@/config /font";

type Props = {
    label?: React.ReactNode;
    description?: React.ReactNode;
    className?: string;
    labelClassName?: string;
    options: {
        value: string;
        label: React.ReactNode;
        disabled?: boolean;
    }[];
    orientation?: "horizontal" | "vertical";
};

function Radio<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
    TTransformedValues = TFieldValues,
>({
      control,
      name,
      shouldUnregister,
      disabled,
      defaultValue,

      label,
      description,
      className,
      labelClassName,
      options,
      orientation = "vertical",
  }: Omit<ControllerProps<TFieldValues, TName, TTransformedValues>, "render"> &
    Props) {
    return (
        <Controller
            control={control}
            name={name}
            shouldUnregister={shouldUnregister}
            disabled={disabled}
            defaultValue={defaultValue}
            render={({ field, fieldState }) => (
                <Field className={className} data-invalid={fieldState.invalid}>
                    <input type="hidden" name={name} value={field.value ?? ""} />

                    {label && (
                        <FieldLabel className={cn(labelClassName, "text-white text-lg font-semibold")}>
                            {label}
                        </FieldLabel>
                    )}

                    <RadioGroup
                        value={field.value ?? ""}
                        onValueChange={field.onChange}
                        onBlur={field.onBlur}
                        className={orientation === "horizontal" ? "flex gap-4" : "space-y-2"}
                    >
                        {options.map((opt) => (
                            <div key={opt.value} className="flex items-center gap-2">
                                <RadioGroupItem value={opt.value} disabled={opt.disabled} />
                                <span className={cn("text-md font-medium text-white", dzeragir.className)}>
                        {opt.label}
                    </span>
                            </div>
                        ))}
                    </RadioGroup>

                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
            )}
        />
    );
}

export { Radio };