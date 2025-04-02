const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export const fetchBookings = async () => {
  try {
    const res = await fetch(`${API_URL}/bookings/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText || ""}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export const createBooking = async (booking) => {
  try {
    const res = await fetch(`${API_URL}/bookings/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(booking),
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText || ""}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};
