// Importing necessary React functionalities and components
import React, { useState, useEffect, useCallback } from "react";
import CustomSlider from "./slider";
import "../../styles/cardRate.scss";
// Component definition: AddressSearch

export type Props = {
  titleCard?: string;
  textCard: string;
  valueCard: number;
  dataTypeJson: string;
  onTitleClick?: (dataTypeJson: string) => void; // Callback prop
};
export default function CardRates(props: Props) {
  const titleCard = props.titleCard;
  const textCard = props.textCard;
  const valueCard = props.valueCard;
  const dataTypeJson = props.dataTypeJson;
  const handleTitleClick = () => {
    if (props.onTitleClick && dataTypeJson) {
      props.onTitleClick(dataTypeJson);
    }
  };

  return (
    <div className="cardRate" onClick={handleTitleClick}>
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
