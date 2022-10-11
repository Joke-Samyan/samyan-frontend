import { apiHandler } from ".";

export async function labelData(body: string): Promise<any> {
  return apiHandler("put", "/annotate", body);
}
