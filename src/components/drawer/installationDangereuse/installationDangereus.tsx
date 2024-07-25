import { useEffect, useState } from "react";
import { InstallationsClasseesData } from "../../../pages/typeResultJson/api-georisque";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Link,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FileDownloadSharpIcon from '@mui/icons-material/FileDownloadSharp';
type prop = {
  data: InstallationsClasseesData[];
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
      data?.filter(
        (d) => d.statutSeveso === "Non Seveso"
      ) || []
    );
    setInstallationsClassesSeveso(
      data?.filter(
        (d) =>
          d?.statutSeveso !== "Non Seveso" &&
          d.statutSeveso !== "" &&
          d.statutSeveso
      ) || []
    );
    setInstallationsClassesNoStatus(
      data?.filter(
        (d) => !d.statutSeveso || d.statutSeveso === ""
      ) || []
    );
  };
  useEffect(() => {
    mapping();
  }, [data]);

  return (
    <>
      <Box mb={2}>
        <Typography variant="titleDrawer" component="p">
          Données complémentaires sur les installations classées
        </Typography>
        <Typography variant="bodyDrawer" component="p">
          Les données suivantes répertorient les installations classées dans un
          rayon de 2 km autour de l'adresse. Cela correspond aux installations
          classées{" "}
          <Link
            href="https://entreprendre.service-public.fr/vosdroits/F33414"
            target="_blank"
            rel="noopener noreferrer"
          >
            ICPE
          </Link>{" "}
          et{" "}
          <Link
            href="https://www.ecologie.gouv.fr/iota"
            target="_blank"
            rel="noopener noreferrer"
          >
            IOTA
          </Link>
          .
          <Typography variant="contentDrawer" component="p">
            Les données sont classées de la plus proche à la plus éloignée de
            l'adresse recherchée.
          </Typography>
        </Typography>
      </Box>
      <Box className="drawerContent">
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
              <Typography variant="contentDrawer" component="p">
                Aucune installation classée SEVESO n'a été trouvée à proximité
                de cette adresse.
              </Typography>
            ) : (
              installationsClassesSeveso?.map((d) => {
                return (
                  <Box>
                    <Typography
                      variant="contentDrawer"
                      component="p"
                      sx={{ display: "inline-flex", alignItems: "center" }}
                    >
                      {d.raisonSociale} {"  "}
                      {d.statutSeveso}
                      {d?.inspections[0]?.fichierInspection?.urlFichier && (
                        <Link
                          href={
                            d?.inspections[0]?.fichierInspection?.urlFichier
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            marginLeft: "4px",
                          }}
                        >
                          <FileDownloadSharpIcon />
                        </Link>
                      )}
                      {d?.documentsHorsInspection[0]?.urlFichier && (
                        <Link
                          href={d?.documentsHorsInspection[0]?.urlFichier}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            marginLeft: "4px",
                          }}
                        >
                          <FileDownloadSharpIcon />
                        </Link>
                      )}
                    </Typography>
                  </Box>
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
              <Typography variant="contentDrawer" component="p">
                Aucune installation classée Non seveso n'a été trouvée à
                proximité de cette adresse.
              </Typography>
            ) : (
              installationsClassesNonSeveso?.map((d) => {
                return (
                  <Box>
                    <Typography
                      variant="contentDrawer"
                      component="p"
                      sx={{ display: "inline-flex", alignItems: "center" }}
                    >
                      {d.raisonSociale} {"  "}
                      {d?.inspections[0]?.fichierInspection?.urlFichier && (
                        <Link
                          href={
                            d?.inspections[0]?.fichierInspection?.urlFichier
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            marginLeft: "4px",
                          }}
                        >
                          <FileDownloadSharpIcon />
                        </Link>
                      )}
                      {d?.documentsHorsInspection[0]?.urlFichier && (
                        <Link
                          href={d?.documentsHorsInspection[0]?.urlFichier}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            marginLeft: "4px",
                          }}
                        >
                          <FileDownloadSharpIcon />
                        </Link>
                      )}
                    </Typography>
                  </Box>
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
              <Typography variant="contentDrawer" component="p">
                Aucune installation classée n'a été trouvée à proximité de cette
                adresse.
              </Typography>
            ) : (
              installationsClassesNoStatus?.map((d) => {
                return (
                  <Box>
                    <Typography
                      variant="contentDrawer"
                      component="p"
                      sx={{ display: "inline-flex", alignItems: "center" }}
                    >
                      {d.raisonSociale} {"  "}
                      {d.statutSeveso}
                      {d?.inspections[0]?.fichierInspection?.urlFichier && (
                        <Link
                          href={
                            d?.inspections[0]?.fichierInspection?.urlFichier
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            marginLeft: "4px",
                          }}
                        >
                          <FileDownloadSharpIcon />
                        </Link>
                      )}
                      {d?.documentsHorsInspection[0]?.urlFichier && (
                        <Link
                          href={d?.documentsHorsInspection[0]?.urlFichier}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            marginLeft: "4px",
                          }}
                        >
                          <FileDownloadSharpIcon />
                        </Link>
                      )}
                    </Typography>
                  </Box>
                );
              })
            )}
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
}
