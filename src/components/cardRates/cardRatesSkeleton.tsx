// Importing necessary React functionalities and components
import React, { useState, useEffect, useCallback } from "react";
import CustomSlider from "./slider";
import "../../styles/cardRatesSkeleton.scss";
import { Skeleton } from "@mui/material";
// Component definition: AddressSearch

export default function CardRatesSkeleton() {
  return (
    <div className="cardRateSkeleton">
      <div className="title-skeleton">
        <Skeleton variant="text" className="title-skeleton"></Skeleton>
      </div>
      <div className="text-skeleton">
        <Skeleton variant="text" animation="pulse"></Skeleton>
        <Skeleton variant="text" animation="pulse"></Skeleton>
        <Skeleton variant="text" animation="pulse"></Skeleton>
        <Skeleton variant="text" animation="pulse"></Skeleton>
      </div>
      <div className="slider-skeleton">
        <Skeleton variant="rectangular"></Skeleton>
      </div>
    </div>
  );
}
