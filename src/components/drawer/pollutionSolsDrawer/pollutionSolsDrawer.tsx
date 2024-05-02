import { useEffect, useState } from "react";
import {
  FrontInstallationClassees,
  FrontpollutionSol,
} from "../../../pages/typeResultJson/jsonInterface";

import {
  InstallationsClasseesData,
  SISData,
} from "../../../pages/typeResultJson/api-georisque";

type prop = {
  data: FrontpollutionSol;
};

export default function PollutionSolDrawer(p: prop) {
  const { data } = p;
  const [sol, setSol] = useState<Array<SISData>>([]);
  const mapping = () => {
    setSol(
      data.pollutionSol.sis?.map((d) => {
        return d;
      }) ?? []
    );
  };
  useEffect(() => {
    mapping();
  }, [data]);

  return (
    <>
      <h2>Donnée complementaire sur la pulltuon des sols</h2>
      <p>
        Les données suivantes repertorie zone ou les sols ont été polué dans un
        rayon de 10km
      </p>
      <p> </p>
      {sol.map((d) => {
        return (
          <p>
            Addresse : {d.adresse}
            Nom : {d.nom}
            superficie : {d.superficie?.toFixed()} m²
          </p>
        );
      })}
      <p>This is the end your modal content!</p>
    </>
  );
}
