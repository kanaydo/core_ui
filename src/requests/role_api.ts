import axiosClient from "@corelibs/api_client";

export const pagingRoleIndex = async(params: any) => {
  const response = await axiosClient().get(`/roles?${params}`);
  return response.data;
}

export const prepareRole = async() => {
  const response = await axiosClient().get('/roles/new');
  return response.data;
}

export const createRole = async (params: any) => {
  const response = await axiosClient().post('/roles', params);
  return response.data;
}

export const roleDetail = async (params: any) => {
  const response = await axiosClient().get(`/roles/${params}`);
  return response.data;
}

export const updateRole = async (id: string, params: any) => {
  const response = await axiosClient().patch(`/roles/${id}`, params);
  return response.data;
  
}