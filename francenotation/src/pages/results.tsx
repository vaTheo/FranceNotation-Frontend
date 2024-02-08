import { useState } from "react";
import CustomSlider from "../components/cardRates/slider";
import "../styles/results.scss";
import CardRates from "../components/cardRates/cardRates";

const ResultPage = () => {
  const [globalRate, setGlobalRate] = useState(42);
  return (
    <div className="resultPage">
      <div className="globalResult">
        <h1>Bonne nouvelle ! Il fait bon vivre</h1>
        <p>au</p>
        <h3>Addresse</h3>
        <CustomSlider customValue={globalRate}></CustomSlider>
        <div className="explication 1">
          Description de ce que ça veut dire en deux lignes à quoi ça correspond
          finalement. Description de l’API.{" "}
        </div>
        <div className="explication2">
          Indicateur pour que l’utilisateur puisse lire le chiffre. 50 est un
          bon indicateur par exemple.
        </div>
      </div>
      <div className="resultsCards">
        <CardRates 
          titleCard="Parc naturelle"
          textCard="text1  text1  text1  text1  text1  "
          valueCard={10}
        ></CardRates>
        <CardRates
          titleCard="Qualité de l'eau"
          textCard="text1  text1  text1  text1  text1  "
          valueCard={30}
        ></CardRates>
        <CardRates
          titleCard="TITLE 1"
          textCard="text1  text1  text1  text1  text1  "
          valueCard={50}
        ></CardRates>
        <CardRates
          titleCard="TITLE 1"
          textCard="text1  text1  text1  text1  text1  "
          valueCard={76}
        ></CardRates>{" "}
        <CardRates
          titleCard="TITLE 1"
          textCard="text1  text1  text1  text1  text1  "
          valueCard={50}
        ></CardRates>
        <CardRates
          titleCard="TITLE 1"
          textCard="text1  text1  text1  text1  text1  "
          valueCard={76}
        ></CardRates>
      </div>
    </div>
  );
};

export default ResultPage;
