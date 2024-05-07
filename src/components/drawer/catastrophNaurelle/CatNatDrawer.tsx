import { useEffect, useState } from "react";
import { FrontCatastropheNaturelle } from "../../../pages/typeResultJson/jsonInterface";

import { CatnatData } from "../../../pages/typeResultJson/api-georisque";

type prop = {
  data: FrontCatastropheNaturelle;
};
export default function CatnatDrawer(p: prop) {
  const { data } = p;
  const [catNat, setCatNat] = useState<Array<CatnatData>>([]);
  const mapping = () => {
    setCatNat(
      data.CatastropheNaturelle.map((d) => {
        return d;
      })
    );
  };
  useEffect(() => {
    mapping();
  }, [data]);

  return (
    <>
      <h2>Donnée complementaire les catastrophe naturelle </h2>
      <h3>
        Les informations suivantes correspondent aux catastrophes naturelles qui
        ont eu lieu dans un rayon de 5km de l'adresse et sur les 10 dernieres
        années
      </h3>
      <p> </p>
      {catNat.map((d) => {
        return (
          <p>
            Date début catastrophe : {d.date_debut_evt}
            Date fin catastrophe : {d.date_fin_evt}
            Nom de la catastrophe : {d.libelle_risque_jo}
          </p>
        );
      })}
      <p>This is the end your modal content!</p>
    </>
  );
}
