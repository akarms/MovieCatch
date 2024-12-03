import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
  ActivityIndicator,
} from "react-native";
import { fetchMovies } from "../service/apiService";
import Usercard from "../components/usercard";
import { IconButton } from "react-native-paper";
import SearchBar from "../components/searchBar";
import MovieCard from "../components/moviecard";

export default function HomeScreen({ route }) {
  const { username } = route.params;
  // const username = "User";
  const [movies, setMovies] = useState([]);
  const [clickCount, setClickCount] = useState(0);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQueryCountry, setSearchQueryCountry] = useState(null);
  const [searchQueryGenere, setSearchQueryGenere] = useState(null);
  const [searchQueryKeyword, SetSearchQueryKeyword] = useState(null);
  const [changemovie, setChangeMovie] = useState(false);
  const [isMovieLoading, setIsMovieLoading] = useState(false);

  // Fetch movie data when the screen loads
  useEffect(() => {
    const loadMovies = async () => {
      try {
        setIsMovieLoading(true);
        const movieData = await fetchMovies(
          searchQueryCountry ? searchQueryCountry : "us",
          searchQueryGenere ? searchQueryGenere : "action",
          searchQueryKeyword ? searchQueryKeyword : ""
        );
        setIsMovieLoading(false);
        setMovies(movieData);
      } catch (error) {
        console.error("Failed to load movies:", error);
      }
    };
    loadMovies();
  }, [changemovie]);

  const handleMovieClick = () => setClickCount((prev) => prev + 1);

  const handleSearch = async (query, option1, option2) => {
    setSearchQueryCountry(option1);
    setSearchQueryGenere(option2);
    SetSearchQueryKeyword(query);
    setChangeMovie(!changemovie);
    setIsSearchVisible(false);
  };

  return (
    <View style={styles.container}>
      <View>
        <Usercard name={username} />
        {/* Conditional Rendering of Search Options */}
        {isSearchVisible && (
          <View style={styles.searchBox}>
            <SearchBar onSearch={handleSearch} />
          </View>
        )}
      </View>
      {!isSearchVisible && (
        <View style={styles.searchContainer}>
          <IconButton
            icon={"magnify"}
            size={28}
            iconColor={"#fff"}
            onPress={() => setIsSearchVisible(!isSearchVisible)} // Toggle visibility
            style={styles.searchButton}
          />
        </View>
      )}
      {!isMovieLoading ? (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MovieCard
              movie={item}
              onPress={() => {
                handleMovieClick();
              }}
            />
          )}
          contentContainerStyle={{ padding: 10 }}
          scrollEnabled={!isSearchVisible}
        />
      ) : (
        <ActivityIndicator
          style={styles.activityIndicator}
          size="large"
          color="#6200ea"
        />
      )}

      <View style={styles.counter}>
        <Text style={styles.counterText}>Clicks: {clickCount}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 15,
    textAlign: "center",
  },
  list: { padding: 10 },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    overflow: "hidden",
    elevation: 3,
  },
  poster: { width: 120, height: 180 },
  infoContainer: { flex: 1, padding: 10 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  director: { fontSize: 14, color: "#555", marginBottom: 5 },
  overview: { fontSize: 14, color: "#777", marginBottom: 5 },
  genres: { fontSize: 12, fontStyle: "italic", color: "#888", marginBottom: 5 },
  link: { fontSize: 14, color: "#0066cc", textDecorationLine: "underline" },
  counter: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#6200ea",
    borderRadius: 25,
    padding: 15,
    alignItems: "center",
  },
  counterText: { color: "#fff", fontSize: 16 },
  searchContainer: {
    // flexDirection: 'row',
    // justifyContent: 'flex-end',
    // padding: 10,
    // alignItems: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: "absolute",
    bottom: 20,
    left: 20,
    zIndex: 100,
    backgroundColor: "#6200ea",
    borderRadius: 100,
    alignItems: "center",
  },
  searchButton: {
    backgroundColor: "#6200ee",
  },
  searchBox: {
    position: "relative",
    zIndex: 10,
    top: 1,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
