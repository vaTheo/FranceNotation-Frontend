import { useEffect, useState } from "react";
import { FrontRisqueInformation } from "../../../pages/typeResultJson/jsonInterface";
import { RisqueDetail } from "../../../pages/typeResultJson/api-georisque";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
      <div className="drawerHeader">
        <h2>Données complémentaires des risques classés</h2>
        <p>
          Voici la liste des risques définis par l'application Géorisque du
          gouvernement français. Un risque est une probabilité qu'un effet
          spécifique se produise dans une période donnée ou dans des
          circonstances déterminées. Plus d'informations sur
          <a
            href="https://www.georisques.gouv.fr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Géorisque
          </a>
          .
        </p>
      </div>
      <div className="drawerContent">
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            Liste des risques
          </AccordionSummary>
          <AccordionDetails>
            {risques.map((d) => {
              return <p> {d.libelle_risque_long}</p>;
            })}
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
}
