// Pravin Mark Jayasinghe
// 9/10/2023
// loginAPI.js
// This is the API for the login page for SociaLens.

export async function loginUser(data) {
  const url = `${process.env.REACT_APP_BACKEND_URL}/login`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
}
