import mysql from "mysql2";

export const connectDB = () => {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Krunal#1020",
    database: "test",
  }); 

  connection.connect((error) => {
    if (error) {
      console.error("Database connection failed:", error);
      return;
    }
    console.log("Database Connected");
  });

  return connection;
};
