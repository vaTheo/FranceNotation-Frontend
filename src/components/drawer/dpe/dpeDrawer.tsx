import { useEffect, useState } from "react";
import { ResultItemDPE } from "../../../pages/typeResultJson/api-DPE";
import { FrontDPEBatiment } from "../../../pages/typeResultJson/jsonInterface";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type prop = {
  allDPE: FrontDPEBatiment;
};
export default function DPEDrawer(p: prop) {
  const { allDPE } = p;

  const [DPEHabitatExistant, setDPEHabitatExistant] = useState<
    Array<ResultItemDPE>
  >([]);
  const [DPEHabitatNeuf, setDPEHabitatNeuf] = useState<Array<ResultItemDPE>>(
    []
  );
  const [DPETertiaire, setDPETertiaire] = useState<Array<ResultItemDPE>>([]);
  const [DPEHabitatExistantAvant2021, setDPEHabitatExistantAvant2021] =
    useState<Array<ResultItemDPE>>([]);
  const [DPETertiaireAvant2021, setDPETertiaireAvant2021] = useState<
    Array<ResultItemDPE>
  >([]);

  const dpeMapping = () => {
    setDPEHabitatExistant(
      allDPE.DPEBatiment.DPEHabitatExistant.map((dpe) => {
        return dpe;
      })
    );
    setDPEHabitatNeuf(
      allDPE.DPEBatiment.DPEHabitatNeuf.map((dpe) => {
        return dpe;
      })
    );
    setDPETertiaire(
      allDPE.DPEBatiment.DPETertiaire.map((dpe) => {
        return dpe;
      })
    );
    setDPEHabitatExistantAvant2021(
      allDPE.DPEBatiment.DPEHabitatExistantAvant2021.map((dpe) => {
        return dpe;
      })
    );
    setDPETertiaireAvant2021(
      allDPE.DPEBatiment.DPETertiaireAvant2021.map((dpe) => {
        return dpe;
      })
    );
  };
  useEffect(() => {
    dpeMapping();
  }, [allDPE]);

  return (
    <>
      <div className="drawerHeader">
        <h2>Données complémentaires de classe énergétique du bâtiment</h2>
        <p>
          Les classes énergétiques des appartements et maisons sont des données
          publiques. Les données avant 2021 ont une fiabilité plus faible en
          raison d'un changement de norme. Pour vous permettre d'analyser les
          données, 5 catégories se présentent à vous.
        </p>
      </div>
      <div className="drawerContent">
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            DPE post 2021 batiment existant
          </AccordionSummary>
          <AccordionDetails>
            {DPEHabitatExistant.map((dpe) => {
              return (
                <p>
                  Date DPE :{" "}
                  {dpe.Date_établissement_DPE ?? dpe.date_etablissement_dpe}
                  {""}
                  Surface : {Math.floor(dpe.Surface_habitable_logement)} m²
                  Etiquette DPE : {dpe.Etiquette_DPE} Etiquette GES :{" "}
                  {dpe.Etiquette_GES}
                </p>
              );
            })}
            {DPETertiaire.map((dpe) => {
              return (
                <p>
                  Date DPE :{" "}
                  {dpe.Date_établissement_DPE ?? dpe.date_etablissement_dpe}
                  {""}
                  Surface : {Math.floor(dpe.Surface_habitable_logement)} m²
                  Etiquette DPE : {dpe.Etiquette_DPE} Etiquette GES :{" "}
                  {dpe.Etiquette_GES}
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
            DPE post 2021 batiment neuf
          </AccordionSummary>
          <AccordionDetails>
            {DPEHabitatNeuf.map((dpe) => {
              return (
                <p>
                  Date DPE :{" "}
                  {dpe.Date_établissement_DPE ?? dpe.date_etablissement_dpe}
                  {""}
                  Surface : {Math.floor(dpe.Surface_habitable_logement)} m²
                  Etiquette DPE : {dpe.Etiquette_DPE} Etiquette GES :{" "}
                  {dpe.Etiquette_GES}
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
            DPE prè 2021
          </AccordionSummary>
          <AccordionDetails>
            {DPEHabitatExistantAvant2021.map((dpe) => {
              return (
                <p>
                  Date DPE :{" "}
                  {dpe.Date_établissement_DPE ?? dpe.date_etablissement_dpe}
                  {""}
                  Surface : {Math.floor(dpe.Surface_habitable_logement)} m²
                  Etiquette DPE : {dpe.classe_consommation_energie} Etiquette
                  GES : {dpe.classe_estimation_ges}
                </p>
              );
            })}
            {DPETertiaireAvant2021.map((dpe) => {
              return (
                <p>
                  Date DPE :{" "}
                  {dpe.Date_établissement_DPE ?? dpe.date_etablissement_dpe}
                  {""}
                  Surface : {Math.floor(dpe.Surface_habitable_logement)} m²
                  Etiquette DPE : {dpe.Etiquette_DPE} Etiquette GES :{" "}
                  {dpe.Etiquette_GES}
                </p>
              );
            })}
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
}
