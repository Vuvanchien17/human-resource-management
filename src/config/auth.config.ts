import { registerAs } from "@nestjs/config";

export default registerAs('auth', () => ({
    JWT_TTL: process.env.JWT_TTL,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    REFRESH_TOKEN_TTL: process.env.REFRESH_TOKEN_TTL,
    RESET_TOKEN_TTL: process.env.RESET_TOKEN_TTL,
}))
