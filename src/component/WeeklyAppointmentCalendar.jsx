import React, { useState, useCallback, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../styles/WeeklyCalendar.css";
import { BASE_URL } from "../constant/constants";
import AddAppointment from "./AddAppointment";
import useAppointments from "../customhooks/useAppointment";
import { Button, Fab } from "@mui/material";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const WeeklyAppointmentCalendar = ({appointmentSummary}) => {
  const [events, setEvents] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [shouldFetchAppointments, setShouldFetchAppointments] = useState(false);
  const { appointments, loading, error, fetchAppointments } = useAppointments(false);

  useEffect(() => {
    setEvents(appointments);
  }, [appointments]);

  useEffect(() => {
    if (shouldFetchAppointments) {
      fetchAppointments();
      setShouldFetchAppointments(false);
    }
  }, [shouldFetchAppointments, fetchAppointments]);

  const onChangeEventTime = useCallback(async (start, end, eventId) => {
    try {
      setEvents((prevEvents) => {
        const updatedEvents = prevEvents.map((event) =>
          event.id === eventId
            ? { ...event, start: new Date(start), end: new Date(end) }
            : event
        );

        return updatedEvents;
      });

      await axios.patch(`${BASE_URL}/${eventId}`, {
        start: new Date(start),
        end: new Date(end),
      });
    } catch (error) {
      console.error("Error updating event:", error.message);
    }
  }, []);

  const onEventDrop = ({ start, end, event }) => {
    onChangeEventTime(start, end, event.id);
  };

  const onEventResize = ({ start, end, event }) => {
    onChangeEventTime(start, end, event.id);
  };

  const handleAddAppointment = async (newAppointmentData) => {
    try {
      const response = await axios.post(BASE_URL, newAppointmentData);
      setShouldFetchAppointments(true);
      console.log("Appointment added:", response.data);
    } catch (error) {
      console.error("Error:", error.message);
      alert("Failed to add the appointment. Please try again.");
    }
  };

  const Event = ({ event, onDelete }) => {
    return (
      <div className="event-container">
        <div>{event.title}</div>
        <button onClick={() => onDelete(event.id)} className="delete-btn">
          Delete
        </button>
      </div>
    );
  };

  const handleDeleteAppointment = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  return (
    <div className="calendar-container">
      <div className="header-container">
        <h2>Weekly Appointment Organizer</h2>
        <Button onClick={appointmentSummary}>
          Go To AppointmentSummary
        </Button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <div className="dnd-calendar">
        <DnDCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultView="week"
          views={["week"]}
          onEventDrop={onEventDrop}
          onEventResize={onEventResize}
          resizable
          components={{
            event: (props) => (
              <Event {...props} onDelete={handleDeleteAppointment} />
            ),
          }}
          style={{ height: "88vh", backgroundColor: "white" }}
        />
      </div>

      <Fab
        color="primary"
        aria-label="add"
        style={{
          position: "fixed",
          bottom: 30,
          right: 45,
        }}
        onClick={() => setIsAddModalOpen(true)}
      >
        +
      </Fab>

      <AddAppointment
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={(newAppointmentData) => handleAddAppointment(newAppointmentData)}
      />
    </div>
  );
};

export default WeeklyAppointmentCalendar;
