import { useEffect, useState } from "react";
import { AZIData } from "../../../pages/typeResultJson/api-georisque";
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
  data: AZIData[];
};

export default function ZoneInnondableDrawer(p: prop) {
  const { data } = p;
  const [AZI, setAZI] = useState<Array<AZIData>>([]);

  useEffect(() => {
    const mapping = () => {
      setAZI(
        data?.map((d) => {
          return d;
        }) ?? []
      );
    };

    mapping();
  }, [data]);

  return (
    <>
      <Box mb={2}>
        <Typography variant="titleDrawer" component="p">
          Données complémentaires sur les risques d'inondations
        </Typography>
        <Typography variant="bodyDrawer" component="p">
          Les données suivantes répertorient les risques d'inondation. Plus
          d'informations sur{" "}
          <Link
            href="https://www.georisques.gouv.fr/minformer-sur-un-risque/inondation"
            target="_blank"
            rel="noopener noreferrer"
          >
            les risques d'inondations
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
            Risques d'innondations
          </AccordionSummary>
          <AccordionDetails>
            {AZI.length === 0 ? (
              <Typography variant="contentDrawer" component="p">
                Aucune zone innondable a été trouvé à cette addresse
              </Typography>
            ) : (
              AZI.map((d) => {
                return (
                  <Box>
                    <Typography variant="contentDrawer" component="p">
                      Risque sur la Commune de {d.libelle_commune}:{" "}
                      {d.liste_libelle_risque.map((r) => {
                        return r.libelle_risque_long + " ";
                      })}
                    </Typography>
                  </Box>
                );
              })
            )}
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
}
