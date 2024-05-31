import { useEffect, useState } from "react";
import { FrontParcNaturelle } from "../../../pages/typeResultJson/jsonInterface";
import { FeatureCarto } from "../../../pages/typeResultJson/api-cartoParc";
import { Accordion, AccordionDetails, AccordionSummary, Box, Link, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type prop = {
  data: FrontParcNaturelle;
};

export default function ParcNaturelleDrawer(p: prop) {
  const { data } = p;
  const [rnc, setRnc] = useState<Array<FeatureCarto>>([]);
  const [rnn, setRnn] = useState<Array<FeatureCarto>>([]);
  const [pn, setPn] = useState<Array<FeatureCarto>>([]);
  const [pnr, setPnr] = useState<Array<FeatureCarto>>([]);
  const [rncf, setRncf] = useState<Array<FeatureCarto>>([]);
  const mapping = () => {
    setRnc(
      data.parcNaturelle.rnc?.map((d) => {
        return d;
      }) ?? []
    );
    setRnn(
      data.parcNaturelle.rnn?.map((d) => {
        return d;
      }) ?? []
    );
    setPn(
      data.parcNaturelle.pn?.map((d) => {
        return d;
      }) ?? []
    );
    setPnr(
      data.parcNaturelle.pnr?.map((d) => {
        return d;
      }) ?? []
    );
    setRncf(
      data.parcNaturelle.rncf?.map((d) => {
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
      <Typography variant="titleDrawer" component="p">Données complémentaires sur les parcs naturels</Typography>
      <Typography variant="bodyDrawer" component="p">
          Les données suivantes répertorient les parcs et réserves naturelles se
          trouvant dans un rayon de 10 km de l'adresse sélectionnée. Plus
          d'informations sur les{" "}
          <Link
            href="https://reserves-naturelles.org/fonctionnement-reserves-naturelles-france/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Réserves Naturelles de France
          </Link>
          {" "}et{" "}
          <Link
            href="https://geoconfluences.ens-lyon.fr/glossaire/parcs-nationaux-et-parcs-naturels-regionaux-pnr"
            target="_blank"
            rel="noopener noreferrer"
          >
            les Parcs
          </Link>
          .
        </Typography>
      </Box>
      <Box >
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            Réserves Naturelles Nationales (RNN){" "}
          </AccordionSummary>
          <AccordionDetails>
            {rnn.map((d) => {
              return (
                <Typography variant="contentDrawer" component="p">
                  <a href={d.properties?.url}>
                    {d.properties?.nom} target="_blank" rel="noopener
                    noreferrer"
                  </a>
                  {" - "} Superficie : {Math.floor(d.area ?? 0)} m²
                </Typography>
              );
            })}
            {rnc.map((d) => {
              return (
                <Typography variant="contentDrawer" component="p">
                  <a href={d.properties?.url}>
                    {d.properties?.nom} target="_blank" rel="noopener
                    noreferrer"
                  </a>
                  {" - "} Superficie : {Math.floor(d.area ?? 0)} m²
                </Typography>
              );
            })}
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            Reserve Naturelle Regional (RNR)
          </AccordionSummary>
          <AccordionDetails>
            {rncf.map((d) => {
              return (
                <Typography variant="contentDrawer" component="p">
                  <a href={d.properties?.url}>
                    {d.properties?.nom} target="_blank" rel="noopener
                    noreferrer"
                  </a>
                  {" - "} Superficie : {Math.floor(d.area ?? 0)} m²
                </Typography>
              );
            })}
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            Parc National (PN)
          </AccordionSummary>
          <AccordionDetails>
            {pn.map((d) => {
              return (
                <Typography variant="contentDrawer" component="p">
                  <a
                    href={d.properties?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {d.properties?.nom} t
                  </a>
                  {" - "}Superficie : {Math.floor(d.area ?? 0)} m²
                </Typography>
              );
            })}
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            Parc Naturelle Regional (PNR)
          </AccordionSummary>
          <AccordionDetails>
            {pnr.map((d) => {
              return (
                <Typography variant="contentDrawer" component="p">
                  <Link
                    href={d.properties?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {d.properties?.nom}
                  </Link>
                  {" - "} Superficie : {Math.floor(d.area ?? 0)} m²
                </Typography>
              );
            })}
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
}
