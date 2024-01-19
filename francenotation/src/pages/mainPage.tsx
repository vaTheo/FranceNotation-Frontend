import React, { useState } from "react";
import CustomInputField from "../components/fieldsMainPage/fieldsMainPage";
import "./mainPage.scss";
import CustomButton from "../components/button/button";
import { initiateCycle, fetchData, testAPI } from "../services/api/api.service";
import { AddressObject } from "../apiResponseType/apiResponse";
import CustomLoadingIndicator from "../components/loading/loadingBar";

const MainPage = () => {
  const [postcodeValue, setPostcodeValue] = useState("");
  const [cityValue, setCityValue] = useState("");
  const [addressValue, setAddressValue] = useState("");
  // All fields filled
  const areAllFieldsFilled = postcodeValue && cityValue && addressValue;
  const [loadingStatus, setLoadingStatus] = useState({
    fetchGeorisque: false,
    fetcheau: false,
    fetchPolice: false, // New state for fetchPolice loading status
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
    console.log(postcodeValue)
    try {
      const addressObject = await initiateCycle(
        postcodeValue.trim(), //Remove space beginning and end of the string
        cityValue.trim(),
        addressValue.trim()
      );
      const endpoints = ["/fetchGeorisque", "/Fetcheau", "/fethParcCarto",'/fethDPE']; // Added '/fetchPolice'
      const promises = endpoints.map((endpoint) =>
        handleRequest(endpoint, addressObject)
      );

      // Await all promises, handling errors individually
      const [rateGeorisque, rateEau, rateParcCarto,rateDPE] = await Promise.all(
        promises.map((p) => p.catch((e) => e))
      );

      console.log("Rate Georisque: ", rateGeorisque);
      console.log("Rate Eau: ", rateEau);
      console.log("Rate ParcCarto: ", rateParcCarto); // Log the result of fetchPolice
      console.log('Rates DPE ' , rateDPE)
    } catch (err) {
      console.error("Error in one or more requests: ", err);
    }
  };

  const handleButtTest = async () => {

    testAPI()
  };


  return (
    <div className="mainPage">
      <header className="mainPage-header">
        <h1>Entre ton addresse pour avoir la note</h1>
      </header>

      <section className="mainPage-content">
        <div className="inputs-field">
          <CustomInputField
            label="Code postal"
            type="text"
            value={postcodeValue}
            onChange={setPostcodeValue}
          />
          <CustomInputField
            label="Ville"
            type="text"
            value={cityValue}
            onChange={setCityValue}
          />
          <CustomInputField
            label="Adresse"
            type="text"
            value={addressValue}
            onChange={setAddressValue}
          />
          <CustomButton
            text="lancer la recherche"
            onClick={handleButtonClick}
            disabled={!areAllFieldsFilled}
          />
           <CustomButton
            text="TEST API"
            onClick={handleButtTest}
            disabled={false}
          />
        </div>
        <div className="Loading">
          <CustomLoadingIndicator isLoading={loadingStatus.fetchGeorisque} />
        </div>
        <div className="Loading">
          <CustomLoadingIndicator isLoading={loadingStatus.fetcheau} />
        </div>
      </section>
    </div>
  );
};

export default MainPage;
