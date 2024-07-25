import * as turf from '@turf/turf';

export interface CartoParcResponse {
    type: string;
    features: FeatureCarto[];
    totalFeatures: number;
    numberMatched: number;
    numberReturned: number;
    timeStamp: string;
    crs: CRSCarto;
    bbox: number[];
  }
  
  export interface ParcCartoAllData{
    rate?: number;
    naturaHabitat?: FeatureCarto[];
    naturaOiseaux?: FeatureCarto[];
    rnc?: FeatureCarto[];
    rnn?: FeatureCarto[];
    znieff1?: FeatureCarto[];
    znieff2?: FeatureCarto[];
    pn?: FeatureCarto[];
    pnr?: FeatureCarto[];
    rncf?: FeatureCarto[];

  }
  interface FeatureCarto {
    type?: string;
    id?: string;
    geometry?: GeometryCarto;
    geometry_name?: string;
    properties?: PropertiesCarto;
    area?:number;
  }
  
  interface GeometryCarto {
    type: string;
    coordinates: number[][][][];
  }
  
  interface PropertiesCarto {
    sitecode: string;
    sitename: string;
    url: string;
    bbox: number[];
    nom:string;
  }
  
  interface CRSCarto {
    type: string;
    properties: {
      name: string;
    };
  }

