import { useEffect, useState } from "react";
import api from "../api/api";

let cache = {};

const useSolarFetchDataFromDonki = (startDate, endDate, type) => {
  console.log(startDate, endDate, type);
  console.log(type);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const response = await api.get(
        `DONKI/FLR?startDate=${startDate}&endDate=${endDate}&api_key=OavLmh0ZVEG8IEKx8rySKJpzb2h590kqbaxWHUWS`
      );

      setData(response.data);
    };

    fetchData();
    setLoading(false);
  }, []);

  return { data, loading, error };
};

export default useSolarFetchDataFromDonki;
