import axiosClient from "@corelibs/api_client";

export const administratorIndex = async (params: any) => { 
  const response = await axiosClient().get(`http://localhost:3000/administrators?${params}`);
  return response.data;
}