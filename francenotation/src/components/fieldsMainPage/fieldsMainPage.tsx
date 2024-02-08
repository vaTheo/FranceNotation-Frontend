import React from "react";
import TextField from "@mui/material/TextField";
import "./fieldsMainPage.scss";

export interface CustomInputFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
}

const CustomInputField: React.FC<CustomInputFieldProps> = ({
  label,
  type,
  value,
  onChange,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="custom-input-field">
      <TextField
        label={label}
        type={type}
        value={value}
        onChange={handleInputChange}
        variant="outlined"
      />
    </div>
  );
};

export default CustomInputField;
