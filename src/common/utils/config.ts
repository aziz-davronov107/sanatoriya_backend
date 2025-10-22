import { INestApplication, Logger } from '@nestjs/common';

export class CorsConfig {
  private readonly logger = new Logger(CorsConfig.name);

  constructor(private readonly app: INestApplication) {}

  public enable(envCors: string | undefined) {
    if (!envCors || envCors.trim() === '') {
      this.app.enableCors({ origin: false });
      this.logger.warn('⚠️ CORS disabled (no envCors provided)');
      return;
    }

    // 1️⃣ Development holati: CORS=*
    if (envCors === '*') {
      this.app.enableCors({
        origin: true, // browserga kelgan originni avtomatik qaytaradi
        credentials: false, // * bilan credentials ishlamaydi
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
      });
      this.logger.log('🌍 CORS enabled for all origins (*) [NO CREDENTIALS]');
      return;
    }

    // 2️⃣ Production holati: whitelist orqali
    const whiteList = envCors.split(',').map(domain => domain.trim());

    this.app.enableCors({
      origin: (origin, callback) => {
        if (!origin) return callback(null, true); // Swagger, Postman uchun

        const isAllowed = whiteList.some(domain =>
          new RegExp(`^https?:\/\/${domain.replace(/\./g, '\\.')}$`).test(origin),
        );

        if (isAllowed) callback(null, true);
        else {
          this.logger.warn(`❌ CORS blocked request from origin: ${origin}`);
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    });

    this.logger.log(`✅ CORS enabled for whitelist: ${whiteList.join(' | ')}`);
  }
}