import { Alert } from "@/components/Alert";
import { Button } from "@/components/Button";
import * as Dialog from "@radix-ui/react-dialog";
import { UploadSimple, X } from "phosphor-react";
import { InputHTMLAttributes, ReactNode, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface ModalProps {
  children: ReactNode;
  title: string;
}
interface Inputs {
  file: FileList;
}

interface ErrorProps {
  state: boolean;
  type: "error" | "success";
}

export function Modal({ children, title }: ModalProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<Inputs>();
  const [error, setError] = useState<ErrorProps>({
    state: false,
    type: "success",
  });
  const submitForm: SubmitHandler<Inputs> = (data) => {
    if (data.file[0].type.includes("image")) {
      ///Requisição backend
    } else {
      setError({
        state: true,
        type: "error",
      });
      setTimeout(() => {
        setError({
          state: false,
          type: "success",
        });
      }, 5000);
    }
  };
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-slate-900 opacity-60 w-screen h-screen absolute top-0" />
        <Dialog.Content
          asChild
          className="bg-background p-10 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg flex flex-col justify-center gap-10"
        >
          <form onSubmit={handleSubmit(submitForm)}>
            <Dialog.Title className="text-darkGray text-3xl font-bold">
              {title}
            </Dialog.Title>
            <div className="w-full h-full relative hover:opacity-70 transition-opacity">
              <input
                {...register("file", {
                  required: "Selecione um arquivo",
                })}
                className="w-full h-full opacity-0 absolute cursor-pointer z-10"
                type="file"
              />
              <div className="w-96 h-44 border-4 flex rounded-xl justify-center items-center border-dashed border-blue">
                <UploadSimple className="text-blue" size={50} />
              </div>
            </div>
            <Button
              disabled={isSubmitting}
              className="bg-blue text-white flex-1"
            >
              Cadastrar
            </Button>
            <p className="text-danger">{errors.file?.message}</p>

            <Dialog.Close
              className="absolute top-5 right-5 cursor-pointer text-darkGray hover:opacity-60 transition-opacity"
              asChild
            >
              <X size={30} />
            </Dialog.Close>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
      {error.state && (
        <Alert
          message="O arquivo enviado não é uma imagem"
          type={error.type}
          title="Formato inválido"
          open={error.state}
        />
      )}
    </Dialog.Root>
  );
}
