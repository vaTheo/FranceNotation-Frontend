import { useEffect, useState } from "react";
import CustomSlider from "../components/cardRates/slider";
import "../styles/results.scss";
import CardRates, { Props } from "../components/cardRates/cardRates";
import { AddressObject } from "../apiResponseType/apiResponse";
import { useLocation } from "react-router-dom";
import { FrontGroupDataValue } from "./typeResultJson/ResultRespons";
import { DPEAllData } from "./typeResultJson/api-DPE";
import { ServiceAPI } from "../services/api/api.service";
import { set } from "lodash";
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

export interface FrontGroupData {
  globalRate: Props;
  eau: Props;
  zoneInnondable: Props;
  CatastropheNaturelle: Props;
  InstallationClassees: Props;
  risqueLocaux: Props;
  risqueGeneraux: Props;
  zoneNaturelle: Props;
  parcNaturelle: Props;
  DPEBatiment: Props;
  pollutionSol: Props;
}
// Define the endpoints as a constant outside the component to avoid re-declaring it on each render.
const API_ENDPOINTS_RATES = [
  "/fetchGeorisque",
  "/Fetcheau",
  "/fethParcCarto",
  "/fethDPE",
];
const API_ENDPOINTS_JSON = [
  "getdpebatiment",
  "geteau",
  "getzoneinnondable",
  "getcatastrophenaturelle",
  "getinstallationclassees",
  "getrisquelocaux",
  "getzonenaturelle",
  "getparcnaturelle",
  "getpollutionsol",
];

const ResultPage = () => {
  const { state } = useLocation();
  const addressObject: AddressObject = state?.addressObject || {};
  const [groupedNotation, setGroupedNotation] = useState<FrontGroupDataValue>();
  const [triggerFetch, setTriggerFetch] = useState<boolean>(false);
  const [globalJson, setGlobalJson] = useState<JsonData>();

  // This function fetches data for a given endpoint and address object.
  const fetchFromEndpoint = async (endpoint: string) => {
    return ServiceAPI.initialFetchData(addressObject, endpoint);
  };

  // Fetch all notations from the APIs.
  const fetchAllNotations = async () => {
    try {
      const promises = API_ENDPOINTS_RATES.map(fetchFromEndpoint);
      const results = await Promise.all(promises);
      const groupedData = await ServiceAPI.fetchGroupNotation(addressObject);
      setGroupedNotation(groupedData);
    } catch (error) {
      console.error("Error fetching notations:", error);
    }
  };

  const fetchJson = async () => {
    const promises = API_ENDPOINTS_JSON.map(async (endpoint) => {
      const result = await ServiceAPI.fetchGroupJson(addressObject, endpoint);
      return result;
    });
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
  }, [triggerFetch]);
  
  const transferData = (dataTypeJson: string) => {
    console.log(dataTypeJson);
  };
  // Set the fetch trigger to true when the component mounts.
  useEffect(() => {
    setTriggerFetch(true);
  }, []);
  return (
    <div className="resultPage">
      <div className="globalResult">
        <h1>Bonne nouvelle ! Il fait bon vivre</h1>
        <p>à</p>
        <h3>{addressObject.properties.label}</h3>
        <CustomSlider
          customValue={groupedNotation?.globalRate || 0}
        ></CustomSlider>
        <div className="explication 1">
          Description de ce que cela signifie en deux lignes et à quoi cela
          correspond finalement. Description de l’API.
        </div>
        <div className="explication2">
          Indicateur permettant à l’utilisateur de lire le chiffre. 50 est un
          bon indicateur, par exemple.
        </div>
      </div>
      <div className="resultsCards">
        <CardRates
          titleCard="Qualité de l'eau potable"
          textCard="Indique la qualité de l'eau potable de l'adresse recherchée ainsi que les cours d'eau à proximité."
          valueCard={groupedNotation?.eau || 0}
          dataTypeJson="dataEau"
          onTitleClick={(dataTypeJson) => {
            transferData(dataTypeJson);
          }}
        ></CardRates>
        <CardRates
          titleCard="Catastrophes naturelles"
          textCard="Indique si des catastrophes naturelles se sont déroulées fréquemment ces 10 dernières années. Comme par exemple des inondations ou des sécheresse."
          valueCard={groupedNotation?.CatastropheNaturelle || 0}
          dataTypeJson="dataCatastropheNaturelle"
        ></CardRates>
        <CardRates
          titleCard="dataDPEBatiment"
          textCard="Indique la qualité du bâtiment selon les diagnostics de performance énergétique récupérés pour cette adresse depuis 10 ans."
          valueCard={groupedNotation?.DPEBatiment || 0}
          dataTypeJson="getdpebatiment"
        ></CardRates>
        <CardRates
          titleCard="Installations dangereuses"
          textCard="Donne une indication sur le nombre d'installations dangereuses trouvées autour de cette adresse dans un rayon de 5 km."
          valueCard={groupedNotation?.InstallationClassees || 0}
          dataTypeJson="dataInstallationClassees"
        ></CardRates>
        <CardRates
          titleCard="Parcs naturels"
          textCard="Indique la présence de parcs naturels à proximité de l'adresse dans un rayon de 5 km, ces zones ont des restrictions incitatives sur l'urbanisme."
          valueCard={groupedNotation?.parcNaturelle || 0}
          dataTypeJson="dataParcNaturelle"
        ></CardRates>
        <CardRates
          titleCard="Risques classés"
          textCard="Indique les risques liés à l'adresse recensés par le ministère de la Transition écologique et de la Cohésion des territoires."
          valueCard={groupedNotation?.risqueGeneraux || 0}
          dataTypeJson=""
        ></CardRates>
        <CardRates
          titleCard="Dangers naturels"
          textCard="Indique les risques liés à l'environnement de l'adresse tels que la sismicité, les dangers liés au radon ou les mouvements de terrain."
          valueCard={groupedNotation?.risqueLocaux || 0}
          dataTypeJson="dataRisqueLocaux"
        ></CardRates>
        <CardRates
          titleCard="Zone inondable"
          textCard="Indique si l'adresse se trouve dans une zone inondable à risque plus ou moins élevé."
          valueCard={groupedNotation?.zoneInnondable || 0}
          dataTypeJson="dataZoneInnondable"
        ></CardRates>
        <CardRates
          titleCard="Zone naturelle"
          textCard="Indique la présence de zones naturelles proches de l'adresse, ces zones sont classées comme étant des réserves naturelles pour les animaux et la végétation mais n'imposent que très peu de restrictions sur l'urbanisme."
          valueCard={groupedNotation?.zoneNaturelle || 0}
          dataTypeJson="dataZoneNaturelle"
        ></CardRates>
        <CardRates
          titleCard="Pollution des sols"
          textCard="Indique la présence de zones où les sols sont polué à proximité de l'addresse"
          valueCard={groupedNotation?.polutionSol || 0}
          dataTypeJson="dataPollutionSol"
        ></CardRates>
      </div>
    </div>
  );
};

export default ResultPage;
