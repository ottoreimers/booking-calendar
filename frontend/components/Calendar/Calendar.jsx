"use client";

import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  fetchBookings,
  createBooking,
  updateBooking,
  deleteBooking,
} from "@/public/api";

import s from "./Calendar.module.scss";
import CreateEvent from "../CreateEvent/CreateEvent.jsx";

export default function CalendarComponent() {
  const [bookings, setBookings] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    async function getBookings() {
      try {
        const bookingData = await fetchBookings();
        console.log("Fetched bookings:", bookingData);
        if (Array.isArray(bookingData)) {
          setBookings(bookingData);
        } else {
          console.error("Expected an array but got:", bookingData);
          setBookings([]);
        }
      } catch (error) {
        console.error(error);
        setBookings([]);
      }
    }

    getBookings();
  }, []);

  const handleCreateBooking = async (bookingData) => {
    try {
      await createBooking(bookingData);
      const createNewBookings = await fetchBookings();
      setBookings(createNewBookings);
      setOpenModal(false);
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);
    setOpenModal(true);
  };

  const handleEventClick = (info) => {
    const bookingData = {
      id: info.event.id,
      name: info.event.extendedProps.name,
      email: info.event.extendedProps.email,
      startTime: info.event.extendedProps.start_time,
      endTime: info.event.extendedProps.end_time,
      date: info.event.startStr.split("T")[0],
      message: info.event.extendedProps.message,
    };
    setOpenModal(true);
    setSelectedBooking(bookingData);
  };

  const handleUpdateBooking = async (bookingData) => {
    try {
      await updateBooking(bookingData.id, bookingData);
      const updatedBookings = await fetchBookings();
      setBookings(updatedBookings);
      setSelectedBooking(null);
      setOpenModal(false);
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    try {
      await deleteBooking(bookingId);
      const updatedBookings = await fetchBookings();
      setBookings(updatedBookings);
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  }

  function renderEventContent(eventInfo) {
    return (
      <>
        <div>{eventInfo.event.title}</div>
        {eventInfo.event.extendedProps.name && (
          <div className={s["Calendar__EventInfo"]}>
            {eventInfo.event.extendedProps.name}
          </div>
        )}
      </>
    );
  }

  return (
    <div className={s["Calendar"]}>
      <div className={s["Calendar__Container"]}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={bookings}
          eventContent={renderEventContent}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          editable={true}
          eventDrop={handleEventClick}
          eventResize={(info) => {
            console.log("Event resized:", info.event);
          }}
          selectable={true}
          select={(selectInfo) => {
            setSelectedDate(selectInfo.startStr);
            setOpenModal(true);
          }}
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
              existingBooking={selectedBooking}
              onCreateBooking={handleCreateBooking}
              onUpdateBooking={handleUpdateBooking}
              onCancel={() => setOpenModal(false)}
            />
            <button
              className={s["Calendar__DeleteButton"]}
              onClick={() => {
                if (selectedBooking) {
                  handleDeleteBooking(selectedBooking.id);
                }
              }}
            >
              Delete Booking
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
