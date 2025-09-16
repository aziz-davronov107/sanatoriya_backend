import { OnModuleInit } from '@nestjs/common';
export declare class MyRedisService implements OnModuleInit {
    private client;
    onModuleInit(): Promise<void>;
    set(key: string, value: string, second: number): Promise<void>;
    get(key: string): Promise<string | null>;
    delete(key: string): Promise<number>;
}
