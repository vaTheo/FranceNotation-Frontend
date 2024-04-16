import { DPEAllData } from "./api-DPE";
import { FeatureCarto } from "./api-cartoParc";
import {
  AZIData,
  CatnatData,
  InstallationsClasseesData,
  MVTData,
  RadonData,
  SISData,
  ZonageSismiqueData,
} from "./api-georisque";

export interface JsonData {
  dataZoneInnondable?: frontzoneInnondable;
  dataCatastropheNaturelle?: frontCatastropheNaturelle;
  dataInstallationClassees?: frontInstallationClassees;
  dataRisqueLocaux?: frontrisqueLocaux;
  dataEau?: frontEau;
  dataDPEBatiment?: frontDPEBatiment;
  dataZoneNaturelle?: frontzoneNaturelle;
  dataParcNaturelle?: frontParcNaturelle;
  dataPollutionSol?: frontpollutionSol;
}
export interface frontzoneInnondable {
  zoneInnondable: AZIData[];
}

export interface frontCatastropheNaturelle {
  CatastropheNaturelle: CatnatData[];
}
export interface frontInstallationClassees {
  InstallationClassees: InstallationsClasseesData[];
}

export interface frontrisqueLocaux {
  risqueLocaux: {
    MVTData?: MVTData[];
    RadonData?: RadonData[];
    ZonageSismiqueData?: ZonageSismiqueData[];
  };
}
export interface frontEau {
  eau: eauAllData;
}

export interface frontDPEBatiment {
  DPEBatiment: DPEAllData;
}
export interface frontzoneNaturelle {
  zoneNaturelle: {
    naturaHabitat?: FeatureCarto[];
    naturaOiseaux?: FeatureCarto[];
    znieff1?: FeatureCarto[];
    znieff2?: FeatureCarto[];
  };
}

export interface frontParcNaturelle {
  parcNaturelle: {
    rnc?: FeatureCarto[];
    rnn?: FeatureCarto[];
    pn?: FeatureCarto[];
    pnr?: FeatureCarto[];
    rncf?: FeatureCarto[];
  };
}
export interface frontpollutionSol {
  pollutionSol: { sis?: SISData[] };
}
