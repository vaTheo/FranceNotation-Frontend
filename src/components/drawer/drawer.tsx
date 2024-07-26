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
import PollutionSolDrawer from "./pollutionSolsDrawer/pollutionSolsDrawer";
import DangerNaturelleDrawer from "./dangerNaturel/dangerNaturel";
import RisqueInformationDrawer from "./risqueInformation/risqueInformation";
import { Box, Button } from "@mui/material";
import EastIcon from "@mui/icons-material/East";

type props = {
  isOpen: boolean;
  type: TypeCards;
  toggleDrawer: (
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  data?: JsonData;
};

export default function DrawerInfos(props: props) {
  const { isOpen, toggleDrawer, data, type } = props;
  const [currentType, setCurrentType] = useState<TypeCards>(type);
  const [nextType, setNextType] = useState<TypeCards>(TypeCards.Eau);

  useEffect(() => {
    setCurrentType(type);
  }, [type]);

  const typeOrder = Object.values(TypeCards);

  const nextCycleType = () => {
    const currentIndex = typeOrder.indexOf(currentType);
    const nextIndex = (currentIndex + 1) % typeOrder.length;
    setCurrentType(typeOrder[nextIndex]);
    setNextType(typeOrder[(nextIndex + 1) % typeOrder.length]);
  };

  useEffect(() => {
    const currentIndex = typeOrder.indexOf(currentType);
    setNextType(typeOrder[(currentIndex + 1) % typeOrder.length]);
  }, [currentType]);

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
          overflowY: "auto", // Enable scrolling for the entire drawer
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            justifyContent: "space-between",
            overflowY: "auto",
            padding: "1rem",
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#888",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "#555",
            },
            scrollbarWidth: "thin",
            scrollbarColor: "#888 transparent",
          }}
        >
          {currentType === TypeCards.DPE && data?.dataDPEBatiment && (
            <DPEDrawer allDPE={data.dataDPEBatiment}></DPEDrawer>
          )}
          {currentType === TypeCards.Eau && data?.dataEau && (
            <EAUDrawer data={data.dataEau}></EAUDrawer>
          )}
          {currentType === TypeCards.CatastropheNaturelle &&
            data?.dataGeorisque?.CatnatData && (
              <CatnatDrawer data={data.dataGeorisque.CatnatData}></CatnatDrawer>
            )}
          {currentType === TypeCards.InstallationClasse &&
            data?.dataGeorisque?.InstallationsClasseesData && (
              <InstallationClasseDrawer
                data={data.dataGeorisque.InstallationsClasseesData}
              ></InstallationClasseDrawer>
            )}
          {currentType === TypeCards.ParcNaturelle && data?.dataParcCarto && (
            <ParcNaturelleDrawer
              data={data.dataParcCarto}
            ></ParcNaturelleDrawer>
          )}

          {currentType === TypeCards.ZoneInnondable &&
            data?.dataGeorisque?.AZIData && (
              <ZoneInnondableDrawer
                data={data.dataGeorisque.AZIData}
              ></ZoneInnondableDrawer>
            )}
          {currentType === TypeCards.PollutionSol &&
            data?.dataGeorisque?.SISData && (
              <PollutionSolDrawer
                data={data.dataGeorisque.SISData}
              ></PollutionSolDrawer>
            )}
          {currentType === TypeCards.RisqueLocaux &&
            data?.dataGeorisque?.MVTData &&
            data?.dataGeorisque?.RadonData &&
            data?.dataGeorisque?.ZonageSismiqueData && (
              <DangerNaturelleDrawer
                dataMVT={data.dataGeorisque.MVTData}
                dataRadon={data.dataGeorisque.RadonData}
                dataZonageSismique={data.dataGeorisque.ZonageSismiqueData}
              ></DangerNaturelleDrawer>
            )}
          {currentType === TypeCards.RisqueInforamtion &&
            data?.dataGeorisque?.RisquesData && (
              <RisqueInformationDrawer
                data={data.dataGeorisque.RisquesData}
              ></RisqueInformationDrawer>
            )}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            marginY: "0.25rem",
            paddingY: "0.25rem",
            borderTop: "1px solid rgba(15, 15, 15, 0.7) ",
          }}
        >
          <Button onClick={nextCycleType} variant="contained">
            {nextType}
            <EastIcon />
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
