import { useEffect, useState } from "react";
import { FrontrisqueLocaux } from "../../../pages/typeResultJson/jsonInterface";
import {
  MVTData,
  RadonData,
  ZonageSismiqueData,
} from "../../../pages/typeResultJson/api-georisque";
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
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
      <Box mb={2}>
      <Typography variant="titleDrawer" component="p">Données complémentaires sur les dangers naturels</Typography>
      <Typography variant="bodyDrawer" component="p">
          Les données suivantes correspondent aux dangers naturels qui sont
          présents dans la zone concernée.
        </Typography>
      </Box>
      <Box >
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
              return <Typography variant="contentDrawer" component="p"> Indice de sismisité : {d.zone_sismicite} </Typography>;
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
              return <Typography variant="contentDrawer" component="p"> Classe de radon de la zone : {d.classe_potentiel} </Typography>;
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
                <Typography variant="contentDrawer" component="p">
                  {" "}
                  Mouvements de terrains recensé date : {d.date_debut}
                  type : {d.type}{" "}
                </Typography>
              );
            })}
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
}
