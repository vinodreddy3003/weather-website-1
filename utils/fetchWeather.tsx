import axios from 'axios';

export const fetchWeather = async (city: string) => {
  try {
    const res = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: city,
        units: 'metric',
        appid: process.env.NEXT_PUBLIC_WEATHER_API_KEY,
      },
    });

    return res.data;
  } catch (err) {
    console.error('Error fetching weather:', err);
    return null;
  }
};
