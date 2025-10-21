import TelegramStrategyBase from 'passport-telegram-official';
declare const TelegramStrategy_base: new (options: import("passport-telegram-official/dist/types").TelegramOptions) => TelegramStrategyBase & {
    validate(...args: any[]): unknown;
};
export declare class TelegramStrategy extends TelegramStrategy_base {
    constructor();
    validate(profile: any): Promise<{
        telegramId: any;
        firstName: any;
        lastName: any;
        username: any;
        photoUrl: any;
    }>;
}
export {};
