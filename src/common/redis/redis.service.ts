import { Injectable, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class MyRedisService implements OnModuleInit {
  private client: Redis;

  async onModuleInit() {
    this.client = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: Number(process.env.REDIS_PORT) || 6379,
      password: process.env.REDIS_PASSWORD || undefined, // 🔑 Parol qo‘shildi
      db: Number(process.env.REDIS_DB) || 0,            // ixtiyoriy, agar db tanlash kerak bo‘lsa
    });

    this.client.on('connect', () => {
      console.log('✅ Redis bilan ulanish o‘rnatildi');
    });

    this.client.on('error', (err) => {
      console.error('❌ Redis xatosi:', err);
    });
  }

  async set(key: string, value: string, second: number) {
    await this.client.set(key, value, 'EX', second);
  }

  async get(key: string) {
    return this.client.get(key);
  }

  async delete(key: string) {
    return this.client.del(key);
  }
}
