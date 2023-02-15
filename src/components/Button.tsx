import { ButtonHTMLAttributes, ReactNode } from "react";

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`rounded-md leading-none px-10 py-5 hover:opacity-60 font-bold text-lg transition-opacity ${props.className}`}
      type="submit"
    >
      {children}
    </button>
  );
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}
