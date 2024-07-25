import { useEffect, useState } from "react";
import { RisqueDetail, RisquesData } from "../../../pages/typeResultJson/api-georisque";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Link,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type prop = {
  data: RisquesData[];
};

export default function RisqueInformationDrawer(p: prop) {
  const { data } = p;
  const [risques, setRisques] = useState<Array<RisqueDetail>>([]);
  const mapping = () => {
    setRisques(
      data[0].risques_detail.map((d) => {
        return d;
      }) ?? []
    );
  };
  useEffect(() => {
    mapping();
  }, [data]);

  return (
    <>
      <Box mb={2}>
        <Typography variant="titleDrawer" component="p">
          Données complémentaires des risques classés
        </Typography>
        <Typography variant="bodyDrawer" component="p">
          Voici la liste des risques définis par l'application Géorisque du
          gouvernement français. Un risque est une probabilité qu'un effet
          spécifique se produise dans une période donnée ou dans des
          circonstances déterminées. Plus d'informations sur
          <Link
            href="https://www.georisques.gouv.fr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Géorisque
          </Link>
          .
        </Typography>
      </Box>
      <Box>
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
              return <Typography variant="contentDrawer" component="p"> {d.libelle_risque_long}</Typography>;
            })}
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
}
