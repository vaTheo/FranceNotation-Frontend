import { useEffect, useState } from "react";
// import "../styles/mainPage.scss";
import { useNavigate } from "react-router-dom";
import AddressSearchBar from "../components/BanField/banfield";
import Button from "@mui/material/Button";
import { ServiceAPI } from "../services/api/api.service";
import { Box, CircularProgress, Container, Typography } from "@mui/material";

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
    <Container
      sx={{ maxWidth: { xs: "100%", sm: "80%", md: "lg" } }}
      maxWidth="lg"
    >
      <Box margin={5} sx={{ textAlign: "center" ,
         margin: { xs: "0", sm: "3", md: "5" }
      }}>
        <Typography marginY={2} variant="h1" component="h1">
          Est-ce qu’il fait bon vivre chez vous ?
        </Typography>
        <Typography  my={3} variant="h2" component="h2">
          Renseignez l'adresse de votre choix et découvrez sa note ainsi que des
          informations essentielles
        </Typography>
      </Box>
      <Container maxWidth="sm">
        <Box marginTop={1} sx={{ textAlign: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <AddressSearchBar
              valueAddressSearchBarProps={handleValueAddressSearchBar}
              enterPressed={handleButtonClick}
            />

            <Button
              sx={{ marginLeft: 2 }}
              size="medium"
              onClick={handleButtonClick}
              disabled={areAllFieldsFilled}
              variant="contained"
            >
              {isLoading ? (
                <CircularProgress color="inherit" size={24} />
              ) : (
                "RECHERCHER"
              )}
            </Button>
          </Box>
          <Box marginTop={4}>
            <Typography variant="body1" component="p">
              Nous avons croisées les données disponible en libre service
              d’écologie, de risques de catastrophe naturelle (et bien plus)
              pourque chaque français puisse voir les informations sur l’indice.
              Ce sont donc des données accesssible à tous mais nous essayon de
              les rendre accessible le plus facilement poissible
            </Typography>
          </Box>
        </Box>
      </Container>
    </Container>
  );
};

export default MainPage;
