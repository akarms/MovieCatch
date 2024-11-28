import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { fetchMovies } from '../service/apiService'; 

export default function HomeScreen({ route }) {
  const { username } = route.params; // Receive username from LoginScreen
  const [movies, setMovies] = useState([]);
  const [clickCount, setClickCount] = useState(0);


    // Fetch movie data when the screen loads
    useEffect(() => {
      const loadMovies = async () => {
        try {
          const movieData = await fetchMovies('us', 'netflix'); 
          setMovies(movieData);
        } catch (error) {
          console.error('Failed to load movies:', error);
        }
      };
      loadMovies();
    }, []);

  const handleMovieClick = () => setClickCount((prev) => prev + 1);

  const renderMovie = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleMovieClick()}
    >
      {/* Display movie poster */}
      <Image
        source={{ uri: item.imageSet?.verticalPoster?.w480 }}
        style={styles.poster}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.director}>Directed by: {item.directors?.join(', ')}</Text>
        <Text style={styles.overview}>
          {item.overview.length > 100 ? `${item.overview.substring(0, 100)}...` : item.overview}
        </Text>
        <Text style={styles.genres}>
          Genres: {item.genres?.map((genre) => genre.name).join(', ')}
        </Text>
        {item.streamingOptions?.ca?.length > 0 && (
          <TouchableOpacity
            onPress={() => Linking.openURL(item.streamingOptions.ca[0].link)}
          >
            <Text style={styles.link}>
              Watch on {item.streamingOptions.ca[0].service.name}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome, {username}</Text>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMovie}
        contentContainerStyle={styles.list}
      />
      
      <View style={styles.counter}>
        <Text style={styles.counterText}>Clicks: {clickCount}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { fontSize: 24, fontWeight: 'bold', padding: 15, textAlign: 'center' },
  list: { padding: 10 },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden',
    elevation: 3,
  },
  poster: { width: 120, height: 180 },
  infoContainer: { flex: 1, padding: 10 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  director: { fontSize: 14, color: '#555', marginBottom: 5 },
  overview: { fontSize: 14, color: '#777', marginBottom: 5 },
  genres: { fontSize: 12, fontStyle: 'italic', color: '#888', marginBottom: 5 },
  link: { fontSize: 14, color: '#0066cc', textDecorationLine: 'underline' },
  counter: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#6200ea',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
  },
  counterText: { color: '#fff', fontSize: 16 },
});
