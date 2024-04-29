import { useEffect, useState } from "react";
import { FrontEau } from "../../../pages/typeResultJson/jsonInterface";
import {
  CoursEauData,
  EauPotableData,
} from "../../../pages/typeResultJson/api-eau";

type prop = {
  data: FrontEau;
};
export default function EAUDrawer(p: prop) {
  const { data } = p;
  const [courEau, setcourEau] = useState<Array<CoursEauData>>([]);
  const [eauPotable, setEauPotable] = useState<Array<EauPotableData>>([]);
  const mapping = () => {
    setcourEau(
      (data.eau.coursEau ?? []).map((d) => {
        return d;
      })
    );
    setEauPotable(
      (data.eau.eauPotable ?? []).map((d) => {
        return d;
      })
    );
  };
  useEffect(() => {
    mapping();
  }, [data]);

  return (
    <>
      <h2>Donnée complementaire sur la qualité de l'eau potable </h2>
      <p>
        LEs informations sur l'eau potable sont des donnée publics, en general
        les points d'eau mesuré correspondent à des ensembles de quartier ou des
        villes
      </p>
      <p> </p>
      <p>
        Les données disponibles ici sont correspond au cours d'eau environant
        ainsi que l'eau potable arrivant des les robinet{" "}
      </p>
      <p>Les valeurs suivantes sont des moyennes sur les 5 dernières années</p>
      <p> Eau potable : </p>
      {eauPotable.map((d) => {
        return (
          <p>
            Date DPE : {d.libelle_parametre}
            {""}
            Limite minimum : {d.min}
            Limite maximum : {d.max}
            Moyenne des valeurs {d.totalAverage}
          </p>
        );
      })}
      <p>This is the end your modal content!</p>
    </>
  );
}
