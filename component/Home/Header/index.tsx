import React, { useState, useEffect, useMemo } from "react";
import {
  Autocomplete,
  TextField,
  CircularProgress,
  Box,
  Stack,
  Paper,
  Typography,
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
      setWeather(data ?? null);
    }
  };

  return (
    <Stack
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: 500,
          padding: "20px 24px",
          borderRadius: "24px",
          backdropFilter: "blur(12px)",
          background: "rgba(255, 255, 255, 0.3)",
          boxShadow: "0 8px 32px rgba(31, 38, 135, 0.2)",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            color: "#fff",
            textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
            mb: 2,
          }}
        >
          🌤️ Check Weather
        </Typography>

        <Autocomplete
          freeSolo
          options={options}
          value={selectedCity}
          getOptionLabel={(option: any) => `${option.name}, ${option.country}`}
          onInputChange={handleInputChange}
          onChange={handleCitySelect}
          loading={loading}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search for a city"
              variant="outlined"
              fullWidth
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                borderRadius: 2,
                input: { padding: "10px 12px" },
              }}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? (
                      <CircularProgress color="primary" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      </Paper>

      <Box sx={{ mt: 4, width: "100%", maxWidth: 600 }}>
        {weather ? (
          <WeatherCard weather={weather} />
        ) : (
          <Typography
            sx={{
              color: "white",
              fontSize: 18,
              textAlign: "center",
              mt: 2,
              backdropFilter: "blur(4px)",
              padding: 2,
              borderRadius: 2,
            }}
          >
            ⚠️ Weather data not found for the selected city.
          </Typography>
        )}
      </Box>
    </Stack>
  );
};

export default Header;
