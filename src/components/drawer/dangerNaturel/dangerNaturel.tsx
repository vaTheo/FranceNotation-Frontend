import { useEffect, useState } from "react";
import { FrontrisqueLocaux } from "../../../pages/typeResultJson/jsonInterface";
import {
  MVTData,
  RadonData,
  ZonageSismiqueData,
} from "../../../pages/typeResultJson/api-georisque";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type prop = {
  data: FrontrisqueLocaux;
};

export default function DangerNaturelleDrawer(p: prop) {
  const { data } = p;
  const [mvt, setMvt] = useState<Array<MVTData>>([]);
  const [sismique, setsismique] = useState<Array<ZonageSismiqueData>>([]);
  const [radon, setRadon] = useState<Array<RadonData>>([]);
  const mapping = () => {
    setMvt(
      data.risqueLocaux.MVTData?.map((d) => {
        return d;
      }) ?? []
    );
    setsismique(
      data.risqueLocaux.ZonageSismiqueData?.map((d) => {
        return d;
      }) ?? []
    );
    setRadon(
      data.risqueLocaux.RadonData?.map((d) => {
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
        <h2>Données complémentaires sur les dangers naturels</h2>
        <p>
          Les données suivantes correspondent aux dangers naturels qui sont
          présents dans la zone concernée.
        </p>
      </div>
      <div className="drawerContent">
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            Zone sismique{" "}
          </AccordionSummary>
          <AccordionDetails>
            {sismique.map((d) => {
              return <p> Indice de sismisité : {d.zone_sismicite} </p>;
            })}
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            Zone radon
          </AccordionSummary>
          <AccordionDetails>
            {radon.map((d) => {
              return <p> Classe de radon de la zone : {d.classe_potentiel} </p>;
            })}
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            Mouvements de terrains recents{" "}
          </AccordionSummary>
          <AccordionDetails>
            {mvt.map((d) => {
              return (
                <p>
                  {" "}
                  Mouvements de terrains recensé date : {d.date_debut}
                  type : {d.type}{" "}
                </p>
              );
            })}
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
}
