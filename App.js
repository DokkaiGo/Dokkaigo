// App.js - This file sets up your app's navigation structure including the LevelSelectScreen.

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import your screen components
import LoginScreen from './LoginScreen'; // Import the LoginScreen component
import DokkaiScreen from './DokkaiScreen'; // Import the DokkaiScreen component
import LevelSelectScreen from './LevelSelectScreen'; // !!! IMPORTANT: Import the LevelSelectScreen component

// --- Define your navigation stack ---

const Stack = createStackNavigator();

// This is the main component that sets up navigation
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">{/* Set Login as the first screen */}
        {/* Login Screen */}
        <Stack.Screen
          name="Login" // The name for the Login route
          component={LoginScreen} // The component for the Login screen
          options={{ headerShown: false }} // Hide the header bar on the login screen (optional but common)
        />
        {/* !!! IMPORTANT: Add the Level Select Screen to the navigator !!! */}
        <Stack.Screen
          name="LevelSelect" // The name for the Level Select route - MUST MATCH the name used in navigation.navigate
          component={LevelSelectScreen} // The component for the Level Select screen
          options={{ title: 'Select Level' }} // Header title for Level Select screen
        />
        {/* Dokkai Screen */}
        <Stack.Screen
          name="Dokkai" // The name for the Dokkai route
          component={DokkaiScreen} // The component for the Dokkai screen
          options={({ navigation, route }) => ({ // Use a function for options to access navigation/route if needed
            title: 'Dokkai(読解)', // Changed header title to Dokkai(読解)
            headerRight: () => ( // Define the component for the right side of the header (NEXT button)
              <TouchableOpacity
                onPress={() => {
                  // Placeholder for navigating to the next reading passage
                  // In a real app, you'd load the next passage data and update the screen
                  alert('NEXT Button Pressed! Load next passage here.'); // Show an alert for now
                  // Example navigation to a 'NextReading' screen (if you create one):
                  // navigation.navigate('NextReading');
                }}
                style={{ marginRight: 15 }} // Add some margin to the right of the button
              >
                <Text style={{ color: '#007BFF', fontSize: 16, fontWeight: 'bold' }}>NEXT</Text> {/* Button text style */}
              </TouchableOpacity>
            ),
          })}
        />
        {/* Add other screens to the stack here as you create them */}
        {/* Example: Add a placeholder for a potential next reading screen */}
        {/* <Stack.Screen name="NextReading" component={DokkaiScreen} options={{ title: 'Next Reading' }} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  // Global styles if needed
});

export default App; // Export the main App component which contains the navigator
