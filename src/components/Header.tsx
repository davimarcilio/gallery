import { Button } from "./Button";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
export function Header() {
  return (
    <header className="w-full flex flex-col leading-none px-20 py-4">
      <section className="flex w-full justify-between items-center">
        <h1 className="text-gray text-3xl font-bold">GALLERY</h1>
        <Button className="bg-lightGray text-darkGray">Encerrar sessão</Button>
      </section>
      <section className="flex items-center justify-center">
        <h1 className="text-5xl font-bold text-darkGray flex-1">Carrossel</h1>
        <ToggleGroup.Root type="single">
          <ToggleGroup.Item value="carrousel"></ToggleGroup.Item>
          <ToggleGroup.Item value="list"></ToggleGroup.Item>
        </ToggleGroup.Root>
      </section>
    </header>
  );
}
