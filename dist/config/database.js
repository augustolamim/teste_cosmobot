"use strict";require('dotenv').config({
    path: process.env.NODE_ENV == 'test' ? '.env.test' : '.env'
})

module.exports = {
    dialect : process.env.DB_DIALECT || 'postgres',
    storage: "./src/tests/database.sqlite",
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    "logging": true,
    port: '5432'  
};      
