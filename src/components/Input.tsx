import { cva, VariantProps } from "class-variance-authority";
import classNames from "classnames";
import {
  DetailedHTMLProps,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
} from "react";
import { useFormContext } from "react-hook-form";

const inputStyles = cva(
  "w-full appearance-none placeholder:text-gray-400 placeholder:text-sm font-normal rounded-xl border-gray-300 text-[#242426] px-3 !outline-none focus:border-primary focus:border disabled:cursor-not-allowed disabled:bg-gray-100",
  {
    defaultVariants: {
      error: false,
      intent: "normal",
      size: "lg",
      rounded: true,
    },
    variants: {
      error: {
        true: "!border-error-500",
      },
      intent: {
        fill: "bg-white border-gray-200 py-2 border",
        normal:
          "border-gray-300 placeholder:text-gray-200 bg-transparent border",
      },
      rounded: {
        true: "!rounded-full",
      },
      size: {
        lg: "h-12 ",
        md: "h-11 ",
        sm: "h-7",
        auto: "h-auto",
      },
    },
  }
);

export type InputProps = Omit<VariantProps<typeof inputStyles>, "error"> & {
  label?: string;
  loading?: boolean;
  error?: string;
  rightIcon?: ReactNode;
  leftIcon?: ReactNode;
  addon?: ReactNode;
  inputStyle?: string;
  labelClass?: string;
  required?: boolean;
  isPassword?: boolean;
} & Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    "size"
  >;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      intent,
      size,
      rightIcon,
      addon,
      className,
      leftIcon,
      inputStyle,
      labelClass,
      required,
      ...rest
    },
    ref
  ) => {
    return (
      <label className={classNames("group relative block", className)}>
        {label && (
          <p
            className={classNames(
              "mb-2 block text-sm font-medium text-[#141414]",
              labelClass
            )}
          >
            {label}
            {required && <span className="ml-1 text-error-500">*</span>}
          </p>
        )}
        <div className="relative rounded-md">
          {leftIcon && (
            <div
              className={classNames(
                "pointer-events-none absolute inset-y-0 left-4 flex items-center justify-center text-current"
              )}
            >
              {leftIcon}
            </div>
          )}
          <input
            className={classNames(
              inputStyles({ error: !!error, intent, size }),
              {
                "pl-10": leftIcon,
                "pr-10": rightIcon,
              },
              inputStyle
            )}
            ref={ref}
            {...rest}
          />

          {rightIcon && (
            <div className="absolute inset-y-0 right-4 z-20 flex items-center justify-center">
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <p className="mt-2 flex items-center gap-x-1 text-sm text-error-500">
            {error}
          </p>
        )}
        {addon && (
          <div className="mt-2 h-0 overflow-hidden opacity-0 transition-all duration-100 group-focus-within:h-max group-focus-within:opacity-100">
            {addon}
          </div>
        )}
      </label>
    );
  }
);

Input.displayName = "Input";

export const FormInput = ({
  name,
  label,
  ...rest
}: { name: string } & InputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const errorText = errors[name]?.message;
  const displayError =
    errorText && typeof errorText === "string" ? errorText : "";
  return (
    <Input error={displayError} label={label} {...register(name)} {...rest} />
  );
};
