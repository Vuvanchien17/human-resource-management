
import { registerAs } from '@nestjs/config';
export default registerAs('mailer', () => ({
    MAILER_PORT: process.env.MAILER_PORT,
    MAILER_HOST: process.env.MAILER_HOST,
    MAILER_USER: process.env.MAILER_USER,
    MAILER_APP_PASS: process.env.MAIL_APP_PASS,
}))