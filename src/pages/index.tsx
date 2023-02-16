import { Alert } from "@/components/Alert";
import { Button } from "@/components/Button";
import { UserContext } from "@/context/UserContext";
import Image from "next/image";
import { Eye, EyeSlash } from "phosphor-react";
import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface Inputs {
  user: string;
  password: string;
}

export default function Home() {
  const [isVisiblePassword, setVisiblePassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const { loginUser, user } = useContext(UserContext);

  const submitForm: SubmitHandler<Inputs> = ({ password, user }) => {
    return loginUser(user, password);
  };

  return (
    <main className="flex justify-center max-sm:h-screen items-center max-sm:px-5 font-roboto">
      <Image
        className="h-screen flex-1 w-3/5 max-sm:absolute max-sm:w-screen max-sm:object-cover max-sm:-z-10"
        src={"/home/ImageHome.jpg"}
        alt={"Mountain"}
        width={1200}
        height={980}
      />
      <section className="flex-1 px-5">
        <form className="flex flex-col" onSubmit={handleSubmit(submitForm)}>
          <label
            className="text-3xl font-bold max-sm:text-white"
            htmlFor="user"
          >
            Entrar
          </label>
          <div className="flex flex-col gap-5 mt-10">
            <input
              {...register("user", {
                required: "Insira um nome de usuário",
              })}
              className="flex focus:outline-none focus:ring-1 focus:ring-lightBlue leading-none justify-center border items-center border-gray rounded-md py-3 px-2 "
              id="user"
              type="text"
              placeholder="Usuário"
            />
            <div className="relative">
              <input
                {...register("password", {
                  required: "Insira uma senha",
                })}
                className="flex w-full focus:outline-none focus:ring-1 focus:ring-lightBlue leading-none justify-center border items-center border-gray rounded-md py-3 px-2 "
                type={isVisiblePassword ? "text" : "password"}
                placeholder="Senha"
              />
              <button
                onClick={() => setVisiblePassword((state) => !state)}
                className="absolute right-0 top-0 h-full p-1"
                type="button"
              >
                {isVisiblePassword ? (
                  <EyeSlash className="text-blue" size={24} />
                ) : (
                  <Eye className="text-blue" size={24} />
                )}
              </button>
            </div>
            {user.id === 0 && (
              <Alert
                message="Usuário/Senha incorretos"
                title="Erro"
                type="error"
                open={true}
              />
            )}
            <Button
              disabled={isSubmitting}
              className="bg-blue disabled:hover:opacity-100 text-white"
            >
              Acessar a plataforma
            </Button>
            <p className="text-danger font-bold">{errors.user?.message}</p>
            <p className="text-danger font-bold">{errors.password?.message}</p>
          </div>
        </form>
      </section>
    </main>
  );
}
