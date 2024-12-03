import React from 'react';
import { View,  Image, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Text , useTheme } from "react-native-paper";



const MovieCard = ({ movie, onPress }) => {
    const theme = useTheme();
    
  if (!movie) {
    return null; // Return nothing i
  }

  // Extract data with fallbacks
  const imageUrl = movie?.imageSet?.verticalPoster?.w480 || null;
  const title = movie?.title || "Unknown Title";
  const directors = movie?.directors?.join(', ') || "Unknown Directors";
  const overview = movie?.overview || "No overview available.";
  const genres = movie?.genres?.map((genre) => genre.name).join(', ') || "Unknown Genres";
  //const streamingLink = movie?.streamingOptions?.us?.[0]?.link;
  const streamingLink = Object.values(movie.streamingOptions)[0][0].link   
  const streamingService = Object.values(movie.streamingOptions)[0][0].service.name

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      accessibilityLabel={`Movie card for ${title}`}
    >
      {/* Movie Poster */}
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.poster} />
      ) : (
        <View style={styles.noImage}>
          <Text style={styles.noImageText}>No Image Available</Text>
        </View>
      )}

      <View style={styles.infoContainer}>
        {/* Title */}
        <Text style={styles.title}>{title}</Text>

        {/* Directors */}
        <Text style={styles.director}>Directed by: {directors}</Text>

        {/* Overview */}
        <Text style={styles.overview}>
          {overview.length > 100 ? `${overview.substring(0, 100)}...` : overview}
        </Text>

        {/* Genres */}
        <Text style={styles.genres}>Genres: {genres}</Text>


        {/* Streaming Link */}
        {streamingLink ? (
          <Text
            style={[styles.link, { color: theme.colors.primary }] }
            onPress={() => Linking.openURL(streamingLink)}
          >
            Watch on {streamingService}
          </Text>
        ) : (
          <Text style={styles.link}>
            Streaming not available
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden',
    elevation: 3,
  },
  poster: {
    width: 120,
    height: 180,
  },
  noImage: {
    width: 120,
    height: 180,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImageText: {
    color: '#999',
    fontSize: 14,
    textAlign: 'center',
  },
  infoContainer: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  director: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  overview: {
    fontSize: 14,
    color: '#777',
    marginBottom: 5,
  },
  genres: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#888',
    marginBottom: 5,
  },
  link: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
