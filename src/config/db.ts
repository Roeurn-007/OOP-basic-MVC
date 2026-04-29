import mysql from 'mysql2/promise';

const HOST = "localhost";
const PORT = 3306;
const USER = "root";
const PASSWORD = "";
const DB = "oop_mvc_test";

const pool = mysql.createPool({
  host: HOST,
  port: PORT,
  user: USER,
  password: PASSWORD,
  database: DB,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;