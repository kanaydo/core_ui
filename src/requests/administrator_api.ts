import axiosClient from "@corelibs/api_client";

export const administratorIndex = async (params: any) => { 
  const response = await axiosClient().get(`/administrators?${params}`);
  return response.data;
}

export const administratorShow = async (id: string) => {
  const response = await axiosClient().get(`/administrators/${id}`);
  return response.data;
}

export const administratorNew = async () => {
  const response = await axiosClient().get(`/administrators/new`);
  return response.data;
}

export const administratorCreate =async (params: any) => {
  const response = await axiosClient().post(`/administrators`, params);
  return response.data;
}

export const administratorUpdate = async (id: string, params: any) => {
  const response = await axiosClient().patch(`/administrators/${id}`, params);
  return response.data;
}