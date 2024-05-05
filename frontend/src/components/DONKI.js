import React, { useState } from "react";
import {
  Grid,
  Container,
  Typography,
  TextField,
  MenuItem,
} from "@material-ui/core";
import CMEComponent from "./CMEComponent";
import IPSComponent from "./IPSComponent";
import SolarFlareComponent from "./SolarFlareComponent";
import SEPCompoenent from "./SEPComponent";

const DONKIForm = () => {
  const [startDate, setStartDate] = useState("2022-05-30");
  const [endDate, setEndDate] = useState("2022-05-31");
  const [selectedType, setSelectedType] = useState("CME");

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  let componentToRender;
  if (selectedType === "CME") {
    componentToRender = (
      <CMEComponent
        title="Title for Option 1"
        startDate={startDate}
        endDate={endDate}
        type={selectedType}
      />
    );
  } else if (selectedType === "IPS ") {
    componentToRender = (
      <IPSComponent
        title="Title for Option 2"
        startDate={startDate}
        endDate={endDate}
        type={selectedType}
      />
    );
  } else if (selectedType === "FLR") {
    componentToRender = (
      <SolarFlareComponent
        title="Title for Option 3"
        startDate={startDate}
        endDate={endDate}
        type={selectedType}
      />
    );
  }

  return (
    <Container
      id="donki"
      style={{
        borderRadius: 8,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        padding: "20px",
        margin: "20px auto",
        backgroundColor: "#c0c0c0",
      }}
    >
      <Typography
        component="h2"
        variant="h5"
        align="center"
        gutterBottom
        style={{ fontWeight: "bold", marginBottom: "20px", color: "#333" }}
      >
        Space Weather Database Of Notifications, Knowledge, Information (DONKI)
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                id="start-date"
                label="Start Date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                id="end-date"
                label="End Date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                fullWidth
              />
            </Grid>

            {/* Type */}
            <Grid item xs={12}>
              <TextField
                id="type"
                select
                label="Type"
                fullWidth
                value={selectedType}
                onChange={handleTypeChange}
              >
                <MenuItem value="CME">CME</MenuItem>
                <MenuItem value="IPS ">IPS </MenuItem>
                <MenuItem value="FLR">Solar Flare </MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid item xs={12}>
            {componentToRender}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DONKIForm;
