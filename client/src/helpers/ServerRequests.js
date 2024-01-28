

// Function to check the presence of a cookie and return a boolean indicating whether the user is logged in
export const CheckUserLoggedIn = async () => {
  try {
    const response = await fetch("http://localhost:8080/api/v1/auth/checkCookie", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      if (response.status === 401) {
        return false;
      } else {
        // Handle other non-OK responses if necessary
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error; // Rethrow the error if needed
  }
};



export const Logout = async () => {
  try {
    const response = await fetch("http://localhost:8080/api/v1/jwt/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      if (response.status === 401) {
        return false;
      } else {
        // Handle other non-OK responses if necessary
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error; // Rethrow the error if needed
  }
};