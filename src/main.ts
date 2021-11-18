import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config();

async function bootstrap() {
  let app = null;

  if (process.env.APPSTATE == "prod") {
    const keyFile = fs.readFileSync('/etc/ssl/cloudflare/private/cloudflare_prvkey_lsacbucuresti.ro.pem');
    const certFile = fs.readFileSync('/etc/ssl/cloudflare/certs/cloudflare_lsacbucuresti.ro.pem');

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
