import { apiGatewayHandler } from ".";

export async function getAllDataset(): Promise<any> {
  return apiGatewayHandler("get", "/REST/dataset");
}

export async function getDatasetById(param: string): Promise<any> {
  return apiGatewayHandler("get", `/GRPC/${param}`);
}

export async function createDataset(body: string): Promise<any> {
  return apiGatewayHandler("post", `/REST/dataset/create`, body);
}
