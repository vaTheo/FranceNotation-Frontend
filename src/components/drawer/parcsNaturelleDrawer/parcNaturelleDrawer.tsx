import { useEffect, useState } from "react";
import { FrontParcNaturelle } from "../../../pages/typeResultJson/jsonInterface";
import { FeatureCarto } from "../../../pages/typeResultJson/api-cartoParc";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
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
      <div className="drawerHeader">
        <h2>Données complémentaires sur les parcs naturels</h2>
        <p>
          Les données suivantes répertorient les parcs et réserves naturelles se
          trouvant dans un rayon de 10 km de l'adresse sélectionnée. Plus
          d'informations sur les
          <a
            href="https://reserves-naturelles.org/fonctionnement-reserves-naturelles-france/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Réserves Naturelles de France
          </a>
          et
          <a
            href="https://geoconfluences.ens-lyon.fr/glossaire/parcs-nationaux-et-parcs-naturels-regionaux-pnr"
            target="_blank"
            rel="noopener noreferrer"
          >
            les Parcs
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
            Réserves Naturelles Nationales (RNN){" "}
          </AccordionSummary>
          <AccordionDetails>
            {rnn.map((d) => {
              return (
                <p>
                  <a href={d.properties?.url}>
                    {d.properties?.nom} target="_blank" rel="noopener
                    noreferrer"
                  </a>
                  {" - "} Superficie : {Math.floor(d.area ?? 0)} m²
                </p>
              );
            })}
            {rnc.map((d) => {
              return (
                <p>
                  <a href={d.properties?.url}>
                    {d.properties?.nom} target="_blank" rel="noopener
                    noreferrer"
                  </a>
                  {" - "} Superficie : {Math.floor(d.area ?? 0)} m²
                </p>
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
                <p>
                  <a href={d.properties?.url}>
                    {d.properties?.nom} target="_blank" rel="noopener
                    noreferrer"
                  </a>
                  {" - "} Superficie : {Math.floor(d.area ?? 0)} m²
                </p>
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
                <p>
                  <a
                    href={d.properties?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {d.properties?.nom} t
                  </a>
                  {" - "}Superficie : {Math.floor(d.area ?? 0)} m²
                </p>
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
                <p>
                  <a
                    href={d.properties?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {d.properties?.nom}
                  </a>
                  {" - "} Superficie : {Math.floor(d.area ?? 0)} m²
                </p>
              );
            })}
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
}
