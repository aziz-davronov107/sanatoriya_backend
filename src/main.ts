import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
// ❗️ express-rate-limit v7 bo‘lsa:
import { rateLimit } from 'express-rate-limit'; // (agar v6 bo‘lsa default import)

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(cookieParser());
  // Swagger bilan to‘qnashmasligi uchun CSP’ni o‘chirib qo‘yamiz
  app.use(
    helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }),
  );

  // Proxy ortida ishlasa IP/real protokolni to‘g‘ri olish uchun:
  app.set('trust proxy', 1);

  const allowlist = [
    'http://localhost:3000',
    'https://localhost:3000',
    'https://yettibuloq-shifo.uz',
    'https://api.yettibuloq-shifo.uz',
  ];

  app.enableCors({
    origin: (origin, cb) => {
      if (!origin || allowlist.includes(origin)) cb(null, true);
      else cb(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
    ],
    exposedHeaders: ['set-cookie'],
  });

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // (ixtiyoriy) rate limit
  app.use(
    rateLimit({
      windowMs: 60 * 1000,
      max: 100,
      standardHeaders: true,
      legacyHeaders: false,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Real Estate API')
    .setDescription(
      'Swagger docs for Users, Category, Accommodation, Likes, Rating, Contact',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  const port = Number(process.env.PORT) || 3000;
  await app.listen(port);
  console.log(`Server is running on port ${port}`);
}
bootstrap();
