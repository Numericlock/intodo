import axios from "axios";
import { GetTasksResponse } from "./type";

export const getTasks = async (): Promise<GetTasksResponse> => {
  const response = await axios.get(`/api/category`, {
    headers: { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}` },
  });

  return response.data.categories;
};
