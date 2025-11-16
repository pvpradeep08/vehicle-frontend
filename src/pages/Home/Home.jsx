import React, { useEffect, useState } from "react";
import { getAllVehicles } from "../../api/Api";
import VehicleCard from "../../components/VehicleCard/VehicleCard";
import "./Home.css";

const Home = () => {
  const [vehicles, setVehicles] = useState([]);

  const [searchDistrict, setSearchDistrict] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await getAllVehicles();
        setVehicles(response.data);
      } catch (error) {
        console.error("Error loading vehicles:", error);
      }
    };
    fetchVehicles();
  }, []);

  // FIXED CATEGORY OPTIONS
  const categories = [
    "Car",
    "Bike",
    "Tractor",
    "Excavator",
    "Crane",
    "Heavy Vehicle"
  ];

  // FILTER LOGIC
  const filteredVehicles = vehicles.filter((v) => {
    return (
      v.district.toLowerCase().includes(searchDistrict.toLowerCase()) &&
      (filterCategory === "" || v.type === filterCategory)
    );
  });

  return (
    <div className="home-container">

      {/* FILTERS */}
      <div className="filters-container">

        {/* District Search */}
        <input
          type="text"
          placeholder="Search by district..."
          value={searchDistrict}
          onChange={(e) => setSearchDistrict(e.target.value)}
          className="search-input"
        />

        {/* Category Filter */}
        <select
          className="filter-select"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

      </div>

      {/* VEHICLE LIST */}
      <div className="vehicle-grid">
        {filteredVehicles.length > 0 ? (
          filteredVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))
        ) : (
          <p>No vehicles found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
