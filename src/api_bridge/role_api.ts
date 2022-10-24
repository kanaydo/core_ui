import axiosClient from "../lib/api_client";

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