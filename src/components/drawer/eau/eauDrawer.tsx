import { useEffect, useState } from "react";
import {
  eauAllData,
  EauPotableData,
} from "../../../pages/typeResultJson/api-eau";
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
  data: eauAllData;
};
export default function EAUDrawer(p: prop) {
  const { data } = p;
  // const [courEau, setcourEau] = useState<Array<CoursEauData>>([]);
  const [eauPotable, setEauPotable] = useState<Array<EauPotableData>>([]);

  useEffect(() => {
    const mapping = () => {
      // setcourEau(
      //   (data.coursEau ?? []).map((d) => {
      //     return d;
      //   })
      // );
      setEauPotable(
        (data.eauPotable ?? []).map((d) => {
          return d;
        })
      );
    };
    mapping();
  }, [data]);

  return (
    <>
      <Box mb={2}>
        <Typography variant="titleDrawer" component="p">
          Données complémentaires sur la qualité de l'eau potable
        </Typography>
        <Typography variant="bodyDrawer" component="p">
          Les informations sur l'eau potable sont des données publiques. En
          général, les points d'eau mesurés correspondent à des ensembles de
          quartiers ou de villes. Plus d'informations sur{" "}
          <Link
            href="https://hubeau.eaufrance.fr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hubeau
          </Link>
          . Les données disponibles ici correspondent à l'eau potable arrivant
          dans les robinets. Les valeurs suivantes sont des moyennes sur les 10
          dernières années. Pour comprendre les valeurs affichées suivre ce lien{" "}
          <Link
            href="https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000465574/2020-10-22/"
            target="_blank"
            rel="noopener noreferrer"
          >
            suivre ce lien
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
            Eau potable
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer>
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>Paramètre</TableCell>
                    <TableCell>min</TableCell>
                    <TableCell>max</TableCell>
                    <TableCell align="right">Moyenne total</TableCell>
                    <TableCell align="right">Unité</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {eauPotable.map((eau) => (
                    <TableRow key={eau.name}>
                      <TableCell component="th" scope="row">
                        {eau.name}
                      </TableCell>
                      <TableCell>{eau.min === 0 ? "/" : eau.min}</TableCell>
                      <TableCell>{eau.max}</TableCell>
                      <TableCell
                        style={{
                          color: eau.good ? "green" : "red",
                        }}
                        align="right"
                      >
                        {eau.totalAverage.toFixed(2)}
                      </TableCell>
                      <TableCell align="right">{eau.unite}</TableCell>
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
