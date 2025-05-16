import React from "react";
import { Box, Typography, Paper, Stack } from "@mui/material";

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

interface Props {
  weather: WeatherData;
}

const WeatherCard: React.FC<Props> = ({ weather }) => {
  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`;

  return (
    <Paper
      elevation={4}
      sx={{
        borderRadius: 4,
        padding: 4,
        background: "rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(10px)",
        color: "#fff",
        textAlign: "center",
        boxShadow: "0 8px 32px rgba(31, 38, 135, 0.2)",
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: 600, mb: 1, textShadow: "1px 1px 2px rgba(0,0,0,0.2)" }}
      >
        {weather.name}
      </Typography>

      <img src={iconUrl} alt={weather.weather[0].description} width={100} />

      <Typography variant="h5" sx={{ mt: 1, textTransform: "capitalize" }}>
        {weather.weather[0].description}
      </Typography>

      <Stack
        direction="row"
        spacing={4}
        justifyContent="center"
        sx={{ mt: 3 }}
      >
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 500 }}>
            🌡️ Temp
          </Typography>
          <Typography variant="body1">
            {Math.round(weather.main.temp)}°C
          </Typography>
        </Box>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 500 }}>
            💧 Humidity
          </Typography>
          <Typography variant="body1">
            {weather.main.humidity}%
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export default WeatherCard;
