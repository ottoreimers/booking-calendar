"use client";

import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { fetchBookings, createBooking } from "@/public/api/api";

import s from "./Calendar.module.scss";

export default function CalendarComponent() {
  const [bookings, setBookings] = useState([]);
  const [events, setEvents] = useState([]);

  console.log(bookings);

  useEffect(() => {
    async function getBookings() {
      try {
        const bookingData = await fetchBookings();
        setBookings(bookingData);
      } catch (error) {
        console.error(error);
      }
    }
    getBookings();
  }, []);

  return (
    <div className={s["Calendar"]}>
      <div className={s["Calendar__Container"]}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={bookings}
        />
      </div>
    </div>
  );
}
