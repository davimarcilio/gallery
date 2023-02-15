import { Carrousel } from "@/components/Carrousel";
import { Header } from "@/components/Header";
import { useState } from "react";

export type CurrencyPage = "carrousel" | "list";

export default function Logged() {
  const [checkedPage, setCheckedPage] = useState<CurrencyPage>("carrousel");
  function changeCheckedPage(value: CurrencyPage) {
    setCheckedPage(value);
  }
  return (
    <main>
      <Header
        onChangePage={changeCheckedPage}
        title={checkedPage}
        defaultChecked={checkedPage}
      />
      <Carrousel />
    </main>
  );
}
