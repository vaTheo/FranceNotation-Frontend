import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import "../../styles/customSlideBar.scss"
type PropsSlider ={
  customValue:number
}

export default function CustomSlider(props:PropsSlider) {
  const {customValue} = props
  return (
    <Box className="sidebar"> {/* Apply the sidebar class */}
      <div className="CustomSlider"> {/* Apply the CustomSlider class */}
        <Slider
          // components={{ Thumb: CustomThumb }}
          aria-label="Custom Thumb"
          value={customValue}
          valueLabelDisplay="on"
          step={10}
          marks
        />
      </div>
    </Box>
  );
}