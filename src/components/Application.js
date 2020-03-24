import React, { useState, useEffect } from "react";
import axios from "axios";

import DayList from "./DayList";
import Appointment from "components/Appointment/index";
import "components/Application.scss";
import getAppointmentsForDay from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState({ ...state, day });
  const appointments = getAppointmentsForDay(state, state.day);

  useEffect(() => {
    Promise.all([
      Promise.resolve(
        axios
          .get("http://localhost:8001/api/days")
          .then(request => {
            return request.data;
          })
      ),
      Promise.resolve(
        axios
          .get("http://localhost:8001/api/appointments")
          .then(request => {
            return request.data;
          })
      ),
      Promise.resolve(
        axios
          .get("http://localhost:8001/api/interviewers")
          .then(request => {
            return request.data;
          })
      )
    ]).then( (all) => {
      console.log(all[0],all[1], all[2]);
      setState(prev => ({ ...prev, days: all[0], appointments:all[1], interviewers: all[2] }));
    }).catch(e => console.log("there was a error"));
  }, []);

  const appointmentList = appointments.map(appointment => {
    // transform interview here
    
    return <Appointment key={appointment.id} {...appointment} />;
  });
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">{appointmentList}</section>
    </main>
  );
}