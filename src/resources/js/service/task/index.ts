import { useQuery } from "@tanstack/react-query";
import { taskKeys } from "./key";
import { getTasks } from "./function";
import { getTasksSelector } from "./selector";

export const useGetTasks = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: taskKeys.lists(),
    queryFn: getTasks,
    select: getTasksSelector,
  });

  return {
    data,
    isPending,
    isError,
  };
};
