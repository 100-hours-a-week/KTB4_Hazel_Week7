const BASE_URL = "http://localhost:8080";

export async function request(path, options = {}) {
  const accessToken = localStorage.getItem("accessToken");

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...options.headers,
    },
  });


  if (response.status === 401) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("tokenType");
    localStorage.removeItem("userId");
    location.href = "../loginPage/login.html";
    return;
  }

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || "API 요청 실패");
  }

  if (response.status === 204) {
    return null;
  }


  return response.json();
}
