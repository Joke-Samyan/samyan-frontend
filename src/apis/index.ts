import axios from "axios";

export const KodwangApi = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_API_GATEWAY
      : "http://localhost:5000",
  timeout: 8000,
  headers: { "Content-Type": "application/json" },
});

export async function apiGatewayHandler(
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
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJ1c2VyX2lkIjoiNjM1ODNhNGE1MjBiN2U0MmQ4NTc4M2IyIiwiZXhwIjoxNjY2NzM2NzY1fQ.HtJolwoipI8LEh5--HpKu2JKL9YFH7pb7XafqWRAbdU",
      },
    });

    return response.data;
  } catch (error: any) {
    console.error(error.message);
  }
}

export async function authapiGatewayHandler(
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

export const KodwangAccountApi = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_API_ACCOUNT_SERVICE
      : "http://localhost:30033",
  timeout: 8000,
  headers: { "Content-Type": "application/json" },
});

export async function apiAccountHandler(
  method: string,
  url: string,
  body?: string
): Promise<any> {
  try {
    const response = await KodwangAccountApi({
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
