import axios from "axios";

// 👇 Define and export the CityOption type
export interface CityOption {
  name: string;
  country: string;
}

export const fetchCities = async (query: string): Promise<CityOption[]> => {
  if (!query) return [];

  try {
    const response = await axios.get('https://wft-geo-db.p.rapidapi.com/v1/geo/cities', {
      params: {
        namePrefix: query,
        countryIds: 'IN',  
      },
      headers: {
        'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY!,
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
      },
    });

    return response.data.data.map((city: any) => ({
      id: city.id,
      name: city.city,
      country: city.country,
    }));
  } catch (error) {
    console.error('City fetch error:', error);
    return [];
  }
};
