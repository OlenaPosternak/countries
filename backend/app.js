const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

// Middleware
app.use(cors()); // CORS handling
app.use(express.json()); // JSON parsing
app.use(express.urlencoded({ extended: false })); // Form data parsing

// Base route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Endpoint: Get Available Countries
app.get("/api/available-countries", async (req, res) => {
  try {
    const response = await axios.get(
      "https://date.nager.at/api/v3/AvailableCountries"
    );

    const filteredCountry = response.data.filter(
      (country) => country.name !== "Russia"
    );
    res.json(filteredCountry);
  } catch (error) {
    console.error("Error fetching available countries:", error.message);
    res.status(500).json({ message: "Failed to fetch available countries" });
  }
});

app.get("/api/countryInfo/:countryCode", async (req, res) => {
  const { countryCode } = req.params;
  try {
    const response = await axios.get(
      `https://date.nager.at/api/v3/CountryInfo/${countryCode}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching country info:", error.message);
    res.status(500).json({ message: "Failed to fetch country info" });
  }
});

app.get("/api/getPopulation/:countryName", async (req, res) => {
  const { countryName } = req.params;
  try {
    const response = await axios.get(
      "https://countriesnow.space/api/v0.1/countries/population"
    );

    const filteredCountry = response.data.data.find(
      (country) => country.country.toLowerCase() === countryName.toLowerCase()
    );

    if (!filteredCountry) {
      return res.status(404).json({ message: "Country not found" });
    }

    const latestPopulationData =
      filteredCountry.populationCounts[
        filteredCountry.populationCounts.length - 1
      ];

    res.json({
      country: filteredCountry.country,
      year: latestPopulationData.year,
      population: latestPopulationData.value,
    });
  } catch (error) {
    console.error("Error fetching country population:", error.message);
    res.status(500).json({ message: "Failed to fetch country population" });
  }
});

app.get("/api/getFlag/:countryName", async (req, res) => {
  const { countryName } = req.params;
  try {
    const response = await axios.get(
      "https://countriesnow.space/api/v0.1/countries/flag/images"
    );

    const filteredCountry = response.data.data.find(
      (country) => country.name.toLowerCase() === countryName.toLowerCase()
    );

    if (!filteredCountry) {
      return res.status(404).json({ message: "Country not found" });
    }

    res.json({
      name: filteredCountry.name,
      flag: filteredCountry.flag,
    });
  } catch (error) {
    console.error("Error fetching country flag:", error.message);
    res.status(500).json({ message: "Failed to fetch country flag" });
  }
});

module.exports = app;
