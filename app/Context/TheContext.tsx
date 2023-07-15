import { Dispatch, SetStateAction, createContext } from "react";
import { CountryType } from "../../Types/CountryType";
import { filterType } from "../../Types/FilterType";

export type searchQuery = {
  isSearch: boolean;
  query: string | null;
};

type ContextType = {
  allCountries: CountryType[] | null;
  setAllCountries: Dispatch<SetStateAction<CountryType[] | null>>;
  alpha3: string | null;
  setAlpha3: Dispatch<SetStateAction<string | null>>;
  isSearch: boolean;
  setSearch: Dispatch<SetStateAction<boolean>>;
  isFilter: boolean;
  setFilter: Dispatch<SetStateAction<boolean>>;
  isQuery: string | null;
  setQuery: Dispatch<SetStateAction<string | null>>;
  filterQuery: filterType;
  setFilterQuery: Dispatch<SetStateAction<filterType>>;
  isQueryB: string | null;
  setQueryB: Dispatch<SetStateAction<string | null>>;
  filterQueryB: filterType;
  setFilterQueryB: Dispatch<SetStateAction<filterType>>;
};

const InitialContext: ContextType = {
  allCountries: null,
  setAllCountries: () => {},
  alpha3: null,
  setAlpha3: () => {},
  isSearch: false,
  setSearch: () => {},
  isFilter: false,
  setFilter: () => {},
  isQuery: null,
  setQuery: () => {},
  filterQuery: "All",
  setFilterQuery: () => {},
  isQueryB: null,
  setQueryB: () => {},
  filterQueryB: "All",
  setFilterQueryB: () => {},
};

// Create a new context
const TheContext = createContext<ContextType>(InitialContext);

export default TheContext;
