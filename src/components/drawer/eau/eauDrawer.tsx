import { useEffect, useState } from "react";
import { FrontEau } from "../../../pages/typeResultJson/jsonInterface";
import {
  CoursEauData,
  EauPotableData,
} from "../../../pages/typeResultJson/api-eau";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type prop = {
  data: FrontEau;
};
export default function EAUDrawer(p: prop) {
  const { data } = p;
  const [courEau, setcourEau] = useState<Array<CoursEauData>>([]);
  const [eauPotable, setEauPotable] = useState<Array<EauPotableData>>([]);
  const mapping = () => {
    setcourEau(
      (data.eau.coursEau ?? []).map((d) => {
        return d;
      })
    );
    setEauPotable(
      (data.eau.eauPotable ?? []).map((d) => {
        return d;
      })
    );
  };
  useEffect(() => {
    mapping();
  }, [data]);

  return (
    <>
      <div className="drawerHeader">
        <h2>Données complémentaires sur la qualité de l'eau potable</h2>
        <p>
          Les informations sur l'eau potable sont des données publiques. En
          général, les points d'eau mesurés correspondent à des ensembles de
          quartiers ou de villes. Plus d'informations sur{" "}
          <a
            href="https://hubeau.eaufrance.fr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hubeau
          </a>
          . Les données disponibles ici correspondent à l'eau potable arrivant
          dans les robinets. Les valeurs suivantes sont des moyennes sur les 10
          dernières années. Pour comprendre les valeurs affichées suivre ce lien{" "}
          <a
            href="https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000465574/2020-10-22/"
            target="_blank"
            rel="noopener noreferrer"
          >
            suivre ce lien
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
      </div>
    </>
  );
}
