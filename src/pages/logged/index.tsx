import { Carrousel } from "@/components/Carrousel";
import { Header } from "@/components/Header";
import { List } from "@/components/List";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

export type CurrencyPage = "carrousel" | "list";

export default function Logged() {
  const [checkedPage, setCheckedPage] = useState<CurrencyPage>("carrousel");
  const { user } = useContext(UserContext);

  const router = useRouter();

  if (!!!user.authToken) {
    return <h1>sem autorização</h1>;
  }
  function changeCheckedPage(value: CurrencyPage) {
    if (!!!value) {
      return setCheckedPage(checkedPage);
    }

    return setCheckedPage(value);
  }

  return (
    <main className="max-sm overflow-hidden">
      <Header
        onChangePage={changeCheckedPage}
        title={checkedPage}
        defaultChecked={checkedPage}
      />
      {checkedPage === "carrousel" ? <Carrousel /> : <List />}
    </main>
  );
}
