import pool from "../config/database";
import { IHousehold } from "../types/household";

export class HouseholdService {
  async create(householdData: IHousehold) {
    const { rows } = await pool.query(
      "INSERT INTO households (name, address, city) VALUES ($1, $2, $3) RETURNING *",
      [householdData.name, householdData.address, householdData.city]
    );
    return rows[0];
  }

  async findById(id: number) {
    const { rows } = await pool.query(
      "SELECT * FROM households WHERE id = $1",
      [id]
    );
    return rows[0];
  }

  async update(id: number, householdData: Partial<IHousehold>) {
    const { rows } = await pool.query(
      "UPDATE households SET name = $1, address = $2, city = $3 WHERE id = $4 RETURNING *",
      [householdData.name, householdData.address, householdData.city, id]
    );
    return rows[0];
  }

  async delete(id: number) {
    await pool.query("DELETE FROM households WHERE id = $1", [id]);
  }
}
