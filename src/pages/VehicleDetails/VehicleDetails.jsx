import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getVehicleById, getVehicleImage, createBooking } from "../../api/Api";
import { AuthContext } from "../../context/AuthContext";
import "./VehicleDetails.css";

const VehicleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [vehicle, setVehicle] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // NEW STATE
  const [showPopup, setShowPopup] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const data = await getVehicleById(id);
        setVehicle(data);
      } catch (error) {
        setError("Failed to load vehicle details.");
        console.log(error);

      }
    };
    fetchVehicle();
  }, [id]);

  const openPopup = () => {
    if (!user) {
      alert("Please login to book a vehicle.");
      navigate("/login");
      return;
    }
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setStartDate("");
    setEndDate("");
  };

  // Confirm booking
  const handleConfirmBooking = async () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }

    try {
      setLoading(true);
      const bookingData = {
        userId: user.id,
        vehicleId: vehicle.id,
        startDate,
        endDate,
      };

      await createBooking(bookingData);
      alert("Vehicle booked successfully!");
      closePopup();
      navigate("/mybookings");

    } catch (error) {
      console.error("Error creating booking:",error);
      alert(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  if (error) return <p className="error">{error}</p>;
  if (!vehicle) return <p className="loading">Loading vehicle details...</p>;

  const imageUrl = getVehicleImage(vehicle.id);

  return (
    <div className="vehicle-details">

      {/* POPUP MODAL */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Book Vehicle</h3>

            <label>Start Date:</label>
            <input
              type="date"
              value={startDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setStartDate(e.target.value)}
            />


            <label>End Date:</label>
            <input
              type="date"
              value={endDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setEndDate(e.target.value)}
            />


            <div className="popup-buttons">
              <button onClick={closePopup} className="cancel-btn">
                Cancel
              </button>

              <button
                onClick={handleConfirmBooking}
                className="confirm-btn"
                disabled={loading}
              >
                {loading ? "Booking..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MAIN UI */}
      <div className="vehicle-details-card">
        <img src={imageUrl} alt={vehicle.name} className="vehicle-image" />
        <div className="details">
          <h2>{vehicle.name}</h2>

          <p><strong>Type:</strong> {vehicle.type}</p>
          <p><strong>Rent/Day:</strong> ₹{vehicle.pricePerDay}</p>
          <p><strong>Area:</strong> {vehicle.area}</p>
          <p><strong>District:</strong> {vehicle.district}</p>
          <p><strong>State:</strong> {vehicle.state}</p>
          <p><strong>Pincode:</strong> {vehicle.pincode}</p>
          <p><strong>Provider Name:</strong> {vehicle.providerName}</p>
          <p><strong>Contact:</strong> {vehicle.providerContact}</p>

          <button className="book-now-btn" onClick={openPopup}>
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;
