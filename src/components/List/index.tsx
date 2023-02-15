import { images } from "@/data/images";
import { Eye, TrashSimple } from "phosphor-react";
import { Button } from "../Button";
import { Modal } from "./components/Modal";

export function List() {
  return (
    <section className="flex flex-col justify-center items-center  relative w-full">
      <Modal type="Form" title="Upload">
        <Button className="bg-blue self-end text-white mr-20">
          Upload de Imagem
        </Button>
      </Modal>
      <table className="max-w-screen-md relative mt-5">
        <thead>
          <tr>
            <th className="bg-gray text-black border border-darkGray text-lg px-5 py-2 justify-center items-center">
              Id
            </th>
            <th className="bg-gray text-black border border-darkGray text-lg px-5 py-2 justify-center items-center">
              Nome
            </th>
            <th className="bg-gray text-black border border-darkGray text-lg px-5 py-2 justify-center items-center">
              Extensão
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
          {images.map((image) => (
            <tr key={image.id}>
              <td className="bg-lightGray text-darkGray border border-darkGray text-lg px-5 py-2 justify-center items-center">
                {image.id}
              </td>
              <td className="bg-lightGray text-darkGray border border-darkGray text-lg px-5 py-2 justify-center items-center">
                {image.name}
              </td>
              <td className="bg-lightGray text-darkGray border border-darkGray text-lg px-5 py-2 justify-center items-center">
                {image.type}
              </td>
              <td className="bg-lightGray text-darkGray border border-darkGray text-lg px-5 py-2 justify-center items-center">
                {image.length}
              </td>
              <td className="bg-lightGray text-darkGray border border-darkGray text-lg px-5 py-2 justify-center items-center">
                {new Intl.DateTimeFormat("pt-br").format(image.createdAt)}
              </td>
              <td className="bg-lightGray text-darkGray border border-darkGray flex gap-2 text-lg px-5 py-2 justify-center items-center">
                <Button className="bg-danger px-2 py-2">
                  <TrashSimple className="text-white" />
                </Button>
                <Modal
                  title="Visualização"
                  type="Visualization"
                  image={{ title: image.name, url: image.url }}
                >
                  <Button className="bg-blue px-2 py-2">
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
