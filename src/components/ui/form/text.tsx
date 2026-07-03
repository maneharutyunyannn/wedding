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
import { dzeragir } from "@/config /font";
import {cn} from "@/lib/utils";

type InputProps = React.ComponentProps<typeof Input>;
type Props = {
    placeholder?: string;
    description?: React.ReactNode;
    label?: React.ReactNode;
    labelAction?: React.ReactNode;
    className?: string;
    inputClassName?: string;
    id?: string;
    required?: boolean;
    autoComplete?: InputProps["autoComplete"];
};

function Text<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
    TTransformedValues = TFieldValues,
>({
      label,
      autoComplete,
      labelAction,
      required,
      placeholder,
      description,
      className,
      id,
      inputClassName,
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
                            {labelAction}
                        </FieldLabel>
                    )}
                    <Input
                        {...field}
                        className={inputClassName}
                        id={id ?? field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder={placeholder}
                        autoComplete={autoComplete}
                    />
                    {description && <FieldDescription>{description}</FieldDescription>}
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
            )}
        />
    );
}
export { Text };