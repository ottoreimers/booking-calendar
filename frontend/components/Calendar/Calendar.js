"use client";

import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { fetchBookings, createBooking } from "@/public/api/api";

import s from "./Calendar.module.scss";
import CreateEvent from "../CreateEvent/CreateEvent.js";

export default function CalendarComponent() {
  const [bookings, setBookings] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    async function getBookings() {
      try {
        const bookingData = await fetchBookings();
        console.log(bookingData);
        setBookings(bookingData);
      } catch (error) {
        console.error(error);
      }
    }
    getBookings();
  }, []);

  const events = bookings.map((booking) => {
    const startDate = `${booking.date}T${booking.start_time}`;
    const endDate = `${booking.date}T${booking.end_time}`;

    return {
      title: `${booking.name} - ${booking.start_time.substring(0, 5)}`,
      start: startDate,
      end: endDate,
    };
  });

  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);
    setOpenModal(true);
  };

  function renderEventContent(eventInfo) {
    return (
      <>
        <div>{eventInfo.event.title}</div>
        {eventInfo.event.extendedProps.message && (
          <div className={s.eventMessage}>
            {eventInfo.event.extendedProps.message}
          </div>
        )}
      </>
    );
  }

  const handleCreateBooking = async (bookingData) => {
    try {
      await createBooking(bookingData);
      const updateBookings = await fetchBookings();
      setBookings(updateBookings);
      setOpenModal(false);
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  return (
    <div className={s["Calendar"]}>
      <div className={s["Calendar__Container"]}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          eventContent={renderEventContent}
          dateClick={handleDateClick}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
        />
      </div>
      {openModal && (
        <div className={s["Calendar__ModalOverlay"]}>
          <div className={s["Calendar__Modal"]}>
            <button
              className={s["Calendar__CloseButton"]}
              onClick={() => setOpenModal(false)}
            >
              x
            </button>
            <CreateEvent
              selectedDate={selectedDate}
              onCreateBooking={handleCreateBooking}
              onCancel={() => setOpenModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
