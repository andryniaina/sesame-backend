import { DataSource } from "typeorm"

//Source de connexion à la base de donnée
export const AppDataSource = new DataSource({
    type: process.env.NODE_ENV === "production" ? "oracle" : "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: ["src/entities/*.ts"],
    logging: true,
    synchronize: true,
})