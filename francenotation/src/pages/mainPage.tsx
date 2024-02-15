import React, { useState } from "react";
import CustomInputField from "../components/fieldsMainPage/fieldsMainPage";
import "../styles/mainPage.scss";
import { useNavigate } from 'react-router-dom';
import CustomButton from "../components/button/button";
import { AddressObject } from "../apiResponseType/apiResponse";
import CustomLoadingIndicator from "../components/loading/loadingBar";
import AddressSearchBar from "../components/BanField/banfield";
import Button from "@mui/material/Button";
import CardRates from "../components/cardRates/cardRates";
import { ServiceAPI } from "../services/api/api.service";

const MainPage = () => {
  const navigate = useNavigate();
  const [valueAddressSearchBar, setValueAddressSearchBar] =
    useState<string>("");
  // All fields filled
  const areAllFieldsFilled = !valueAddressSearchBar;


 
  const handleButtonClick = async () => {
    try {
      const addressObject = await ServiceAPI.initiateCycle(valueAddressSearchBar.trim());
      navigate('/resultpage', {state:{ addressObject: addressObject}});
    } catch (err) {
      console.error("Error in one or more requests: ", err);
    }
  };

  // Callback management
  const handleValueAddressSearchBar = (newValue: string) => {
    setValueAddressSearchBar(newValue);
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
          que chaque français puisse voir les informations sur l’indice.
          Ce sont donc des données accesssible à tous mais nous essayon de les rendre
          accessible le plus facilement poissible
        </p>
      </section>
    </div>
  );
};

export default MainPage;
