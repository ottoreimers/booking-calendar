import { useState, useEffect } from "react";
import s from "./CreateEvent.module.scss";

export default function CreateEvent({
  selectedDate,
  existingBooking,
  onCreateBooking,
  onUpdateBooking,
  onCancel,
}) {
  const [formData, setFormData] = useState(
    existingBooking || {
      id: "",
      name: "",
      date: selectedDate,
      email: existingBooking ? existingBooking.email : "",
      startTime: existingBooking ? existingBooking.startTime : "",
      endTime: existingBooking ? existingBooking.endTime : "",
      message: "",
    },
  );

  useEffect(() => {
    if (existingBooking) {
      setFormData(existingBooking);
    } else {
      setFormData({
        id: "",
        name: "",
        date: selectedDate,
        email: "",
        startTime: "",
        endTime: "",
        message: "",
      });
    }
  }, [existingBooking, selectedDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (existingBooking) {
      onUpdateBooking(formData);
    } else {
      onCreateBooking(formData);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  return (
    <div className={s["CreateEvent"]}>
      <h2>{existingBooking ? "Update booking" : "Add a new booking"}</h2>
      <form className={s["CreateEvent__Form"]} onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={handleChange}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />
        <label htmlFor="startTime">Start Time:</label>
        <input
          type="time"
          id="startTime"
          value={formData.startTime}
          onChange={handleChange}
        />
        <label htmlFor="endTime">End Time:</label>
        <input
          type="time"
          id="endTime"
          value={formData.endTime}
          onChange={handleChange}
        />
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          value={formData.message}
          onChange={handleChange}
        />
        <button type="submit">
          {existingBooking ? "Update Booking" : "Create Booking"}
        </button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}
