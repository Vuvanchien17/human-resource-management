import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'; // Hoặc SeederModule nếu bạn tách riêng
import { SeederService } from './core/database/seed.service';

async function bootstrap() {
    // 1. Khởi tạo Application Context (không chạy HTTP Server)
    const app = await NestFactory.createApplicationContext(AppModule);

    // 2. Lấy SeederService từ IoC Container
    const seeder = app.get(SeederService);

    try {
        // 3. Gọi hàm seed (Nếu không dùng Lifecycle Hook, bạn có thể gọi trực tiếp hàm này)
        await seeder.seedUsers();
        console.log('🌱 Seeding complete!');
    } catch (error) {
        console.error('❌ Seeding failed:', error);
    } finally {
        // 4. Đóng ứng dụng để giải phóng kết nối database
        await app.close();
    }
}

bootstrap();