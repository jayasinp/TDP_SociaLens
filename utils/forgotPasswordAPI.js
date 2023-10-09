// Pravin Mark Jayasinghe
// 9/10/2023
// forgotPasswordAPI.js
// This is the API for the forgot password page for SociaLens.

export async function resetPassword(data) {
  const url = `${process.env.REACT_APP_BACKEND_URL}/reset-password`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
}
