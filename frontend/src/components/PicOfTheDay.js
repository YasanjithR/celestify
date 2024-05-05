import React from "react";
import { Grid, Container } from "@material-ui/core";
import Typography from "@mui/material/Typography";
import usePictureOftheDay from "../hooks/fetchPOD";

const PicOfTheDay = () => {
  const data = usePictureOftheDay();

  return (
    <Container
      id="pod"
      style={{
        borderRadius: 8,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        padding: "20px",
        margin: "20px auto",
        marginTop: "80px",
        backgroundColor: "#c0c0c0", 
      }}
    >
      <Typography
        component="h2"
        variant="h4" 
        align="center"
        gutterBottom
        style={{ fontWeight: "bold", marginBottom: "20px", color: "#333" }}
      >
        Astronomy Picture of the Day
      </Typography>
      <Grid container spacing={2}>
        {/* Image column */}
        <Grid item xs={12} md={6}>
          <img
            src={data?.url}
            alt="Placeholder"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "8px", 
            }}
          />
        </Grid>

        {/* Details column */}
        <Grid item xs={12} md={6}>
          <div style={{ padding: "0 20px" }}>
            <Typography variant="h6" gutterBottom>
              {data?.title || "Title Placeholder"}
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              {data?.explanation || "Explanation Placeholder"}
            </Typography>
            <hr style={{ borderColor: "#ccc", margin: "20px 0" }} />
            <Typography variant="subtitle1" align="center" gutterBottom style={{ color: "#666" }}>
              Learn more about this image:
            </Typography>
            <Typography variant="body2" align="center" style={{ marginBottom: "10px" }}>
              High-Resolution Image:{" "}
              <a href={data?.hdurl || "#"} target="_blank" rel="noopener noreferrer" style={{ color: "#007bff", textDecoration: "none" }}>
                View
              </a>
            </Typography>
            <Typography variant="body2" align="center" style={{ marginBottom: "10px" }}>
              APOD Website:{" "}
              <a href={data?.apod_site || "#"} target="_blank" rel="noopener noreferrer" style={{ color: "#007bff", textDecoration: "none" }}>
                Visit
              </a>
            </Typography>
            <hr style={{ borderColor: "#ccc", margin: "20px 0" }} />
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PicOfTheDay;
