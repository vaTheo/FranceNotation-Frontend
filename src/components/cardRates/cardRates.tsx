import CustomSlider from "./slider";
import { TypeCards } from "../../utils/enum";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Box, Paper, Skeleton, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
type Props = {
  titleCard?: string;
  textCard: string;
  valueCard: number;
  dataTypeJson: TypeCards;
  loading?: boolean;
  onTitleClick?: (data: TypeCards) => void;
};
export default function CardRates(props: Props) {
  const {
    titleCard,
    textCard,
    valueCard,
    dataTypeJson,
    onTitleClick,
    loading,
  } = props;

  // const loading = true;
  const handleTitleClick = () => {
    if (onTitleClick) {
      onTitleClick(dataTypeJson);
    } else {
      // Default behavior or no-op
      console.error("Title clicked - no parent handler");
    }
  };
  return (
    <Grid2 xs={12} sm={6} md={3}>
      <Paper
        elevation={1}
        sx={{
          height: "100%",
          width: "100%",
          borderRadius: "15px",
          display: "flex",
          flexDirection: "column",
          padding: "1rem 1rem 0rem 1rem",
          background: "#49454f",
        }}
      >
        <Box
          mx={0}
          sx={{
            flexGrow: 1,
          }}
        >
          {!loading ? (
            <>
              <Typography
                variant="titleCards"
                component="h3"
                sx={{
                  cursor: "pointer",
                  transition: "font-size 0.5s ease",
                  display: "flex",
                  alignItems: "center",
                  "&:hover": {
                    fontSize: "1.3rem",
                  },
                }}
                onClick={handleTitleClick}
              >
                {titleCard} <ArrowForwardIcon sx={{ transform: "20px" }} />
              </Typography>{" "}
            </>
          ) : (
            <Skeleton
              variant="text"
              sx={{
                background: "#b8d6b0",
                height: "1.5rem",
                marginBottom: "1rem",
              }}
            ></Skeleton>
          )}
          {!loading ? (
            <Typography variant="bodyCards" component="p" mt={1}>
              {textCard}
            </Typography>
          ) : (
            <>
              <Skeleton variant="text"></Skeleton>
              <Skeleton variant="text"></Skeleton>
              <Skeleton variant="text"></Skeleton>
              <Skeleton variant="text"></Skeleton>
            </>
          )}
        </Box>
        <Box mt={4} sx={{}}>
          {!loading ? (
            <CustomSlider customValue={valueCard}></CustomSlider>
          ) : (
            <Skeleton
              variant="text"
              sx={{ background: "#b8d6b0", height: "2.5rem" }}
            ></Skeleton>
          )}
        </Box>
      </Paper>
    </Grid2>
  );
}
