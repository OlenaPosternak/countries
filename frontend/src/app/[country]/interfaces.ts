export interface BordersProps {
  countryCode: string;
  name: string;
  commonName: string;
  officialName: string;
  region: string;
}

export interface CountryInfoProps {
  borders: BordersProps[];
  commonName: string;
  region: string;
  officialName: string;
}

export interface PopulationProps {
  country: string;
  year: string;
  population: string;
}
