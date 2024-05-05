import { useEffect, useState } from "react";
import api from "../api/api";

let cache = {};

const useIPSFetchDataFromDonki = (startDate, endDate, type) => {
  console.log(startDate, endDate, type);
  console.log(type);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const response = await api.get(
        `DONKI/IPS?startDate=2016-01-01&endDate=2016-01-30&api_key=OavLmh0ZVEG8IEKx8rySKJpzb2h590kqbaxWHUWS`
      );

      setData(response.data);
    };

    fetchData();
    setLoading(false);
  }, []);

  return { data, loading, error };
};

export default useIPSFetchDataFromDonki;
