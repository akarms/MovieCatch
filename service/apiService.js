import axios from "axios";
import { Title } from "react-native-paper";
import { MOVIE_API_KEY } from "@env";

const API_KEY = MOVIE_API_KEY;

export const fetchMovies = async (country, genres, keyword = "") => {
  try {
    const response = await axios.get(
      "https://streaming-availability.p.rapidapi.com/shows/search/filters",
      {
        params: {
          country: country,
          series_granularity: "show",
          order_direction: "asc",
          order_by: "original_title",
          genres_relation: "and",
          output_language: "en",
          show_type: "movie",
          genres: genres,
          keyword: keyword,
        },
        headers: {
          "x-rapidapi-host": "streaming-availability.p.rapidapi.com",
          "x-rapidapi-key": API_KEY,
        },
      }
    );
    return response.data.shows;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const fetchCountries = async () => {
  const url =
    "https://streaming-availability.p.rapidapi.com/countries?output_language=en";
  const headers = {
    "x-rapidapi-host": "streaming-availability.p.rapidapi.com",
    "x-rapidapi-key": API_KEY,
  };

  try {
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw error;
  }
};

export const fetchGenres = async () => {
  const url =
    "https://streaming-availability.p.rapidapi.com/genres?output_language=en";
  const headers = {
    "x-rapidapi-host": "streaming-availability.p.rapidapi.com",
    "x-rapidapi-key": API_KEY, // Replace with your actual API key
  };

  try {
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching genres:", error);
    throw error;
  }
};

export default fetchMovies;
