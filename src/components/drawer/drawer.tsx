import React, { useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import { JsonData } from "../../pages/typeResultJson/jsonInterface";
import "../../styles/drawer.scss";
import { ResultItemDPE } from "../../pages/typeResultJson/api-DPE";

type props = {
  isOpen: boolean;
  type: string;
  toggleDrawer: (
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  data?: JsonData;
};

export default function SlideInModal(prop: props) {
  const { isOpen, toggleDrawer, data, type } = prop;
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
    let dpeHabitaExistant: Array<ResultItemDPE> = [];
    console.error(type);
    if (type === "getdpebatiment") {
      if (data?.dataDPEBatiment?.DPEBatiment) {
        setDPEHabitatExistant(
          (dpeHabitaExistant =
            data.dataDPEBatiment?.DPEBatiment.DPEHabitatExistant.map((dpe) => {
              return dpe;
            }))
        );
        setDPEHabitatNeuf(
          (dpeHabitaExistant =
            data.dataDPEBatiment?.DPEBatiment.DPEHabitatNeuf.map((dpe) => {
              return dpe;
            }))
        );
        setDPETertiaire(
          (dpeHabitaExistant =
            data.dataDPEBatiment?.DPEBatiment.DPETertiaire.map((dpe) => {
              return dpe;
            }))
        );
        setDPEHabitatExistantAvant2021(
          (dpeHabitaExistant =
            data.dataDPEBatiment?.DPEBatiment.DPEHabitatExistantAvant2021.map(
              (dpe) => {
                return dpe;
              }
            ))
        );
        setDPETertiaireAvant2021(
          (dpeHabitaExistant =
            data.dataDPEBatiment?.DPEBatiment.DPETertiaireAvant2021.map(
              (dpe) => {
                return dpe;
              }
            ))
        );
      }
    }
  };

  useEffect(() => {
    dpeMapping();
  }, [isOpen]);

  return (
    <Drawer anchor="left" open={isOpen} onClose={toggleDrawer(false)}>
      <div
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
        className="drawer"
      >
        <p>Donnée complementaire de </p>
        {type === "getdpebatiment" && <p>Class énergétique du bâtiment</p>}
        <p>
          Les calsses énérgitique des apartements et maison sont des données</p>
          <p> publics, les données avant 2021 ont une fiabilité plus faible du fait </p>
          <p> d'un changement de norme, pour vous permettre d'analyser les données 5 </p>
          <p> categories se presentent à vous
        </p>

        <p>Données après 2021 : </p>
        {DPEHabitatExistant.map((dpe) => {
          return (
            <p>
              Date DPE :{" "}{dpe.Date_établissement_DPE ?? dpe.date_etablissement_dpe}{""}
              Surface : {dpe.Surface_habitable_logement} m² Etiquette DPE :{" "}
              {dpe.Etiquette_DPE}{" "}
              Etiquette GES : {dpe.Etiquette_GES}
            </p>
          );
        })}
        {DPEHabitatNeuf.map((dpe) => {
          return (
            <p>
              Date DPE :{" "}{dpe.Date_établissement_DPE ?? dpe.date_etablissement_dpe}{""}
              Surface : {dpe.Surface_habitable_logement} m² Etiquette DPE :{" "}
              {dpe.Etiquette_DPE}{" "}
              Etiquette GES : {dpe.Etiquette_GES}
            </p>
          );
        })}
        {DPETertiaire.map((dpe) => {
          return (
            <p>
              Date DPE :{" "}{dpe.Date_établissement_DPE ?? dpe.date_etablissement_dpe}{""}
              Surface : {dpe.Surface_habitable_logement} m² Etiquette DPE :{" "}
              {dpe.Etiquette_DPE}{" "}
              Etiquette GES : {dpe.Etiquette_GES}
            </p>
          );
        })}
        <p>Données avant 2021 : </p>

        {DPEHabitatExistantAvant2021.map((dpe) => {
          return (
            <p>
              Date DPE :{" "}{dpe.Date_établissement_DPE ?? dpe.date_etablissement_dpe}{""}
              Surface : {dpe.Surface_habitable_logement} m² Etiquette DPE :{" "}
              {dpe.classe_consommation_energie}{" "}
              Etiquette GES : {dpe.classe_estimation_ges}
            </p>
          );
        })}
        {DPETertiaireAvant2021.map((dpe) => {
          return (
            <p>
              Date DPE :{" "}{dpe.Date_établissement_DPE ?? dpe.date_etablissement_dpe}{""}
              Surface : {dpe.Surface_habitable_logement} m² Etiquette DPE :{" "}
              {dpe.Etiquette_DPE}{" "}
              Etiquette GES : {dpe.Etiquette_GES}
            </p>
          );
        })}
        <p>This is the end your modal content!</p>
      </div>
    </Drawer>
  );
}
