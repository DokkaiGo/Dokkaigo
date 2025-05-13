// LevelSelectScreen.js - This screen allows the user to select a JLPT level and navigates to Dokkai for N5.

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'; // Import necessary components

function LevelSelectScreen({ navigation }) { // React Navigation automatically passes the 'navigation' prop

  // Define the JLPT levels
  const jlptLevels = ['N5', 'N4', 'N3', 'N2', 'N1'];

  // Function to handle a level button press
  const handleLevelSelect = (level) => {
    // Check if the selected level is N5
    if (level === 'N5') {
      // Navigate to the Dokkai screen
      navigation.navigate('Dokkai');
    } else {
      // For other levels, show an alert for now
      Alert.alert('Level Selected', `You selected JLPT ${level}. Dokkai for this level is not yet available.`);
    }
    // Later, you would pass the selected level to the Dokkai screen
    // navigation.navigate('Dokkai', { selectedLevel: level });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Select JLPT Level</Text>

      {/* Container for the level buttons */}
      <View style={styles.buttonContainer}>
        {jlptLevels.map((level) => (
          <TouchableOpacity
            key={level} // Use level as the unique key
            style={styles.levelButton}
            onPress={() => handleLevelSelect(level)} // Call handler with the selected level
          >
            <Text style={styles.levelButtonText}>{`JLPT ${level}`}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Light grey background
    padding: 20,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  buttonContainer: {
    width: '100%', // Make button container take full width
    alignItems: 'center', // Center buttons horizontally
  },
  levelButton: {
    backgroundColor: '#007BFF', // Blue background
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginBottom: 15, // Space between buttons
    width: 250, // Fixed width for buttons
    alignItems: 'center', // Center text horizontally
    shadowColor: '#000', // Add subtle shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 4,
  },
  levelButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LevelSelectScreen; // Export the component
