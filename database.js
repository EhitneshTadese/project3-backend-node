import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
}).promise()

export async function getUsers(){
    const [rows] = await pool.query("SELECT * FROM User")
    return rows
}

export async function getUser(id){
    const [rows] = await pool.query(`SELECT * 
        FROM User
        WHERE user_id = ?
        `, [id])
    return rows
}

export async function createUser(name,email){
    const [creResults] = await pool.query(`
        INSERT INTO User
        (name,email)
        VALUES(?,?)
        `,[name,email])
        return creResults
}

//const users = await getUsers()
//console.log(users)

//const newUser = await getUser(1)
//console.log(newUser)

//const result = await createUser('test','test')
//console.log(result)


