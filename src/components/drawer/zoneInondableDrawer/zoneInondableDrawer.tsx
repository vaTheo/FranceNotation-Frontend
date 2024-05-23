import { useEffect, useState } from "react";
import { FrontzoneInnondable } from "../../../pages/typeResultJson/jsonInterface";
import { AZIData } from "../../../pages/typeResultJson/api-georisque";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type prop = {
  data: FrontzoneInnondable;
};

export default function ZoneInnondableDrawer(p: prop) {
  const { data } = p;
  const [AZI, setAZI] = useState<Array<AZIData>>([]);
  const mapping = () => {
    setAZI(
      data.zoneInnondable?.map((d) => {
        return d;
      }) ?? []
    );
  };
  useEffect(() => {
    mapping();
    console.error("AZI", AZI);
    console.error("data", data);
  }, [data]);

  return (
    <>
      <div className="drawerHeader">
        <h2>Données complémentaires sur les risques d'inondations</h2>
        <p>
          Les données suivantes répertorient les risques d'inondation. Plus
          d'informations sur
          <a
            href="https://www.georisques.gouv.fr/minformer-sur-un-risque/inondation"
            target="_blank"
            rel="noopener noreferrer"
          >
            les risques d'inondations
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
            Risques d'innondations
          </AccordionSummary>
          <AccordionDetails>
            {AZI.length === 0 ? (
              <p>Aucune zone innondable a été trouvé à cette addresse</p>
            ) : (
              AZI.map((d) => {
                return (
                  <div>
                    <p>
                      Risque sur la Commune de {d.libelle_commune}:{" "}
                      {d.liste_libelle_risque.map((r) => {
                        return r.libelle_risque_long + " ";
                      })}
                    </p>
                  </div>
                );
              })
            )}
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
}
