import { DPEAllData } from "./api-DPE";
import { FeatureCarto, ParcCartoAllData } from "./api-cartoParc";
import { eauAllData } from "./api-eau";
import {
  AZIData,
  CatnatData,
  GeorisqueAllData,
  InstallationsClasseesData,
  MVTData,
  RadonData,
  RisquesData,
  SISData,
  ZonageSismiqueData,
} from "./api-georisque"; 

export interface JsonData {
  dataEau?: eauAllData;
  dataDPEBatiment?: DPEAllData;
  dataParcCarto?: ParcCartoAllData;
  dataGeorisque?: GeorisqueAllData;
}

