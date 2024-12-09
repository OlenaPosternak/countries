"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { fetchCountryById, fetchFlag, fetchPopulation } from "../services/api";
import { Loader } from "../components/Loader";
import { CountryInfoProps, PopulationProps } from "./interfaces";
import { ArrowLeft } from "../images/ArrowLeft";

const CountryPage = () => {
  const [countryInfo, setCountryInfo] = useState<CountryInfoProps | null>(null);
  const [population, setPopulation] = useState<PopulationProps | null>(null);
  const [flag, setFlag] = useState<string | null>(null);
  const { country: countryId } = useParams<{ country: string }>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCountryData = async () => {
      if (typeof countryId === "string") {
        try {
          setIsLoading(true);

          const countryResult = await fetchCountryById({ id: countryId });
          setCountryInfo(countryResult?.data);

          if (countryResult?.data?.commonName) {
            const populationResult = await fetchPopulation({
              countryName: countryResult.data.commonName,
            });
            setPopulation(populationResult?.data);

            const flagResult = await fetchFlag({
              countryName: countryResult.data.commonName,
            });
            setFlag(flagResult?.data?.flag);
          }
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching country data:", error);
          setIsLoading(false);
        }
      }
    };

    fetchCountryData();
  }, [countryId]);

  return (
    <section className="container mx-auto my-12">
      <Link href="/" className="flex gap-2 items-center">
        <ArrowLeft />
        Home
      </Link>

      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-1 font-bold">
          <p>
            Name:{" "}
            <span className="font-normal"> {countryInfo?.commonName} </span>
          </p>
          <p>
            Region: <span className="font-normal"> {countryInfo?.region} </span>
          </p>
          <p>
            Official Name:{" "}
            <span className="font-normal"> {countryInfo?.officialName}</span>
          </p>
          <div>
            Country Borders:
            <ul className="flex flex-col font-normal">
              {countryInfo?.borders.map((border, index) => (
                <Link key={index} href={`/${border.countryCode}`}>
                  {border.commonName} ({border.countryCode})
                </Link>
              ))}
            </ul>
          </div>
          <p>Population info</p>
          <p>
            Year: <span className="font-normal">{population?.year}</span>
          </p>
          <p>Number of people: {population?.population}</p>
          {flag && <Image src={flag} alt="Flag" width={150} height={150} />}
        </div>
      )}
    </section>
  );
};

export default CountryPage;
