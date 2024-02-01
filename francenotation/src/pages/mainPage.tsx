import React, { useState } from "react";
import CustomInputField from "../components/fieldsMainPage/fieldsMainPage";
import "../styles/mainPage.scss";

import CustomButton from "../components/button/button";
import { initiateCycle, fetchData, testAPI } from "../services/api/api.service";
import { AddressObject } from "../apiResponseType/apiResponse";
import CustomLoadingIndicator from "../components/loading/loadingBar";
import AddressSearchBar from "../components/BanField/banfield";
import Button from "@mui/material/Button";
import CardRates from "../components/cardRates/cardRates";

const MainPage = () => {
  const [valueAddressSearchBar, setValueAddressSearchBar] =
    useState<string>("");
  // All fields filled
  const areAllFieldsFilled = !valueAddressSearchBar;
  const [loadingStatus, setLoadingStatus] = useState({
    fetchGeorisque: false,
    fetcheau: false,
    fethParcCarto: false,
    fethDPE: false,
  });

  const handleRequest = async (
    endpoint: string,
    addressObject: AddressObject
  ) => {
    // Determine the key for updating the correct loading status
    const key = endpoint.slice(1); // Assuming all endpoints follow the format '/endpointName'
    setLoadingStatus((prev) => ({ ...prev, [key]: true })); // Start loading for this endpoint

    try {
      return await fetchData(addressObject, endpoint);
    } catch (err) {
      console.error(`Error fetching data from ${endpoint}: `, err);
      throw err; // Re-throw to allow Promise.all to catch it
    } finally {
      setLoadingStatus((prev) => ({ ...prev, [key]: false })); // Stop loading for this endpoint
    }
  };
  const handleButtonClick = async () => {
    console.log("Button clicked!");
    console.log(valueAddressSearchBar);
    try {
      const addressObject = await initiateCycle(valueAddressSearchBar.trim());
      const endpoints = [
        "/fetchGeorisque",
        "/Fetcheau",
        "/fethParcCarto",
        "/fethDPE",
      ];
      const promises = endpoints.map((endpoint) =>
        handleRequest(endpoint, addressObject)
      );

      // Await all promises, handling errors individually
      const [rateGeorisque, rateEau, rateParcCarto, rateDPE] =
        await Promise.all(promises.map((p) => p.catch((e) => e)));

      console.log("Rate Georisque: ", rateGeorisque);
      console.log("Rate Eau: ", rateEau);
      console.log("Rate ParcCarto: ", rateParcCarto); // Log the result of fetchPolice
      console.log("Rates DPE ", rateDPE);
    } catch (err) {
      console.error("Error in one or more requests: ", err);
    }
  };

  // Callback management
  const handleValueAddressSearchBar = (newValue: string) => {
    setValueAddressSearchBar(newValue);
    console.log(">>>>>", valueAddressSearchBar);
  };

  return (
    <div className="mainPage">
      <header className="mainPage-header">
        <h1>Est-ce qu’il fait bon vivre chez vous ?</h1>
        <h2>Renseignez l’adresse de votre choix et découvrez sa note</h2>
      </header>

      <section className="mainPage-content">
        <div className="inputs-field">
          {/* Include AddressSearch component here */}
          <AddressSearchBar
            valueAddressSearchBarProps={handleValueAddressSearchBar}
          />
          <Button
            className="button"
            size="medium"
            onClick={handleButtonClick}
            disabled={areAllFieldsFilled}
          >
            RECHERCHER
          </Button>
        </div>
        <p>
          Nous avons croisées les données disponible en libre service
          d’écologie, de risques de catastrophe naturelle (et bien plus) pour
          que chaque français puisse voir les informations sur l’indice
        </p>
      </section>
    </div>
  );
};

export default MainPage;
