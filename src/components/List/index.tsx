import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/router";
import { Eye, TrashSimple } from "phosphor-react";
import { useContext } from "react";
import { Button } from "../Button";
import { Modal } from "./components/Modal";

export function List() {
  const { galery, deleteImage } = useContext(UserContext);
  const router = useRouter();
  if (galery.length === 0) {
    return (
      <section className="flex text-3xl font-bold mt-10 flex-col justify-center max-sm:justify-start items-center max-sm:overflow-scroll relative w-full max-sm:h-screen max-sm:px-5">
        <h1>
          Opa, Você não possui nenhuma imagem no momento, experimente adicionar
          uma!
        </h1>
        <Modal type="Form" title="Upload">
          <Button className="bg-blue self-end text-white mr-20">
            Upload de Imagem
          </Button>
        </Modal>
      </section>
    );
  }

  return (
    <section className="flex flex-col justify-center max-sm:justify-start items-center max-sm:overflow-scroll w-full max-sm:h-screen max-sm:px-5">
      <Modal type="Form" title="Upload">
        <Button className="bg-blue self-end text-white mr-20">
          Upload de Imagem
        </Button>
      </Modal>
      <table className="max-w-screen-md  max-sm:mt-20 mt-5 max-sm:absolute max-sm:left-2 max-sm:mr-2">
        <thead>
          <tr>
            <th className="bg-gray text-black border border-darkGray text-lg px-5 py-2 justify-center items-center">
              Id
            </th>
            <th className="bg-gray text-black border border-darkGray text-lg px-5 py-2 justify-center items-center">
              Nome
            </th>

            <th className="bg-gray text-black border border-darkGray text-lg px-5 py-2 justify-center items-center">
              Tamanho
            </th>
            <th className="bg-gray text-black border border-darkGray text-lg px-5 py-2 justify-center items-center">
              Data de Criação
            </th>
            <th className="bg-gray text-black border border-darkGray text-lg px-5 py-2 justify-center items-center">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {galery.map((image) => (
            <tr key={image.id}>
              <td className="bg-lightGray text-darkGray border border-darkGray text-lg px-5 py-2 justify-center items-center">
                {image.id}
              </td>
              <td className="bg-lightGray text-darkGray border border-darkGray text-lg px-5 py-2 justify-center items-center">
                {image.name}
              </td>

              <td className="bg-lightGray text-darkGray border border-darkGray text-lg px-5 py-2 justify-center items-center">
                {image.size / 1000} kB
              </td>
              <td className="bg-lightGray text-darkGray border border-darkGray text-lg px-5 py-2 justify-center items-center">
                {new Intl.DateTimeFormat("pt-br").format(
                  new Date(image.createdAt)
                )}
              </td>
              <td className="bg-lightGray text-darkGray border border-darkGray flex gap-2 text-lg px-5 py-2 justify-center items-center">
                <Button
                  onClick={() => {
                    deleteImage(image.id);
                  }}
                  className="bg-danger px-2 py-2"
                >
                  <TrashSimple className="text-white" />
                </Button>
                <Modal
                  title="Visualização"
                  type="Visualization"
                  image={{ title: image.name, url: image.src }}
                >
                  <Button type="button" className="bg-blue px-2 py-2">
                    <Eye className="text-white" />
                  </Button>
                </Modal>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
