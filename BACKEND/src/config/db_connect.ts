import mysql from "mysql2/promise";
import { DB_HOST, DB_USER, DB_NAME, DB_PASSWORD, DB_CON_LIMIT} from "./db.config";

const connPool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  database: DB_NAME,
  password: DB_PASSWORD,
  connectionLimit: DB_CON_LIMIT,
});

export default connPool;
