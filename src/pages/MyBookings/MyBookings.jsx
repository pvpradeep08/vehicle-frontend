import React, { useEffect, useState, useContext } from "react";
import { getUserBookings, getVehicleImage } from "../../api/Api";
import { AuthContext } from "../../context/AuthContext";
import "./MyBookings.css";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        if (user && user.id) {
          const data = await getUserBookings(user.id);
          setBookings(data.data); // ✅ Correct access
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    fetchBookings();
  }, [user]);

  if (!user) return <p className="info-text">Please login to view your bookings.</p>;
  if (!bookings || bookings.length === 0)
    return <p className="info-text">No bookings found.</p>;

  return (
    <div className="mybookings-container">
      <h2>My Bookings</h2>
      <div className="bookings-list">
        {bookings.map((booking) => {
          const vehicle = booking.vehicle;
          const imageUrl = getVehicleImage(vehicle.id);

          return (
            <div key={booking.id} className="booking-card">
              <img
                src={imageUrl}
                alt={vehicle.name}
                className="booking-image"
              />
              <div className="booking-info">
                <h3>{vehicle.name}</h3>
                <p><strong>Type:</strong> {vehicle.type}</p>
                <p><strong>Rent/Day:</strong> ₹{vehicle.pricePerDay}</p>
                <p><strong>District:</strong> {vehicle.district}</p>
                <p><strong>Area:</strong> {vehicle.area}</p>
                <p><strong>Start Date:</strong> {booking.startDate}</p>
                <p><strong>End Date:</strong> {booking.endDate}</p>
                <p><strong>Provider Name:</strong> {vehicle.providerName}</p>
                <p><strong>Contact:</strong> {vehicle.providerContact}</p>
                
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyBookings;
