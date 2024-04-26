import { useEffect, useState } from "react";
import CustomSlider from "../components/cardRates/slider";
import "../styles/results.scss";
import CardRates from "../components/cardRates/cardRates";
import { AddressObject } from "../apiResponseType/apiResponse";
import { useLocation } from "react-router-dom";
import { FrontGroupDataValue } from "./typeResultJson/ResultRespons";
import { ServiceAPI } from "../services/api/api.service";
import {
  JsonData,
  frontCatastropheNaturelle,
  frontDPEBatiment,
  frontEau,
  frontInstallationClassees,
  frontParcNaturelle,
  frontpollutionSol,
  frontrisqueLocaux,
  frontzoneInnondable,
  frontzoneNaturelle,
} from "./typeResultJson/jsonInterface";
import SlideInModal from "../components/drawer/drawer";
import {
  API_ENDPOINTS_JSON,
  API_ENDPOINTS_RATES,
} from "../utils/endpointConst";
import CardRatesSkeleton from "../components/cardRates/cardRatesSkeleton";

const ResultPage = () => {
  const { state } = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const addressObject: AddressObject = state?.addressObject || {};
  const [groupedNotation, setGroupedNotation] = useState<FrontGroupDataValue>();
  const [triggerFetch, setTriggerFetch] = useState<boolean>(true);
  const [globalJson, setGlobalJson] = useState<JsonData>();
  const [isSliderOpen, setSliderOpen] = useState(false);
  const [sliderValue, setSliderValue] = useState("");

  // Fetch all notations from the APIs.
  const fetchAllNotations = async () => {
    try {
      const promises = API_ENDPOINTS_RATES.map((endpoint) =>
        ServiceAPI.initialFetchData(addressObject, endpoint)
      );
      await Promise.all(promises);

      // Fetch grouped notation and update the state
      const groupedData = await ServiceAPI.fetchGroupNotation(addressObject);
      setGroupedNotation(groupedData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching notations:", error);
      setIsLoading(false);
    }
  };

  const fetchJson = async () => {
    const promises = API_ENDPOINTS_JSON.map((endpoint) =>
      ServiceAPI.fetchGroupJson(addressObject, endpoint)
    );
    const results = await Promise.all(promises);
    setGlobalJson({
      dataDPEBatiment: results[0] as frontDPEBatiment,
      dataEau: results[1] as frontEau,
      dataZoneInnondable: results[2] as frontzoneInnondable,
      dataCatastropheNaturelle: results[3] as frontCatastropheNaturelle,
      dataInstallationClassees: results[4] as frontInstallationClassees,
      dataRisqueLocaux: results[5] as frontrisqueLocaux,
      dataZoneNaturelle: results[6] as frontzoneNaturelle,
      dataParcNaturelle: results[7] as frontParcNaturelle,
      dataPollutionSol: results[8] as frontpollutionSol,
    });
  };

  // Trigger data fetching once when the component mounts.
  useEffect(() => {
    if (triggerFetch) {
      fetchAllNotations();
      fetchJson();
      setTriggerFetch(false); // Reset trigger to prevent re-fetching.
    }
  },[] );

  const handleTitleClickInParent = (data: string) => {
    setSliderValue(data);
    setSliderOpen(true);
    console.error(isSliderOpen, sliderValue);

    // Additional logic here
  };
  // Set the fetch trigger to true when the component mounts.
  
  return (
    <div className="resultPage">
      {/* <Skeleton variant="rectangular" width={210} height={118} /> */}

      {isLoading ? (
        <h1>Nous sommes entrain de rechercher les données</h1>
      ) : (
        <h1>Bonne nouvelle ! Il fait bon vivre</h1>
      )}
      <div className="globalResult">
        <p>au</p>
        <h3>{addressObject.properties.label}</h3>
        <CustomSlider
          customValue={groupedNotation?.globalRate || 0}
        ></CustomSlider>
        <div className="explication1">
          Les données suivantes sont calculé sur la base des resulats données
          par des sites specialisés en open data
        </div>
        <div className="explication2">
          La bar d'indication permet de donner un indication de la qualité de vie de
          l'adresse recherchée
        </div>
      </div>
      <div className="resultsCards">
        {isLoading ? (
          <CardRatesSkeleton />
        ) : (
          <CardRates
            titleCard="Qualité de l'eau potable"
            textCard="Indique la qualité de l'eau potable de l'adresse recherchée ainsi que les cours d'eau à proximité."
            valueCard={groupedNotation?.eau || 0}
            dataTypeJson="dataEau"
            onTitleClick={handleTitleClickInParent}
          ></CardRates>
        )}
        {isLoading ? (
          <CardRatesSkeleton />
        ) : (
          <CardRates
            titleCard="Catastrophes naturelles"
            textCard="Indique si des catastrophes naturelles se sont déroulées fréquemment ces 10 dernières années. Comme par exemple des inondations ou des sécheresse."
            valueCard={groupedNotation?.CatastropheNaturelle || 0}
            dataTypeJson="dataCatastropheNaturelle"
            onTitleClick={handleTitleClickInParent}
          ></CardRates>
        )}
        {isLoading ? (
          <CardRatesSkeleton />
        ) : (
          <CardRates
            titleCard="dataDPEBatiment"
            textCard="Indique la qualité du bâtiment selon les diagnostics de performance énergétique récupérés pour cette adresse depuis 10 ans."
            valueCard={groupedNotation?.DPEBatiment || 0}
            dataTypeJson="getdpebatiment"
            onTitleClick={handleTitleClickInParent}
          ></CardRates>
        )}
        {isLoading ? (
          <CardRatesSkeleton />
        ) : (
          <CardRates
            titleCard="Installations dangereuses"
            textCard="Donne une indication sur le nombre d'installations dangereuses trouvées autour de cette adresse dans un rayon de 5 km."
            valueCard={groupedNotation?.InstallationClassees || 0}
            dataTypeJson="dataInstallationClassees"
            onTitleClick={handleTitleClickInParent}
          ></CardRates>
        )}
        {isLoading ? (
          <CardRatesSkeleton />
        ) : (
          <CardRates
            titleCard="Parcs naturels"
            textCard="Indique la présence de parcs naturels à proximité de l'adresse dans un rayon de 5 km, ces zones ont des restrictions incitatives sur l'urbanisme."
            valueCard={groupedNotation?.parcNaturelle || 0}
            dataTypeJson="dataParcNaturelle"
            onTitleClick={handleTitleClickInParent}
          ></CardRates>
        )}
        {isLoading ? (
          <CardRatesSkeleton />
        ) : (
          <CardRates
            titleCard="Risques classés"
            textCard="Indique les risques liés à l'adresse recensés par le ministère de la Transition écologique et de la Cohésion des territoires."
            valueCard={groupedNotation?.risqueGeneraux || 0}
            dataTypeJson=""
            onTitleClick={handleTitleClickInParent}
          ></CardRates>
        )}
        {isLoading ? (
          <CardRatesSkeleton />
        ) : (
          <CardRates
            titleCard="Dangers naturels"
            textCard="Indique les risques liés à l'environnement de l'adresse tels que la sismicité, les dangers liés au radon ou les mouvements de terrain."
            valueCard={groupedNotation?.risqueLocaux || 0}
            dataTypeJson="dataRisqueLocaux"
            onTitleClick={handleTitleClickInParent}
          ></CardRates>
        )}
        {isLoading ? (
          <CardRatesSkeleton />
        ) : (
          <CardRates
            titleCard="Zone inondable"
            textCard="Indique si l'adresse se trouve dans une zone inondable à risque plus ou moins élevé."
            valueCard={groupedNotation?.zoneInnondable || 0}
            dataTypeJson="dataZoneInnondable"
            onTitleClick={handleTitleClickInParent}
          ></CardRates>
        )}
        {isLoading ? (
          <CardRatesSkeleton />
        ) : (
          <CardRates
            titleCard="Zone naturelle"
            textCard="Indique la présence de zones naturelles proches de l'adresse, ces zones sont classées comme étant des réserves naturelles pour les animaux et la végétation mais n'imposent que très peu de restrictions sur l'urbanisme."
            valueCard={groupedNotation?.zoneNaturelle || 0}
            dataTypeJson="dataZoneNaturelle"
            onTitleClick={handleTitleClickInParent}
          ></CardRates>
        )}
        {isLoading ? (
          <CardRatesSkeleton />
        ) : (
          <CardRates
            titleCard="Pollution des sols"
            textCard="Indique la présence de zones où les sols sont polué à proximité de l'addresse"
            valueCard={groupedNotation?.polutionSol || 0}
            dataTypeJson="dataPollutionSol"
            onTitleClick={handleTitleClickInParent}
          ></CardRates>
        )}
      </div>
      <SlideInModal
        data={globalJson}
        type={sliderValue}
        isOpen={isSliderOpen}
        toggleDrawer={(open) => () => setSliderOpen(open)}
      />
    </div>
  );
};

export default ResultPage;
