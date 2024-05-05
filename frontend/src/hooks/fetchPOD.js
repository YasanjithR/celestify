import { useEffect, useState } from "react";
import api from "../api/api";

const usePictureOftheDay = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get(
        `planetary/apod?api_key=OavLmh0ZVEG8IEKx8rySKJpzb2h590kqbaxWHUWS`
      );

      setData(result.data);
    };

    fetchData();
  }, []);

  return data;
};

export default usePictureOftheDay;
