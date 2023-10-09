// Pravin Mark Jayasinghe
// 9/10/2023
// registrationAPI.js
// This is the API for the registration page for SociaLens.

export async function apiRequest(url, method, data, baseUrl) {
  const response = await fetch(`${baseUrl}${url}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : null,
  });
  const responseData = await response.json();
  return responseData;
}

export async function registerUser(data) {
  const response = await apiRequest("/register", "POST", data);
  return response;
}
