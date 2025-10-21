import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { CoreModule } from './core/core.module/core.module';
import { AuthModule } from './entities/auth/auth.module';
import { AccessTokenGuard } from './core/guards/auth-guards';
import { RolesGuard } from './core/guards/role-guards';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ProfilesModule } from './entities/profiles/profiles.module';
import { RoomCategoriesModule } from './entities/room-categories/room-categories.module';
import { RoomsModule } from './entities/rooms/rooms.module';
import { PhotosModule } from './entities/photos/photos.module';
import { OrdersModule } from './entities/orders/orders.module';
import { ReviewsModule } from './entities/reviews/reviews.module';
import { SeederModule } from './common/seeders/seeder.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CoreModule,
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/static',
    }),
    ProfilesModule,
    RoomCategoriesModule,
    RoomsModule,
    PhotosModule,
    OrdersModule,
    ReviewsModule,
    SeederModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
