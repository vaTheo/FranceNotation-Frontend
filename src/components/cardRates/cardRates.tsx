import CustomSlider from "./slider";
import "../../styles/cardRate.scss";
import { TypeCards } from "../../utils/enum";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Box, Paper, Typography } from "@mui/material";

type Props = {
  titleCard?: string;
  textCard: string;
  valueCard: number;
  dataTypeJson: TypeCards;
  onTitleClick?: (data: TypeCards) => void;
};
export default function CardRates(props: Props) {
  const titleCard = props.titleCard;
  const textCard = props.textCard;
  const valueCard = props.valueCard;
  const dataTypeJson = props.dataTypeJson;
  const onTitleClick = props.onTitleClick;

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
          padding: "0.5rem",
        }}
      >
        <Box mx={0} sx={{ flexGrow: 1 }}>
          <Typography variant="h5" component="h5" onClick={handleTitleClick}>
            {titleCard}
          </Typography>
          <Typography variant="body2" component="p">
            {textCard}
          </Typography>
        </Box>
        <Box sx={{ padding: 1 }}>
          <CustomSlider customValue={valueCard}></CustomSlider>
        </Box>
      </Paper>
    </Grid2>
  );
}
