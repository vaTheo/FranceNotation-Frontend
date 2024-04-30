import { DPEAllData } from "./api-DPE";
import { FeatureCarto } from "./api-cartoParc";
import { eauAllData } from "./api-eau";
import {
  AZIData,
  CatnatData,
  InstallationsClasseesData,
  MVTData,
  RadonData,
  RisquesData,
  SISData,
  ZonageSismiqueData,
} from "./api-georisque";

export interface JsonData {
  dataZoneInnondable?: FrontzoneInnondable;
  dataCatastropheNaturelle?: FrontCatastropheNaturelle;
  dataInstallationClassees?: FrontInstallationClassees;
  dataRisqueLocaux?: FrontrisqueLocaux;
  dataEau?: FrontEau;
  dataDPEBatiment?: FrontDPEBatiment;
  dataZoneNaturelle?: FrontzoneNaturelle;
  dataParcNaturelle?: FrontParcNaturelle;
  dataPollutionSol?: FrontpollutionSol;
  dataRisqueInformation?: FrontRisqueInformation;
}
export interface FrontzoneInnondable {
  zoneInnondable: AZIData[];
}

export interface FrontCatastropheNaturelle {
  CatastropheNaturelle: CatnatData[];
}
export interface FrontInstallationClassees {
  InstallationClassees: InstallationsClasseesData[];
}

export interface FrontrisqueLocaux {
  risqueLocaux: {
    MVTData?: MVTData[];
    RadonData?: RadonData[];
    ZonageSismiqueData?: ZonageSismiqueData[];
  };
}
export interface FrontEau {
  eau: eauAllData;
}

export interface FrontDPEBatiment {
  DPEBatiment: DPEAllData;
}
export interface FrontzoneNaturelle {
  zoneNaturelle: {
    naturaHabitat?: FeatureCarto[];
    naturaOiseaux?: FeatureCarto[];
    znieff1?: FeatureCarto[];
    znieff2?: FeatureCarto[];
  };
}

export interface FrontParcNaturelle {
  parcNaturelle: {
    rnc?: FeatureCarto[];
    rnn?: FeatureCarto[];
    pn?: FeatureCarto[];
    pnr?: FeatureCarto[];
    rncf?: FeatureCarto[];
  };
}
export interface FrontpollutionSol {
  pollutionSol: { sis?: SISData[] };
}

export interface FrontRisqueInformation {
  risqueInformation: {
    risqueInformation: RisquesData[];
  };
}
