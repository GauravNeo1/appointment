import './App.css';
import AppointmentSummary from './component/AppointmentSummary';
import WeeklyAppointmentCalendar from './component/WeeklyAppointmentCalendar';
import { useState } from 'react';

function App() {
  const [toggle, setToggle] = useState(false)
  return (
    <div className="App">
      {!toggle ?
        <WeeklyAppointmentCalendar appointmentSummary={() => setToggle(!toggle)} />
        :
        <AppointmentSummary WeeklyAppointmentCalendar={() => setToggle(!toggle)} />
        }
    </div>
  );
}

export default App;
