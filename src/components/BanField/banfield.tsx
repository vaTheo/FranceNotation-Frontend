import React, { useState, useEffect, useCallback } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import debounce from "lodash/debounce";
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
const fetchAddresses = useCallback(async (query: string) => {
  try {
    const response = await fetch(
      `https://api-adresse.data.gouv.fr/search/?q=${query.replace(" ", "+")}`,
      { mode: "cors", method: "GET" }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    let labels = data.features.map((feature: any) => feature.properties.label);
    if (labels.length === 0) {
      labels = ["Aucune adresse correspondante", exampleValue];
    }
    setOptions(labels);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}, [exampleValue]); // Include necessary dependenc

  // Using useCallback to memoize the debounced version of fetchAddresses
  const debouncedFetch = useCallback(debounce(fetchAddresses, 300), [fetchAddresses]);

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

// //
// Modify CI Environment Settings: If you want to keep the same behavior as your local environment for the build process, you can modify the CI environment variable setting in your GitHub Actions workflow:
// Update your workflow file to explicitly set CI to false when running the build command:
// yaml
// Copy code
// - name: Build
//   run: CI=false yarn build
// This change tells CRA not to treat warnings as errors, aligning the CI environment's behavior with your local development environment. However, be aware that this might allow some potentially important warnings to go unnoticed.
// Best Practices
// While you can choose to turn off the CI setting for treating warnings as errors, it's generally best to address the warnings directly. This ensures that your code adheres to best practices and helps avoid issues that might arise from overlooked dependencies in React hooks. Additionally, maintaining consistency between local builds and CI builds reduces the "it works on my machine" problems.

// By addressing these ESLint warnings, you ensure that your React components behave as expected and that any state and side effects are properly managed according to the dependencies they rely on.






