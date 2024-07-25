import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import CustomSlider from "../components/cardRates/slider";
// import "../styles/results.scss";
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

const ResultPage = () => {
  const { state } = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const addressObject: AddressObject = state?.addressObject || {};
  const [globalNote, setGlobalNote] = useState<number>();
  const [isSliderOpen, setSliderOpen] = useState(false);
  const [sliderValue, setSliderValue] = useState<TypeCards>(
    TypeCards.CatastropheNaturelle
  );

  //V2///////////////////////
  const [eauData, setEauData] = useState<eauAllData>();
  const [dpeDATA, setDpeData] = useState<DPEAllData>();
  const [parcData, setParcData] = useState<ParcCartoAllData>();
  const [georisqueData, setGeorisqueData] = useState<GeorisqueAllData>();
  ////////////////////////////

  // Trigger data fetching once when the component mounts.

  const fetchDatas = async () => {
    const promises = V2_DATA_ENDPOINTS.map((endpoint) =>
      ServiceAPIV2.fetchData(addressObject, endpoint)
    );
    const results = await Promise.all(promises);
    setEauData(results[0] as eauAllData);
    setParcData(results[1] as ParcCartoAllData);
    setDpeData(results[2] as DPEAllData);
    setGeorisqueData(results[3] as GeorisqueAllData);
    setGlobalNote(
      ((eauData?.rateEauPotable || 0) +
        (dpeDATA?.rateDPE || 0) +
        (parcData?.rate || 0) +
        (georisqueData?.ratesCatastropheNaturelle || 0) +
        (georisqueData?.ratesInstallationClassees || 0) +
        (georisqueData?.ratesPolutionSol || 0) +
        (georisqueData?.ratesRisqueGeneraux || 0) +
        (georisqueData?.ratesRisqueLocaux || 0) +
        (georisqueData?.ratesZoneInnondable || 0)) /
        9
    );
    setIsLoading(false);
  };
  useEffect(() => {
    fetchDatas();
  }, [globalNote]);

  const handleTitleClickInParent = (data: TypeCards) => {
    setSliderValue(data);
    setSliderOpen(true);
  };

  return (
    <Container maxWidth="lg">
      <Box my={6} sx={{ textAlign: "center" }}>
        {isLoading ? (
          <Typography variant="h1" component="h1" my={2}>
            Nous sommes en train de rechercher les données
          </Typography>
        ) : (
          <Typography variant="h1" component="h1" my={2}>
            Bonne nouvelle ! Il fait bon vivre
          </Typography>
        )}
        <Container maxWidth="md">
          <Typography variant="body1" component="p" my={2}>
            au
          </Typography>
          <Typography variant="h3" component="p" my={2}>
            {addressObject.properties.label}
          </Typography>
          <CustomSlider
            customValue={globalNote || 0}
          ></CustomSlider>
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
          valueCard={eauData?.rateEauPotable || 0}
          dataTypeJson={TypeCards.Eau}
          onTitleClick={handleTitleClickInParent}
          loading={isLoading}
        ></CardRates>
        <CardRates
          titleCard="Qualité des sols"
          textCard="Indique la présence de zones où les sols sont polué à proximité de l'addresse"
          valueCard={georisqueData?.ratesPolutionSol || 0}
          dataTypeJson={TypeCards.PollutionSol}
          onTitleClick={handleTitleClickInParent}
          loading={isLoading}
        ></CardRates>
        <CardRates
          titleCard="Absence de catastrophes naturelles"
          textCard="Indique si des catastrophes naturelles se sont déroulées fréquemment ces 10 dernières années. Comme par exemple des inondations ou des sécheresse."
          valueCard={georisqueData?.ratesCatastropheNaturelle || 0}
          dataTypeJson={TypeCards.CatastropheNaturelle}
          onTitleClick={handleTitleClickInParent}
          loading={isLoading}
        ></CardRates>
        <CardRates
          titleCard="Classe énergétique du bâtiment"
          textCard="Indique la qualité du bâtiment selon les diagnostics de performance énergétique récupérés pour cette adresse depuis 10 ans."
          valueCard={dpeDATA?.rateDPE || 0}
          dataTypeJson={TypeCards.DPE}
          onTitleClick={handleTitleClickInParent}
          loading={isLoading}
        ></CardRates>
        <CardRates
          titleCard="Absence d'installations dangereuses"
          textCard="Donne une indication sur le nombre d'installations dangereuses trouvées autour de cette adresse dans un rayon de 5 km."
          valueCard={georisqueData?.ratesInstallationClassees || 0}
          dataTypeJson={TypeCards.InstallationClasse}
          onTitleClick={handleTitleClickInParent}
          loading={isLoading}
        ></CardRates>
        <CardRates
          titleCard="Parcs naturels"
          textCard="Indique la présence de parcs naturels à proximité de l'adresse dans un rayon de 5 km, ces zones ont des restrictions incitatives sur l'urbanisme."
          valueCard={parcData?.rate || 0}
          dataTypeJson={TypeCards.ParcNaturelle}
          onTitleClick={handleTitleClickInParent}
          loading={isLoading}
        ></CardRates>
        <CardRates
          titleCard="Absence de Risques classés"
          textCard="Indique les risques liés à l'adresse recensés par le ministère de la Transition écologique et de la Cohésion des territoires."
          valueCard={georisqueData?.ratesRisqueGeneraux || 0}
          dataTypeJson={TypeCards.RisqueInforamtion}
          onTitleClick={handleTitleClickInParent}
          loading={isLoading}
        ></CardRates>
        <CardRates
          titleCard="Absence de dangers naturels"
          textCard="Indique les risques liés à l'environnement de l'adresse tels que la sismicité, les dangers liés au radon ou les mouvements de terrain."
          valueCard={georisqueData?.ratesRisqueLocaux || 0}
          dataTypeJson={TypeCards.RisqueLocaux}
          onTitleClick={handleTitleClickInParent}
          loading={isLoading}
        ></CardRates>
        <CardRates
          titleCard="Zone protégée contre les inondations"
          textCard="Indique si l'adresse se trouve dans une zone inondable à risque plus ou moins élevé."
          valueCard={georisqueData?.ratesZoneInnondable || 0}
          dataTypeJson={TypeCards.ZoneInnondable}
          onTitleClick={handleTitleClickInParent}
          loading={isLoading}
        ></CardRates>
      </Grid2>
      <DrawerInfos
        data={{
          dataEau: eauData,
          dataDPEBatiment: dpeDATA,
          dataParcCarto: parcData,
          dataGeorisque: georisqueData,
        }}
        type={sliderValue}
        isOpen={isSliderOpen}
        toggleDrawer={(open) => () => setSliderOpen(open)}
      />
    </Container>
  );
};

export default ResultPage;
