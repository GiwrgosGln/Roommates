import pool from "../config/database";
import { IUser } from "../types/user";

export class UserService {
  async findByEmail(email: string) {
    const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return rows[0];
  }

  async findByName(name: string) {
    const { rows } = await pool.query("SELECT * FROM users WHERE name = $1", [
      name,
    ]);
    return rows[0];
  }

  async create(userData: IUser) {
    const { rows } = await pool.query(
      "INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING *",
      [userData.email, userData.password, userData.name]
    );
    return rows[0];
  }

  async getUserProfile(email: string) {
    const { rows } = await pool.query(
      `SELECT 
        u.id, 
        u.name, 
        u.email, 
        u.created_at,
        u.default_household_id,
        json_agg(json_build_object(
          'household_id', hm.household_id,
          'role', hm.role,
          'household_name', h.name
        )) as households
      FROM users u
      LEFT JOIN household_members hm ON u.id = hm.user_id
      LEFT JOIN households h ON hm.household_id = h.id
      WHERE u.email = $1
      GROUP BY u.id`,
      [email]
    );
    return rows[0];
  }
}
