import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import Spinner from "./Spinner";
import "./Search.css";
import { useNavigate } from "react-router-dom";

interface CountryName {
  name: string;
  fullName: string;
}

const Search = () => {
  const [country, setCountry] = useState<string>("");
  const [listCountries, setListCountries] = useState<string[]>([]);
  const [filteredList, setFilteredList] = useState<string[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const res: any = await fetch("https://restcountries.com/v3.1/all")
        .then((data) => data.json())
        .catch((e) => {
          console.log(e);
        });

      setListCountries(res);
    };
    fetchData();
  }, []);

  const handleSearch = (e: any) => {
    const input: string = e.target.value;
    setCountry(e.target.value);
    const bufferList: string[] = listCountries.filter((country: any) => {
      return country.name.common.toLowerCase().includes(input.toLowerCase());
    });
    if (input === "") {
      setFilteredList([]);
    } else {
      setFilteredList(bufferList);
    }
  };
  return listCountries.length === 0 ? (
    <div className="h-screen flex justify-center items-center">
      <Spinner />
    </div>
  ) : (
    <div className="bg-slate-200 h-screen">
      <div className="w-100 h-[150px] flex justify-center items-center bg-slate-800">
        <div className="relative">
          <input
            type="text"
            value={country}
            onChange={(e) => {
              handleSearch(e);
            }}
            placeholder="Search"
            className="h-[50px] w-[350px] p-4 rounded-full"
          />
          <span className="absolute top-[12px] right-[16px] cursor-pointer">
            {country.length === 0 ? (
              <SearchIcon color="disabled" />
            ) : (
              <CloseIcon
                onClick={() => {
                  setCountry("");
                  setFilteredList([]);
                }}
              />
            )}
          </span>
        </div>
      </div>
      {filteredList.length !== 0 ? (
        <div
          className="countryList bg-white mt-[50px] w-[350px] max-h-[330px] overflow-hidden overflow-y-auto
       mx-auto "
        >
          <p className="font-semibold text-2xl mb-4 sticky top-0 bg-white">
            Search Results{` (${filteredList.length})`}
          </p>
          <div>
            {filteredList.map((item: any) => {
              const country: CountryName = {
                name: item.name.common,
                fullName: item.name.official,
              };
              return (
                <div
                  className="countryTile"
                  key={country.name}
                  onClick={() => {
                    navigate(`/countries/${country.name}`);
                  }}
                >
                  <h1 className="text-lg font-semibold">{country.name}</h1>
                  <p className="text-sm">{country.fullName}</p>
                </div>
              );
            })}
          </div>
        </div>
      ) : filteredList.length === 0 && country !== "" ? (
        <div className="mt-[100px] w-screen flex flex-col items-center">
          <p className="text-2xl font-bold text-slate-900">No Country match</p>
        </div>
      ) : null}
    </div>
  );
};

export default Search;
