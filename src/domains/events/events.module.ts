import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/entities/event';
import { TokensModule } from '../tokens/tokens.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([Event]), TokensModule, HttpModule],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
