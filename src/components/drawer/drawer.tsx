import React, { useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import { JsonData } from "../../pages/typeResultJson/jsonInterface";
// import "../../styles/drawer.scss";
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
import { Box, Button } from "@mui/material";

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
  const [previousType, setPreviousType] = useState<TypeCards>(
    TypeCards.CatastropheNaturelle
  );
  const [nextType, setNextType] = useState<TypeCards>(
    TypeCards.CatastropheNaturelle
  );
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
    setPreviousType(
      TypeCards[types[currentTypeIndex - 1] as keyof typeof TypeCards]
    );
    setNextType(
      TypeCards[types[currentTypeIndex + 1] as keyof typeof TypeCards]
    );
  }, [type]);
  return (
    <Drawer
      anchor="left"
      open={isOpen}
      onClose={toggleDrawer(false)}
      sx={{
        "& .MuiDrawer-paper": {
          width: {
            xs: "90%",
            sm: "60%",
            md: "40%",
          },
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          margin: "1rem 1rem 0rem 1rem",
          overflowY: "clip",
        }}
      >
        <Box
          sx={{
            justifyContent: "space-between",
            overflowY: "auto",
          }}
        >
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
          )}
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
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            marginY: "0.25rem",
            paddingY: "0.25rem",
            borderTop: "1px solid #0F0F0F",
          }}
        >
          <Button
            sx={{ marginRight: "0.5rem" }}
            onClick={PreviousCycleType}
            variant="contained"
          >
            {nextType}
          </Button>
          <Button onClick={nextCycleType} variant="contained">
            {previousType}
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
