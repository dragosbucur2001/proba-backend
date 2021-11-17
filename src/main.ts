import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
dotenv.config();
async function bootstrap() {
  
// if (process.dotenv.APPSTATE == "prod") {
    
//   const fs = require('fs');
//   const keyFile  = fs.readFileSync(__dirname + '/../ssl/mydomain.com.key.pem');
//   const certFile = fs.readFileSync(__dirname + '/../ssl/mydomain.com.crt.pem');

//   const app = await NestFactory.create(AppModule, {
//     httpsOptions: {
//       key: keyFile,
//       cert: certFile,
//     }});

// } else {
    const app = await NestFactory.create(AppModule);
// }

  
  
  app.enableCors();
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(3000);
}
bootstrap();
