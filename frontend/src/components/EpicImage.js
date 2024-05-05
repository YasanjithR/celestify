import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import useFetchEPICImage from "../hooks/fetchEPIC";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

const useFetchEPICImages = () => {
  const [images, setImages] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const fetchImagesByDate = async (year, month, day) => {
    try {
      setLoading(true); 
      const response = await fetch(
        `https://epic.gsfc.nasa.gov/api/natural/date/${year}-${month}-${day}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      const urls = data.map(
        (item) =>
          `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/png/${item.image}.png`
      );
      setImages(urls);
    } catch (error) {
      console.log("Error fetching images", error);
    } finally {
      setLoading(false); 
    }
  };

  const fetchImagesByCurrentDate = async () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    await fetchImagesByDate("2017", "08", "21");
  };

  return { images, loading, fetchImagesByDate, fetchImagesByCurrentDate };
};

export default function Epic() {
  const [selectedDate, setSelectedDate] = React.useState(
    new Date().toISOString().slice(0, 10)
  );


  const { images, loading, fetchImagesByDate, fetchImagesByCurrentDate } =
    useFetchEPICImages();

  // Fetch images by current date when the component mounts
  React.useEffect(() => {
    fetchImagesByCurrentDate();
  }, []);

  // Handle date change
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  // Handle form submission
  const handleSubmit = () => {
    const [year, month, day] = selectedDate.split("-");
    fetchImagesByDate(year, month, day);
  };

  return (
    <Container 
      id="epic"
      sx={{
        pt: { xs: 2, sm: 6 },
        pb: { xs: 4, sm: 8 },
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 3, sm: 6 },
        borderRadius: 8,
        boxShadow: 3,
        margin: "20px auto",
        backgroundColor: "#c0c0c0",
      }}
    >
      <Box
        sx={{
          width: { sm: "100%", md: "60%" },
          textAlign: { sm: "left", md: "center" },
        }}
      >
        <Typography component="span"
              variant="h1" style={{ marginBottom: "20px", color: "#1976d2", fontSize: "24px", fontWeight: "bold" }}>
          Earth Polychromatic Imaging Camera
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Uniquely positioned at the Earth-Sun Lagrange point, EPIC provides
          full disc imagery of the Earth and captures unique perspectives of
          certain astronomical events such as lunar transits using a 2048x2048
          pixel CCD (Charge Coupled Device) detector coupled to a 30-cm aperture
          Cassegrain telescope.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: { xs: 2, sm: 4 },
          marginTop: "10px",
          marginBottom: "5px",
        }}
      >
        <TextField
          id="date"
          label="Date"
          type="date"
          defaultValue={selectedDate}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ width: "50%" }}
          onChange={handleDateChange}
          inputProps={{
            max: "2024-05-02",
          }}

        />
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            backgroundColor: "#1976d2",
            color: "#FFFFFF",
            height: "60px",
            width: "100px",
            borderRadius: "10px",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            "&:hover": {
              backgroundColor: "#1976d2",
            },
          }}
        >
          View
        </Button>
      </Box>

      {/* Loading Indicator */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100px",
          marginBottom: "-200px",
        }}
      >
        {loading && <CircularProgress />}
      </Box>

      {/* Image List */}
      <ImageList
        sx={{
          width: "100%",
          height: 450,
          overflow: "auto",
          marginTop: "10px",
          borderRadius: "8px", 
        }}
        cols={3}
      >
        {images.map((image, index) => (
          <ImageListItem key={index} cols={1}>
            <img src={image} alt={`Image ${index}`} />
          </ImageListItem>
        ))}
      </ImageList>
    </Container>
  );
}
