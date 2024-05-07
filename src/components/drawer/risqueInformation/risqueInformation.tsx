import { useEffect, useState } from "react";
import { FrontRisqueInformation } from "../../../pages/typeResultJson/jsonInterface";
import { RisqueDetail } from "../../../pages/typeResultJson/api-georisque";

type prop = {
  data: FrontRisqueInformation;
};

export default function RisqueInformationDrawer(p: prop) {
  const { data } = p;
  const [risques, setRisques] = useState<Array<RisqueDetail>>([]);
  const mapping = () => {
    setRisques(
      data.risqueInformation?.risqueInformation[0].risques_detail.map((d) => {
        return d;
      }) ?? []
    );
  };
  useEffect(() => {
    mapping();
  }, [data]);

  return (
    <>
      <h2>Donnée complementaire des risques classés</h2>
      <p>
        Voici la liste des risque défnie par l'application georisque du
        gouvernement francais, un risque est une robabilité qu'un effet
        spécifique se produise dans une période donnée ou dans des circonstances
        déterminées. Plus dinformation sur{" "}
        <a
          href="https://www.georisques.gouv.fr/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Georisuqe
        </a>
      </p>
      <p>Risques associé à l'adresse </p>
      {risques.map((d) => {
        return <p> {d.libelle_risque_long}</p>;
      })}
    </>
  );
}
