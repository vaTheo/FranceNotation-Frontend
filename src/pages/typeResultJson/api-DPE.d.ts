export interface DPEAllData {
  DPEHabitatExistant: ResultItemDPE[];
  DPEHabitatNeuf: ResultItemDPE[];
  DPETertiaire: ResultItemDPE[];
  DPEHabitatExistantAvant2021: ResultItemDPE[];
  DPETertiaireAvant2021: ResultItemDPE[];
}

// Define the type for the centroid and center (assuming it's an array of numbers)
type Point = number[];

// Define the type for bbox (assuming it's an array of arrays of numbers)
type BoundingBox = number[][];

// Define the type for the results (assuming it's an array of any, need more info to be specific)
type Results = ResultItemDPE[];

interface ResultItemDPE {
  "N°_étage_appartement": number;
  Date_établissement_DPE: string;
  "N°DPE": string;
  Surface_habitable_logement: number;
  Type_bâtiment: string;
  _geopoint: string;
  date_etablissement_dpe: string;
  Etiquette_GES: string;
  Etiquette_DPE: string;
  classe_consommation_energie: string;
  classe_estimation_ges: string;
}

// Define the type for each aggregation object
export interface Aggregation {
  total: number;
  value: string;
  centroid: Point;
  center: Point;
  bbox: BoundingBox;
  results: Results;
}

// Define the type for the overall response
export interface ApiResponse {
  total: number;
  aggs: Aggregation[];
}
