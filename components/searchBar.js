import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, activityIndicator } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import * as ApiService from "../service/apiService";
import { set } from "react-hook-form";

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [firstDropdownOpen, setFirstDropdownOpen] = useState(false);
  const [secondDropdownOpen, setSecondDropdownOpen] = useState(false);
  const [firstDropdownValue, setFirstDropdownValue] = useState(null);
  const [secondDropdownValue, setSecondDropdownValue] = useState(null);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [firstDropdownItems, setFirstDropdownItems] = useState([]);
  const [loadingGenres, setLoadingGenres] = useState(true);
  const [secondDropdownItems, setSecondDropdownItems] = useState([]);

  const onSearchhappen = () => {
    console.log(`Search Query: ${searchQuery}`);
    console.log(`Dropdown 1: ${firstDropdownValue}`);
    console.log(`Dropdown 2: ${secondDropdownValue}`);

    onSearch(searchQuery, firstDropdownValue, secondDropdownValue);
  };

  useEffect(() => {
    setLoadingCountries(true);
    ApiService.fetchCountries().then((data) => {
      const dropdownOptions = Object.values(data).map((country) => ({
        label: country.name,
        value: country.countryCode,
      }));
      setFirstDropdownItems(dropdownOptions);
      setLoadingCountries(false);
    });
  }, []);

    useEffect(() => {
    setLoadingGenres(true);
    ApiService.fetchGenres().then((data) => {
      const dropdownOptions = Object.values(data).map((genre) => ({
        label: genre.name,
        value: genre.id,
      }));
      setSecondDropdownItems(dropdownOptions);
      setLoadingGenres(false);
    });
    }, []);

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <TextInput
        label="Search"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
        style={styles.searchInput}
        mode="outlined"
      />

      <View style={styles.dropdowView}>
        {/* First Dropdown */}
        <DropDownPicker
          open={firstDropdownOpen}
          value={firstDropdownValue}
          items={firstDropdownItems}
          setOpen={setFirstDropdownOpen}
          setValue={setFirstDropdownValue}
          setItems={setFirstDropdownItems}
          placeholder={loadingCountries ? "Loading" : "Select Country"}
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
          disabled={loadingCountries}
        />

        {/* Second Dropdown */}
        <DropDownPicker
          open={secondDropdownOpen}
          value={secondDropdownValue}
          items={secondDropdownItems}
          setOpen={setSecondDropdownOpen}
          setValue={setSecondDropdownValue}
          setItems={setSecondDropdownItems}
          placeholder={loadingGenres ? "Loading" : "Select Genre"}
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
          disabled={loadingGenres}
        />
      </View>
      {/* Search Button */}
      <Button
        mode="contained"
        onPress={onSearchhappen}
        style={styles.searchButton}
      >
        Search
      </Button>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    padding: 20,
    gap: 5,
  },
  searchInput: {
    marginBottom: 5,
    backgroundColor: "#fff",
  },
  dropdown: {
    marginBottom: 5,
    borderColor: "#6200ee",
    zIndex: 10,
    width: "100%",
  },
  dropdownContainer: {
    borderColor: "#6200ee",
    width: "100%",
    zIndex: 10,
  },
  searchButton: {
    marginTop: 5,
  },
  dropdowView: {
    flexDirection: "row",
    justifyContent: "left",
    width: "50%",
    gap: 5,
  },
});
