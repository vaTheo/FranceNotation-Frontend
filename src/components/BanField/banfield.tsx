// Importing necessary React functionalities and components
import React, { useState, useEffect, useCallback } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
// Importing lodash's debounce function to limit how often a function can fire
import debounce from "lodash/debounce";
// Custom type for address response objects
import { AddressObject } from "../../apiResponseType/apiResponse";
// Custom hook for input handling
import { useInput } from "./useInput.hook";
import "../../styles/banfield.scss";

interface AddressSearchBarProps {
  valueAddressSearchBarProps: (ValueAddressSearchBar: string) => void;
}
// Component definition: AddressSearch
export default function AddressSearchBar({
  valueAddressSearchBarProps,
}: AddressSearchBarProps) {
  const exampleValue = "Exemple : 50 quai Rambaud 69002 Lyon";
  // State for the input value
  const [inputValue, setInputValue] = useState<string>("");
  // State for autocomplete options
  const [options, setOptions] = useState<string[]>([]);
  // Destructuring properties from the custom input hook
  const { value, setValue } = useInput(exampleValue);

  // Function to fetch addresses based on the query
  const fetchAddresses = async (query: string) => {
    try {
      // Fetching data from the API and handling spaces in the query
      const response = await fetch(
        `https://api-adresse.data.gouv.fr/search/?q=${query.replace(" ", "+")}`,
        { mode: "cors", method: "GET" }
      );

      // Checking if the response is OK (status in the range 200-299)
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Parsing the JSON response and destructuring features
      const data: { features: AddressObject[] } = await response.json();
      // Mapping the features to get labels
      let labels = data.features.map((feature) => feature.properties.label);
      console.log(labels);
      if (labels.length === 0) {
        labels = ["Aucune addresse correspondant", exampleValue];
      }
      // Updating options state with the labels
      setOptions(labels);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Using useCallback to memoize the debounced version of fetchAddresses
  const debouncedFetch = useCallback(debounce(fetchAddresses, 300), []);

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
        filterOptions={(options, state) => options} // Just return the options
        renderInput={(params) => (
          <TextField
            className="textField"
            {...params}
            label="Écrivez l’adresse recherchée"
            variant="outlined"
          />
        )}
        renderOption={(props, option) => (
          <li className="listAddress" {...props}>
            {option}
          </li>
        )}
      />
    </div>
  );
}
