import { Alert } from "@/components/Alert";
import { Button } from "@/components/Button";
import { UserContext } from "@/context/UserContext";
import { uploadImage } from "@/lib/firebase/bucket";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { UploadSimple, X } from "phosphor-react";
import { ReactNode, useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface ModalProps {
  children: ReactNode;
  title: string;
  type: "Form" | "Visualization";
  image?: {
    url: string;
    title: string;
  };
}
interface Inputs {
  file: FileList;
}

interface ErrorProps {
  state: boolean;
  message: string;
  title: string;
  type: "error" | "success";
}

export function Modal({ children, title, type, image }: ModalProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<Inputs>();
  const { user, getGalery } = useContext(UserContext);
  const [error, setError] = useState<ErrorProps>({
    state: false,
    type: "success",
    message: "",
    title: "",
  });
  const submitForm: SubmitHandler<Inputs> = async (data) => {
    if (data.file[0].type.includes("image")) {
      ///Requisição backend
      const response = await uploadImage({ ...user }, data.file[0]);
      getGalery(user.id);
      setError({
        state: true,
        type: "success",
        message: "Imagem enviada com sucesso!",
        title: "Sucesso",
      });
      setTimeout(() => {
        setError({
          state: false,
          type: "success",
          message: "",
          title: "",
        });
      }, 5000);
    } else {
      setError({
        state: true,
        type: "error",
        message: "O arquivo enviado não é uma imagem",
        title: "Formato inválido",
      });
      setTimeout(() => {
        setError({
          state: false,
          type: "success",
          message: "",
          title: "",
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
          className="bg-background p-10 fixed max-sm:w-screen max-sm:h-screen max-sm:fixed max-sm:top-0 max-sm:left-0 max-sm:-translate-x-0 max-sm:-translate-y-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg flex flex-col justify-center gap-10"
        >
          {type === "Form" ? (
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
                <div className="w-96 h-44 max-sm:h-full max-sm:w-full border-4 flex rounded-xl justify-center items-center border-dashed border-blue">
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
          ) : (
            <div className="">
              <Dialog.Title className="text-darkGray text-3xl font-bold">
                {title}
              </Dialog.Title>
              <Image
                width={1000}
                height={1000}
                src={image!.url}
                alt={image!.title}
                className={
                  "max-w-screen-md max-h-screen-md w-full max-sm:object-cover h-full"
                }
              />
              <Dialog.Close className="bg-gray" asChild>
                <Button>Fechar</Button>
              </Dialog.Close>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
      {error.state && (
        <Alert
          message={error.message}
          type={error.type}
          title={error.title}
          open={error.state}
        />
      )}
    </Dialog.Root>
  );
}
