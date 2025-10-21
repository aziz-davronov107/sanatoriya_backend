"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const cookieParser = require("cookie-parser");
const helmet_1 = require("helmet");
const swagger_1 = require("@nestjs/swagger");
const express_rate_limit_1 = require("express-rate-limit");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cookieParser());
    app.use((0, helmet_1.default)({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));
    app.set('trust proxy', 1);
    const allowlist = [
        'http://localhost:3000',
        'https://localhost:3000',
        'https://yettibuloq-shifo.uz',
        'https://api.yettibuloq-shifo.uz',
    ];
    app.enableCors({
        origin: (origin, cb) => {
            if (!origin || allowlist.includes(origin))
                cb(null, true);
            else
                cb(new Error('Not allowed by CORS'));
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
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
    }));
    app.use((0, express_rate_limit_1.rateLimit)({
        windowMs: 60 * 1000,
        max: 100,
        standardHeaders: true,
        legacyHeaders: false,
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Real Estate API')
        .setDescription('Swagger docs for Users, Category, Accommodation, Likes, Rating, Contact')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('swagger', app, document);
    const port = Number(process.env.PORT) || 3000;
    await app.listen(port);
    console.log(`Server is running on port ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map