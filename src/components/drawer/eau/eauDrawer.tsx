import { useEffect, useState } from "react";
import { FrontEau } from "../../../pages/typeResultJson/jsonInterface";
import {
  CoursEauData,
  EauPotableData,
} from "../../../pages/typeResultJson/api-eau";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type prop = {
  data: FrontEau;
};
export default function EAUDrawer(p: prop) {
  const { data } = p;
  const [courEau, setcourEau] = useState<Array<CoursEauData>>([]);
  const [eauPotable, setEauPotable] = useState<Array<EauPotableData>>([]);
  const mapping = () => {
    setcourEau(
      (data.eau.coursEau ?? []).map((d) => {
        return d;
      })
    );
    setEauPotable(
      (data.eau.eauPotable ?? []).map((d) => {
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
        <h2>Données complémentaires sur la qualité de l'eau potable</h2>
        <p>
          Les informations sur l'eau potable sont des données publiques. En
          général, les points d'eau mesurés correspondent à des ensembles de
          quartiers ou de villes. Plus d'informations sur{" "}
          <a
            href="https://hubeau.eaufrance.fr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hubeau{" "}
          </a>
          . Les données disponibles ici correspondent aux cours d'eau
          environnants ainsi qu'à l'eau potable arrivant dans les robinets. Les
          valeurs suivantes sont des moyennes sur les 5 dernières années.
        </p>
      </div>
      <div className="drawerContent">
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            Eau potable
          </AccordionSummary>
          <AccordionDetails>
            {eauPotable.map((d) => {
              return (
                <p>
                  Paramètre : {d.libelle_parametre}
                  {""}
                  Limite minimum : {d.min}
                  Limite maximum : {d.max}
                  Moyenne des valeurs {d.totalAverage}
                </p>
              );
            })}
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
}
