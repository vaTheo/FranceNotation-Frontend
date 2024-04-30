import { useEffect, useState } from "react";
import { FrontrisqueLocaux } from "../../../pages/typeResultJson/jsonInterface";
import {
  MVTData,
  RadonData,
  ZonageSismiqueData,
} from "../../../pages/typeResultJson/api-georisque";

type prop = {
  data: FrontrisqueLocaux;
};

export default function DangerNaturelleDrawer(p: prop) {
  const { data } = p;
  const [mvt, setMvt] = useState<Array<MVTData>>([]);
  const [sismique, setsismique] = useState<Array<ZonageSismiqueData>>([]);
  const [radon, setRadon] = useState<Array<RadonData>>([]);
  const mapping = () => {
    setMvt(
      data.risqueLocaux.MVTData?.map((d) => {
        return d;
      }) ?? []
    );
    setsismique(
      data.risqueLocaux.ZonageSismiqueData?.map((d) => {
        return d;
      }) ?? []
    );
    setRadon(
      data.risqueLocaux.RadonData?.map((d) => {
        return d;
      }) ?? []
    );
  };
  useEffect(() => {
    mapping();
  }, [data]);

  return (
    <>
      <h2>Donnée complementaire sur les dangers naturelles</h2>
      <p>
        Les données suivantes correspondent aux dangers naturelles qui sont
        présent dans la zone concerné
      </p>
      <h3> Inofrmation sur la zone sysmique </h3>
      {sismique.map((d) => {
        return <p> Indice de sismisité : {d.zone_sismicite} </p>;
      })}
      <h3> Inofrmation sur le radon </h3>
      {radon.map((d) => {
        return <p> Classe de radon de la zone : {d.classe_potentiel} </p>;
      })}
      <h3> Inofrmation sur les mouvements de terrains recents</h3>
      {mvt.map((d) => {
        return (
          <p>
            {" "}
            Mouvements de terrains recensé date : {d.date_debut}
            type : {d.type}{" "}
          </p>
        );
      })}
    </>
  );
}
