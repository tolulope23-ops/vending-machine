import connPool from "../config/db_connect";

const connectDB = async () => {
  try {
    const connection = await connPool.getConnection();
    console.log("Database connected successfully");
    connection.release();       //Returns the connection back to the pool
  } catch (error:any) {
    console.error("Database connection failed:", error.message);
  }
};

export default connectDB;