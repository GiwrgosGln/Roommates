export interface IUtility {
  id?: number;
  title: string;
  amount: number;
  due_date: Date;
  household_id: number;
  created_by_id: number;
  paid_at?: Date | null;
  created_at?: Date;
  updated_at?: Date;
}
