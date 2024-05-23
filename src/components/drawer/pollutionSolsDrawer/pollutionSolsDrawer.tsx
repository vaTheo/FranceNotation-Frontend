import { useEffect, useState } from "react";
import { FrontpollutionSol } from "../../../pages/typeResultJson/jsonInterface";
import { SISData } from "../../../pages/typeResultJson/api-georisque";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
      <div className="drawerHeader">
        <h2>Données complémentaires sur la pollution des sols</h2>
        <p>
          Les données suivantes listent les sites et sols pollués dans un rayon
          de 2 km autour de l'adresse. Vous pouvez cliquer sur le nom pour
          ouvrir la fiche de risque stockée sur
          <a href="https://brgm.fr" target="_blank" rel="noopener noreferrer">
            brgm.fr
          </a>
          , le Bureau de Recherches Géologiques et Minières. Dans le lien, vous
          trouverez des informations sur l'état du sol et la raison pour
          laquelle il a été pollué. Les lieux sont classés du plus proche au
          plus loin de l'adresse.
        </p>
      </div>
      <div className="drawerContent">
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            Sols pollués
          </AccordionSummary>
          <AccordionDetails>
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
                    Superficie: {Math.floor(d.superficie ?? 0)} m²
                  </p>
                );
              })
            )}
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
}
