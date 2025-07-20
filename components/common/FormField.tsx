import { Field, FieldErrors, UseFormRegister, Path, FieldValues } from "react-hook-form";
import { cn } from "@/lib/utils";

// interface LoginFormData {
//   name?: string;
//   email: string;
//   password: string;
//   confirmPassword?: string;
// }



interface FormFieldProps <T extends FieldValues> {
  id: string;
  type?: string;
  disabled?: boolean;
  placeholder: string;
  label?: string; // optional label for the input field
  inputClassName?: string; // pass class names to customize the input field individually
  register: UseFormRegister<T>; // Come back and replace 'any' with your form data type
  errors: FieldErrors;
}

const FormField = <T extends FieldValues>({
  id,
  type,
  disabled,
  label,
  placeholder,
  inputClassName,
  register,
  errors,
}: FormFieldProps<T>) => {
  const message = errors[id] && (errors[id]?.message as string);
  return (
    <div>
      {label && <span className="block text-sm">{label}</span>}
      <input
        id={id}
        disabled={disabled}
        placeholder={placeholder}
        type={type}
        {...register(id as Path<T>)}
        className={cn(
          "w-full p-2 sm:p-3 my-2 outline-none rounded-md disabled:opacity-80 disabled:cursor-not-allowed border border-slate-400 dark:border-slate-700 text-sm sm:text-base",
          errors[id] && "border-red-500",
          inputClassName
        )}
      />
      {message && (
        <span className="text-red-500 text-xs sm:text-sm">{message}</span>
      )}
    </div>
  );
};

export default FormField;
