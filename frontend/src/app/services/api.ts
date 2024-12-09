import { BASE_URL } from "../constants";
import axios from "axios";
export const fetchCountries = async () => {
  try {
    return await axios.get(`${BASE_URL}/api/available-countries`);
  } catch (error) {
    console.error("Error fetching countries:", error);
  }
};

export const fetchCountryById = async ({ id }: { id: string }) => {
  try {
    return await axios.get(`${BASE_URL}/api/countryInfo/${id}`);
  } catch (error) {
    console.error("Error fetching countries:", error);
  }
};

export const fetchPopulation = async ({
  countryName,
}: {
  countryName: string;
}) => {
  try {
    return await axios.get(`${BASE_URL}/api/getPopulation/${countryName}`);
  } catch (error) {
    console.error("Error fetching countries:", error);
  }
};

export const fetchFlag = async ({ countryName }: { countryName: string }) => {
  try {
    return await axios.get(`${BASE_URL}/api/getFlag/${countryName}`);
  } catch (error) {
    console.error("Error fetching countries:", error);
  }
};
