import { useEffect, useState } from "react";
import { FrontCatastropheNaturelle } from "../../../pages/typeResultJson/jsonInterface";

import { CatnatData } from "../../../pages/typeResultJson/api-georisque";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
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
      <div className="drawerHeader">
        <h2>Données complémentaires sur les catastrophes naturelles.</h2>
        <p>
          Les informations suivantes correspondent aux catastrophes naturelles
          qui ont eu lieu dans un rayon de 5 km de l'adresse et au cours des 10
          dernières années.
        </p>
      </div>
      <div className="drawerContent">
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
              <p>
                Aucune catastrophe naturelle n'a été trouvée à proximité de
                cette adresse.
              </p>
            ) : (
              catNat.map((d) => {
                return (
                  <p>
                    {d.date_debut_evt} : {d.libelle_risque_jo}
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
