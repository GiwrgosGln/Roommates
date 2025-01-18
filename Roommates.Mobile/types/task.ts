export interface Task {
  id: number;
  household_id: number;
  title: string;
  description: string | null;
  completed_at: string | null;
  created_at: string;
  created_by_name: string;
}

export interface WeeklyTasksProps {
  householdId: number;
}

export interface WeeklyTasksItemProps {
  task: Task;
}
