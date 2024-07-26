import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

type PropsSlider = {
  customValue: number;
};

const COLOR_RANGES = {
  25: "#ffcccc",
  50: "#fff4cc",
  75: "#ccffcc",
  100: "#79b669",
} as const;

export default function CustomSlider({ customValue }: PropsSlider) {
  const [value, setValue] = React.useState(customValue);

  const getSidebarBackgroundColor = React.useCallback((value: number): string => {
    const threshold = Object.keys(COLOR_RANGES)
      .map(Number)
      .find(t => value <= t) || 100;
    return COLOR_RANGES[threshold as keyof typeof COLOR_RANGES];
  }, []);

  const animateSliderChange = React.useCallback((newValue: number) => {
    const startTime = performance.now();
    const startValue = value;
    const changeInValue = newValue - startValue;
    const duration = 800; // 1 second

    const animateStep = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      if (elapsedTime < duration) {
        const progress = elapsedTime / duration;
        setValue(startValue + changeInValue * progress);
        requestAnimationFrame(animateStep);
      } else {
        setValue(newValue);
      }
    };

    requestAnimationFrame(animateStep);
  }, [value]);

  const sliderTrackColor = React.useMemo(() => getSidebarBackgroundColor(Math.round(value)), [value, getSidebarBackgroundColor]);

  React.useEffect(() => {
    animateSliderChange(customValue);
  }, [customValue, animateSliderChange]);

  return (
    <Box>
      <Slider
        aria-label="Custom Thumb"
        value={Math.round(value)}
        onChange={(event, newValue) => setValue(newValue as number)}
        valueLabelDisplay="on"
        step={10}
        marks
        style={{ color: sliderTrackColor }}
        disabled={true}
        aria-valuetext={`${Math.round(value)}%`}
      />
    </Box>
  );
}