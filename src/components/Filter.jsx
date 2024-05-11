import React from "react";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const Filter = ({
  sec,
  secIndex,
  activeFilters,
  setActiveFilters,
  activeFilterOptions,
  onUpdateFilter,
}) => {
  const onChangeFilter = (type, value) => {
    if (isExisted(value)) {
      removeOption(value, type);
    } else {
      addOption(value, type);
    }
    onUpdateFilter();
  };

  const isExisted = (value) => {
    return activeFilterOptions.includes(value);
  };

  const addOption = (value, type) => {
    activeFilterOptions.push(value);
    updateFilter(type);
  };

  const removeOption = (value, type) => {
    let index = activeFilterOptions.indexOf(value);
    activeFilterOptions.splice(index, 1);
    updateFilter(type);
  };

  const updateFilter = (type) => {
    let updateFilters = activeFilters.map((af) => {
      if (af.type == type) {
        af.options = activeFilterOptions;
      }
      return af;
    });
    setActiveFilters(updateFilters);
  };

  return (
    <Stack
      display="flex"
      justifyContent="start"
      direction="column"
      spacing={2}
      key={sec.name}
      className={secIndex === 0 ? null : "padding-top-10"}
    >
      <Typography paddingTop={5} fontWeight="bold" fontSize={16}>
        {sec.name}
      </Typography>

      {sec.options.map((option, optionIndex) => (
        <FormGroup key={`${option.value}-${optionIndex}`}>
          <FormControlLabel
            control={<Checkbox checked={isExisted(option.value)} />}
            label={option.label}
            id={`${sec.id}-${optionIndex}`}
            name={`${sec.id}[]`}
            defaultValue={option.value}
            onChange={() => onChangeFilter(sec.id, option.value)}
          />
        </FormGroup>
      ))}
    </Stack>
  );
};

export default Filter;
