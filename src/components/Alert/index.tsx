import * as Toast from "@radix-ui/react-toast";
import { X } from "phosphor-react";
import { ReactNode } from "react";

interface AlertProps {
  title: string;
  message: string;
  type: "error" | "success";
  open: boolean;
}

export function Alert({ title, message, open, type }: AlertProps) {
  return (
    <Toast.Provider>
      <Toast.Root open={open}>
        <Toast.Title
          className={`${
            type === "success" ? "text-confirm" : "text-danger"
          }  text-2xl font-bold`}
        >
          {title}
        </Toast.Title>
        <Toast.Description className="text-lg">{message}</Toast.Description>
        <Toast.Close
          className="absolute hover:opacity-60 cursor-pointer transition-opacity top-5 right-5 z-50"
          asChild
        >
          <X size={24} />
        </Toast.Close>
      </Toast.Root>
      <Toast.Viewport className="fixed right-10 bottom-10 bg-background rounded-xl px-20 py-5 z-40" />
    </Toast.Provider>
  );
}
