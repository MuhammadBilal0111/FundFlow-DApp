export {}; // Ensures this file is a module
declare global {
  interface Window {
    ethereum?: any; // Define ethereum on window
  }
}
