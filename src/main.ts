import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { setupSwagger } from './configs/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('ENV_PORT');

  setupSwagger(app);

  await app.listen(PORT ?? 3000);
  console.log('🚀  SERVER ON');
}
bootstrap();
