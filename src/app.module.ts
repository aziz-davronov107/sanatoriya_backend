import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { CoreModule } from './core/core.module/core.module';
import { AuthModule } from './entities/auth/auth.module';
import { AccessTokenGuard } from './core/guards/auth-guards';
import { RolesGuard } from './core/guards/role-guards';
import { ProfileModule } from './entities/profile/profile.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AccommodationModule } from './entities/accommodation/accommodation.module';
import { CategoryModule } from './entities/category/category.module';

@Module({
  imports: [
    CoreModule,
    AuthModule,
    ProfileModule,
    AccommodationModule,
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/static',
    }),
    CategoryModule
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
