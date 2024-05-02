import { useEffect, useState } from "react";
import {
  FrontzoneInnondable,
} from "../../../pages/typeResultJson/jsonInterface";
import { AZIData } from "../../../pages/typeResultJson/api-georisque";

type prop = {
  data: FrontzoneInnondable;
};

export default function ZoneInnondableDrawer(p: prop) {
  const { data } = p;
  const [AZI, setAZI] = useState<Array<AZIData>>([]);
  const mapping = () => {
    setAZI(
      data.zoneInnondable?.map((d) => {
        return d;
      }) ?? []
    );
  };
  useEffect(() => {
    mapping();
  }, [data]);

  return (
    <>
      <h2>Donnée complementaire sur les risque d'inondations</h2>
      <p>Les données suivantes repertorie risque d'inondation</p>
      <p> </p>
      {AZI.map((d) => {
        return (
          <div>
            <p>
              Commune : {d.libelle_commune}
              Risques :{" "}
              {d.liste_libelle_risque.map((r) => {
                return r.libelle_risque_long + " ";
              })}
            </p>
          </div>
        );
      })}

      <p>This is the end your modal content!</p>
    </>
  );
}
