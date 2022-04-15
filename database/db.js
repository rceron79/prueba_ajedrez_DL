require('dotenv').config()
const { Client } = require('pg')
const { Pool } = require("pg");

const connectionString =
    process.env.DATABASE_URL ||
    "postgresql://postgres:1234@localhost:5432/ajedrez";

const pool = process.env.DATABASE_URL
    ? new Pool({
          connectionString: connectionString,
          ssl: { rejectUnauthorized: false },
      })
    : new Pool({ connectionString });

const getUsersDB = async () => {
    const client = await pool.connect();
    try {
        const respuesta = await client.query(
            "SELECT id, foto, nombre, anos_experiencia, especialidad, estado FROM jugadores"
        );
        return {
            ok: true,
            users: respuesta.rows,
        };
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            msg: error.message,
        };
    } finally {
        client.release();
    }
};

const createUserDB = async ({ nombre, email, hashPassword, experiencia, especialidad, pathFoto }) => {
    const client = await pool.connect();
    const query = {
        text: "INSERT INTO juadores (nombre, email, password, anos_experiencia, especialidad, foto, estado) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *",
        values: [nombre, email, hashPassword, experiencia, especialidad, pathFoto, false],
    };

    try {
        const respuesta = await client.query(query);
        console.log(respuesta);
        const { id } = respuesta.rows[0];
        return {
            ok: true,
            users: respuesta.rows,
        };
    } catch (error) {
        console.log(error);
        if (error.code === "23505") {
            return {
                ok: false,
                msg: "Ya existe el email registrado",
            };
        } return {
            ok: false,
            msg: error.message,
        };
    } finally {
        client.release();
    }
};

const getUserDB = async ({email}) => {
    const client = await pool.connect();
    const query = {
        text: "SELECT * FROM jugadores WHERE email = $1",
        values: [email],
    };
    try {
        const respuesta = await client.query(query);
        return {
            ok: true,
            user: respuesta.rows[0],
        };
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            msg: error.message,
        };
    } finally {
        client.release();
    }
};

const updateUserDB = async ({ nombre, email, hashPassword, experiencia, especialidad }) => {
    const client = await pool.connect();
    const query = {
        text: "UPDATE jugadores SET nombre=$1, email=$2, password=$3, anos_experiencia=$4, especialidad=$5 WHERE email=$2",
        values: [nombre, email, hashPassword, experiencia, especialidad],
    };

    try {
        const respuesta = await client.query(query);
        console.log(respuesta.rows);
        return {
            ok: true,
            users: respuesta.rows,
        };
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            msg: error.message,
        };
    } finally {
        client.release();
    }
};

const deleteUserDB = async ({email}) => {
    const client = await pool.connect();
    const query = {
        text: "DELETE FROM jugadores WHERE email = $1;",
        values: [email],
    };
    try {
        const respuesta = await client.query(query);
        return {
            ok: true,
            user: respuesta.rows[0],
        };
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            msg: error.message,
        };
    } finally {
        client.release();
    }
};

module.exports = {
    getUsersDB,
    createUserDB,
    getUserDB,
    updateUserDB,
    deleteUserDB
};