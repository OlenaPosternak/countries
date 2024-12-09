"use client";

import { ListOfCountries } from "./components/ListOfCountries";
import { SearchForm } from "./components/SearchFrom";
import { useEffect, useState } from "react";
import { fetchCountries } from "./services/api";

interface Country {
  countryCode: string;
  name: string;
}

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchValue, setSearchValue] = useState("");

  const getCountries = async () => {
    try {
      const result = await fetchCountries();
      if (result?.data) {
        setCountries(result.data);
      } else {
        console.error("No data received");
      }
    } catch (error) {
      console.error("Error fetching countries:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCountries();
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchValue)
  );

  return (
    <section className="container mx-auto my-12">
      <h1 className="text-2xl font-bold ">Available Countries</h1>
      <p>{filteredCountries.length} countries are available</p>
      <SearchForm
        isLoading={isLoading}
        search={searchValue}
        setSearch={setSearchValue}
      />
      <ListOfCountries countries={filteredCountries} isLoading={isLoading} />
    </section>
  );
}
