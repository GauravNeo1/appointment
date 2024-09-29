import React from "react";
import moment from "moment";
import "../styles/AppointmentSummary.css";
import useAppointments from "../customhooks/useAppointment";
import { Button } from "@mui/material";

const AppointmentSummary = ({WeeklyAppointmentCalendar}) => {
  const { appointments, loading, error } = useAppointments(true);

  const groupedAppointments = appointments.reduce((acc, appointment) => {
    const dateKey = moment(appointment.start).format("MMMM Do YYYY");
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(appointment);
    return acc;
  }, {});

  return (
    <div className="summary-container">

      <div className="header-container">
        <h2>Upcoming Appointments</h2>
          <Button onClick={WeeklyAppointmentCalendar}> Go To WeeklyCalendar</Button>
      </div>

      <div className="appointment-summary">

        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}

        {appointments.length === 0 ? (
          <p className="no-appointments">No upcoming appointments.</p>
        ) : (
          Object.keys(groupedAppointments).map((date) => (
            <div key={date} className="date-group">
              <h3>{date}</h3>
              <ul>
                {groupedAppointments[date].map((appointment) => (
                  <li key={appointment.id} className="appointment-item">
                    <div className="appointment-details">
                      <div className="time-title-container">
                        <p className="appointment-time">
                          {moment(appointment.start).format("h:mm a")} -{" "}
                          {moment(appointment.end).format("h:mm a")}
                        </p>
                        <h4 className="appointment-title">
                          {appointment.title}
                        </h4>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AppointmentSummary;
