import axiosClient from "@corelibs/api_client";

export const pagingRoleIndex = async(params: any) => {
  const response = await axiosClient().get(`http://localhost:3000/roles?${params}`);
  return response.data;
}

export const prepareRole = async() => {
  const response = await axiosClient().get('http://localhost:3000/roles/new');
  return response.data;
}

export const createRole = async (params: any) => {
  const response = await axiosClient().post('http://localhost:3000/roles', params);
  return response.data;
}

export const roleDetail = async (params: any) => {
  const response = await axiosClient().get(`http://localhost:3000/roles/${params}`);
  return response.data;
}

export const updateRole = async (id: string, params: any) => {
  const response = await axiosClient().patch(`http://localhost:3000/roles/${id}`, params);
  return response.data;
  
}