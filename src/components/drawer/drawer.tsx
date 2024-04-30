import React from "react";
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
        {type === TypeCards.Eau && data?.dataEau && (
          <EAUDrawer data={data.dataEau}></EAUDrawer>
        )}
        {type === TypeCards.CatastropheNaturelle &&
          data?.dataCatastropheNaturelle && (
            <CatnatDrawer data={data.dataCatastropheNaturelle}></CatnatDrawer>
          )}
        {type === TypeCards.InstallationClasse &&
          data?.dataInstallationClassees && (
            <InstallationClasseDrawer
              data={data.dataInstallationClassees}
            ></InstallationClasseDrawer>
          )}
        {type === TypeCards.ParcNaturelle && data?.dataParcNaturelle && (
          <ParcNaturelleDrawer
            data={data.dataParcNaturelle}
          ></ParcNaturelleDrawer>
        )}
        {type === TypeCards.ZoneInnondable && data?.dataZoneInnondable && (
          <ZoneInnondableDrawer
            data={data.dataZoneInnondable}
          ></ZoneInnondableDrawer>
        )}
        {type === TypeCards.ZoneNaturelle && data?.dataZoneNaturelle && (
          <ZoneNaturelleDrawer
            data={data.dataZoneNaturelle}
          ></ZoneNaturelleDrawer>
        )}
        {type === TypeCards.PollutionSol && data?.dataPollutionSol && (
          <PollutionSolDrawer data={data.dataPollutionSol}></PollutionSolDrawer>
        )}{" "}
        {type === TypeCards.RisqueLocaux && data?.dataRisqueLocaux && (
          <DangerNaturelleDrawer
            data={data.dataRisqueLocaux}
          ></DangerNaturelleDrawer>
        )}
        {type === TypeCards.RisqueInforamtion &&
          data?.dataRisqueInformation && (
            <RisqueInformationDrawer
              data={data.dataRisqueInformation}
            ></RisqueInformationDrawer>
          )}
      </div>
    </Drawer>
  );
}
