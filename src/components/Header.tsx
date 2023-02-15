import { Button } from "./Button";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { Image, List } from "phosphor-react";
import { CurrencyPage } from "@/pages/logged";

interface HeaderProps {
  title: string;
  defaultChecked: CurrencyPage;
  onChangePage: (value: CurrencyPage) => void;
}

export function Header({ defaultChecked, title, onChangePage }: HeaderProps) {
  return (
    <header className="w-full flex flex-col relative leading-none px-20 py-4">
      <section className="flex w-full justify-between items-center">
        <h1 className="text-gray text-3xl font-bold">GALLERY</h1>
        <Button className="bg-lightGray text-darkGray">Encerrar sessão</Button>
      </section>
      <section className="flex items-center justify-center px-20 mt-10">
        <h1 className="text-5xl font-bold flex justify-center text-darkGray flex-1 uppercase">
          {title}
        </h1>
        <ToggleGroup.Root
          value={defaultChecked}
          onValueChange={(value: CurrencyPage) => onChangePage(value)}
          className="w-auto absolute right-28"
          defaultValue={defaultChecked}
          type="single"
        >
          <ToggleGroup.Item
            className="p-2 data-[state='off']:bg-lightGray data-[state='off']:opacity-50 border group border-gray rounded-l-md"
            value="carrousel"
          >
            <Image className="group-data-[state='on']:text-blue" size={24} />
          </ToggleGroup.Item>
          <ToggleGroup.Item
            className="p-2 border data-[state='off']:bg-lightGray data-[state='off']:opacity-50 group border-gray rounded-r-md"
            value="list"
          >
            <List className="group-data-[state='on']:text-blue" size={24} />
          </ToggleGroup.Item>
        </ToggleGroup.Root>
      </section>
    </header>
  );
}
