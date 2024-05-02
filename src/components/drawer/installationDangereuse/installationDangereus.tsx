import { useEffect, useState } from "react";
import { FrontInstallationClassees } from "../../../pages/typeResultJson/jsonInterface";
import { InstallationsClasseesData } from "../../../pages/typeResultJson/api-georisque";

type prop = {
  data: FrontInstallationClassees;
};

export default function InstallationClasseDrawer(p: prop) {
  const { data } = p;
  const [installationsClasses, setInstallationsClasses] = useState<
    Array<InstallationsClasseesData>
  >([]);
  const mapping = () => {
    setInstallationsClasses(
      data.InstallationClassees?.map((d) => {
        return d;
      })
    );
  };
  useEffect(() => {
    mapping();
  }, [data]);

  return (
    <>
      <h2>Donnée complementaire sur les installations classés</h2>
      <p>
        Les données suivantes repertorie les installations classés dans un rayon
        de 5km de l'adresse, comrpenant des batiments SEVSO ou non
      </p>
      <p> </p>
      {installationsClasses?.map((d) => {
        return (
          <div>
            <p>Nom de la société : {d.raisonSociale}</p>
            {d?.inspections[0]?.fichierInspection?.urlFichier && (
              <a href={d?.inspections[0].fichierInspection.urlFichier}>
                Document d'inspection
              </a>
            )}
            {d?.documentsHorsInspection[0]?.urlFichier && (
              <a href={d?.documentsHorsInspection[0].urlFichier}>
                Document hors inspection
              </a>
            )}
          </div>
        );
      })}
      <p>This is the end your modal content!</p>
    </>
  );
}
