import { useEffect, useState } from "react";
import { FrontzoneNaturelle } from "../../../pages/typeResultJson/jsonInterface";
import { FeatureCarto } from "../../../pages/typeResultJson/api-cartoParc";

type prop = {
  data: FrontzoneNaturelle;
};

export default function ZoneNaturelleDrawer(p: prop) {
  const { data } = p;
  const [naturaHabitat, setNaturaHabitat] = useState<Array<FeatureCarto>>([]);
  const [naturaOiseaux, setNaturaOiseaux] = useState<Array<FeatureCarto>>([]);
  const [znieff1, setznieff1] = useState<Array<FeatureCarto>>([]);
  const [znieff2, setznieff2] = useState<Array<FeatureCarto>>([]);

  const mapping = () => {
    setNaturaHabitat(
      data.zoneNaturelle.naturaHabitat?.map((d) => {
        return d;
      }) ?? []
    );
    setNaturaOiseaux(
      data.zoneNaturelle.naturaOiseaux?.map((d) => {
        return d;
      }) ?? []
    );
    setznieff1(
      data.zoneNaturelle.znieff1?.map((d) => {
        return d;
      }) ?? []
    );
    setznieff2(
      data.zoneNaturelle.znieff2?.map((d) => {
        return d;
      }) ?? []
    );
  };
  useEffect(() => {
    mapping();
  }, [data]);

  return (
    <>
      <h2>Donnée complementaire sur zone naturelles</h2>
      <h3>
        Les zone naturelles sont des zone connue où de la faunes et de la
        flaures interessantes sont connue. Ces zone n'ont cependant pas vraiment
        'impact sur l'hurbanisme
      </h3>
      <p> </p>
      {naturaHabitat.length === 0 &&
      naturaOiseaux.length === 0 &&
      znieff1.length === 0 &&
      znieff2.length === 0 ? (
        <p>Aucune zone naturelle n'a été trouvé proche de cette adresse</p>
      ) : (
        <>
          {naturaHabitat.map((d) => {
            return (
              <div>
                <a href={d.properties?.url}>
                  Nom du parc : {d.properties?.sitename}
                </a>
                <p> Superficie : {d.area} m²</p>
              </div>
            );
          })}
          {naturaOiseaux.map((d) => {
            return (
              <div>
                <a href={d.properties?.url}>
                  Nom du parc : {d.properties?.sitename}
                </a>
                <p> Superficie : {d.area} m²</p>
              </div>
            );
          })}
          {znieff1.map((d) => {
            return (
              <div>
                <a href={d.properties?.url}>
                  Nom du parc : {d.properties?.sitename}
                </a>
                <p> Superficie : {d.area} m²</p>
              </div>
            );
          })}
          {znieff2.map((d) => {
            return (
              <div>
                <a href={d.properties?.url}>
                  Nom du parc : {d.properties?.sitename}
                </a>
                <p> Superficie : {d.area} m²</p>
              </div>
            );
          })}
        </>
      )}
    </>
  );
}
