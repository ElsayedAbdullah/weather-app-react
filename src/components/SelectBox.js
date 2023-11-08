import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function SelectBox({ country, handleChange }) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Country</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={country}
          label="Country"
          onChange={handleChange}
        >
          <MenuItem value={"egypt"}>Egypt</MenuItem>
          <MenuItem value={"jordan"}>Jordan</MenuItem>
          <MenuItem value={"usa"}>USA</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default SelectBox;
