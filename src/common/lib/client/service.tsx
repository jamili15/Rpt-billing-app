import { createFetchAsync, makeRequest } from "./fetch";

const DOMAIN_PATH = process.env.NEXT_PUBLIC_APP_CONTEXT_PATH || "";

export const getService = (data: {}) => {
  return makeRequest(`${DOMAIN_PATH}/api/service`, {
    method: "GET",
    data,
  });
};

export const getPostService = (data: {}) => {
  return makeRequest(`${DOMAIN_PATH}/api/service`, {
    method: "POST",
    data: data,
  });
};

export type ServiceOptionType = {
  method?: "GET" | "POST";
  _connection?: string;
};

export const lookupService = (
  serviceName: string,
  connection?: string,
  option?: ServiceOptionType
) => {
  if (!option) option = { method: "POST" };
  if (!option.method) option.method = "POST";
  option._connection = connection;

  if (option.method === "GET") {
    return createFetchAsync(getService, serviceName, option);
  } else if (option.method === "POST") {
    return createFetchAsync(getPostService, serviceName, option);
  }
};
