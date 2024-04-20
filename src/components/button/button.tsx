import React from "react";
import Button from "@mui/material/Button";

export interface CustomButtonProps {
  text: string;
  disabled?: boolean;
  href?: string;
  onClick?: () => void;
  // Add any other props you might need, like 'color', 'size', etc.
}

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  disabled,
  href,
  onClick,
}) => {
  return (
    <Button
      variant="contained"
      disabled={disabled}
      href={href}
      onClick={onClick}
      
    >
      {text}
    </Button>
  );
};

export default CustomButton;
