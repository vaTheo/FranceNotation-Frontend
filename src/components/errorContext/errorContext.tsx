// ErrorContext.tsx
import { Modal } from "@mui/material";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface ErrorContextType {
  showError: (message: string) => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const useError = () => {
  const context = useContext(ErrorContext);
  if (context === undefined) {
    throw new Error("useError must be used within an ErrorProvider");
  }
  return context;
};

export const ErrorProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");

  const showError = (message: string) => {
    setMessage(message);
    setIsError(true);
  };

  return (
    <ErrorContext.Provider value={{ showError }}>
      {children}
      {isError && (
        <Modal
          open={isError}
          closeAfterTransition
          onClose={() => setIsError(false)}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {/* Add the required children prop */}
          <div
            style={{
              position: "absolute",
              top: "40px",
              right: "40px",
              backgroundColor: "dimgray",
              padding: "20px",
              borderRadius: "10px",
              color: "white",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
              width: "300px",
              border: "2px solid #ffffff",
            }}
          >
            ERROR: {message}
          </div>
        </Modal>
      )}
    </ErrorContext.Provider>
  );
};
