// Importing necessary React functionalities and components
import React, { useState, useEffect, useCallback } from "react";
import CustomSlider from "./slider";
import "../../styles/cardRate.scss";
// Component definition: AddressSearch

export type propsResults = {
  titleCard: string;
  textCard: string;
  valueCard:number;
};
export default function CardRates(props: propsResults) {
  const titleCard = props.titleCard;
  const textCard = props.textCard;
  const valueCard = props.valueCard;

  return (
    <div className="cardRate">
      <div className="CardContent">
        <div className="title-card" > {titleCard} {'->'} </div>
        <div className="text-card">{textCard}</div>
        <CustomSlider customValue={valueCard}></CustomSlider>
      </div>
    </div>
  );
}
