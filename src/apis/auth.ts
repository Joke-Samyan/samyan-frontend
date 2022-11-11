import { apiGatewayHandler, authApiGatewayHandler } from ".";

export async function login(body: string): Promise<any> {
  return authApiGatewayHandler("post", "/auth/login", body);
}

export async function register(body: string): Promise<any> {
  return authApiGatewayHandler("post", "/auth/register", body);
}

export async function getUserInfo(): Promise<any> {
  return apiGatewayHandler("get", "/auth/user");
}
