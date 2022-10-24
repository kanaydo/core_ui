import axiosClient from "../lib/api_client";

export const pagingRoleIndex = async(params: any) => {
  const response = await axiosClient().get(`http://localhost:3000/roles?${params}`);
  return response.data;
}