import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import "../../styles/customSlideBar.scss";
type PropsSlider = {
  customValue: number;
};

export default function CustomSlider(props: PropsSlider) {
  const { customValue } = props;
  const [value, setValue] = React.useState(customValue);


  // Function to determine sidebar background color based on the slider value
  const getSidebarBackgroundColor = (value: number): string => {
    if (value <= 25) return '#ffcccc'; // Reddish for low values
    else if (value <= 50) return '#fff4cc'; // Yellowish for mid-low values
    else if (value <= 75) return '#ccffcc'; // Light greenish for mid-high values
    else return '#79b669'; // Green for the highest values
  };
  const sliderTrackColor = getSidebarBackgroundColor(Math.round(value));


  React.useEffect(() => {
    // Function to gradually change the slider value
    const animateSliderChange = (newValue: number) => {
      // Define minimum and maximum durations
      const minDuration = 800; // Minimum duration in milliseconds
      const maxDuration = 1400; // Maximum duration in milliseconds

      // Calculate a dynamic duration based on the newValue
      const range = Math.abs(newValue - value); // The difference between the new value and the current value
      const normalizedRange = range / 100; // Assuming your slider values range from 0 to 100, adjust this based on your actual range
      const duration =
        minDuration + (maxDuration - minDuration) * normalizedRange;

      const steps = 50; // Number of steps to reach the new value
      const stepDuration = duration / steps;
      const stepSize = (newValue - value) / steps;

      for (let i = 1; i <= steps; i++) {
        setTimeout(() => {
          setValue((value) => value + stepSize);
        }, i * stepDuration);
      }
    };

    animateSliderChange(customValue);
  }, [customValue,value]);

  return (
    <Box className="sidebar">
    <div className="CustomSlider">
      <Slider
        aria-label="Custom Thumb"
        value={Math.round(value)}
        onChange={(event, newValue) => setValue(newValue as number)}
        valueLabelDisplay="on"
        step={10}
        marks
        style={{ color: sliderTrackColor }} // Apply the dynamic color here
        disabled={true} // This makes the slider non-interactive
      />
    </div>
  </Box>
  );
}
