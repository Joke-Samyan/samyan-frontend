import axios from "axios";

export const KodwangApi = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_API_GATEWAY
      : process.env.REACT_APP_API_GATEWAY,
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
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error(error.message);
  }
}

export async function authApiGatewayHandler(
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
  baseURL: process.env.REACT_APP_API_GATEWAY,
  // process.env.NODE_ENV === "development"
  //   ? process.env.REACT_APP_API_ACCOUNT_SERVICE
  //   : process.env.REACT_APP_API_ACCOUNT_SERVICE,
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
