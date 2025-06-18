import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  await app.listen(3000);
  
  process.on('SIGINT', async () => {
    console.log('SIGINT received');
    await app.close();
    process.exit(0);
  });
  
  process.on('SIGTERM', async () => {
    console.log('SIGTERM received');
    await app.close();
    process.exit(0);
  });
}
bootstrap();
