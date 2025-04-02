import { useState } from "react";
import s from "./CreateEvent.module.scss";

export default function CreateEvent({
  selectedDate,
  onCreateBooking,
  onCancel,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const bookingData = {
      name,
      email,
      start_time: startTime,
      end_time: endTime,
      message,
      date: selectedDate,
    };
    onCreateBooking(bookingData);
  };

  return (
    <div className={s["CreateEvent"]}>
      <h2>Add a new booking</h2>
      <form className={s["CreateEvent__Form"]} onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>

        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="start_time">Start Time:</label>
        <input
          type="time"
          id="start_time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <label htmlFor="end_time">End Time:</label>
        <input
          type="time"
          id="end_time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Create Booking</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}
