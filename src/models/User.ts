import pool from '../config/db.js';

class User {
  id: number;
  name: string;
  email: string;

  constructor(id: number, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  static async findAll(): Promise<User[]> {
    const [rows] = await pool.execute('SELECT * FROM users');
    return (rows as any[]).map(row => new User(row.id, row.name, row.email));
  }

  static async findById(id: number): Promise<User | null> {
    const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
    if ((rows as any[]).length === 0) return null;
    const row = (rows as any[])[0];
    return new User(row.id, row.name, row.email);
  }

  static async create(name: string, email: string): Promise<User> {
    const [result] = await pool.execute('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
    const insertId = (result as any).insertId;
    return new User(insertId, name, email);
  }

  static async update(id: number, name: string, email: string): Promise<boolean> {
    const [result] = await pool.execute('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id]);
    return (result as any).affectedRows > 0;
  }

  static async delete(id: number): Promise<boolean> {
    const [result] = await pool.execute('DELETE FROM users WHERE id = ?', [id]);
    return (result as any).affectedRows > 0;
  }
}

export default User;