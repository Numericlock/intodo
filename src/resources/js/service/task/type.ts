export type GetTasksResponse = {
  id: number;
  parent_id: number;
  position: number;
  user_id: number;
  category_id: number;
  text: string;
  is_done: boolean;
  is_droppable: boolean;
  created_at: Date;
  updated_at: Date;
}[];
