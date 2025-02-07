import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import EditeForm from "./EditeForm";
import axios from "axios";

function LocationEdite({ updateLocation }) {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { state } = useLocation();
  const locationData = state?.location || {};

  const [form, setForm] = useState({
    startDate: locationData.startDate || "",
    endDate: locationData.endDate || "",
    name: locationData.name || "",
    prenom: locationData.lastName || "",
    cin: locationData.cin || "",
    phone: locationData.phoneNumber || "",
    address: locationData.address || "",
    immatricule: locationData.immatricule || null,
    carName: locationData.carName || null,
    year: locationData.year || null,
    kilometers: locationData.kilometers || null,
    pricePerDay: locationData.pricePerDay || 0,
    etat: locationData.status || "Nouvelle",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5001/car")
      .then((res) => {
        setData(res.data.carsList || []);
      })
      .catch((err) => {
        console.error("Error fetching cars data:", err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));

    if (name === "immatricule") {
      const selectedCar = data.find((car) => car.immatricule === value);
      if (selectedCar) {
        setForm((prevForm) => ({
          ...prevForm,
          carName: selectedCar.name,
          pricePerDay: selectedCar.pricePerDay,
          year: selectedCar.year,
          kilometers: selectedCar.kilometers,
        }));
      } else {
        setForm((prevForm) => ({
          ...prevForm,
          carName: "",
          pricePerDay: "",
          year: "",
          kilometers: "",
        }));
      }
    }
  };
  return (
    <MainLayout>
      <div className="container mt-4 text-left">
        <h1 className="mb-4" style={{ fontSize: "40px", fontWeight: "700" }}>
          Editer Location
        </h1>
        <EditeForm
          form={form}
          onChange={handleChange}
          error={error}
        />
      </div>
    </MainLayout>
  );
}

export default LocationEdite;
