import { Button } from "@/components/Button";
import Image from "next/image";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";

interface Inputs {}

export default function Home() {
  const { register, handleSubmit } = useForm();

  const router = useRouter();

  const submitForm: SubmitHandler<Inputs> = (data) => {};

  return (
    <main className="flex justify-center items-center font-roboto">
      <Image
        className="h-screen flex-1"
        src={"/home/ImageHome.jpg"}
        alt={"Mountain"}
        width={1200}
        height={980}
      />
      <section className="flex-1 px-5">
        <form className="flex flex-col" onSubmit={handleSubmit(submitForm)}>
          <label className="text-3xl font-bold" htmlFor="user">
            Entrar
          </label>
          <div className="flex flex-col gap-5 mt-10">
            <input
              className="flex focus:outline-none focus:ring-1 focus:ring-lightBlue leading-none justify-center border items-center border-gray rounded-md py-3 px-2 "
              id="user"
              type="text"
              placeholder="Usuário"
            />
            <input
              className="flex focus:outline-none focus:ring-1 focus:ring-lightBlue leading-none justify-center border items-center border-gray rounded-md py-3 px-2 "
              type="password"
              placeholder="Senha"
            />

            <Button
              onClick={() => router.push("/logged")}
              className="bg-blue text-white"
            >
              Acessar a plataforma
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
}
