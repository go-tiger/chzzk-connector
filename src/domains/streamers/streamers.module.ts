import { Module } from '@nestjs/common';
import { StreamersService } from './streamers.service';
import { StreamersController } from './streamers.controller';
import { TokensModule } from '../tokens/tokens.module';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Streamer } from 'src/entities/streamer';

@Module({
  imports: [TypeOrmModule.forFeature([Streamer]), TokensModule, HttpModule],
  controllers: [StreamersController],
  providers: [StreamersService],
})
export class StreamersModule {}
