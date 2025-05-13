// babel.config.js - This file configures Babel for your Expo project.

module.exports = function(api) {
  api.cache(true); // Cache the configuration for faster builds
  return { // Return an object
    presets: [['babel-preset-expo', { enableRuntimes: 'none' }]], // Use the standard Expo preset and disable runtimes
  }; // <-- Added missing closing curly brace for the return object and parenthesis for the function
}; // <-- Added missing closing parenthesis for the function
