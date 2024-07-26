import { useEffect, useState } from "react";
import {
  FeatureCarto,
  ParcCartoAllData,
} from "../../../pages/typeResultJson/api-cartoParc";
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
  data: ParcCartoAllData;
};

export default function ParcNaturelleDrawer(p: prop) {
  const { data } = p;
  const [rnc, setRnc] = useState<Array<FeatureCarto>>([]);
  const [rnn, setRnn] = useState<Array<FeatureCarto>>([]);
  const [pn, setPn] = useState<Array<FeatureCarto>>([]);
  const [pnr, setPnr] = useState<Array<FeatureCarto>>([]);
  const [rncf, setRncf] = useState<Array<FeatureCarto>>([]);

  const [naturaHabitat, setNaturaHabitat] = useState<Array<FeatureCarto>>([]);
  const [naturaOiseaux, setNaturaOiseaux] = useState<Array<FeatureCarto>>([]);
  const [znieff1, setznieff1] = useState<Array<FeatureCarto>>([]);
  const [znieff2, setznieff2] = useState<Array<FeatureCarto>>([]);

  const mapping = () => {
    setRnc(
      data.rnc?.map((d) => {
        return d;
      }) ?? []
    );
    setRnn(
      data.rnn?.map((d) => {
        return d;
      }) ?? []
    );
    setPn(
      data.pn?.map((d) => {
        return d;
      }) ?? []
    );
    setPnr(
      data.pnr?.map((d) => {
        return d;
      }) ?? []
    );
    setRncf(
      data.rncf?.map((d) => {
        return d;
      }) ?? []
    );
    setNaturaHabitat(
      data.naturaHabitat?.map((d) => {
        return d;
      }) ?? []
    );
    setNaturaOiseaux(
      data.naturaOiseaux?.map((d) => {
        return d;
      }) ?? []
    );
    setznieff1(
      data.znieff1?.map((d) => {
        return d;
      }) ?? []
    );
    setznieff2(
      data.znieff2?.map((d) => {
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
          Données complémentaires sur les parcs naturels
        </Typography>
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
          </Link>{" "}
          et{" "}
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
      <Box>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            Parc Naturelles{" "}
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
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            Zonne Naturelle
          </AccordionSummary>
          <AccordionDetails>
            {naturaHabitat.map((d) => {
              return (
                <Box>
                  <Link
                    href={d.properties?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {d.properties?.nom ?? d.id}
                  </Link>
                  <Typography variant="contentDrawer" component="p">
                    {" "}
                    Superficie : {Math.floor(d.area ?? 0)} m²
                  </Typography>
                </Box>
              );
            })}
            {naturaOiseaux.map((d) => {
              return (
                <Box>
                  <Link
                    href={d.properties?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {d.properties?.nom}
                  </Link>
                  <Typography variant="contentDrawer" component="p">
                    {" "}
                    Superficie : {Math.floor(d.area ?? 0)} m²
                  </Typography>
                </Box>
              );
            })}
            {znieff1.map((d) => {
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
            {znieff2.map((d) => {
              return (
                <Typography variant="contentDrawer" component="p">
                  <Link
                    href={d.properties?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {d.properties?.nom}
                  </Link>
                  {" - "}Superficie : {Math.floor(d.area ?? 0)} m²
                </Typography>
              );
            })}
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
}
