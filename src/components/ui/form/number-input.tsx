import {
    Controller,
    type ControllerProps,
    type FieldPath,
    type FieldValues,
} from "react-hook-form";
import {
    Field,
    FieldDescription,
    FieldError,
    FieldLabel,
} from "@/components/shadcn-ui/field";
import { Input } from "@/components/shadcn-ui/input";
import { cn } from "@/lib/utils";
import { NumericFormat as UINumericFormat } from "react-number-format";
import React from "react";
import {dzeragir} from "@/config /font";

type Props = {
    description?: React.ReactNode;
    label?: React.ReactNode;
    className?: string;
    inputClassName?: string;
    id?: string;
    required?: boolean;
} & Pick<
    React.ComponentProps<typeof UINumericFormat>,
    | "placeholder"
    | "fixedDecimalScale"
    | "thousandsGroupStyle"
    | "thousandSeparator"
    | "allowNegative"
    | "decimalScale"
    | "suffix"
    | "prefix"
>;

function NumericFormat<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
    TTransformedValues = TFieldValues,
>({
      label,
      required,
      description,
      className,
      id,
      inputClassName,
      placeholder,
      thousandsGroupStyle = "thousand",
      thousandSeparator = ",",
      fixedDecimalScale = false,
      allowNegative = false,
      decimalScale = undefined,
      suffix,
      prefix,
      control,
      name,
      shouldUnregister,
      disabled,
      defaultValue,
  }: Omit<ControllerProps<TFieldValues, TName, TTransformedValues>, "render"> &
    Props) {
    return (
        <Controller
            {...{
                control,
                name,
                shouldUnregister,
                disabled,
                defaultValue,
            }}
            render={({ field, fieldState }) => (
                <Field className={className} data-invalid={fieldState.invalid}>
                    {label && (
                        <FieldLabel htmlFor={id ?? field.name} className={cn("text-white text-lg font-semibold leading-[18px] md:leading-[24px]", dzeragir.className)}>
                            {label}{" "}
                            {required && (
                                <span className="text-destructive">
									* <span className="sr-only">(required)</span>
								</span>
                            )}
                        </FieldLabel>
                    )}
                    <UINumericFormat
                        {...{
                            placeholder,
                            fixedDecimalScale,
                            thousandsGroupStyle,
                            thousandSeparator,
                            allowNegative,
                            decimalScale,
                            suffix,
                            prefix,
                        }}
                        customInput={Input}
                        value={field.value}
                        onBlur={field.onBlur}
                        disabled={field.disabled}
                        getInputRef={field.ref}
                        className={cn(inputClassName)}
                        id={id ?? field.name}
                        name={field.name}
                        aria-invalid={fieldState.invalid}
                        onValueChange={(values) => {
                            field.onChange(values.value);
                        }}
                    />
                    {description && <FieldDescription>{description}</FieldDescription>}
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
            )}
        />
    );
}
export { NumericFormat };