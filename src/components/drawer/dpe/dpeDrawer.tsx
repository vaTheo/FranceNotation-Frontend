import { useEffect, useState } from "react";
import { DPEAllData, ResultItemDPE } from "../../../pages/typeResultJson/api-DPE";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type prop = {
  allDPE: DPEAllData;
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
      allDPE.DPEHabitatExistant?.map((dpe) => {
        return dpe;
      }) ?? []
    );
    setDPEHabitatNeuf(
      allDPE.DPEHabitatNeuf?.map((dpe) => {
        return dpe;
      }) ?? []
    );
    setDPETertiaire(
      allDPE.DPETertiaire?.map((dpe) => {
        return dpe;
      }) ?? []
    );
    setDPEHabitatExistantAvant2021(
      allDPE.DPEHabitatExistantAvant2021?.map((dpe) => {
        return dpe;
      }) ?? []
    );
    setDPETertiaireAvant2021(
      allDPE.DPETertiaireAvant2021?.map((dpe) => {
        return dpe;
      }) ?? []
    );
  };
  useEffect(() => {
    dpeMapping();
  }, [allDPE]);

  return (
    <>
      <Box mb={2}>
        <Typography variant="titleDrawer" component="p">
          Données complémentaires de classe énergétique du bâtiment
        </Typography>
        <Typography variant="bodyDrawer" component="p">
          Les classes énergétiques des appartements et maisons sont des données
          publiques. Les données avant 2021 ont une fiabilité plus faible en
          raison d'un changement de norme. Plus d'info sur{" "}
          <Link
            href="https://www.economie.gouv.fr/particuliers/immobilier-diagnostic-performance-energetique-dpe"
            target="_blank"
            rel="noopener noreferrer"
          >
            le site du gouvernement
          </Link>
        </Typography>
      </Box>
      <Box>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            DPE post 2021 batiment existant
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer>
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>Date DPE</TableCell>
                    <TableCell>DPE</TableCell>
                    <TableCell>GES</TableCell>
                    <TableCell>Surface</TableCell>
                    <TableCell>N° DPE</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {DPEHabitatExistant.map((dpe) => (
                    <TableRow
                      key={
                        dpe.Date_établissement_DPE ?? dpe.date_etablissement_dpe
                      }
                      // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {dpe.Date_établissement_DPE ??
                          dpe.date_etablissement_dpe}
                      </TableCell>
                      <TableCell>{dpe.Etiquette_DPE}</TableCell>
                      <TableCell>{dpe.Etiquette_GES}</TableCell>
                      <TableCell>{dpe.Surface_habitable_logement} m²</TableCell>
                      <TableCell>{dpe["N°DPE"]}</TableCell>
                    </TableRow>
                  ))}
                  {DPETertiaire.map((dpe) => (
                    <TableRow
                      key={
                        dpe.Date_établissement_DPE ?? dpe.date_etablissement_dpe
                      }
                    >
                      <TableCell component="th" scope="row">
                        {dpe.Date_établissement_DPE ??
                          dpe.date_etablissement_dpe}
                      </TableCell>
                      <TableCell>{dpe.Etiquette_DPE}</TableCell>
                      <TableCell>{dpe.Etiquette_GES}</TableCell>
                      <TableCell>{dpe.Surface_habitable_logement} m²</TableCell>
                      <TableCell>{dpe["N°DPE"]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
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
            <TableContainer>
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>Date DPE</TableCell>
                    <TableCell>DPE</TableCell>
                    <TableCell>GES</TableCell>
                    <TableCell>Surface</TableCell>
                    <TableCell>N° DPE</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {DPEHabitatNeuf.map((dpe) => (
                    <TableRow
                      key={
                        dpe.Date_établissement_DPE ?? dpe.date_etablissement_dpe
                      }
                      // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {dpe.Date_établissement_DPE ??
                          dpe.date_etablissement_dpe}
                      </TableCell>
                      <TableCell>{dpe.Etiquette_DPE}</TableCell>
                      <TableCell align="center">{dpe.Etiquette_GES}</TableCell>
                      <TableCell align="center">
                        {dpe.Surface_habitable_logement} m²
                      </TableCell>
                      <TableCell>{dpe["N°DPE"]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
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
            <TableContainer>
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>Date DPE</TableCell>
                    <TableCell>DPE</TableCell>
                    <TableCell>GES</TableCell>
                    <TableCell>Surface</TableCell>
                    <TableCell>N° DPE</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {DPEHabitatExistantAvant2021.map((dpe) => (
                    <TableRow
                      key={
                        dpe.Date_établissement_DPE ?? dpe.date_etablissement_dpe
                      }
                      // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {dpe.Date_établissement_DPE ??
                          dpe.date_etablissement_dpe}
                      </TableCell>
                      <TableCell>{dpe.Etiquette_DPE}</TableCell>
                      <TableCell>{dpe.Etiquette_GES}</TableCell>
                      <TableCell>{dpe.Surface_habitable_logement} m²</TableCell>
                      <TableCell>{dpe["N°DPE"]}</TableCell>
                    </TableRow>
                  ))}
                  {DPETertiaireAvant2021.map((dpe) => (
                    <TableRow
                      key={
                        dpe.Date_établissement_DPE ?? dpe.date_etablissement_dpe
                      }
                      // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {dpe.Date_établissement_DPE ??
                          dpe.date_etablissement_dpe}
                      </TableCell>
                      <TableCell>
                        {dpe.classe_consommation_energie ?? "NULL"}
                      </TableCell>
                      <TableCell>
                        {dpe.classe_estimation_ges ?? "NULL"}
                      </TableCell>
                      <TableCell>{dpe.Surface_habitable_logement} m²</TableCell>
                      <TableCell>{dpe["N°DPE"]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
}
