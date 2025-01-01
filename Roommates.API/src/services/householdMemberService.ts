import pool from "../config/database";
import { IHouseholdMember } from "../types/householdMember";

export class HouseholdMemberService {
  async addMember(memberData: IHouseholdMember) {
    const { rows } = await pool.query(
      "INSERT INTO household_members (user_id, household_id, role) VALUES ($1, $2, $3) RETURNING *",
      [memberData.user_id, memberData.household_id, memberData.role]
    );
    return rows[0];
  }

  async getMembersOfHousehold(householdId: number) {
    const { rows } = await pool.query(
      `SELECT hm.*, u.name, u.email 
       FROM household_members hm 
       JOIN users u ON hm.user_id = u.id 
       WHERE household_id = $1`,
      [householdId]
    );
    return rows;
  }

  async updateMemberRole(userId: number, householdId: number, role: string) {
    const checkResult = await pool.query(
      "SELECT * FROM household_members WHERE user_id = $1 AND household_id = $2",
      [userId, householdId]
    );

    if (checkResult.rows.length === 0) {
      return null;
    }

    const { rows } = await pool.query(
      "UPDATE household_members SET role = $1 WHERE user_id = $2 AND household_id = $3 RETURNING *",
      [role, userId, householdId]
    );
    return rows[0];
  }

  async removeMember(userId: number, householdId: number) {
    await pool.query(
      "DELETE FROM household_members WHERE user_id = $1 AND household_id = $2",
      [userId, householdId]
    );
  }
}
