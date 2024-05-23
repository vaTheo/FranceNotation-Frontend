import { useEffect, useState } from "react";
import { FrontInstallationClassees } from "../../../pages/typeResultJson/jsonInterface";
import { InstallationsClasseesData } from "../../../pages/typeResultJson/api-georisque";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type prop = {
  data: FrontInstallationClassees;
};

export default function InstallationClasseDrawer(p: prop) {
  const { data } = p;
  const [installationsClassesSeveso, setInstallationsClassesSeveso] = useState<
    Array<InstallationsClasseesData>
  >([]);
  const [installationsClassesNonSeveso, setInstallationsClassesNonSeveso] =
    useState<Array<InstallationsClasseesData>>([]);
  const [installationsClassesNoStatus, setInstallationsClassesNoStatus] =
    useState<Array<InstallationsClasseesData>>([]);

  const mapping = () => {
    setInstallationsClassesNonSeveso(
      data?.InstallationClassees.filter(
        (d) => d.statutSeveso === "Non Seveso"
      ) || []
    );
    setInstallationsClassesSeveso(
      data?.InstallationClassees.filter(
        (d) =>
          d?.statutSeveso !== "Non Seveso" &&
          d.statutSeveso !== "" &&
          d.statutSeveso
      ) || []
    );
    setInstallationsClassesNoStatus(
      data?.InstallationClassees.filter(
        (d) => !d.statutSeveso || d.statutSeveso == ""
      ) || []
    );
  };
  useEffect(() => {
    mapping();
  }, [data]);

  return (
    <>
      <div className="drawerHeader">
        Voici le texte corrigé avec les balises HTML : html Copy code
        <h2>Données complémentaires sur les installations classées</h2>
        <p>
          Les données suivantes répertorient les installations classées dans un
          rayon de 2 km autour de l'adresse. Cela correspond aux installations
          classées
          <a
            href="https://entreprendre.service-public.fr/vosdroits/F33414"
            target="_blank"
            rel="noopener noreferrer"
          >
            ICPE
          </a>
          et
          <a
            href="https://www.ecologie.gouv.fr/iota"
            target="_blank"
            rel="noopener noreferrer"
          >
            IOTA
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
            Seveso
          </AccordionSummary>
          <AccordionDetails>
            {installationsClassesSeveso.length === 0 ? (
              <p>
                Aucune installation classée SEVESO n'a été trouvée à proximité
                de cette adresse.
              </p>
            ) : (
              installationsClassesSeveso?.map((d) => {
                return (
                  <div>
                    <p>
                      {d.raisonSociale} {"  "}
                      {d.statutSeveso}
                      {d?.inspections[0]?.fichierInspection?.urlFichier && (
                        <a
                          href={
                            d?.inspections[0]?.fichierInspection?.urlFichier
                          }
                        >
                          [ " ]
                        </a>
                      )}
                      {d?.documentsHorsInspection[0]?.urlFichier && (
                        <a
                          href={d?.documentsHorsInspection[0]?.urlFichier}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          [ " ]
                        </a>
                      )}
                    </p>
                  </div>
                );
              })
            )}
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            Non Seveso
          </AccordionSummary>
          <AccordionDetails>
            {installationsClassesNonSeveso.length === 0 ? (
              <p>
                Aucune installation classée Non seveso n'a été trouvée à
                proximité de cette adresse.
              </p>
            ) : (
              installationsClassesNonSeveso?.map((d) => {
                return (
                  <div>
                    <p>
                      {d.raisonSociale} {"  "}
                      {d?.inspections[0]?.fichierInspection?.urlFichier && (
                        <a
                          href={
                            d?.inspections[0]?.fichierInspection?.urlFichier
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          [""]
                        </a>
                      )}
                      {d?.documentsHorsInspection[0]?.urlFichier && (
                        <a
                          href={d?.documentsHorsInspection[0]?.urlFichier}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          [""]
                        </a>
                      )}
                    </p>
                  </div>
                );
              })
            )}
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            Pas de status connu
          </AccordionSummary>
          <AccordionDetails>
            {installationsClassesNoStatus.length === 0 ? (
              <p>
                Aucune installation classée n'a été trouvée à proximité de cette
                adresse.
              </p>
            ) : (
              installationsClassesNoStatus?.map((d) => {
                return (
                  <div>
                    <p>
                      {d.raisonSociale} {"  "}
                      {d.statutSeveso}
                      {d?.inspections[0]?.fichierInspection?.urlFichier && (
                        <a
                          href={
                            d?.inspections[0]?.fichierInspection?.urlFichier
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          [""]
                        </a>
                      )}
                      {d?.documentsHorsInspection[0]?.urlFichier && (
                        <a
                          href={d?.documentsHorsInspection[0]?.urlFichier}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          [""]
                        </a>
                      )}
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
