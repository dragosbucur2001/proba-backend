import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import { ClassSerializerInterceptor, INestApplication, ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { ThrottlerGuard } from '@nestjs/throttler';

dotenv.config();

async function bootstrap() {
  let app: INestApplication = null;

  if (process.env.APPSTATE == "prod") {
    const keyFile = fs.readFileSync(process.env.KEY_FILE);
    const certFile = fs.readFileSync(process.env.CERT_FILE);

    app = await NestFactory.create(AppModule, {
      httpsOptions: {
        key: keyFile,
        cert: certFile,
      }
    });
  } else {
    app = await NestFactory.create(AppModule);
  }

  app.enableCors();
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(3069);
}
bootstrap();
