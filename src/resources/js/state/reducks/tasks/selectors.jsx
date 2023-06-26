import CONSTANTS from "./constants";

const getVisibleTasks = (tasks, filter) => {
  switch (filter) {
    case CONSTANTS.SHOW_ALL:
      return tasks;
    case CONSTANTS.SHOW_done:
      return tasks.filter(t => t.done);
    case CONSTANTS.SHOW_ACTIVE:
      return tasks.filter(t => !t.done);
    default:
      throw new Error("Unknown filter: " + filter);
  }
};

export default {
  getVisibleTasks
};
