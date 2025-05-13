// LoginScreen.js - This file contains the UI for the Login screen with Login, Signup, and Social buttons including Apple ID.

import React, { useState } from 'react'; // Import useState hook for managing input state
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button, Alert } from 'react-native'; // Import necessary components from react-native, including Button and Alert

// We are not using authentication logic for now
// import { auth } from './firebaseConfig'; // Remove or comment out if not using Firebase
// import { supabase } from './supabaseClient'; // Remove or comment out if not using Supabase
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'; // Remove or comment out if not using Firebase
// import { createClient } from '@supabase/supabase-js'; // Remove or comment out if not using Supabase


function LoginScreen({ navigation }) { // React Navigation automatically passes the 'navigation' prop
  // State variables to hold the values typed into the email and password input fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle login button press - NOW NAVIGATES (placeholder)
  const handleLoginPress = () => {
    Alert.alert('Login Button Pressed', 'Login functionality will be added here.');
    // In a real app, you would add authentication logic here
    // On successful authentication, you would navigate:
    navigation.navigate('LevelSelect'); // Navigate to the 'LevelSelect' route for now
  };

  // Placeholder function for signup button press
  const handleSignupPress = () => {
      Alert.alert('Signup Button Pressed', 'Signup functionality will be added here.');
      // In a real app, you would add signup logic here
      // On successful signup, you might navigate or show a success message
  };

  // Placeholder function for social login button press
  const handleSocialLoginPress = (provider) => {
    Alert.alert(`${provider} Login`, `${provider} login functionality will be added here.`);
    // Add social login logic here later
  };

  // Placeholder function for Apple ID login button press
  const handleAppleLoginPress = () => {
      Alert.alert('Apple ID Login', 'Apple ID login functionality will be added here.');
      // Add Apple ID login logic here later
  };


  return (
    <View style={styles.container}>
      {/* Text Logo */}
      <Text style={styles.logoText}>DokkaiGo</Text>

      {/* Tagline */}
      <Text style={styles.taglineText}>From Beginner to Pro—Master Dokkai with Ease.</Text> {/* Added tagline */}


      {/* Email and Password Input Fields */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address" // Set keyboard type for email input
          autoCapitalize="none" // Prevent auto-capitalization for email
          value={email} // Bind the input value to the 'email' state
          onChangeText={setEmail} // Update the 'email' state when the text changes
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry // Hide the text entered in the password field
          value={password} // Bind the input value to the 'password' state
          onChangeText={setPassword} // Update the 'password' state when the text changes
        />
      </View>

      {/* Colorful Login Button using TouchableOpacity */}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLoginPress} // This button now navigates (placeholder)
      >
        {/* IMPORTANT: Text inside TouchableOpacity MUST be wrapped in <Text> */}
        <Text style={styles.loginButtonText}>Login</Text> {/* Text on the button */}
      </TouchableOpacity>

      {/* Colorful Signup Button using TouchableOpacity */}
      <TouchableOpacity
        style={[styles.loginButton, styles.signupButton]} // Apply login button style and override with signup style
        onPress={handleSignupPress} // This button triggers the signup placeholder
      >
        {/* IMPORTANT: Text inside TouchableOpacity MUST be wrapped in <Text> */}
        <Text style={styles.loginButtonText}>Sign Up</Text> {/* Text on the button */}
      </TouchableOpacity>


      {/* Separator or divider text */}
      {/* IMPORTANT: Text MUST be wrapped in <Text> */}
      <Text style={styles.separatorText}>OR</Text>

      {/* Social Login Options Container */}
      <View style={styles.socialLoginContainer}>
        {/* IMPORTANT: Text MUST be wrapped in <Text> */}
        <Text style={styles.loginPromptText}>Login with:</Text>

        {/* Google Login Button (Placeholder) */}
        <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#4285F4' }]} onPress={() => handleSocialLoginPress('Google')}>
          {/* IMPORTANT: Text inside TouchableOpacity MUST be wrapped in <Text> */}
          <Text style={styles.socialButtonText}>Login with Google</Text>
        </TouchableOpacity>

        {/* Facebook Login Button (Placeholder) */}
        <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#3b5998', marginTop: 10 }]} onPress={() => handleSocialLoginPress('Facebook')}>
          {/* IMPORTANT: Text inside TouchableOpacity MUST be wrapped in <Text> */}
          <Text style={styles.socialButtonText}>Login with Facebook</Text>
        </TouchableOpacity>

        {/* Apple ID Login Button (Placeholder) */}
        <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#000000', marginTop: 10 }]} onPress={handleAppleLoginPress}>
          {/* IMPORTANT: Text inside TouchableOpacity MUST be wrapped in <Text> */}
          <Text style={styles.socialButtonText}>Login with Apple ID</Text>
        </TouchableOpacity>

      </View>

      {/* Note: Sign Up link/button can be added later */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20, // Add some padding around the content
  },
  logoText: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 5, // Reduced margin below logo to bring tagline closer
    color: '#333', // Dark grey color for the logo
  },
  taglineText: { // Added style for the tagline
    fontSize: 14, // Smaller font size
    color: '#555', // Medium grey color
    marginBottom: 40, // Space below tagline before inputs
    fontStyle: 'italic', // Optional: make tagline italic
  },
  inputContainer: {
    width: '100%', // Make input container take full width available
    marginBottom: 20, // Space below the input fields section
  },
  input: {
    height: 50, // Set the height of the input fields
    borderColor: '#ccc', // Color of the input field border
    borderWidth: 1, // Width of the input field border
    borderRadius: 25, // Rounded corners for the input fields
    paddingHorizontal: 15, // Padding inside inputs
    marginBottom: 15, // Space between inputs
    fontSize: 16, // Font size of the input text
  },
  // Style for the colorful main login button
  loginButton: {
    backgroundColor: '#FF5733', // Example colorful background color (Orange-Red)
    paddingVertical: 15, // Vertical padding inside the button
    paddingHorizontal: 50, // Horizontal padding inside the button
    borderRadius: 25, // Rounded corners for the button
    marginTop: 10, // Space above the button
    width: '100%', // Make button take full width of its container
    alignItems: 'center', // Center text horizontally within the button
    justifyContent: 'center', // Center text vertically within the button
    // Optional: Add shadow for depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Elevation for Android shadow
  },
  loginButtonText: {
    color: 'white', // Color of the button text
    fontSize: 18, // Font size of the button text
    fontWeight: 'bold', // Make the button text bold
  },
  // New style for the signup button (inherits from loginButton and overrides)
  signupButton: {
      backgroundColor: '#007BFF', // Example colorful background color (Blue)
      marginTop: 15, // Add space between Login and Signup buttons
  },
  separatorText: {
    marginVertical: 20, // Space above and below the "OR" text
    fontSize: 18, // Font size of the "OR" text
    color: '#555', // Color of the "OR" text
  },
  socialLoginContainer: { // Container for the social login buttons section
    alignItems: 'center', // Center social login buttons horizontally
    marginTop: 20, // Space above the social login section
  },
  loginPromptText: { // Style for the "Login with:" text
    fontSize: 18, // Font size
    marginBottom: 15, // Space below the text
    color: '#555', // Color
  },
  socialButton: { // Style for the social login buttons
    paddingVertical: 12, // Vertical padding
    paddingHorizontal: 40, // Horizontal padding
    borderRadius: 25, // Rounded corners
    width: 250, // Fixed width for social buttons
    alignItems: 'center', // Center text horizontally
    justifyContent: 'center', // Center text vertically
  },
  socialButtonText: { // Style for the text inside social login buttons
    color: 'white', // White text color
    fontSize: 16, // Font size
    fontWeight: 'bold', // Bold text
  },
});

export default LoginScreen; // Export the component to be used in navigation
