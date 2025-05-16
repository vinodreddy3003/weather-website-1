import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import { WaterPercent, WeatherWindy } from "mdi-material-ui";

const WeatherCard = ({ weather }: { weather: any }) => {
  return (
    <Box
      sx={{
        marginTop: "32px",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        padding: "16px",
        borderRadius: "16px",
        textAlign: "center",
        color: "white",
        width: "100%",
        maxWidth: 400,
      }}
    >
      <Typography variant="h3" fontWeight={600} mt={1}>
        {weather.main.temp}°C
      </Typography>
      <Typography variant="h6" mt={1}>
        {weather.name}
      </Typography>

      <Stack
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        spacing={2}
        mt={4}
      >
        <Stack direction="row" >
            <WaterPercent />
          <Stack> <Typography>{weather.main.humidity}%</Typography>
          <Typography>Humidity</Typography></Stack>
          
        </Stack>
        <Stack direction="row" >
          <WeatherWindy />
          <Stack> <Typography>{(weather.wind.speed * 3.6).toFixed(2)} km/h</Typography>
          <Typography>Wind Speed</Typography></Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default WeatherCard;
