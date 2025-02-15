import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from 'src/configs/typeorm.config';
import { DevelopersModule } from 'src/domains/developers/developers.module';
import { EventsModule } from 'src/domains/events/events.module';
import { SessionsModule } from 'src/domains/sessions/sessions.module';
import { TokensModule } from 'src/domains/tokens/tokens.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({ imports: [ConfigModule], inject: [ConfigService], useClass: TypeOrmConfig }),
    DevelopersModule,
    EventsModule,
    SessionsModule,
    TokensModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
