import { useEffect, useState } from "react";
import "../styles/mainPage.scss";
import { useNavigate } from "react-router-dom";
import AddressSearchBar from "../components/BanField/banfield";
import Button from "@mui/material/Button";
import { ServiceAPI } from "../services/api/api.service";
import { CircularProgress } from "@mui/material";

const MainPage = () => {
  const navigate = useNavigate();
  const [valueAddressSearchBar, setValueAddressSearchBar] =
    useState<string>("");
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // All fields filled
  const areAllFieldsFilled = !valueAddressSearchBar;

  const handleButtonClick = async () => {
    try {
      setIsLoading(true);
      const addressObject = await ServiceAPI.initiateCycle(
        valueAddressSearchBar.trim()
      );
      navigate("/resultpage", { state: { addressObject: addressObject } });
    } catch (e) {
      console.error("Error in one or more requests: ", e);
      setIsLoading(false);
    }
  };
  //wakeup the server at the start of the app
  useEffect(() => {
    ServiceAPI.wakeUpServer();
  }, []);

  // Callback management
  const handleValueAddressSearchBar = (newValue: string) => {
    setValueAddressSearchBar(newValue);
  };

  return (
    <div className="mainPage">
      <header className="mainPage-header">
        <h1>Est-ce qu’il fait bon vivre chez vous ?</h1>
        <h2>
          Renseignez l'adresse de votre choix et découvrez sa note ainsi que des
          informations essentielles
        </h2>
      </header>

      <section className="mainPage-content">
        <div className="inputs-field">
          <AddressSearchBar
            valueAddressSearchBarProps={handleValueAddressSearchBar}
            enterPressed={handleButtonClick}
          />
          <Button
            className="button"
            size="medium"
            onClick={handleButtonClick}
            disabled={areAllFieldsFilled}
          >
            {isLoading ? (
              <CircularProgress color="inherit" size={24} />
            ) : (
              "RECHERCHER"
            )}
          </Button>
        </div>
        <p>
          Nous avons croisées les données disponible en libre service
          d’écologie, de risques de catastrophe naturelle (et bien plus) pourque
          chaque français puisse voir les informations sur l’indice. Ce sont
          donc des données accesssible à tous mais nous essayon de les rendre
          accessible le plus facilement poissible
        </p>
      </section>
    </div>
  );
};

export default MainPage;
