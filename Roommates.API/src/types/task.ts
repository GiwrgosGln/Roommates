export interface ITask {
  id?: number;
  household_id: number;
  created_by_id: number;
  title: string;
  description?: string;
  completed_at?: Date | null;
  created_at?: Date | null;
}
