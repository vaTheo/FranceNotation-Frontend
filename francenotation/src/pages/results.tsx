import { useEffect, useState } from "react";
import CustomSlider from "../components/cardRates/slider";
import "../styles/results.scss";
import CardRates, { Props } from "../components/cardRates/cardRates";
import { AddressObject } from "../apiResponseType/apiResponse";
import { fetchData, fetchGroupNotation } from "../services/api/api.service";
import { useLocation } from "react-router-dom";
import { FrontGroupDataValue } from "./typeResultJson/ResultRespons";
import { DPEAllData } from "./typeResultJson/api-DPE";

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
const ResultPage = () => {
  const location = useLocation();
  const { addressObject } = location.state || {};
  const addressObectTyped: AddressObject = addressObject;
  const endpoints = [
    "/fetchGeorisque",
    "/Fetcheau",
    "/fethParcCarto",
    "/fethDPE",
  ];
  const [groupedNotation, setGroupedNotation] = useState<FrontGroupDataValue>();
  const [jsonDPE, setJsonDPE] = useState<DPEAllData>();
  const handleRequest = async (
    endpoint: string,
    addressObject: AddressObject
  ) => {
    try {
      return await fetchData(addressObject, endpoint);
    } catch (err) {
      console.error(`Error fetching data from ${endpoint}: `, err);
      throw err; // Re-throw to allow Promise.all to catch it
    }
  };

  const fetchNotation = async () => {
    const promises = endpoints.map((endpoint) =>
      handleRequest(endpoint, addressObject)
    );

    try {
      const [rateGeorisque, rateEau, rateParcCarto, rateDPE] =
        await Promise.all(promises.map((p) => p.catch((e) => e)));
      const groupedData = await fetchGroupNotation(addressObectTyped);
      setGroupedNotation(groupedData);
    } catch (error) {
      console.error("Error in fetchNotation:", error);
    }
  };
  useEffect(() => {
    fetchNotation();
  }, []); // The empty array ensures it runs only once after mounting
  return (
    <div className="resultPage">
      <div className="globalResult">
        <h1>Bonne nouvelle ! Il fait bon vivre</h1>
        <p>à</p>
        <h3>{addressObectTyped.properties.label}</h3>
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
          enpointJson="geteau"
        ></CardRates>
        <CardRates
          titleCard="Catastrophes naturelles"
          textCard="Indique si des catastrophes naturelles se sont déroulées fréquemment ces 10 dernières années. Comme par exemple des inondations ou des sécheresse."
          valueCard={groupedNotation?.CatastropheNaturelle || 0}
          enpointJson="getcatastrophenaturelle"
        ></CardRates>
        <CardRates
          titleCard="DPE du bâtiment"
          textCard="Indique la qualité du bâtiment selon les diagnostics de performance énergétique récupérés pour cette adresse depuis 10 ans."
          valueCard={groupedNotation?.DPEBatiment || 0}
          enpointJson="getdpebatiment"
        ></CardRates>
        <CardRates
          titleCard="Installations dangereuses"
          textCard="Donne une indication sur le nombre d'installations dangereuses trouvées autour de cette adresse dans un rayon de 5 km."
          valueCard={groupedNotation?.InstallationClassees || 0}
          enpointJson="getinstallationclassees"
        ></CardRates>
        <CardRates
          titleCard="Parcs naturels"
          textCard="Indique la présence de parcs naturels à proximité de l'adresse dans un rayon de 5 km, ces zones ont des restrictions incitatives sur l'urbanisme."
          valueCard={groupedNotation?.parcNaturelle || 0}
          enpointJson="getparcnaturelle"
        ></CardRates>
        <CardRates
          titleCard="Risques classés"
          textCard="Indique les risques liés à l'adresse recensés par le ministère de la Transition écologique et de la Cohésion des territoires."
          valueCard={groupedNotation?.risqueGeneraux || 0}
          enpointJson=""
        ></CardRates>
        <CardRates
          titleCard="Dangers naturels"
          textCard="Indique les risques liés à l'environnement de l'adresse tels que la sismicité, les dangers liés au radon ou les mouvements de terrain."
          valueCard={groupedNotation?.risqueLocaux || 0}
          enpointJson="getrisquelocaux"
        ></CardRates>
        <CardRates
          titleCard="Zone inondable"
          textCard="Indique si l'adresse se trouve dans une zone inondable à risque plus ou moins élevé."
          valueCard={groupedNotation?.zoneInnondable || 0}
          enpointJson="getzoneinnondable"
        ></CardRates>
        <CardRates
          titleCard="Zone naturelle"
          textCard="Indique la présence de zones naturelles proches de l'adresse, ces zones sont classées comme étant des réserves naturelles pour les animaux et la végétation mais n'imposent que très peu de restrictions sur l'urbanisme."
          valueCard={groupedNotation?.zoneNaturelle || 0}
          enpointJson="getzonenaturelle"
        ></CardRates>
        <CardRates
          titleCard="Pollution des sols"
          textCard="Indique la présence de zones où les sols sont polué à proximité de l'addresse"
          valueCard={groupedNotation?.polutionSol || 0}
          enpointJson="getpollutionsol"
        ></CardRates>
      </div>
    </div>
  );
};

export default ResultPage;
