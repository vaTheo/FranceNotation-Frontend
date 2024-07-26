import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useLocation } from "react-router-dom";
import CustomSlider from "../components/cardRates/slider";
import CardRates from "../components/cardRates/cardRates";
import { AddressObject } from "../apiResponseType/apiResponse";
import { V2_DATA_ENDPOINTS } from "../utils/endpointConst";
import { TypeCards } from "../utils/enum";
import DrawerInfos from "../components/drawer/drawer";
import { Box, Container, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { ServiceAPIV2 } from "../services/api/api.serviceV2";
import { eauAllData } from "./typeResultJson/api-eau";
import { DPEAllData } from "./typeResultJson/api-DPE";
import { ParcCartoAllData } from "./typeResultJson/api-cartoParc";
import { GeorisqueAllData } from "./typeResultJson/api-georisque";

const LOADING_MESSAGE = "Nous sommes en train de rechercher les données";
const SUCCESS_MESSAGE = "Bonne nouvelle ! Il fait bon vivre";
const ADDRESS_PREFIX = "au";

type ResultPageState = {
  isLoading: boolean;
  isSliderOpen: boolean;
  sliderValue: TypeCards;
  eauData: eauAllData | undefined;
  dpeDATA: DPEAllData | undefined;
  parcData: ParcCartoAllData | undefined;
  georisqueData: GeorisqueAllData | undefined;
};

const ResultPage: React.FC = () => {
  const { state } = useLocation();
  const addressObject:AddressObject = useMemo(() => {
    return state?.addressObject || {};
  }, [state?.addressObject]);
  
  const [pageState, setPageState] = useState<ResultPageState>({
    isLoading: true,
    isSliderOpen: false,
    sliderValue: TypeCards.CatastropheNaturelle,
    eauData: undefined,
    dpeDATA: undefined,
    parcData: undefined,
    georisqueData: undefined,
  });

  const fetchDatas = useCallback(async () => {
    const promises = V2_DATA_ENDPOINTS.map((endpoint) =>
      ServiceAPIV2.fetchData(addressObject, endpoint)
    );
    const results = await Promise.all(promises);

    setPageState((prevState) => ({
      ...prevState,
      eauData: results[0] as eauAllData,
      parcData: results[1] as ParcCartoAllData,
      dpeDATA: results[2] as DPEAllData,
      georisqueData: results[3] as GeorisqueAllData,
      isLoading: false,
    }));
  }, [addressObject]);

  useEffect(() => {
    fetchDatas();
  }, [fetchDatas]);

  const [globalNote, setGlobalNote] = useState<number | undefined>(undefined);

  const calculateGlobalNote = useCallback(() => {
    if (
      !pageState.eauData ||
      !pageState.dpeDATA ||
      !pageState.parcData ||
      !pageState.georisqueData
    ) {
      return undefined;
    }

    return (
      ((pageState.eauData.rateEauPotable || 0) +
        (pageState.dpeDATA.rateDPE || 0) +
        (pageState.parcData.rate || 0) +
        (pageState.georisqueData.ratesCatastropheNaturelle || 0) +
        (pageState.georisqueData.ratesInstallationClassees || 0) +
        (pageState.georisqueData.ratesPolutionSol || 0) +
        (pageState.georisqueData.ratesRisqueGeneraux || 0) +
        (pageState.georisqueData.ratesRisqueLocaux || 0) +
        (pageState.georisqueData.ratesZoneInnondable || 0)) /
      9
    );
  }, [
    pageState.eauData,
    pageState.dpeDATA,
    pageState.parcData,
    pageState.georisqueData,
  ]);

  useEffect(() => {
    const newGlobalNote = calculateGlobalNote();
    setGlobalNote(newGlobalNote);
  }, [calculateGlobalNote]);

  const handleTitleClickInParent = useCallback((data: TypeCards) => {
    setPageState((prevState) => ({
      ...prevState,
      sliderValue: data,
      isSliderOpen: true,
    }));
  }, []);

  return (
    <Container maxWidth="lg">
      <Box my={6} sx={{ textAlign: "center" }}>
        <Typography variant="h1" component="h1" my={2}>
          {pageState.isLoading ? LOADING_MESSAGE : SUCCESS_MESSAGE}
        </Typography>
        <Container maxWidth="md">
          <Typography variant="body1" component="p" my={2}>
            {ADDRESS_PREFIX}
          </Typography>
          <Typography variant="h3" component="p" my={2}>
            {addressObject.properties.label}
          </Typography>
          <CustomSlider customValue={globalNote || 0} />
          <Typography variant="body1" component="p" my={2}>
            Les données suivantes sont calculées sur la base des résultats
            donnés par des sites spécialisés en open data.
          </Typography>
          <Typography variant="body1" component="p" my={2}>
            La barre d'indication permet de donner une indication de la qualité
            de vie de l'adresse recherchée. Plus la barre d'indication se trouve
            proche de 100, plus la qualité de vie est bonne selon les données
            que nous avons récupérées.
          </Typography>
        </Container>
      </Box>
      <Grid2 container spacing={2} sx={{ justifyContent: "center" }}>
        <CardRates
          titleCard="Qualité de l'eau potable"
          textCard="Indique la qualité de l'eau potable de l'adresse recherchée ainsi que les cours d'eau à proximité."
          valueCard={pageState.eauData?.rateEauPotable || 0}
          dataTypeJson={TypeCards.Eau}
          onTitleClick={handleTitleClickInParent}
          loading={pageState.isLoading}
        ></CardRates>
        <CardRates
          titleCard="Qualité des sols"
          textCard="Indique la présence de zones où les sols sont polué à proximité de l'addresse"
          valueCard={pageState.georisqueData?.ratesPolutionSol || 0}
          dataTypeJson={TypeCards.PollutionSol}
          onTitleClick={handleTitleClickInParent}
          loading={pageState.isLoading}
        ></CardRates>
        <CardRates
          titleCard="Absence de catastrophes naturelles"
          textCard="Indique si des catastrophes naturelles se sont déroulées fréquemment ces 10 dernières années. Comme par exemple des inondations ou des sécheresse."
          valueCard={pageState.georisqueData?.ratesCatastropheNaturelle || 0}
          dataTypeJson={TypeCards.CatastropheNaturelle}
          onTitleClick={handleTitleClickInParent}
          loading={pageState.isLoading}
        ></CardRates>
        <CardRates
          titleCard="Classe énergétique du bâtiment"
          textCard="Indique la qualité du bâtiment selon les diagnostics de performance énergétique récupérés pour cette adresse depuis 10 ans."
          valueCard={pageState.dpeDATA?.rateDPE || 0}
          dataTypeJson={TypeCards.DPE}
          onTitleClick={handleTitleClickInParent}
          loading={pageState.isLoading}
        ></CardRates>
        <CardRates
          titleCard="Absence d'installations dangereuses"
          textCard="Donne une indication sur le nombre d'installations dangereuses trouvées autour de cette adresse dans un rayon de 5 km."
          valueCard={pageState.georisqueData?.ratesInstallationClassees || 0}
          dataTypeJson={TypeCards.InstallationClasse}
          onTitleClick={handleTitleClickInParent}
          loading={pageState.isLoading}
        ></CardRates>
        <CardRates
          titleCard="Parcs naturels"
          textCard="Indique la présence de parcs naturels à proximité de l'adresse dans un rayon de 5 km, ces zones ont des restrictions incitatives sur l'urbanisme."
          valueCard={pageState.parcData?.rate || 0}
          dataTypeJson={TypeCards.ParcNaturelle}
          onTitleClick={handleTitleClickInParent}
          loading={pageState.isLoading}
        ></CardRates>
        <CardRates
          titleCard="Absence de Risques classés"
          textCard="Indique les risques liés à l'adresse recensés par le ministère de la Transition écologique et de la Cohésion des territoires."
          valueCard={pageState.georisqueData?.ratesRisqueGeneraux || 0}
          dataTypeJson={TypeCards.RisqueInforamtion}
          onTitleClick={handleTitleClickInParent}
          loading={pageState.isLoading}
        ></CardRates>
        <CardRates
          titleCard="Absence de dangers naturels"
          textCard="Indique les risques liés à l'environnement de l'adresse tels que la sismicité, les dangers liés au radon ou les mouvements de terrain."
          valueCard={pageState.georisqueData?.ratesRisqueLocaux || 0}
          dataTypeJson={TypeCards.RisqueLocaux}
          onTitleClick={handleTitleClickInParent}
          loading={pageState.isLoading}
        ></CardRates>
        <CardRates
          titleCard="Zone protégée contre les inondations"
          textCard="Indique si l'adresse se trouve dans une zone inondable à risque plus ou moins élevé."
          valueCard={pageState.georisqueData?.ratesZoneInnondable || 0}
          dataTypeJson={TypeCards.ZoneInnondable}
          onTitleClick={handleTitleClickInParent}
          loading={pageState.isLoading}
        ></CardRates>
      </Grid2>
      <DrawerInfos
        data={{
          dataEau: pageState.eauData,
          dataDPEBatiment: pageState.dpeDATA,
          dataParcCarto: pageState.parcData,
          dataGeorisque: pageState.georisqueData,
        }}
        type={pageState.sliderValue}
        isOpen={pageState.isSliderOpen}
        toggleDrawer={(open) => () =>
          setPageState((prev) => ({ ...prev, isSliderOpen: open }))}
      />
    </Container>
  );
};

export default ResultPage;
