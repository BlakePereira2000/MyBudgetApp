import jwtDecode from "jwt-decode";

interface DecodedToken {
  exp: number;
  // Add other properties if your token contains additional claims
}

export const isLoggedIn = () => {
  const token = localStorage.getItem("token"); // Retrieve the token from local storage
  if (token) {
    try {
      const decodedToken: DecodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Get the current time in seconds
      return decodedToken.exp > currentTime; // Check if the token is not expired
    } catch (error) {
      // Handle token decoding error
      return false;
    }
  }
  return false; // No token found
};
