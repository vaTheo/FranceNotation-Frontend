import React from "react";
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
  if (!data) {
    //No data has been received yet
    return <></>;
  }
  let dpeHabitaExistant: Array<ResultItemDPE> = [];
  if (type === "DPEBatiment") {
    if (data.dataDPEBatiment?.DPEBatiment) {
      dpeHabitaExistant =
        data.dataDPEBatiment?.DPEBatiment.DPEHabitatNeuf.map((dpe) => {
          return dpe;
        });
    }
  }

  return (
    <Drawer anchor="left" open={isOpen} onClose={toggleDrawer(false)}>
      <div
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
        className="drawer"
      >
        <p>Donnée complementaire de {type}</p>
        {type}
        <p>This is your modal content!</p>
        {dpeHabitaExistant.map((dpe) => {
          return (
            <p>Addresse : {dpe.Adresse_brute}
            Etiquette DPE : {dpe.Adresse_brute}
            </p>

            );
        })}
      </div>
    </Drawer>
  );
}
