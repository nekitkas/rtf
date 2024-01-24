

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
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Server response:", data);

      return data.cookiePresent;
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  };