export interface Country {
  altSpellings: string[];
  area: number;
  borders: string[];
  capital: string[];
  capitalInfo: object;
  car: object;
  cca2: string;
  cca3: string;
  ccn3: string;
  cioc: string;
  coatOfArms: object;
  continents: string[];
  currencies: object;
  demonyms: object;
  fifa: string;
  flag: string;
  flags: object;
  idd: object;
  independent: boolean;
  landlocked: boolean;
  languages: object;
  latlng: number[];
  maps: object;
  name: CountryName;
  population: number;
  region: string;
  startOfWeek: string;
  status: string;
  subregion: string;
  timezones: string[];
  tld: string[];
  translations: object;
  unMember: boolean;
}

export interface CountryName {
  name: string;
  common: string;
  nativeName: object;
  official: string;
}