import axiosClient from "@corelibs/api_client";

export const customerIndex = async (params: any) => { 
  const response = await axiosClient().get(`/customers?${params}`);
  return response.data;
}

export const customerDestroy = async (params: any) => { 
  const response = await axiosClient().delete(`/customers/${params}`);
  return response.data;
}

export const customerCreate =async (params: any) => {
  const response = await axiosClient().post(`/customers`, params);
  return response.data;
}

export const customerUpdate =async (id: string, params: any) => {
  const response = await axiosClient().patch(`/customers/${id}`, params);
  return response.data;
}

export const customerShow =async (id: string) => {
  const response = await axiosClient().get(`/customers/${id}`);
  return response.data;
}