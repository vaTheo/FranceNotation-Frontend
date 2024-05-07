import React, { useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import { JsonData } from "../../pages/typeResultJson/jsonInterface";
import "../../styles/drawer.scss";
import DPEDrawer from "./dpe/dpeDrawer";
import { TypeCards } from "../../utils/enum";
import EAUDrawer from "./eau/eauDrawer";
import CatnatDrawer from "./catastrophNaurelle/CatNatDrawer";
import InstallationClasseDrawer from "./installationDangereuse/installationDangereus";
import ParcNaturelleDrawer from "./parcsNaturelleDrawer/parcNaturelleDrawer";
import ZoneInnondableDrawer from "./zoneInondableDrawer/zoneInondableDrawer";
import ZoneNaturelleDrawer from "./zoneNaturelleDrawer.tsx/zoneNaturelleDrawer";
import PollutionSolDrawer from "./pollutionSolsDrawer/pollutionSolsDrawer";
import DangerNaturelleDrawer from "./dangerNaturel/dangerNaturel";
import RisqueInformationDrawer from "./risqueInformation/risqueInformation";
import { Button } from "@mui/material";

type props = {
  isOpen: boolean;
  type: TypeCards;
  toggleDrawer: (
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  data?: JsonData;
};

export default function DrawerInfos(prop: props) {
  const { isOpen, toggleDrawer, data, type } = prop;
  const types = Object.keys(TypeCards).filter(
    (k) => isNaN(Number(k)) && k !== "null"
  );
  const [currentTypeIndex, setCurrentTypeIndex] = useState(0);
  const nextCycleType = () => {
    setCurrentTypeIndex((prevIndex) => (prevIndex + 1) % types.length);
  };
  const PreviousCycleType = () => {
    setCurrentTypeIndex((prevIndex) => (prevIndex - 1) % types.length);
  };
  const currentType =
    TypeCards[types[currentTypeIndex] as keyof typeof TypeCards];
  useEffect(() => {
    setCurrentTypeIndex(types.indexOf(type));
  }, [type]);
  return (
    <Drawer anchor="left" open={isOpen} onClose={toggleDrawer(false)}>
      <div className="drawer">
        <div className="drawer-content">
          {currentType === TypeCards.DPE && data?.dataDPEBatiment && (
            <DPEDrawer allDPE={data.dataDPEBatiment}></DPEDrawer>
          )}
          {currentType === TypeCards.Eau && data?.dataEau && (
            <EAUDrawer data={data.dataEau}></EAUDrawer>
          )}
          {currentType === TypeCards.CatastropheNaturelle &&
            data?.dataCatastropheNaturelle && (
              <CatnatDrawer data={data.dataCatastropheNaturelle}></CatnatDrawer>
            )}
          {currentType === TypeCards.InstallationClasse &&
            data?.dataInstallationClassees && (
              <InstallationClasseDrawer
                data={data.dataInstallationClassees}
              ></InstallationClasseDrawer>
            )}
          {currentType === TypeCards.ParcNaturelle &&
            data?.dataParcNaturelle && (
              <ParcNaturelleDrawer
                data={data.dataParcNaturelle}
              ></ParcNaturelleDrawer>
            )}
          {currentType === TypeCards.ZoneInnondable &&
            data?.dataZoneInnondable && (
              <ZoneInnondableDrawer
                data={data.dataZoneInnondable}
              ></ZoneInnondableDrawer>
            )}
          {currentType === TypeCards.ZoneNaturelle &&
            data?.dataZoneNaturelle && (
              <ZoneNaturelleDrawer
                data={data.dataZoneNaturelle}
              ></ZoneNaturelleDrawer>
            )}
          {currentType === TypeCards.PollutionSol && data?.dataPollutionSol && (
            <PollutionSolDrawer
              data={data.dataPollutionSol}
            ></PollutionSolDrawer>
          )}{" "}
          {currentType === TypeCards.RisqueLocaux && data?.dataRisqueLocaux && (
            <DangerNaturelleDrawer
              data={data.dataRisqueLocaux}
            ></DangerNaturelleDrawer>
          )}
          {currentType === TypeCards.RisqueInforamtion &&
            data?.dataRisqueInformation && (
              <RisqueInformationDrawer
                data={data.dataRisqueInformation}
              ></RisqueInformationDrawer>
            )}
        </div>
        <div className="drawer-footer">
          <Button onClick={PreviousCycleType}>Precedent</Button>{" "}
          <Button onClick={nextCycleType}>Suivant</Button>
        </div>
      </div>
    </Drawer>
  );
}
