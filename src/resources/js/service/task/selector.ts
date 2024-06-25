import { Task } from "../../domain/task";
import { GetTasksResponse } from "./type";

export const getTasksSelector = (data: GetTasksResponse): Task[] => {
  return data.slice(0, 10);
};
