import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
type PropsSlider = {
  customValue: number;
};

export default function CustomSlider(props: PropsSlider) {
  const { customValue } = props;
  const [value, setValue] = React.useState(customValue);

  // Function to determine sidebar background color based on the slider value
  const getSidebarBackgroundColor = (value: number): string => {
    if (value <= 25) return "#ffcccc";
    else if (value <= 50) return "#fff4cc";
    else if (value <= 75) return "#ccffcc";
    else return "#79b669";
  };
  const sliderTrackColor = getSidebarBackgroundColor(Math.round(value));
  const animateSliderChange = (newValue: number) => {
    const minDuration = 800;
    const maxDuration = 1400;
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
  React.useEffect(() => {
    animateSliderChange(customValue);
  }, [customValue]);

  return (
    <Box>
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
    </Box>
  );
}
