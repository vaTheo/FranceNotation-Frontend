import { useEffect, useState } from "react";
import { FrontCatastropheNaturelle } from "../../../pages/typeResultJson/jsonInterface";

import { CatnatData } from "../../../pages/typeResultJson/api-georisque";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type prop = {
  data: FrontCatastropheNaturelle;
};
export default function CatnatDrawer(p: prop) {
  const { data } = p;
  const [catNat, setCatNat] = useState<Array<CatnatData>>([]);
  const mapping = () => {
    setCatNat(
      data.CatastropheNaturelle.map((d) => {
        return d;
      })
    );
  };
  useEffect(() => {
    mapping();
  }, [data]);

  return (
    <>
      <Box mb={2}>
        <Typography variant="titleDrawer" component="p">
          Données complémentaires sur les catastrophes naturelles.
        </Typography>
        <Typography variant="bodyDrawer" component="p">
          Les informations suivantes correspondent aux catastrophes naturelles
          qui ont eu lieu dans un rayon de 5 km de l'adresse et au cours des 10
          dernières années.
        </Typography>
      </Box>
      <Box>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            Catastrophe Naturelles
          </AccordionSummary>
          <AccordionDetails>
            {catNat.length === 0 ? (
              <Typography variant="contentDrawer" component="p">
                Aucune catastrophe naturelle n'a été trouvée à proximité de
                cette adresse.
              </Typography>
            ) : (
              catNat.map((d) => {
                return (
                  <Typography variant="contentDrawer" component="p">
                    {d.date_debut_evt} : {d.libelle_risque_jo}
                  </Typography>
                );
              })
            )}
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
}
