import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "./Spinner";
import "./CountryDetails.css";

interface CountryDetail {
  name: string;
  capital: string;
  flag: string;
  population: number;
}

const CountryDetails = () => {
  const { countryName } = useParams();
  const [countryDetails, setCountryDetails] = useState<CountryDetail>();
  const [hasResult, setHasResult] = useState<Boolean>(false);

  useEffect(() => {
    const fetchCountryDetails = async () => {
      const res: any = await fetch(
        ` https://restcountries.com/v3.1/name/${countryName}?fullText=true`
      )
        .then((data) => data.json())
        .catch((e) => {
          console.log(e);
        });
      const country: CountryDetail = {
        name: res[0].name.common,
        capital: res[0].capital[0],
        flag: res[0].flags.png,
        population: res[0].population,
      };
      setCountryDetails(country);
      setHasResult(true);
    };

    fetchCountryDetails();
  }, [countryName]);

  return !hasResult ? (
    <div className="h-screen flex justify-center items-center">
      <Spinner />
    </div>
  ) : (
    <div className="flex flex-col justify-center items-center h-screen">
      <div
        className="container  bg-white  w-[350px]  min-h-[220px] overflow-hidden overflow-y-auto
        p-5 rounded-xl "
      >
        <img
          src={countryDetails?.flag}
          alt="Country flag"
          className="rounded-xl w-[300px] h-[180px] mx-auto"
        />
        <div className="countryInfo my-5 ml-2 text-slate-900 text-lg font-semibold">
          <h1>Country: {countryDetails?.name}</h1>
          <h1>Capital: {countryDetails?.capital}</h1>
          <h1>
            Estimated Population:{" "}
            {countryDetails?.population
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
