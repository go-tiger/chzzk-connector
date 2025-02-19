import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from 'src/entities/session';
import { HttpModule } from '@nestjs/axios';
import { DevelopersModule } from '../developers/developers.module';
import { TokensModule } from '../tokens/tokens.module';

@Module({
  imports: [TypeOrmModule.forFeature([Session]), HttpModule, DevelopersModule, TokensModule],
  controllers: [SessionsController],
  providers: [SessionsService],
})
export class SessionsModule {}
