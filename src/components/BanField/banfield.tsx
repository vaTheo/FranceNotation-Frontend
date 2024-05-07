import React, { useState, useEffect, useCallback } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import debounce from "lodash/debounce";
import { useInput } from "./useInput.hook";
import "../../styles/banfield.scss";

interface AddressSearchBarProps {
  valueAddressSearchBarProps: (ValueAddressSearchBar: string) => void;
  enterPressed: () => void;
}
// Component definition: AddressSearch
export default function AddressSearchBar({
  valueAddressSearchBarProps,enterPressed
}: AddressSearchBarProps) {
  const exampleValue = "Exemple : 50 quai Rambaud 69002 Lyon";
  // State for the input value
  const [inputValue, setInputValue] = useState<string>("");
  // State for autocomplete options
  const [options, setOptions] = useState<string[]>([]);
  // Destructuring properties from the custom input hook
  const { value, setValue } = useInput(exampleValue);

  // Function to fetch addresses based on the query
  const fetchAddresses = useCallback(
    async (query: string) => {
      try {
        const response = await fetch(
          `https://api-adresse.data.gouv.fr/search/?q=${query.replace(
            " ",
            "+"
          )}`,
          { mode: "cors", method: "GET" }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        let labels = data.features.map(
          (feature: any) => feature.properties.label
        );
        if (labels.length === 0) {
          labels = ["Aucune adresse correspondante"];
        }
        setOptions(labels);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    [exampleValue]
  ); // Include necessary dependenc

  // Using useCallback to memoize the debounced version of fetchAddresses
  const debouncedFetch = useCallback(debounce(fetchAddresses, 300), [
    fetchAddresses,
  ]);

  // useEffect hook to handle side effects related to inputValue changes
  useEffect(() => {
    // Check if inputValue is valid (at least 3 alphanumeric characters) and call debouncedFetch
    if (
      inputValue &&
      /^[a-z0-9 ]{3,}/i.test(inputValue) &&
      inputValue !== exampleValue
    ) {
      const trimValue = inputValue.trim();
      debouncedFetch(trimValue);
    } else {
      // If not valid, update options based on existing value
      setOptions(value ? [value] : []);
    }
  }, [inputValue, value, debouncedFetch]);
  const sendValueParent = (ValueAddressSearchBar: string) => {
    valueAddressSearchBarProps(ValueAddressSearchBar);
  };
  // Rendering the Autocomplete component
  return (
    <div className="AddressSearch">
      <Autocomplete
        className="Autocomplete"
        freeSolo
        value={value}
        selectOnFocus={true}
        clearOnBlur={false}
        inputValue={inputValue}
        options={options}
        onChange={(event, newValue) => {
          setValue(newValue ?? "");
          sendValueParent(newValue || "");
        }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
          sendValueParent(newInputValue);
        }}
        onFocus={() => {
          if (inputValue === exampleValue) {
            setInputValue("");
          }
        }}
        filterOptions={(options, state) => {
          return options.filter((option) => option !== exampleValue);
        }}
        renderInput={(params) => (
          <TextField
            className="textField"
            {...params}
            label="Écrivez l’adresse recherchée"
            variant="outlined"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                enterPressed();
              }
            }}
          />
        )}
        renderOption={(props, option) => <li {...props}>{option}</li>}
      />
    </div>
  );
}
