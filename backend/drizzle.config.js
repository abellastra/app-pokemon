"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// drizzle.config.ts
const drizzle_kit_1 = require("drizzle-kit");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.default = (0, drizzle_kit_1.defineConfig)({
    schema: './db/schema.ts',
    out: './drizzle/migrations',
    dialect: 'postgresql',
    dbCredentials: {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        ssl: false,
    },
});
