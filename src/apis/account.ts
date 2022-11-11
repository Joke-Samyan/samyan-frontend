import { apiAccountHandler } from ".";

export async function topup(body: string): Promise<any> {
  return apiAccountHandler("post", "/account/topup", body);
}

export async function withdraw(body: string): Promise<any> {
  return apiAccountHandler("post", "/account/withdraw", body);
}

export async function getUserBalance(user_id: string): Promise<any> {
  return apiAccountHandler("get", `/account/getUserBalance/${user_id}`);
}
