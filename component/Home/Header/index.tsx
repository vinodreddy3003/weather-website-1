import React, { useState, useEffect, useMemo } from "react";
import {
  Autocomplete,
  TextField,
  CircularProgress,
  Box,
  Stack,
} from "@mui/material";
import { debounce } from "lodash";
import { CityOption, fetchCities } from "../../../utils/fetchCities";
import { fetchWeather } from "../../../utils/fetchWeather";
import WeatherCard from "../WeatherCard";

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}

const Header = () => {
  const [options, setOptions] = useState<CityOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [selectedCity, setSelectedCity] = useState<CityOption | null>({
    name: "Bengaluru",
    country: "IN",
  });

  useEffect(() => {
    const fetchDefaultWeather = async () => {
      const data = await fetchWeather("Bengaluru");
      setWeather(data);
    };
    fetchDefaultWeather();
  }, []);

  const debouncedFetchCities = useMemo(
    () =>
      debounce(async (query: string) => {
        if (!query) return;
        setLoading(true);
        try {
          const cities = await fetchCities(query);
          setOptions(cities);
        } catch (error) {
          console.error("Failed to fetch cities:", error);
        } finally {
          setLoading(false);
        }
      }, 500),
    []
  );

  const handleInputChange = (event: any, value: string) => {
    debouncedFetchCities(value);
  };

  const handleCitySelect = async (event: any, value: any) => {
    if (value) {
      setSelectedCity(value);
      const data = await fetchWeather(value.name);
      if (data) {
        setWeather(data);
      } else {
        setWeather(null);
      }
    }
  };

  return (
    <Stack
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #3cd3ad, #4cb8c4)",
        display: "flex",
        alignItems: "center",
        padding: "16px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          display: "flex",
          alignItems: "center",
          borderRadius: "100px",
        }}
      >
        <Autocomplete
          freeSolo
          options={options}
          value={selectedCity}
          getOptionLabel={(option:any) => `${option.name}, ${option.country}`}
          onInputChange={handleInputChange}
          onChange={handleCitySelect}
          loading={loading}
          sx={{ flex: 1 }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search city"
              variant="standard"
              InputProps={{
                ...params.InputProps,
                disableUnderline: true,
                sx: {
                  backgroundColor: "white",
                  borderRadius: 3,
                  padding: "6px 12px",
                },
                endAdornment: (
                  <>
                    {loading ? <CircularProgress size={16} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      </Box>

      {weather ? (
        <WeatherCard weather={weather} />
      ) : (
        <Box sx={{ mt: 4, color: "white", fontSize: 18 }}>
          Weather data not found for the selected city.
        </Box>
      )}
    </Stack>
  );
};

export default Header;
