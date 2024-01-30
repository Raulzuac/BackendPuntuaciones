import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();//para que se pueda acceder desde cualquier sitio
  await app.listen(process.env.PORT || 4000);
  console.log(process.env.PORT);
  
}
bootstrap();
