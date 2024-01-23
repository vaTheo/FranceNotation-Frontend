import React, { useState, useEffect, useCallback } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import debounce from "lodash/debounce";
import { AddressObject } from "../../apiResponseType/apiResponse";
import { useInput } from "./useInput.hook";

export default function AddressSearch() {
  const [inputValue, setInputValue] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { value, setValue, onChange } = useInput("");

  const fetchAddresses = async (query: string) => {
    try {
      const response = await fetch(
        `https://api-adresse.data.gouv.fr/search/?q=${query.replace(" ", "+")}`,
        { mode: "cors", method: "GET" }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data: { features: AddressObject[] } = await response.json();
      const labels = data.features.map((feature) => feature.properties.label);
      console.log(labels)
      setOptions(labels);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError('Failed to fetch data');
    }
  };

  const debouncedFetch = useCallback(debounce(fetchAddresses, 300), []);

  useEffect(() => {
    if (inputValue && /^[a-z0-9]{3,}/i.test(inputValue)) {
      debouncedFetch(inputValue);
    } else {
      setOptions(value ? [value] : []);
    }
  }, [inputValue, value, debouncedFetch]);

  return (
    <Autocomplete
      freeSolo
      value={value}
      onChange={(event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue ?? "");
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      options={options}
      renderInput={(params) => (
        <TextField {...params} label="écrivez l’adresse recherchée" variant="outlined" />
      )}
    />
  );
}
