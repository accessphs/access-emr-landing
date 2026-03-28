import { cva, type VariantProps } from "class-variance-authority";
import classNames from "classnames";
import React, { ButtonHTMLAttributes, ReactNode, useCallback, useState } from "react";
import { Link, LinkProps } from "react-router-dom";

const buttonStyle = cva(
  "flex items-center justify-center rounded-md gap-2.5 text-[16px] font-normal gap-2 leading-6 cursor-pointer",
  {
    defaultVariants: {
      block: false,
      kinds: "primary",
      rounded: true, // Default to rounded-full to match old behavior
      size: "lg",
    },
    variants: {
      block: { true: "!w-full" },
      kinds: {
        normal: "border-none hover:opacity-70 text-black",
        outline:
          "border-[#5C6C71] border text-[#5C6C71] hover:opacity-70 bg-transparent px-3 py-2 hover:text-blue-300",
        primary: "bg-primary hover:opacity-80 text-white",
        secondary:
          "border border-[#999999] bg-white hover:text-black text-primary rounded-lg hover:bg-primary ease-in-out duration-200",
        warning: "bg-[#FF0000] hover:opacity-70 text-white",
      },
      rounded: {
        true: "!rounded-full",
      },
      size: {
        auto: "h-auto",
        lg: "px-4 py-3",
        md: "px-3 py-2",
        sm: "px-2.5 py-1",
        wide: "px-6 py-3",
      },
    },
  },
);

type ButtonBaseProps = VariantProps<typeof buttonStyle> & {
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
  /** If true, auto-manage loading state when onClick returns a Promise. */
  isAsync?: boolean;
  icon?: React.ReactElement;
  label?: string; // Backward compatibility
  style?: React.CSSProperties;
  textStyle?: React.CSSProperties;
};

type ButtonProps = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    to?: never;
  };

type ButtonLinkProps = ButtonBaseProps &
  LinkProps & {
    to: string;
  };

// Backward compatibility interface
export interface IButtonProps {
  label?: string;
  style?: React.CSSProperties;
  textStyle?: React.CSSProperties;
  onClick?: (x: unknown) => void;
  isLoading?: boolean;
  isAsync?: boolean;
  icon?: React.ReactElement;
  children?: React.ReactNode;
  to?: string;
  disabled?: boolean;
  className?: string;
  plain?: boolean;
  reverse?: boolean;
}

export function Button(props: ButtonProps | ButtonLinkProps | IButtonProps) {
  const [internalLoading, setInternalLoading] = useState(false);
  type ClickEvent = React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>;
  const {
    className,
    disabled,
    to,
    children,
    isLoading,
    isAsync,
    block,
    kinds,
    rounded,
    size,
    icon,
    label,
    style,
    textStyle,
    onClick,
    reverse,
    ...rest
  } = props as ButtonProps & Partial<ButtonLinkProps> & IButtonProps;

  const effectiveLoading = Boolean(isLoading ?? internalLoading);

  const handleClick = useCallback(
    async (e: ClickEvent) => {
      if (disabled) return;
      if (!onClick) return;

      if (!isAsync) {
        (onClick as unknown as (e: ClickEvent) => void)(e);
        return;
      }

      try {
        const result = (onClick as unknown as (e: ClickEvent) => unknown)(e);
        if (result && typeof (result as Promise<unknown>).then === "function") {
          setInternalLoading(true);
          await (result as Promise<unknown>);
        }
      } finally {
        setInternalLoading(false);
      }
    },
    [disabled, isAsync, onClick],
  );

  // Determine rounded based on prop

  // Determine spinner color based on button kind
  // const spinnerColor = kinds === 'primary' || kinds === 'warning' ? 'border-t-white' : 'border-t-primary'

  const inner = (
    <>
      {effectiveLoading && (
        <div
          className={`h-4 w-4 animate-spin rounded-full border-2 border-t-white border-r-transparent border-b-transparent border-l-transparent`}
          data-testid="spinner"
        />
      )}
      <>
        {!reverse && icon && <span className="flex items-center">{icon}</span>}
        {children ? (
          children
        ) : (
          <span style={textStyle}>{label || "Submit"}</span>
        )}
        {reverse && icon && <span className="flex items-center">{icon}</span>}
      </>
    </>
  );

  const buttonClassName = classNames(
    buttonStyle({ block, kinds, rounded, size }),
    {
      "!cursor-not-allowed bg-opacity-50": disabled === true,
    },
    className,
  );

  // Merge inline styles
  const mergedStyle = {
    ...(style || {}),
  };

  if (to) {
    return (
      <Link
        className={buttonClassName}
        onClick={disabled ? (e) => e.preventDefault() : handleClick}
        style={mergedStyle}
        to={to}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button
      className={buttonClassName}
      disabled={disabled || effectiveLoading}
      onClick={handleClick}
      style={mergedStyle}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {inner}
    </button>
  );
}
