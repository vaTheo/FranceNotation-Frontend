import CustomSlider from "./slider";
import "../../styles/cardRate.scss";
// Component definition: AddressSearch

type Props = {
  titleCard?: string;
  textCard: string;
  valueCard: number;
  dataTypeJson: string;
  onTitleClick?: (data: string) => void;
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
    <div className="cardRate">
      <div className="CardContent">
        <div className="title-card" onClick={handleTitleClick}>
          {titleCard}
        </div>
        <div className="text-card">{textCard}</div>
        <CustomSlider customValue={valueCard}></CustomSlider>
      </div>
    </div>
  );
}
