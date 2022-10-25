import { apiHandler } from ".";

export async function getAllDataset(): Promise<any> {
  return apiHandler("get", "/REST/dataset");
}

export async function getDatasetById(param: string): Promise<any> {
  return apiHandler("get", `/GRPC/${param}`);
}

export async function createDataset(body: string): Promise<any> {
  return apiHandler("post", `/REST/dataset/create`, body);
}
