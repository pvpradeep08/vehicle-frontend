import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/Api"; // ✅ Import the shared axios instance
import "./VehicleCard.css";

const VehicleCard = ({ vehicle }) => {
  const navigate = useNavigate();

  // ✅ Use base URL from api.jsx for dynamic backend path
  const imageUrl = `${api.defaults.baseURL}/vehicles/${vehicle.id}/image`;

  // Navigate to details page when clicking the card
  const handleCardClick = () => {
    navigate(`/vehicle/${vehicle.id}`);
  };

  // Prevent card click when pressing "Book Now" button
  const handleBookNow = (e) => {
    e.stopPropagation();
    navigate(`/vehicle/${vehicle.id}`);
  };

  return (
    <div className="vehicle-card" onClick={handleCardClick}>
      <img src={imageUrl} alt={vehicle.name} className="vehicle-img" />
      <div className="vehicle-info">
        <h3>{vehicle.name}</h3>
        <p><strong>Type:</strong> {vehicle.type}</p>
        <p><strong>Rent/Day:</strong> ₹{vehicle.pricePerDay}</p>
        <p><strong>Area:</strong> {vehicle.area}</p>
        <p><strong>District:</strong> {vehicle.district}</p>

        <button className="book-btn" onClick={handleBookNow}>
          Book Now
        </button>
      </div>
    </div>
  );
};

export default VehicleCard;
