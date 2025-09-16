"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyRedisService = void 0;
const common_1 = require("@nestjs/common");
const ioredis_1 = require("ioredis");
let MyRedisService = class MyRedisService {
    client;
    async onModuleInit() {
        this.client = new ioredis_1.default({
            host: process.env.REDIS_HOST || 'localhost',
            port: Number(process.env.REDIS_PORT) || 6379,
            password: process.env.REDIS_PASSWORD || undefined,
            db: Number(process.env.REDIS_DB) || 0,
        });
        this.client.on('connect', () => {
            console.log('✅ Redis bilan ulanish o‘rnatildi');
        });
        this.client.on('error', (err) => {
            console.error('❌ Redis xatosi:', err);
        });
    }
    async set(key, value, second) {
        await this.client.set(key, value, 'EX', second);
    }
    async get(key) {
        return this.client.get(key);
    }
    async delete(key) {
        return this.client.del(key);
    }
};
exports.MyRedisService = MyRedisService;
exports.MyRedisService = MyRedisService = __decorate([
    (0, common_1.Injectable)()
], MyRedisService);
//# sourceMappingURL=redis.service.js.map