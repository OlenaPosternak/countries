"use client";

import { Loader } from "./Loader";
import Link from "next/link";
interface Country {
  countryCode: string;
  name: string;
}

interface ListOfCountriesProps {
  isLoading: boolean;
  countries: Country[];
}

export const ListOfCountries = ({
  isLoading,
  countries,
}: ListOfCountriesProps) => {
  return (
    <ul>
      {isLoading ? (
        <Loader />
      ) : countries.length > 0 ? (
        countries.map((country, index) => (
          <li key={index}>
            <Link href={`/${country.countryCode}`}>
              {country.name} ({country.countryCode})
            </Link>
          </li>
        ))
      ) : (
        <li>No countries found.</li>
      )}
    </ul>
  )
}
