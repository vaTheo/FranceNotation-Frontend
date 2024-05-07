import { useEffect, useState } from "react";
import { FrontParcNaturelle } from "../../../pages/typeResultJson/jsonInterface";
import { FeatureCarto } from "../../../pages/typeResultJson/api-cartoParc";

type prop = {
  data: FrontParcNaturelle;
};

export default function ParcNaturelleDrawer(p: prop) {
  const { data } = p;
  const [rnc, setRnc] = useState<Array<FeatureCarto>>([]);
  const [rnn, setRnn] = useState<Array<FeatureCarto>>([]);
  const [pn, setPn] = useState<Array<FeatureCarto>>([]);
  const [pnr, setPnr] = useState<Array<FeatureCarto>>([]);
  const [rncf, setRncf] = useState<Array<FeatureCarto>>([]);
  const mapping = () => {
    setRnc(
      data.parcNaturelle.rnc?.map((d) => {
        return d;
      }) ?? []
    );
    setRnn(
      data.parcNaturelle.rnn?.map((d) => {
        return d;
      }) ?? []
    );
    setPn(
      data.parcNaturelle.pn?.map((d) => {
        return d;
      }) ?? []
    );
    setPnr(
      data.parcNaturelle.pnr?.map((d) => {
        return d;
      }) ?? []
    );
    setRncf(
      data.parcNaturelle.rncf?.map((d) => {
        return d;
      }) ?? []
    );
  };
  useEffect(() => {
    mapping();
  }, [data]);

  return (
    <>
      <h2>Donnée complementaire sur les parcrs naturelle</h2>
      <h3>
        Les données suivantes repertorie les parcs naturelle se trouvant dans un
        rayon de 10km de l'ddresse seletionné
      </h3>
      <p> </p>
      {rnc.map((d) => {
        return (
          <div>
            <a href={d.properties?.url}>
              Nom du parc : {d.properties?.sitename}
            </a>
            <p> Superficie : {d.area} m²</p>
          </div>
        );
      })}
      {rnn.map((d) => {
        return (
          <div>
            <a href={d.properties?.url}>
              Nom du parc : {d.properties?.sitename}
            </a>
            <p> Superficie : {d.area} m²</p>
          </div>
        );
      })}{" "}
      {pn.map((d) => {
        return (
          <div>
            <a href={d.properties?.url}>
              Nom du parc : {d.properties?.sitename}
            </a>
            <p> Superficie : {d.area} m²</p>
          </div>
        );
      })}{" "}
      {pnr.map((d) => {
        return (
          <div>
            <a href={d.properties?.url}>
              Nom du parc : {d.properties?.sitename}
            </a>
            <p> Superficie : {d.area} m²</p>
          </div>
        );
      })}{" "}
      {rncf.map((d) => {
        return (
          <div>
            <a href={d.properties?.url}>
              Nom du parc : {d.properties?.sitename}
            </a>
            <p> Superficie : {d.area} m²</p>
          </div>
        );
      })}
      <p>This is the end your modal content!</p>
    </>
  );
}
