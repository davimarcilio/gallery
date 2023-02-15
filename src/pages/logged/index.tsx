import { Carrousel } from "@/components/Carrousel";
import { Header } from "@/components/Header";
import { List } from "@/components/List";
import { useState } from "react";

export type CurrencyPage = "carrousel" | "list";

export default function Logged() {
  const [checkedPage, setCheckedPage] = useState<CurrencyPage>("carrousel");
  function changeCheckedPage(value: CurrencyPage) {
    if (!!!value) {
      return setCheckedPage(checkedPage);
    }

    return setCheckedPage(value);
  }
  return (
    <main>
      <Header
        onChangePage={changeCheckedPage}
        title={checkedPage}
        defaultChecked={checkedPage}
      />
      {checkedPage === "carrousel" ? <Carrousel /> : <List />}
    </main>
  );
}
