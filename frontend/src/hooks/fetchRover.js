import { useState } from "react";
const useFetchRocver = () => {
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
    const apiKey = process.env.REACT_APP_NASA_API_KEY;

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
};
