// App.js - This file sets up your app's navigation structure with default header for Dokkai.

import React from 'react';
// Remove imports for Text, TouchableOpacity, View as they are no longer needed for header buttons here
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import your screen components
import LoginScreen from './LoginScreen'; // Import the LoginScreen component
import DokkaiScreen from './DokkaiScreen'; // Import the DokkaiScreen component
import LevelSelectScreen from './LevelSelectScreen'; // Import the LevelSelectScreen component

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
        {/* Level Select Screen */}
        <Stack.Screen
          name="LevelSelect" // The name for the Level Select route
          component={LevelSelectScreen} // The component for the Level Select screen
          options={{ title: 'Select Level' }} // Header title for Level Select screen
        />
        {/* Dokkai Screen */}
        <Stack.Screen
          name="Dokkai" // The name for the Dokkai route
          component={DokkaiScreen} // The component for the Dokkai screen
          options={({ navigation, route }) => ({ // Use a function for options to access navigation/route if needed
            title: `Dokkai ${route.params?.currentPassageIndex + 1 || 1}`, // Update title format based on route params if available
            headerShown: true, // Ensure the default header is shown
            // Remove headerRight and headerLeft definitions here
            // headerRight: () => (...)
            // headerLeft: () => (...)
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
