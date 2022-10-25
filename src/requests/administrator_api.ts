import axiosClient from "@corelibs/api_client";

export const administratorIndex = async (params: any) => { 
  const response = await axiosClient().get(`/administrators?${params}`);
  return response.data;
}