import React, { useState } from "react";
import {
  Grid,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
} from "@material-ui/core";
import roverPlaceholder from "../assets/rover-1.jpg";

const RoverDetails = () => {
  const rovers = [
    {
      name: "Spirit",
      image: "https://mars.nasa.gov/mer/images/rover/rover-index-main.jpg",
      description: [
        "Landed on Mars in 2004",
        "Mission duration: 6 years",
        "Travelled over 7.7 km",
      ],
    },
    {
      name: "Opportunity",
      image: "https://mars.nasa.gov/mer/images/rover/rover-index-main.jpg",
      description: [
        "Landed on Mars in 2004",
        "Mission duration: 15 years",
        "Travelled over 45 km",
      ],
    },
    {
      name: "Curiosity",
      image:
        "https://mars.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/02802/opgs/edr/ncam/NRB_673925503EDR_D0861630TRAV01617M_.JPG",
      description: [
        "Landed on Mars in 2012",
        "Still operational",
        "Travelled over 23 km",
      ],
    },
  ];
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedRover, setSelectedRover] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [roverError, setRoverError] = useState(false);

  const handleSubmit = async () => {
    if (!selectedDate) {
      setDateError(true);
    } else {
      setDateError(false);
    }

    if (!selectedRover) {
      setRoverError(true);
    } else {
      setRoverError(false);
    }

    if (!selectedDate || !selectedRover) {
      return;
    }

    const formattedDate = selectedDate.split("-").join("-");
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${formattedDate}&api_key=OavLmh0ZVEG8IEKx8rySKJpzb2h590kqbaxWHUWS`
      );
      const data = await response.json();

      if (data.photos.length > 0) {
        const photo = data.photos[0];
        const imageUrl = photo.img_src;
        setSelectedImage({
          url: imageUrl,
          earthDate: photo.earth_date,
          camera: photo.camera.full_name,
        });
      } else {
        alert("No image found for the selected date and rover");
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      id="rover"
      style={{
        borderRadius: 8,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        padding: "20px",
        margin: "20px auto",
        backgroundColor: "#c0c0c0",
      }}
    >
      <Typography
        component="div"
        align="center"
        gutterBottom
        style={{
          marginBottom: "20px",
          color: "#1976d2",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        <div style={{ marginBottom: "10px" }}>Mars Rovers</div>
        <Typography variant="body1" style={{ color: "#333", fontSize: "18px" }}>
          This API is designed to collect image data gathered by NASA's
          Curiosity, Opportunity, and Spirit rovers on Mars and make it more
          easily available to other developers, educators, and citizen
          scientists.
        </Typography>
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "300px",
              }}
            >
              <CircularProgress />
            </div>
          ) : (
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "640px",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <img
                src={selectedImage ? selectedImage.url : roverPlaceholder}
                alt="Mars Rover"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              {selectedImage && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    background: "rgba(0, 0, 0, 0.7)",
                    color: "#fff",
                    padding: "8px",
                  }}
                >
                  <Typography variant="subtitle1">
                    Earth Date: {selectedImage.earthDate}
                  </Typography>
                  <Typography variant="subtitle1">
                    Camera: {selectedImage.camera}
                  </Typography>
                </div>
              )}
            </div>
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
          {rovers.map((rover, index) => (
            <Paper
              key={index}
              elevation={3}
              style={{
                padding: "20px",
                borderRadius: "8px",
                marginBottom: "20px",
              }}
            >
              <Typography component="h2" variant="h5" color="text.primary">
                {rover.name}
              </Typography>
              <ul>
                {rover.description.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
            </Paper>
          ))}

          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={12} sm={4}>
              <TextField
                id="date"
                label="Date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  max: "2024-01-21",
                }}
                variant="outlined"
                fullWidth
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
              {dateError && (
                <Typography variant="caption" color="error">
                  Please select a date
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="select"
                select
                label="Choose Rover"
                variant="outlined"
                fullWidth
                value={selectedRover}
                onChange={(e) => setSelectedRover(e.target.value)}
              >
                <MenuItem value="">Select Rover</MenuItem>
                <MenuItem value="Opportunity">Opportunity</MenuItem>
                <MenuItem value="Spirit">Spirit</MenuItem>
                <MenuItem value="Curiosity">Curiosity</MenuItem>
              </TextField>
              {roverError && (
                <Typography variant="caption" color="error">
                  Please select a rover
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                fullWidth
              >
                View
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RoverDetails;
