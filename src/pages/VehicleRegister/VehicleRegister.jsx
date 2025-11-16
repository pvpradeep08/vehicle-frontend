import React, { useState } from "react";
import { addVehicle } from "../../api/Api";
import "./VehicleRegister.css";

const VehicleRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    model: "",
    type: "",
    pricePerDay: "",
    providerName: "",
    providerContact: "",
    area: "",
    district: "",
    state: "",
    pincode: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const vehiclePayload = {
        name: formData.name,
        model: formData.model,
        type: formData.type,
        pricePerDay: Number(formData.pricePerDay),
        providerName: formData.providerName,
        providerContact: formData.providerContact,
        area: formData.area,
        district: formData.district,
        state: formData.state,
        pincode: formData.pincode,
      };

      await addVehicle(vehiclePayload, formData.image);
      alert("✅ Vehicle registered successfully!");
    } catch (error) {
      console.error("❌ Vehicle registration failed:", error);
      alert("Error registering vehicle. Check backend console.");
    }
  };

  return (
    <div className="vehicle-register-container">
      <h2>Register Vehicle</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input name="name" placeholder="Vehicle Name" required onChange={handleChange} />
        <input name="model" placeholder="Model" required onChange={handleChange} />
        <input name="type" placeholder="Type (e.g., Tractor, Car)" required onChange={handleChange} />
        <input name="pricePerDay" type="number" placeholder="Rent per Day" required onChange={handleChange} />
        <input name="providerName" placeholder="Provider Name" required onChange={handleChange} />
        <input name="providerContact" placeholder="Provider Contact" required onChange={handleChange} />
        <input name="area" placeholder="Area" required onChange={handleChange} />
        <input name="district" placeholder="District" required onChange={handleChange} />
        <input name="state" placeholder="State" required onChange={handleChange} />
        <input name="pincode" placeholder="Pincode" required onChange={handleChange} />
        <label>Upload Image</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button type="submit">Register Vehicle</button>
      </form>
    </div>
  );
};

export default VehicleRegister;
