import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../constant/constants";

const useAppointments = (upcoming = false) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAppointments = async () => {
    setLoading(true); 
    try {
      const response = await axios.get(BASE_URL, {
        params: { upcoming },
      });

      const convertedEvents = response.data.map((event) => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
      }));

      setAppointments(convertedEvents);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [upcoming]);

  return { appointments, loading, error, fetchAppointments };
};

export default useAppointments;
