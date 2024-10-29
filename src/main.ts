import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // Cấu hình CORS
  app.enableCors({
    origin: 'http://localhost:8082', // Địa chỉ frontend của bạn
    credentials: true, // Nếu cần thiết
  });

  await app.listen(3000);
}
bootstrap();
