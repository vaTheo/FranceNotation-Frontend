import React from "react";
import Drawer from "@mui/material/Drawer";
import { JsonData } from "../../pages/typeResultJson/jsonInterface";
import "../../styles/drawer.scss";
import DPEDrawer from "./dpeDrawer";
import { TypeCards } from "../../utils/enum";

type props = {
  isOpen: boolean;
  type: TypeCards;
  toggleDrawer: (
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  data?: JsonData;
};

export default function SlideInModal(prop: props) {
  const { isOpen, toggleDrawer, data, type } = prop;

  return (
    <Drawer anchor="left" open={isOpen} onClose={toggleDrawer(false)}>
      <div
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
        className="drawer"
      >
        {type === TypeCards.DPE && data?.dataDPEBatiment && (
          <DPEDrawer allDPE={data.dataDPEBatiment}></DPEDrawer>
        )}
      </div>
    </Drawer>
  );
}
