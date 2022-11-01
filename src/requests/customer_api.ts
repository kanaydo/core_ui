import axiosClient from "@corelibs/api_client";

export const customerIndex = async (params: any) => { 
  const response = await axiosClient().get(`/customers?${params}`);
  return response.data;
}

export const customerDestroy = async (params: any) => { 
  const response = await axiosClient().delete(`/customers/${params}`);
  return response.data;
}