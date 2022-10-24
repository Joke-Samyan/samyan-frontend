import { apiHandler, grpcHandler } from ".";

export async function getAllDataset(): Promise<any> {
  return apiHandler("get", "/dataset");
}

export async function getDatasetById(param: string): Promise<any> {
  return grpcHandler("get", `/getDataEntry/${param}`);
}
