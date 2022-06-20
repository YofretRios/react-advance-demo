import type { NextPage } from "next";
import {
  useDeferredValue,
  useState,
  useEffect,
  useMemo,
  SyntheticEvent,
  Suspense,
} from "react";

type SearchProps = {
  value: string;
  onChange: (value: string) => void;
};

type City = {
  id: string;
  name: string;
  region: number;
  lat: number;
  lon: number;
};

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY || '',
    "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST || '',
  },
};

const SearchField = ({ value, onChange }: SearchProps) => {
  return (
    <div className="flex items-center">
      <input
        className="w-full p-2 rounded-lg border"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button
        className="ml-2 p-2 rounded-lg border"
        onClick={() => onChange(value)}
      >
        Search
      </button>
    </div>
  );
};

const Suggestions = ({ query }: { query: string }) => {
  const [cities, setCity] = useState<City[]>([]);

  useEffect(() => {
    const fetchCountrySuggestion = async (query: string) => {
      try {
        if (
          !options.headers["X-RapidAPI-Host"] &&
          !options.headers["X-RapidAPI-Key"]
        ) {
          throw new Error("Missing RapidAPI key");
        }

        const response = await fetch(
          `https://weatherapi-com.p.rapidapi.com/search.json?q=${query}`,
          options
        );
        const data = await response.json();
        setCity(data);
      } catch (ex) {
        console.error(ex);
      }
    };

    if (query) {
      fetchCountrySuggestion(query);
    }
  }, [query]);

  return (
    <ul className="flex flex-col">
      {cities.map((country: City) => (
        <li
          key={country.id}
          className="flex flex-col mb-2 rounded-xl border p-4"
        >
          <p className="mr-2">
            <span>Title: </span>
            {country.name}
          </p>
          <p className="mr-2">
            <span>Score: </span>
            {country.region}
          </p>
          <p className="mr-2">
            <span>Location: </span>
            {country.lat}, {country.lon}{" "}
          </p>
        </li>
      ))}
    </ul>
  );
};

const UseDeferredValue: NextPage = () => {
  const [value, setValue] = useState("");
  // const query = useDeferredValue(value);

  // const suggestions = useMemo(
  //   () => <Suggestions query={query} />,
  //   [query]
  // );

  return (
    <div className="max-w-lg mx-auto">
      <SearchField value={value} onChange={setValue} />
      <Suspense fallback="Getting book suggestions">
        <Suggestions query={value} />
        {/* {suggestions} */}
      </Suspense>
    </div>
  );
};

export default UseDeferredValue;
