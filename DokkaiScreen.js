// DokkaiScreen.js - Reading Comprehension Screen with Passage Loading, UI Nav Buttons, and Question Display

import React, { useState, useEffect, useCallback } from 'react'; // Import useState, useEffect, and useCallback hooks
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native'; // Import necessary components

// Import the passage data
import dokkaiPassages from './dokkaiData';

function DokkaiScreen({ navigation, route }) { // Receive navigation and route props

  // Get the selected level from the navigation parameters
  const { selectedLevel } = route.params || { selectedLevel: 'N5' }; // Default to N5 if no level is passed

  // Get the passages for the selected level
  const passagesForLevel = dokkaiPassages[selectedLevel] || [];

  // State variable to track the current passage index
  const [currentPassageIndex, setCurrentPassageIndex] = useState(0);

  // State variables for the currently displayed passage's data
  const [currentPassage, setCurrentPassage] = useState(null);
  const [translatedText, setTranslatedText] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);


  // --- Passage Navigation Handlers ---

  // Function to handle the NEXT button press (now on the UI)
  // Use useCallback to memoize the function
  const handleNextPassage = useCallback(() => {
    console.log('DokkaiScreen: handleNextPassage called (UI button). Current index:', currentPassageIndex);

    if (currentPassageIndex < passagesForLevel.length - 1) {
      setCurrentPassageIndex(prevIndex => prevIndex + 1); // Use functional update for state
      console.log('DokkaiScreen: Index incremented.');
    } else {
      console.log('DokkaiScreen: Already on the last passage.');
      Alert.alert('Last Passage', `You are on the last passage for JLPT ${selectedLevel}.`);
    }
  }, [currentPassageIndex, passagesForLevel.length, selectedLevel]); // Dependencies for useCallback

  // Function to handle the PREVIOUS button press (now on the UI)
  // Use useCallback to memoize the function
  const handlePreviousPassage = useCallback(() => {
    console.log('DokkaiScreen: handlePreviousPassage called (UI button). Current index:', currentPassageIndex);

    if (currentPassageIndex > 0) {
      setCurrentPassageIndex(prevIndex => prevIndex - 1); // Use functional update for state
      console.log('DokkaiScreen: Index decremented.');
    } else {
      console.log('DokkaiScreen: Already on the first passage.');
      Alert.alert('First Passage', `You are on the first passage for JLPT ${selectedLevel}.`);
    }
  }, [currentPassageIndex, selectedLevel]); // Dependencies for useCallback

  // --- End Passage Navigation Handlers ---


  // useEffect hook to load the passage data and update header title
  useEffect(() => {
    console.log('DokkaiScreen: useEffect triggered. currentPassageIndex:', currentPassageIndex, 'passagesForLevel.length:', passagesForLevel.length);

    if (passagesForLevel.length > 0 && currentPassageIndex < passagesForLevel.length) {
      const passage = passagesForLevel[currentPassageIndex];
      setCurrentPassage(passage);
      console.log('DokkaiScreen: Loading passage with ID:', passage.id);

      // Reset state for the new passage
      setTranslatedText('');
      setSelectedAnswer(null);
      setIsSubmitted(false);
      setShowExplanation(false);

      // --- Update header title based on current passage index ---
      // Use navigation.setOptions to update the title in the default header
      navigation.setOptions({
          title: `Dokkai ${currentPassageIndex + 1}`, // Set header title to "Dokkai X"
          // Remove any header definition here as it's handled by default header in App.js
          // header: () => (...)
          // headerRight: () => (...)
          // headerLeft: () => (...)
          // Pass current passage index via route params for title update in App.js
          params: {
              ...route.params, // Keep existing params
              currentPassageIndex: currentPassageIndex, // Pass current index
          },
      });

    } else if (currentPassageIndex >= passagesForLevel.length && passagesForLevel.length > 0) {
        console.log('DokkaiScreen: Reached end of level passages.');
        Alert.alert('End of Level', `You have completed all passages for JLPT ${selectedLevel}.`);
    } else if (passagesForLevel.length === 0) {
        console.log('DokkaiScreen: No passages found for this level.');
        Alert.alert('No Passages', `No Dokkai passages found for JLPT ${selectedLevel}.`);
    }
  }, [currentPassageIndex, selectedLevel, passagesForLevel.length, navigation]); // Dependencies


  // Function to handle Translate button press
  const handleTranslate = () => {
    if (currentPassage && currentPassage.translatedText) {
      setTranslatedText(currentPassage.translatedText);
    }
  };

  // Function to handle Submit button press
  const handleSubmit = () => {
    if (selectedAnswer !== null && !isSubmitted && currentPassage) {
        setIsSubmitted(true);

        const isCorrect = selectedAnswer === currentPassage.correctAnswerKey;

        if (isCorrect) {
            Alert.alert('Correct!', 'Your answer is correct!');
            setShowExplanation(false);
        } else {
            Alert.alert(
                'Incorrect',
                `Your answer "${selectedAnswer}" is incorrect.\n\nPlease scroll down for Explanation`
            );
            setShowExplanation(true);
        }
    } else if (selectedAnswer === null) {
        Alert.alert('Submission Failed', 'Please select an answer before submitting.');
    }
  };

  // Function to handle selecting an answer option
  const handleSelectAnswer = (answerKey) => {
      if (!isSubmitted) {
          setSelectedAnswer(answerKey);
          setShowExplanation(false);
      }
  };


  // If currentPassage is null (e.g., during initial loading or no passages), show a loading/empty state
  if (!currentPassage) {
      return (
          <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Loading passage...</Text>
          </View>
      );
  }

  // --- Render the current passage UI ---
  return (
    <View style={styles.container}>
      {/* Scrollable area for the reading text and translated text */}
      <ScrollView style={styles.textContainer}>
        {/* Display the original reading text from the current passage */}
        <Text style={styles.dokkaiText}>{currentPassage.originalText}</Text>

        {/* Area to display translated text if available */}
        {translatedText ? (
          <View style={styles.translatedTextContainer}>
            <Text style={styles.translatedTextTitle}>Translation:</Text>
            <Text style={styles.translatedText}>{translatedText}</Text>
          </View>
        ) : null}

        {/* --- Question Text --- */}
        {/* Display the question text from the current passage */}
        <Text style={styles.questionText}>{currentPassage.question}</Text>
        {/* --------------------- */}


        {/* --- Multiple Choice Answer Options --- */}
        <View style={styles.optionsContainer}>
            <Text style={styles.optionsTitle}>Choose your answer:</Text>
            {/* Use answer options from the current passage */}
            {currentPassage.answerOptions.map((option) => (
                <TouchableOpacity
                    key={option.key}
                    style={[
                        styles.optionButton,
                        selectedAnswer === option.key && styles.selectedOptionButton,
                        isSubmitted && option.key === currentPassage.correctAnswerKey && styles.correctAnswer,
                        isSubmitted && selectedAnswer === option.key && selectedAnswer !== currentPassage.correctAnswerKey && styles.incorrectAnswer
                    ]}
                    onPress={() => handleSelectAnswer(option.key)}
                    disabled={isSubmitted}
                >
                    <Text style={[
                        styles.optionButtonText,
                        selectedAnswer === option.key && styles.selectedOptionButtonText,
                        isSubmitted && option.key === currentPassage.correctAnswerKey && styles.correctAnswerText,
                        isSubmitted && selectedAnswer === option.key && selectedAnswer !== currentPassage.correctAnswerKey && styles.incorrectAnswerText
                    ]}>
                        {`${option.key}. ${option.text}`}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
        {/* ------------------------------------ */}

        {/* --- "Please scroll down for Explanation" message --- */}
        {/* This message is now included in the Alert, so we can remove it from the UI if desired */}
        {/* {isSubmitted && selectedAnswer !== currentPassage.correctAnswerKey ? ( // Show message if submitted and answer is incorrect
            <Text style={styles.scrollDownMessage}>Please scroll down for Explanation</Text>
        ) : null} */}
        {/* ------------------------------------------------- */}


        {/* --- Explanation Area (Shown after incorrect submission) --- */}
        {isSubmitted && selectedAnswer !== currentPassage.correctAnswerKey && showExplanation && currentPassage.explanation ? ( // Show explanation if submitted, incorrect, showExplanation is true, AND explanation exists
            <View style={styles.explanationContainer}>
                <Text style={styles.explanationTitle}>Explanation:</Text>
                <Text style={styles.explanationText}>{currentPassage.explanation}</Text> {/* Display explanation from current passage */}
            </View>
        ) : null}
        {/* ------------------------------------------------------- */}


      </ScrollView>

      {/* Container for the buttons at the bottom (Translate/Submit) */}
      <View style={styles.bottomButtonContainer}> {/* Renamed style to differentiate */}
        {/* Translate Button */}
        <TouchableOpacity
            style={[styles.bottomButton, { backgroundColor: '#007BFF' }]}
            onPress={handleTranslate}
            disabled={translatedText !== ''}
        >
          <Text style={styles.bottomButtonText}>Translate</Text>
        </TouchableOpacity>

        {/* Submit Button */}
        <TouchableOpacity
            style={[
                styles.bottomButton,
                { backgroundColor: selectedAnswer !== null && !isSubmitted ? '#28A745' : '#A9A9A9', marginLeft: 10 }
            ]}
            onPress={handleSubmit}
            disabled={selectedAnswer === null || isSubmitted}
        >
          <Text style={styles.bottomButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>

      {/* --- Previous and Next Buttons (Below content) --- */}
      <View style={styles.passageNavButtonContainer}> {/* New container for passage nav buttons */}
          {/* Previous Button */}
          <TouchableOpacity
              onPress={handlePreviousPassage}
              style={[styles.passageNavButton, currentPassageIndex === 0 && styles.disabledButton]}
              disabled={currentPassageIndex === 0}
          >
              <Text style={[styles.passageNavButtonText, currentPassageIndex === 0 && styles.disabledButtonText]}>Previous</Text>
          </TouchableOpacity>

          {/* Separator (Optional) */}
          <View style={styles.passageNavButtonSeparator} />

          {/* Next Button */}
          <TouchableOpacity
              onPress={handleNextPassage}
              style={[styles.passageNavButton, currentPassageIndex === passagesForLevel.length - 1 && styles.disabledButton]}
              disabled={currentPassageIndex === passagesForLevel.length - 1}
          >
              <Text style={[styles.passageNavButtonText, currentPassageIndex === passagesForLevel.length - 1 && styles.disabledButtonText]}>Next</Text>
          </TouchableOpacity>
      </View>
      {/* ---------------------------------------------- */}


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7fa', // A pleasant light blue background
    padding: 25,
  },
  loadingContainer: { // Style for loading state
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
  },
  loadingText: { // Style for loading text
      fontSize: 18,
      color: '#555',
  },
  textContainer: {
    flex: 1,
    marginBottom: 25,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 6,
  },
  dokkaiText: {
    fontSize: 18,
    lineHeight: 28,
    color: '#222',
    marginBottom: 25,
    fontFamily: 'System',
  },
  translatedTextContainer: {
    marginTop: 25,
    paddingTop: 20,
    borderTopColor: '#b2ebf2',
    borderTopWidth: 1,
    marginBottom: 25,
  },
  translatedTextTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007BFF',
  },
  translatedText: {
    fontSize: 17,
    lineHeight: 26,
    color: '#444',
    fontStyle: 'italic',
    fontFamily: 'System',
  },
  questionText: { // Style for the question text
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 15, // Space below the question
      color: '#333',
  },
  optionsContainer: {
      marginTop: 15,
      paddingTop: 20,
      borderTopColor: '#ccc',
      borderTopWidth: 1,
      marginBottom: 25,
  },
  optionsTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 15,
      color: '#555',
  },
  optionButton: {
      borderColor: '#b0bec5',
      borderWidth: 1,
      borderRadius: 10,
      padding: 15,
      marginBottom: 15,
      backgroundColor: '#ffffff',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 3,
      flexDirection: 'row',
      alignItems: 'center',
  },
  selectedOptionButton: {
      borderColor: '#007BFF',
      backgroundColor: '#e3f2fd',
      borderWidth: 2,
  },
  correctAnswer: {
      borderColor: '#4CAF50',
      backgroundColor: '#e8f5e9',
      borderWidth: 2,
  },
  incorrectAnswer: {
      borderColor: '#F44336',
      backgroundColor: '#ffebee',
      borderWidth: 2,
  },
  optionButtonText: {
      fontSize: 17,
      color: '#333',
      flex: 1,
  },
  selectedOptionButtonText: {
      fontWeight: 'bold',
      color: '#007BFF',
  },
  correctAnswerText: {
      fontWeight: 'bold',
      color: '#1b5e20',
  },
  incorrectAnswerText: {
      fontWeight: 'bold',
      color: '#b71c1c',
  },
  scrollDownMessage: { // Style for the scroll down message
      fontSize: 15,
      color: '#DC3545', // Red color for the message
      textAlign: 'center',
      marginTop: 10,
      marginBottom: 10, // Space above explanation
      fontStyle: 'italic',
  },
  explanationContainer: {
      marginTop: 30,
      paddingTop: 25,
      borderTopColor: '#ccc',
      borderTopWidth: 1,
      backgroundColor: '#fff9c4',
      padding: 20,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 3,
  },
  explanationTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#fbc02d',
  },
  explanationText: {
      fontSize: 16,
      color: '#555',
      lineHeight: 24,
      fontFamily: 'System',
  },
  explanationCorrectAnswer: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 8,
      color: '#1b5e20',
  },
  bottomButtonContainer: { // Container for Translate/Submit buttons
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 18,
    borderTopColor: '#ccc',
    borderTopWidth: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 15,
  },
  bottomButton: { // Style for Translate/Submit buttons
    flex: 1,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  bottomButtonText: { // Style for Translate/Submit button text
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'System',
  },
  passageNavButtonContainer: { // New container for Previous/Next buttons
      flexDirection: 'row',
      justifyContent: 'center', // Center the buttons
      alignItems: 'center',
      paddingVertical: 10, // Padding above and below buttons
      marginTop: 10, // Space above this button container
  },
  passageNavButton: { // Style for Previous/Next buttons
      paddingHorizontal: 15,
      paddingVertical: 8,
      borderRadius: 5,
      // Optional: Add a subtle background or border
      // backgroundColor: '#eee',
      // borderColor: '#ccc',
      // borderWidth: 1,
  },
  passageNavButtonText: { // Style for Previous/Next button text
      fontSize: 15,
      color: '#007BFF', // Blue color for active buttons
      fontWeight: 'bold',
  },
  disabledButton: { // Style for disabled buttons
      opacity: 0.5, // Reduce opacity
  },
  disabledButtonText: { // Style for disabled button text
      color: '#999', // Grey out text
  },
  passageNavButtonSeparator: { // Style for separator between Previous/Next buttons
      width: 1,
      height: '80%',
      backgroundColor: '#ccc',
      marginHorizontal: 10,
  }
});

export default DokkaiScreen; // Export the component to be used in navigation
