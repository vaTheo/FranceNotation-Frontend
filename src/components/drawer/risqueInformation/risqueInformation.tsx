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
      <p>Cette liste de risques represente sont donnée pour une addresse </p>
      <h3>Risques associé à l'adresse </h3>
      {risques.map((d) => {
        return <p> {d.libelle_risque_long}</p>;
      })}
    </>
  );
}
