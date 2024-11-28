import axios from 'axios';

const API_KEY = '2d9a3927ffmsh622a801e8b58522p1653cbjsn13419a89cf5b';

export const fetchMovies = async (country = 'us', services = 'netflix') => {
  try {
    const response = await axios.get(
        'https://streaming-availability.p.rapidapi.com/shows/search/filters',
        {
          params: {
            country: country,
            series_granularity: 'show',
            order_direction: 'asc',
            order_by: 'original_title',
            genres_relation: 'and',
            output_language: 'en',
            show_type: 'movie',
          },
          headers: {
            'x-rapidapi-host': 'streaming-availability.p.rapidapi.com',
            'x-rapidapi-key': API_KEY,
          },
        }
      );
      console.log(response.data.shows);
    return response.data.shows;

  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};


export default fetchMovies;
