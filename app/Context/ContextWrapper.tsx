import { CountryType } from "../../Types/CountryType";
import { filterType } from "../../Types/FilterType";
import { useState, ReactNode } from "react";

import TheContext from "./TheContext";

export default function ContextWrapper({ children }: { children: ReactNode }) {
  const [allCountries, setAllCountries] = useState<CountryType[] | null>(null);
  const [alpha3, setAlpha3] = useState<string | null>(null);
  const [isSearch, setSearch] = useState<boolean>(false);
  const [isFilter, setFilter] = useState<boolean>(false);
  const [filterQuery, setFilterQuery] = useState<filterType>("All");
  const [filterQueryB, setFilterQueryB] = useState<filterType>("All");
  const [isQuery, setQuery] = useState<string | null>(null);
  const [isQueryB, setQueryB] = useState<string | null>(null);

  return (
    <TheContext.Provider
      value={{
        allCountries,
        setAllCountries,
        alpha3,
        setAlpha3,
        isSearch,
        setSearch,
        isFilter,
        setFilter,
        isQuery,
        setQuery,
        filterQuery,
        setFilterQuery,
        isQueryB,
        setQueryB,
        filterQueryB,
        setFilterQueryB,
      }}
    >
      {children}
    </TheContext.Provider>
  );
}
