const mysql = require("mysql2");

const db_connection = mysql
  .createConnection({
    host: "svc-a1f82a32-1b3a-4c79-b7c1-107817cc8750-ddl.aws-saopaulo-1.svc.singlestore.com", // HOST NAME
    user: "admin", // USER NAME
    database: "nodejsdb", // DATABASE NAME
    password: "Admin@$1234", // DATABASE PASSWORD
  })
  .on("error", (err) => {
    console.log("Failed to connect to Database - ", err);
  });

module.exports = db_connection;


