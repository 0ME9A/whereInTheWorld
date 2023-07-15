import { CountryType } from "../Types/CountryType";
import { filterType } from "../Types/FilterType";

// filter countries with region and search query
export function FilterCountries(
  allCountries: CountryType[] | null,
  isQuery: string | null,
  filterQuery: filterType
): CountryType[] | null {
  const searchQuery = isQuery?.trim().toLowerCase();
  let filterCountries = allCountries;

  if (searchQuery) {
    filterCountries =
      filterCountries &&
      filterCountries.filter((item) => {
        const countryName = item.name.common.toLowerCase();
        return countryName.includes(searchQuery);
      });
  }

  if (filterQuery !== "All") {
    filterCountries =
      filterCountries &&
      filterCountries.filter((item) => {
        return item.region === filterQuery;
      });
  }

  return filterCountries;
}
