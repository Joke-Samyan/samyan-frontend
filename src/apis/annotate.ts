import { apiGatewayHandler } from ".";

export async function labelData(body: string): Promise<any> {
  return apiGatewayHandler("put", "/REST/annotate", body);
}
