import axios from "axios";
import { GetTasksResponse } from "./type";

export const getTasks = async (): Promise<GetTasksResponse> => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
  return res.data;
};
