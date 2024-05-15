import { useEffect, useState } from "react";
import { FrontpollutionSol } from "../../../pages/typeResultJson/jsonInterface";
import { SISData } from "../../../pages/typeResultJson/api-georisque";

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
        Les données suivantes liste les sites et sols pollués dans un rayon de
        2km trouvé autour de l'adresse. Vous pouvez clicker sur le nom pour
        ouvrir la fiche de risque stoqué sur{" "}
        <a href="https:/brgm.fr" target="_blank" rel="noopener noreferrer">
          {" "}
          brgm.fr
        </a>
        , le Bureau de recherches géologiques et minières. Dans le lien vous
        trouverez des informations sur l'état du sol et pour quelle raison il a
        été polué. Les lieu sont classé du plus proche au plus loin de
        l'adresse.
      </p>
      <p> </p>
      {sol.length === 0 ? (
        <p>Aucune sol pollué n'a été détécté autour de cette addresse</p>
      ) : (
        sol.map((d) => {
          return (
            <p>
              Nom du lieu:{" "}
              <a
                href={d?.fiche_risque}
                target="_blank"
                rel="noopener noreferrer"
              >
                {d.nom ? d.nom : "lien vers la documentation"}
              </a>{" "}
              Superficie: {d.superficie?.toFixed()} m²
            </p>
          );
        })
      )}
    </>
  );
}
