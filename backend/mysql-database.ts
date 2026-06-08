import mysql from "mysql2/promise";

export const connect = async function() {

    let port:number = parseInt(process.env.MYSQL_DATABASE_PORT!) as number;

    let connection = await mysql.createConnection(
        {
            host: process.env.MYSQL_DATABASE_HOST,
            port: port,
            database: "defaultdb",
            user: process.env.MYSQL_DATABASE_USER,
            password: process.env.MYSQL_DATABASE_PASSWORD
        }
    )

    //
    //"CREATE TABLE `users` (`id` int(11) NOT NULL PRIMARY KEY, `email` varchar(255) NOT NULL, `name` varchar(255) NOT NULL)"

    let [rows] = await connection.execute("SELECT * FROM users");
    console.log(rows);
}