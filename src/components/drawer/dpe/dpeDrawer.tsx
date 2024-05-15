import { useEffect, useState } from "react";
import { ResultItemDPE } from "../../../pages/typeResultJson/api-DPE";
import { FrontDPEBatiment } from "../../../pages/typeResultJson/jsonInterface";

type prop = {
  allDPE: FrontDPEBatiment;
};
export default function DPEDrawer(p: prop) {
  const { allDPE } = p;

  const [DPEHabitatExistant, setDPEHabitatExistant] = useState<
    Array<ResultItemDPE>
  >([]);
  const [DPEHabitatNeuf, setDPEHabitatNeuf] = useState<Array<ResultItemDPE>>(
    []
  );
  const [DPETertiaire, setDPETertiaire] = useState<Array<ResultItemDPE>>([]);
  const [DPEHabitatExistantAvant2021, setDPEHabitatExistantAvant2021] =
    useState<Array<ResultItemDPE>>([]);
  const [DPETertiaireAvant2021, setDPETertiaireAvant2021] = useState<
    Array<ResultItemDPE>
  >([]);

  const dpeMapping = () => {
    setDPEHabitatExistant(
      allDPE.DPEBatiment.DPEHabitatExistant.map((dpe) => {
        return dpe;
      })
    );
    setDPEHabitatNeuf(
      allDPE.DPEBatiment.DPEHabitatNeuf.map((dpe) => {
        return dpe;
      })
    );
    setDPETertiaire(
      allDPE.DPEBatiment.DPETertiaire.map((dpe) => {
        return dpe;
      })
    );
    setDPEHabitatExistantAvant2021(
      allDPE.DPEBatiment.DPEHabitatExistantAvant2021.map((dpe) => {
        return dpe;
      })
    );
    setDPETertiaireAvant2021(
      allDPE.DPEBatiment.DPETertiaireAvant2021.map((dpe) => {
        return dpe;
      })
    );
  };
  useEffect(() => {
    dpeMapping();
  }, [allDPE]);

  return (
    <>
      <h2>Donnée complementaire de Class énergétique du bâtiment</h2>
      <h3>
        Les calsses énérgitique des apartements et maison sont des données
      </h3>
      <p>
        {" "}
        publics, les données avant 2021 ont une fiabilité plus faible du fait{" "}
      </p>
      <p>
        {" "}
        d'un changement de norme, pour vous permettre d'analyser les données 5{" "}
      </p>
      <p> categories se presentent à vous</p>
      {DPEHabitatExistant.length === 0 &&
      DPEHabitatNeuf.length === 0 &&
      DPETertiaire.length === 0 ? (
        <p>
          Aucune donnée DPE n'a été trouvée pour votre adresse dans les DPE
          après 2021.
        </p>
      ) : (
        <p>Données après 2021 : </p>
      )}
      {DPEHabitatExistant.map((dpe) => {
        return (
          <p>
            Date DPE :{" "}
            {dpe.Date_établissement_DPE ?? dpe.date_etablissement_dpe}
            {""}
            Surface : {dpe.Surface_habitable_logement} m² Etiquette DPE :{" "}
            {dpe.Etiquette_DPE} Etiquette GES : {dpe.Etiquette_GES}
          </p>
        );
      })}
      {DPEHabitatNeuf.map((dpe) => {
        return (
          <p>
            Date DPE :{" "}
            {dpe.Date_établissement_DPE ?? dpe.date_etablissement_dpe}
            {""}
            Surface : {dpe.Surface_habitable_logement} m² Etiquette DPE :{" "}
            {dpe.Etiquette_DPE} Etiquette GES : {dpe.Etiquette_GES}
          </p>
        );
      })}
      {DPETertiaire.map((dpe) => {
        return (
          <p>
            Date DPE :{" "}
            {dpe.Date_établissement_DPE ?? dpe.date_etablissement_dpe}
            {""}
            Surface : {dpe.Surface_habitable_logement} m² Etiquette DPE :{" "}
            {dpe.Etiquette_DPE} Etiquette GES : {dpe.Etiquette_GES}
          </p>
        );
      })}
      {DPEHabitatExistantAvant2021.length === 0 &&
      DPETertiaireAvant2021.length === 0 ? (
        <p>
          Aucune donnée DPE n'a été trouvée pour votre adresse dans les DPE
          avant 2021.
        </p>
      ) : (
        <p>Données avant 2021 : </p>
      )}

      {DPEHabitatExistantAvant2021.map((dpe) => {
        return (
          <p>
            Date DPE :{" "}
            {dpe.Date_établissement_DPE ?? dpe.date_etablissement_dpe}
            {""}
            Surface : {dpe.Surface_habitable_logement} m² Etiquette DPE :{" "}
            {dpe.classe_consommation_energie} Etiquette GES :{" "}
            {dpe.classe_estimation_ges}
          </p>
        );
      })}
      {DPETertiaireAvant2021.map((dpe) => {
        return (
          <p>
            Date DPE :{" "}
            {dpe.Date_établissement_DPE ?? dpe.date_etablissement_dpe}
            {""}
            Surface : {dpe.Surface_habitable_logement} m² Etiquette DPE :{" "}
            {dpe.Etiquette_DPE} Etiquette GES : {dpe.Etiquette_GES}
          </p>
        );
      })}
      <p>This is the end your modal content!</p>
    </>
  );
}
