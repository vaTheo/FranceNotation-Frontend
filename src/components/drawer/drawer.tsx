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
  const [dpe, setDpe] = useState<Array<ResultItemDPE>>([]);
  const [num, setNum] = useState<number>(0);
  

  const testFunction = () => {
    let dpeHabitaExistant: Array<ResultItemDPE> = [];
    console.error(type );
    if (type === "getdpebatiment") {
      if (data?.dataDPEBatiment?.DPEBatiment) {
        setDpe(
          (dpeHabitaExistant =
            data.dataDPEBatiment?.DPEBatiment.DPEHabitatExistant.map((dpe) => {
              return dpe;
            }))
        );
      }
    }
  };

  useEffect(() => {
    testFunction();
    
  }, [isOpen]);

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
        {dpe.map((dpe) => {
          return (
            <h1>
              Addresse : {dpe._geopoint}
              Etiquette DPE : {dpe.Etiquette_DPE}
              Etiquette GES : {dpe.Etiquette_GES}
            </h1>
          );
        })}
        <p>This is the end your modal content!</p>
      </div>
    </Drawer>
  );
}
