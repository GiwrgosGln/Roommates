import pool from "../config/database";

export class TaskService {
  async getHouseholdTasks(householdId: number, userEmail: string) {
    const { rows } = await pool.query(
      `
      SELECT 
        t.id,
        t.title,
        t.description,
        t.completed_at,
        t.created_at,
        u.name as created_by_name
      FROM tasks t
      JOIN users u ON t.created_by_id = u.id
      JOIN household_members hm ON hm.household_id = t.household_id
      JOIN users cu ON cu.id = hm.user_id
      WHERE t.household_id = $1
      AND cu.email = $2
      AND (
        t.completed_at IS NULL 
        OR 
        t.completed_at > NOW() - INTERVAL '7 days'
      )
      ORDER BY 
        t.completed_at NULLS FIRST,
        t.created_at DESC
    `,
      [householdId, userEmail]
    );

    return rows;
  }

  async createTask(taskData: any, createdById: number) {
    const { rows } = await pool.query(
      `INSERT INTO tasks 
      (title, description, household_id, created_by_id) 
      VALUES ($1, $2, $3, $4) 
      RETURNING *`,
      [taskData.title, taskData.description, taskData.household_id, createdById]
    );
    return rows[0];
  }

  async setTaskCompleted(taskId: number, householdId: number) {
    const { rows } = await pool.query(
      `UPDATE tasks 
      SET completed_at = NOW() 
      WHERE id = $1 
      AND household_id = $2 
      RETURNING *`,
      [taskId, householdId]
    );
    return rows[0];
  }
}
