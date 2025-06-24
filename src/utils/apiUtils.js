import { auth } from "../firebase/firebase.config";

// get current user's token
export const getAuthToken = async () => {
  try {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      return token;
    }
    console.log("No authenticated user found");
    return null;
  } catch (error) {
    console.error("Error getting auth token:", error);
    return null;
  }
};

// authenticated API calls
export const makeAuthenticatedRequest = async (url, options = {}) => {
  try {
    const token = await getAuthToken();

    const authHeaders = {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    };

    if (token) {
      authHeaders.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers: authHeaders,
    });

    return response;
  } catch (error) {
    console.error("API request error:", error);
    throw error;
  }
};
