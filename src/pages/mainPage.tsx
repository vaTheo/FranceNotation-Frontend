import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddressSearchBar from "../components/BanField/banfield";
import Button from "@mui/material/Button";
import {
  Box,
  CircularProgress,
  Container,
  Link,
  Typography,
} from "@mui/material";
import { ServiceAPIV2 } from "../services/api/api.serviceV2";
import GitHubIcon from "@mui/icons-material/GitHub";
import { LinkedIn } from "@mui/icons-material";

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const [valueAddressSearchBar, setValueAddressSearchBar] =
    useState<string>("");
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // All fields filled
  const areAllFieldsFilled = !valueAddressSearchBar;

  const handleButtonClick = async () => {
    try {
      setIsLoading(true);
      const addressObject = await ServiceAPIV2.initiateCycle(
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
    ServiceAPIV2.wakeUpServer();
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
      <Box
        sx={{
          textAlign: "center",
          marginTop: { xs: "0rem", sm: "3rem", md: "5rem" },
        }}
      >
        <Typography marginY={2} variant="h1" component="h1">
          Est-ce qu’il fait bon vivre chez vous ?
        </Typography>
        <Typography my={3} variant="h2" component="h2">
          Renseignez l'adresse de votre choix et découvrez sa note ainsi que des
          informations essentielles
        </Typography>
      </Box>
      <Container maxWidth="sm">
        <Box paddingY={2} sx={{ textAlign: "center" }}>
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
              Nous avons croisé les données disponibles en libre service
              d'écologie, de risques de catastrophes naturelles (et bien plus)
              pour que chaque Français puisse voir les informations sur
              l'indice. Ce sont donc des données accessibles à tous, mais nous
              essayons de les rendre accessibles le plus facilement possible.
            </Typography>
          </Box>
        </Box>
      </Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "right",
          paddingX: "1.25rem",
          gap: "1.25rem",
        }}
      >
        <Link
          href="https://github.com/vaTheo/Geonote-Frontend"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubIcon
            sx={{
              transition: "font-size 0.5s ease",
              fontSize: "2.5rem",
              "&:hover": {
                fontSize: "2.7rem",
              },
             
            }}
          ></GitHubIcon>
        </Link>
        <Link
          href="https://www.linkedin.com/in/vatheo/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedIn
            sx={{
              transition: "font-size 0.5s ease",
              fontSize: "2.5rem",
              "&:hover": {
                fontSize: "2.7rem",
              },
            }}
          ></LinkedIn>
        </Link>
      </Box>
    </Container>
  );
};

export default MainPage;
