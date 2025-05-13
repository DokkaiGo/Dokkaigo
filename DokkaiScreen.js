// DokkaiScreen.js - Reading Comprehension Screen with Local Content and Slightly More Grey Background

import React, { useState } from 'react'; // Import useState to manage state
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native'; // Import necessary components

function DokkaiScreen({ navigation }) {
  // --- Local Content ---
  // Define the original reading comprehension text (replace with your actual text)
  const originalDokkaiText = "きのう、わたしは ともだちと こうえんに いきました。こうえんで サンドイッチを たべて、ジュースを のみました。ともだちは いぬと あそびました。わたしは いぬが すきです。そのあと、ふたりで うちに かえりました。";

  // Define the translation of the reading comprehension text (replace with your actual translation)
  const translatedDokkaiText = "Yesterday, I went to the park with my friend. At the park, we ate sandwiches and drank juice. My friend played with a dog. I like dogs. Later, the two of us went home.";

  // Define the multiple-choice options
  const answerOptions = [
    { key: 'A', text: 'みず' },
    { key: 'B', text: 'ジュース' },
    { key: 'C', text: 'コーヒー' },
    { key: 'D', text: 'おちゃ' },
  ];

  // Define the correct answer key (e.g., 'A', 'B', 'C', or 'D')
  const correctAnswerKey = 'B'; // Set the correct answer key here

  // Get the text of the correct answer option for displaying in feedback
  const correctAnswerText = answerOptions.find(option => option.key === correctAnswerKey)?.text || 'Unknown';

  // Define the explanation for the correct answer
  const explanationText = "In the passage:\nこうえんで サンドイッチを たべて、ジュースを のみました。\n→ \"We ate sandwiches and drank juice in the park.\"\nSo, the correct answer is ジュース.";
  // --- End Local Content ---


  // State variable to hold translated text (initially empty)
  const [translatedText, setTranslatedText] = useState('');

  // State variable to hold the user's selected answer (initially null)
  const [selectedAnswer, setSelectedAnswer] = useState(null); // Will store the selected option (e.g., 'A', 'B', 'C', 'D')

  // State variable to track if the answer has been submitted
  const [isSubmitted, setIsSubmitted] = useState(false);

  // State variable to track if the explanation should be shown
  const [showExplanation, setShowExplanation] = useState(false);


  // Function to handle Translate button press
  const handleTranslate = () => {
    // Simply set the translatedText state to the pre-defined translation
    setTranslatedText(translatedDokkaiText);
  };

  // Function to handle Submit button press
  const handleSubmit = () => {
    // Only allow submission if an answer is selected and not already submitted
    if (selectedAnswer !== null && !isSubmitted) {
        setIsSubmitted(true); // Mark as submitted

        // --- Check if the answer is correct ---
        const isCorrect = selectedAnswer === correctAnswerKey;

        // --- Provide Feedback ---
        if (isCorrect) {
            Alert.alert('Correct!', 'Your answer is correct!');
            setShowExplanation(false); // Hide explanation if correct
        } else {
            // If incorrect, show an alert and set state to show explanation
            Alert.alert(
                'Incorrect',
                `Your answer "${selectedAnswer}" is incorrect.`
            );
            setShowExplanation(true); // Show explanation if incorrect
        }
    } else if (selectedAnswer === null) {
        // If no answer is selected
        Alert.alert('Submission Failed', 'Please select an answer before submitting.');
    }
    // If already submitted, do nothing on button press
  };

  // Function to handle selecting an answer option
  const handleSelectAnswer = (answerKey) => {
      // Only allow selecting if not already submitted
      if (!isSubmitted) {
          setSelectedAnswer(answerKey); // Update the state with the key of the selected answer
          setShowExplanation(false); // Hide explanation if user changes answer before submitting
      }
  };

  return (
    <View style={styles.container}>
      {/* Scrollable area for the reading text and translated text */}
      <ScrollView style={styles.textContainer}>
        {/* Display the original reading text */}
        <Text style={styles.dokkaiText}>{originalDokkaiText}</Text>

        {/* Area to display translated text if available */}
        {translatedText ? ( // Only show this Text component if translatedText is not empty
          <View style={styles.translatedTextContainer}>
            <Text style={styles.translatedTextTitle}>Translation:</Text>
            <Text style={styles.translatedText}>{translatedText}</Text>
          </View>
        ) : null} {/* Render nothing if translatedText is empty */}

        {/* --- Multiple Choice Answer Options --- */}
        <View style={styles.optionsContainer}>
            <Text style={styles.optionsTitle}>Choose your answer:</Text>
            {answerOptions.map((option) => (
                <TouchableOpacity
                    key={option.key} // Unique key for each option
                    style={[
                        styles.optionButton,
                        selectedAnswer === option.key && styles.selectedOptionButton, // Apply selected style if this option is selected
                        isSubmitted && option.key === correctAnswerKey && styles.correctAnswer, // Highlight correct answer after submission
                        isSubmitted && selectedAnswer === option.key && selectedAnswer !== correctAnswerKey && styles.incorrectAnswer // Highlight incorrect selected answer after submission
                    ]}
                    onPress={() => handleSelectAnswer(option.key)} // Call handleSelectAnswer with the option's key
                    disabled={isSubmitted} // Disable options after submission
                >
                    <Text style={[
                        styles.optionButtonText,
                        selectedAnswer === option.key && styles.selectedOptionButtonText, // Apply selected text style
                        isSubmitted && option.key === correctAnswerKey && styles.correctAnswerText, // Highlight correct answer text after submission
                        isSubmitted && selectedAnswer === option.key && selectedAnswer !== correctAnswerKey && styles.incorrectAnswerText // Highlight incorrect selected answer text after submission
                    ]}>
                        {`${option.key}. ${option.text}`} {/* Display option key and text */}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
        {/* ------------------------------------ */}

        {/* --- Explanation Area (Shown after incorrect submission) --- */}
        {isSubmitted && !selectedAnswer === correctAnswerKey && showExplanation ? ( // Show explanation if submitted, answer is incorrect, and showExplanation is true
            <View style={styles.explanationContainer}>
                <Text style={styles.explanationTitle}>Explanation:</Text>
                <Text style={styles.explanationText}>{explanationText}</Text>
                {/* Optionally show correct answer text here again if needed */}
                {/* <Text style={styles.explanationCorrectAnswer}>Correct Answer: {correctAnswerKey}. {correctAnswerText}</Text> */}
            </View>
        ) : null}
        {/* ------------------------------------------------------- */}


      </ScrollView>

      {/* Container for the buttons at the bottom */}
      <View style={styles.buttonContainer}>
        {/* Translate Button */}
        <TouchableOpacity
            style={[styles.bottomButton, { backgroundColor: '#007BFF' }]}
            onPress={handleTranslate}
            disabled={translatedText !== ''} // Disable translate button after translation is shown
        >
          <Text style={styles.bottomButtonText}>Translate</Text>
        </TouchableOpacity>

        {/* Submit Button */}
        <TouchableOpacity
            style={[
                styles.bottomButton,
                { backgroundColor: selectedAnswer !== null && !isSubmitted ? '#28A745' : '#A9A9A9', marginLeft: 10 } // Change submit button color based on selection and submission
            ]}
            onPress={handleSubmit}
            disabled={selectedAnswer === null || isSubmitted} // Disable submit button if no answer is selected or already submitted
        >
          <Text style={styles.bottomButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensure the main container takes up available space
    backgroundColor: '#bbbbbb', // Changed to a slightly darker grey
    padding: 25, // Increased padding around the content
  },
  textContainer: {
    flex: 1, // Allows the ScrollView to take up available space
    marginBottom: 25, // Space between text/options and buttons
    backgroundColor: '#ffffff', // White background for the reading area
    borderRadius: 15, // More rounded corners
    padding: 20, // Increased padding inside the reading area
    shadowColor: '#000', // Add subtle shadow
    shadowOffset: { width: 0, height: 4 }, // Increased shadow offset
    shadowOpacity: 0.15, // Increased shadow opacity
    shadowRadius: 5, // Increased shadow radius
    elevation: 6, // Increased elevation for Android shadow
  },
  dokkaiText: {
    fontSize: 18, // Slightly larger font size
    lineHeight: 28, // Increased line height for readability
    color: '#222', // Darker text color
    marginBottom: 25, // Increased space below the reading text before options
    fontFamily: 'System', // Use system font (or a custom font if loaded)
  },
  translatedTextContainer: { // Style for the translated text area
    marginTop: 25, // Increased space above translated text
    paddingTop: 20,
    borderTopColor: '#b2ebf2', // Light blue border above translation
    borderTopWidth: 1,
    marginBottom: 25, // Increased space below translated text before options
  },
  translatedTextTitle: { // Style for the "Translation:" title
    fontSize: 18, // Slightly larger font size
    fontWeight: 'bold',
    marginBottom: 10, // Increased space below title
    color: '#007BFF', // Blue color for title
  },
  translatedText: { // Style for the translated text content
    fontSize: 17, // Slightly larger font size
    lineHeight: 26,
    color: '#444', // Slightly lighter text color
    fontStyle: 'italic', // Optional: make translated text italic
    fontFamily: 'System', // Use system font
  },
  optionsContainer: { // Container for multiple choice options
      marginTop: 15, // Space above the options section
      paddingTop: 20,
      borderTopColor: '#ccc', // Border above options
      borderTopWidth: 1,
      marginBottom: 25, // Space below options before buttons
  },
  optionsTitle: { // Style for the "Choose your answer:" title
      fontSize: 18, // Slightly larger font size
      fontWeight: 'bold',
      marginBottom: 15, // Increased space below title
      color: '#555',
  },
  optionButton: { // Style for each option button
      borderColor: '#b0bec5', // Muted blue-grey border color
      borderWidth: 1,
      borderRadius: 10, // More rounded corners
      padding: 15, // Increased padding
      marginBottom: 15, // Increased space between option buttons
      backgroundColor: '#ffffff', // White background for options
      shadowColor: '#000', // Add subtle shadow to options
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 3,
      flexDirection: 'row', // Arrange text horizontally
      alignItems: 'center', // Align text vertically
  },
  selectedOptionButton: { // Style for the selected option button
      borderColor: '#007BFF', // Highlight border color
      backgroundColor: '#e3f2fd', // Lighter blue background
      borderWidth: 2, // Thicker border
  },
  correctAnswer: { // Style for the correct answer option after submission
      borderColor: '#4CAF50', // Green border (Material Design Green)
      backgroundColor: '#e8f5e9', // Very light green background
      borderWidth: 2,
  },
  incorrectAnswer: { // Style for the incorrect answer option after submission
      borderColor: '#F44336', // Red border (Material Design Red)
      backgroundColor: '#ffebee', // Very light red background
      borderWidth: 2,
  },
  optionButtonText: { // Style for the text inside option buttons
      fontSize: 17, // Slightly larger font size
      color: '#333',
      flex: 1, // Allow text to take up space
  },
  selectedOptionButtonText: { // Style for the text inside selected option button
      fontWeight: 'bold',
      color: '#007BFF', // Highlight text color
  },
  correctAnswerText: { // Style for the text inside the correct answer option after submission
      fontWeight: 'bold',
      color: '#1b5e20', // Dark green text (Material Design Dark Green)
  },
  incorrectAnswerText: { // Style for the text inside the incorrect answer option after submission
      fontWeight: 'bold',
      color: '#b71c1c', // Dark red text (Material Design Dark Red)
  },
  explanationContainer: { // Style for the explanation area
      marginTop: 30, // Increased space above explanation
      paddingTop: 25,
      borderTopColor: '#ccc',
      borderTopWidth: 1,
      backgroundColor: '#fff9c4', // Light yellow background for explanation
      padding: 20, // Increased padding
      borderRadius: 10, // More rounded corners
      shadowColor: '#000', // Add subtle shadow
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 3,
  },
  explanationTitle: { // Style for the "Explanation:" title
      fontSize: 18, // Slightly larger font size
      fontWeight: 'bold',
      marginBottom: 10, // Increased space below title
      color: '#fbc02d', // Dark yellow color for title
  },
  explanationText: { // Style for the explanation content
      fontSize: 16,
      color: '#555',
      lineHeight: 24,
      fontFamily: 'System', // Use system font
  },
  explanationCorrectAnswer: { // Optional style for correct answer text in explanation
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 8,
      color: '#1b5e20', // Dark green text
  },
  buttonContainer: {
    flexDirection: 'row', // Arrange buttons horizontally
    justifyContent: 'space-around', // Distribute space around buttons
    paddingVertical: 18, // Increased padding above and below buttons
    borderTopColor: '#ccc', // Add a border line above buttons
    borderTopWidth: 1,
    backgroundColor: '#ffffff', // White background for the button container
    paddingHorizontal: 15, // Add horizontal padding
  },
  bottomButton: {
    flex: 1, // Allow buttons to grow and shrink
    paddingVertical: 16, // Increased padding
    borderRadius: 10, // More rounded corners
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8, // Increased space between buttons
    shadowColor: '#000', // Add subtle shadow to buttons
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  bottomButtonText: {
    color: 'white',
    fontSize: 18, // Slightly larger font size
    fontWeight: 'bold',
    fontFamily: 'System', // Use system font
  },
});

export default DokkaiScreen; // Export the component to be used in navigation
