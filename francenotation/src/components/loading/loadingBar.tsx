import React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export interface LoadingIndicatorProps {
  isLoading: boolean; // prop to control the visibility of the loading indicator
  // Add any other props you might need, like styling
}

const CustomLoadingIndicator: React.FC<LoadingIndicatorProps> = ({ isLoading }) => {
  if (!isLoading) {
    return null; // If not loading, don't render the component
  }

  return (
    <Box sx={{ width: '100%', position: 'absolute', top: 0 }}> {/* Example styling, adjust as needed */}
      <LinearProgress />
    </Box>
  );
};

export default CustomLoadingIndicator;
