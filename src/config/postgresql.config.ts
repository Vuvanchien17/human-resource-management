import { registerAs } from "@nestjs/config";

export default registerAs('postgres', () => ({
    DB_HOST: process.env.HOST_POSTGRESQL,
    DB_PORT: process.env.PORT_POSTGRESQL,
    DB_USER: process.env.USER_POSTGRESQL,
    DB_PASS: process.env.PASS_POSTGRESQL,
}))