import { IconType } from "react-icons";
import { cn } from "@/lib/utils";

interface ButtonProps {
  label: string;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  className?: string;
  icon?: IconType;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({
  label,
  disabled,
  outline,
  small,
  className,
  icon: Icon,
  type,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        `
          flex items-center justify-center gap-2
          rounded-lg
          px-4 py-2
          font-semibold
          shadow-sm
          transition-colors
          duration-150
          my-3
          border
          focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-slate-300
          hover:bg-slate-100 hover:text-slate-800
          disabled:opacity-60 disabled:cursor-not-allowed
          ${
            outline
              ? "bg-white text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-white dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700"
              : "bg-slate-700 text-white border-slate-700 hover:bg-slate-600 hover:text-white"
          }
          ${small ? "px-3 py-1 text-sm" : "text-base"}
          sm:px-5 sm:py-2
        `,
        className
      )}
    >
      {Icon && <Icon size={20} className="mr-1" />}
      <span>{label}</span>
    </button>
  );
};

export default Button;
