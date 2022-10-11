import axios from "axios";

export const KodwangApi = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_API
      : "http://localhost:5000/api",
  timeout: 8000,
  headers: { "Content-Type": "application/json" },
});

export async function apiHandler(
  method: string,
  url: string,
  body?: string
): Promise<any> {
  try {
    const response = await KodwangApi({
      method,
      url,
      data: body,
      headers: {
        "Content-Type": "application/json",
        token: localStorage.token,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error(error.message);
  }
}

export async function authApiHandler(
  method: string,
  url: string,
  body?: string
): Promise<any> {
  try {
    const response = await KodwangApi({
      method,
      url,
      data: body,
    });

    return response.data;
  } catch (error: any) {
    console.error(error.message);
  }
}
