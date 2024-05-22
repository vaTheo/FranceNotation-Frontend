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
        (d) => d?.statutSeveso !== "Non Seveso"
      ) || []
    );
    setInstallationsClassesNoStatus(
      data?.InstallationClassees.filter((d) => !d.statutSeveso || d.statutSeveso =="") || []
    );
  };
  useEffect(() => {
    mapping();
  }, [data]);

  return (
    <>
      <h2>Donnée complementaire sur les installations classés</h2>
      <h3>
        Les données suivantes repertorie les installations classés dans un rayon
        de 5km de l'adresse, comrpenant des installations SEVSO ou non. Les
        installtions classées SEVESO sont affiché en orange
      </h3>
      <p> </p>

      <Accordion style={{ width: "100%" }}>
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
              Aucune installation classée SEVESO n'a été trouvée à proximité de cette
              adresse.
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
                        href={d?.inspections[0]?.fichierInspection?.urlFichier}
                      >
                        [""]
                      </a>
                    )}
                    {d?.documentsHorsInspection[0]?.urlFichier && (
                      <a href={d?.documentsHorsInspection[0]?.urlFichier}>
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
      <Accordion style={{ width: "100%" }}>
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
              Aucune installation classée Non seveso n'a été trouvée à proximité de cette
              adresse.
            </p>
          ) : (
            installationsClassesNonSeveso?.map((d) => {
              return (
                <div>
                  <p>
                    {d.raisonSociale} {"  "}
                    {d.statutSeveso}
                    {d?.inspections[0]?.fichierInspection?.urlFichier && (
                      <a
                        href={d?.inspections[0]?.fichierInspection?.urlFichier}
                      >
                        [""]
                      </a>
                    )}
                    {d?.documentsHorsInspection[0]?.urlFichier && (
                      <a href={d?.documentsHorsInspection[0]?.urlFichier}>
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
      <Accordion style={{ width: "100%" }}>
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
                        href={d?.inspections[0]?.fichierInspection?.urlFichier}
                      >
                        [""]
                      </a>
                    )}
                    {d?.documentsHorsInspection[0]?.urlFichier && (
                      <a href={d?.documentsHorsInspection[0]?.urlFichier}>
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
    </>
  );
}
