import { useEffect, useState } from "react";
import { FrontzoneNaturelle } from "../../../pages/typeResultJson/jsonInterface";
import { FeatureCarto } from "../../../pages/typeResultJson/api-cartoParc";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Link,
  Typography,
} from "@mui/material";

type prop = {
  data: FrontzoneNaturelle;
};

export default function ZoneNaturelleDrawer(p: prop) {
  const { data } = p;
  const [naturaHabitat, setNaturaHabitat] = useState<Array<FeatureCarto>>([]);
  const [naturaOiseaux, setNaturaOiseaux] = useState<Array<FeatureCarto>>([]);
  const [znieff1, setznieff1] = useState<Array<FeatureCarto>>([]);
  const [znieff2, setznieff2] = useState<Array<FeatureCarto>>([]);

  const mapping = () => {
    setNaturaHabitat(
      data.zoneNaturelle.naturaHabitat?.map((d) => {
        return d;
      }) ?? []
    );
    setNaturaOiseaux(
      data.zoneNaturelle.naturaOiseaux?.map((d) => {
        return d;
      }) ?? []
    );
    setznieff1(
      data.zoneNaturelle.znieff1?.map((d) => {
        return d;
      }) ?? []
    );
    setznieff2(
      data.zoneNaturelle.znieff2?.map((d) => {
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
          Données complémentaires sur les zones naturelles
        </Typography>
        <Typography variant="bodyDrawer" component="p">
          Les zones naturelles sont des zones où de la faune et de la flore
          intéressantes sont connues. Ces zones n'ont cependant pas vraiment
          d'impact sur l'urbanisme. Cela comprend les zones reconnues à
          l'échelle européenne{" "}
          <Link
            href="https://www.natura2000.fr/natura-2000/qu-est-ce-que-natura-2000"
            target="_blank"
            rel="noopener noreferrer"
          >
            Natura 2000
          </Link>{" "}
          <Link
            href="https://fr.wikipedia.org/wiki/Zone_naturelle_d%27int%C3%A9r%C3%AAt_%C3%A9cologique,_faunistique_et_floristique"
            target="_blank"
            rel="noopener noreferrer"
          >
            et française
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
            Zone Natura 2000
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
                  <Typography variant="contentDrawer" component="p"> Superficie : {Math.floor(d.area ?? 0)} m²</Typography>
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
                  <Typography variant="contentDrawer" component="p"> Superficie : {Math.floor(d.area ?? 0)} m²</Typography>
                </Box>
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
            Zone naturelle d'intérêt écologique, faunistique et floristique
          </AccordionSummary>
          <AccordionDetails>
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
