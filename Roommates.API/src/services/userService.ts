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
}
