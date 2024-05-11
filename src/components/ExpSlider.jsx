import React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material";

const ExpSlider = ({ selectedExp, changeExp }) => {
  return (
    <div>
      <Box
        height={20}
        width={200}
        my={4}
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        gap={1}
        p={2}
        marginBottom={5}
      >
        <Typography id="input-slider" fontWeight="bold" fontSize={16} gutterBottom>
          Choose Experience
        </Typography>

        <Slider
          sx={{ width: 200 }}
          value={selectedExp}
          onChange={changeExp}
          valueLabelDisplay="off"
          min={0}
          max={15}
          id="input-slider"
        />
      </Box>
    </div>
  );
};

export default ExpSlider;
